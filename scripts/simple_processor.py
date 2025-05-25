import os
import pandas as pd
import json
import glob
from datetime import datetime

def process_youtube_data():
    """Process YouTube video data and create a summary."""
    print("Processing YouTube video data...")
    
    # Find video JSON files
    video_files = glob.glob("uchinaguchi_data/uchinaguchi_videos_*.json")
    
    if not video_files:
        print("No YouTube video files found")
        return
    
    all_videos = []
    for file_path in video_files:
        print(f"Reading {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                videos = json.load(f)
            all_videos.extend(videos)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
    
    if not all_videos:
        print("No video data found")
        return
    
    print(f"Found {len(all_videos)} total videos")
    
    # Create processed_data directory
    os.makedirs("processed_data", exist_ok=True)
    
    # Save summary
    summary = {
        "total_videos": len(all_videos),
        "channels": list(set([v.get("channelTitle", "") for v in all_videos if v.get("channelTitle")])),
        "most_viewed": sorted(all_videos, key=lambda x: int(x.get("viewCount", 0)), reverse=True)[:10],
        "recent_videos": sorted(all_videos, key=lambda x: x.get("publishedAt", ""), reverse=True)[:10]
    }
    
    with open("processed_data/youtube_summary.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    # Create CSV for easy viewing
    video_data = []
    for video in all_videos:
        video_data.append({
            "title": video.get("title", ""),
            "channel": video.get("channelTitle", ""),
            "views": video.get("viewCount", 0),
            "published": video.get("publishedAt", ""),
            "url": f"https://www.youtube.com/watch?v={video.get('videoId', '')}"
        })
    
    df = pd.DataFrame(video_data)
    df.to_csv("processed_data/all_videos.csv", index=False)
    
    print(f"YouTube data processed and saved to processed_data/")

def process_dictionary_data():
    """Process dictionary data and create a unified dictionary."""
    print("Processing dictionary data...")
    
    # Find dictionary JSON files
    dict_files = glob.glob("uchinaguchi_data/uchinaguchi_dictionary_*.json")
    
    if not dict_files:
        print("No dictionary files found")
        return
    
    all_entries = []
    for file_path in dict_files:
        print(f"Reading {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                entries = json.load(f)
            all_entries.extend(entries)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
    
    if not all_entries:
        print("No dictionary data found")
        return
    
    print(f"Found {len(all_entries)} dictionary entries")
    
    # Create processed_data directory
    os.makedirs("processed_data", exist_ok=True)
    
    # Save unified dictionary
    with open("processed_data/unified_dictionary.json", "w", encoding="utf-8") as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)
    
    # Create CSV
    df = pd.DataFrame(all_entries)
    df.to_csv("processed_data/unified_dictionary.csv", index=False)
    
    print(f"Dictionary data processed and saved to processed_data/")

def create_basic_phrasebook():
    """Create a basic phrasebook from dictionary data."""
    print("Creating basic phrasebook...")
    
    try:
        with open("processed_data/unified_dictionary.json", "r", encoding="utf-8") as f:
            entries = json.load(f)
    except:
        print("No unified dictionary found, skipping phrasebook creation")
        return
    
    # Create a simple phrasebook
    phrasebook_md = "# Uchinaguchi Phrasebook\n\n"
    phrasebook_md += "Common Uchinaguchi words and phrases from collected data.\n\n"
    phrasebook_md += "| Uchinaguchi | Meaning |\n"
    phrasebook_md += "|-------------|--------|\n"
    
    for entry in entries[:50]:  # First 50 entries
        word = entry.get("word", "").replace("|", "/")
        definition = entry.get("definition", "").replace("|", "/")
        if word and definition:
            phrasebook_md += f"| {word} | {definition} |\n"
    
    with open("processed_data/basic_phrasebook.md", "w", encoding="utf-8") as f:
        f.write(phrasebook_md)
    
    print("Basic phrasebook created")

def create_summary_report():
    """Create a summary report of all collected data."""
    print("Creating summary report...")
    
    report = "# Uchinaguchi Data Collection Summary\n\n"
    report += f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
    
    # Count files
    video_files = len(glob.glob("uchinaguchi_data/uchinaguchi_videos_*.json"))
    dict_files = len(glob.glob("uchinaguchi_data/uchinaguchi_dictionary_*.json"))
    resource_files = len(glob.glob("uchinaguchi_data/uchinaguchi_resource_*.json"))
    
    report += f"## Data Collection Results\n\n"
    report += f"- Video files: {video_files}\n"
    report += f"- Dictionary files: {dict_files}\n"
    report += f"- Educational resource files: {resource_files}\n\n"
    
    # Add video summary if available
    try:
        with open("processed_data/youtube_summary.json", "r", encoding="utf-8") as f:
            youtube_data = json.load(f)
        
        report += f"## YouTube Videos\n\n"
        report += f"- Total videos found: {youtube_data['total_videos']}\n"
        report += f"- Unique channels: {len(youtube_data['channels'])}\n\n"
        
        report += f"### Top Channels\n\n"
        for channel in youtube_data['channels'][:10]:
            if channel:
                report += f"- {channel}\n"
        report += "\n"
        
    except:
        report += "## YouTube Videos\n\nData processing incomplete\n\n"
    
    # Add dictionary summary if available
    try:
        with open("processed_data/unified_dictionary.json", "r", encoding="utf-8") as f:
            dict_data = json.load(f)
        
        report += f"## Dictionary Entries\n\n"
        report += f"- Total entries: {len(dict_data)}\n\n"
        
    except:
        report += "## Dictionary Entries\n\nData processing incomplete\n\n"
    
    report += "## Files Created\n\n"
    processed_files = glob.glob("processed_data/*")
    for file_path in processed_files:
        filename = os.path.basename(file_path)
        report += f"- {filename}\n"
    
    with open("processed_data/summary_report.md", "w", encoding="utf-8") as f:
        f.write(report)
    
    print("Summary report created")

def main():
    print("Starting simple data processing...")
    
    # Process different types of data
    process_youtube_data()
    process_dictionary_data()
    create_basic_phrasebook()
    create_summary_report()
    
    print("\nData processing complete!")
    print("Check the 'processed_data' folder for results.")

if __name__ == "__main__":
    main()
