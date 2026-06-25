# The Uchinaguchi Project

Preserving and revitalizing **Uchinaaguchi** (Central Okinawan), a UNESCO-listed
endangered language, with and for the Okinawan community.

Live site: https://uchinaguchiproject.org

> *Ichariba choodee — once we meet, we are family.*

## Status

Rebuilding (v1) on [Astro](https://astro.build). The previous static site is preserved in `/legacy`.

## Tech stack

- **Astro** — static-first site (fast, SEO-friendly front door)
- Planned: **Supabase** for accounts, saved progress, contributions, and audio storage
- Hosting: GitHub → Vercel/Netlify/Cloudflare Pages (free tier)

## Local development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to ./dist
npm run preview  # preview the build
```

## Project structure

```
src/
  layouts/Base.astro      # shared layout, brand system, header/footer
  pages/index.astro       # home
  pages/dictionary.astro  # dictionary (reads data/dictionary.clean.json)
  styles/global.css       # brand design tokens + styles
data/
  dictionary.clean.json   # single source of truth for the dictionary (replaces v0)
legacy/                   # the original v0 static site, kept for reference
scripts/                  # data/scraper utilities (API key now via env var)
```

## Data, licensing & ethics

The **code** is MIT-licensed. The **language data and content** are intended for
**CC BY-SA 4.0** so the community's material stays open and cannot be enclosed.
The Okinawan community owns the language; this project is a steward, not an owner.
No dictionary entry is published as "correct" until reviewed by a fluent speaker,
and we never use synthetic Japanese text-to-speech for Okinawan pronunciation.
See the founding documents for the full data & ethics governance plan.

## Contributing

Corrections from fluent speakers and community members are especially welcome.
(Contribution flow coming with the v1.5 accounts release.)
