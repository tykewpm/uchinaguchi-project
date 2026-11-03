#!/usr/bin/env python3
"""Convert NINJAL's Okinawa-go Jiten data (okinawa_01) into the site's dictionary JSON.

Source: National Institute for Japanese Language and Linguistics (NINJAL),
『沖縄語辞典』 digital data, https://mmsrv.ninjal.ac.jp/okinawago/en/index.html
Licence: CC BY 4.0. Every entry keeps its source, licence, dictionary page and
the headword exactly as NINJAL wrote it.

Input: okinawa_01.xlsx, or a tab-separated text export of it.
Output:
  data/ninjal-okinawago.json         full records, the canonical copy
  public/data/ninjal-okinawago.json  compact copy the dictionary page loads in the browser

Usage: python3 scripts/import_ninjal.py path/to/okinawa_01.xlsx
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = "NINJAL 沖縄語辞典 (Okinawa-go Jiten, 1963), digital data"
SOURCE_URL = "https://mmsrv.ninjal.ac.jp/okinawago/en/index.html"
LICENSE = "CC-BY-4.0"

# NINJAL's computer data writes ʔ as "?". "=" marks where a verb's ending
# attaches and "]" marks an accent fall; both are kept in `ninjal_form` and
# left out of the display form.
def display_form(raw: str) -> str:
    # A few rows use full-width ＝ and ］ for the same markers.
    for mark in ("=", "]", "＝", "］"):
        raw = raw.replace(mark, "")
    return raw.replace("?", "ʔ")


def read_rows(path: Path):
    if path.suffix.lower() == ".xlsx":
        import openpyxl  # only needed for the real Excel file

        wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
        ws = wb.worksheets[0]
        for row in ws.iter_rows(values_only=True):
            yield ["" if v is None else str(v) for v in row]
    else:
        for line in path.read_text(encoding="utf-8").splitlines():
            yield line.split("\t")


def main(path: Path):
    entries, skipped, unclear, truncated = [], [], [], False
    for cells in read_rows(path):
        first = (cells[0] if cells else "").strip()
        if first.startswith("... (truncated"):
            truncated = True
            continue
        if not first.isdigit():
            continue  # sheet headers and the column-title row
        cells = [c.strip() for c in cells] + [""] * 12
        page, raw, accent, pos, kind, note = cells[0:6]
        meanings = [m for m in cells[6:11] if m]
        remarks = cells[11]
        if not raw or not meanings:
            skipped.append({"page": page, "headword": raw, "reason": "no headword or no meaning"})
            continue
        entry = {
            "id": f"ninjal-{len(entries) + 1:05d}",
            "headword": display_form(raw),
            "ninjal_form": raw,
            "accent": accent,
            "part_of_speech_ja": pos,
            "meanings_ja": meanings,
            "source": SOURCE,
            "source_url": SOURCE_URL,
            "source_page": int(page),
            "license": LICENSE,
            "status": "attested",
        }
        if kind:
            entry["register_ja"] = kind
        if note:
            entry["supplement_ja"] = note
        if remarks:
            entry["remarks_ja"] = remarks
        if "●" in raw:
            entry["flag"] = "unclear character in source data"
            unclear.append(raw)
        entries.append(entry)

    meta = {
        "description": "Shuri Okinawan headwords from NINJAL's Okinawa-go Jiten, converted for the Uchinaguchi Project.",
        "source": SOURCE,
        "source_url": SOURCE_URL,
        "license": LICENSE,
        "attribution": "Data: National Institute for Japanese Language and Linguistics (NINJAL), 『沖縄語辞典』, CC BY 4.0. Display spelling adapted: ? shown as ʔ; = and ] markers removed.",
        "status_note": "status 'attested' means the word is in a published source. It has not yet been reviewed by a speaker for this site.",
        "meanings_language": "ja",
        "input_file": path.name,
        "input_truncated": truncated,
        "count": len(entries),
        "skipped": skipped,
        "unclear_characters": unclear,
    }
    (ROOT / "data").mkdir(exist_ok=True)
    # One entry per line keeps the file small and its git diffs readable.
    lines = ",\n".join(json.dumps(e, ensure_ascii=False) for e in entries)
    (ROOT / "data/ninjal-okinawago.json").write_text(
        '{"_meta": ' + json.dumps(meta, ensure_ascii=False, indent=1) + ',\n"entries": [\n' + lines + "\n]}\n",
        encoding="utf-8",
    )

    # Compact copy for the browser: short keys keep the download small.
    compact = {
        "attribution": meta["attribution"],
        "source_url": SOURCE_URL,
        "license": LICENSE,
        "entries": [
            {
                "h": e["headword"],
                "r": e["ninjal_form"],
                "p": e["part_of_speech_ja"],
                "m": e["meanings_ja"],
                "pg": e["source_page"],
                **({"f": 1} if "flag" in e else {}),
            }
            for e in entries
        ],
    }
    out = ROOT / "public/data"
    out.mkdir(parents=True, exist_ok=True)
    (out / "ninjal-okinawago.json").write_text(json.dumps(compact, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    print(f"entries: {len(entries)}  skipped: {len(skipped)}  unclear: {len(unclear)}  input truncated: {truncated}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
