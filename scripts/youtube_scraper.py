import os
import googleapiclient.discovery
from googleapiclient.discovery import build
import pandas as pd
import json
from datetime import datetime

def setup_youtube_api(api_key):
    """Set up YouTube API client with your API key."""
    api_service_name = "youtube"
    api_version = "v3"
    return build(api_service_name, api_version, developerKey=api_key)

def search_uchinaguchi_videos(youtube, max_results=50):
    """Search for Uchinaguchi-related videos."""
    # Define search terms to find Uchinaguchi content
    search_terms = [
        "Uchinaguchi lesson", 
        "Okinawan language", 
        "ウチナーグチ", 
        "沖縄口", 
        "沖縄語",
        "Uchinaa-guchi",
        "Uchinaguchi Study Group",
        "learn Okinawan language"
    ]
    
    all_videos = []
    
    for term in search_terms:
        print(f"Searching for: {term}")
        
        # Call the search.list method to retrieve results matching the term
        search_response = youtube.search().list(
            q=term,
            part="snippet",
            maxResults=max_results,
            type="video",
            relevanceLanguage="ja"  # Focus on Japanese results
        ).execute()
        
        # Add each result to our collection
        for item in search_response.get("items", []):
            video_id = item["id"]["videoId"]
            
            # Check if we already have this video
            if not any(video["videoId"] == video_id for video in all_videos):
                video_data = {
                    "videoId": video_id,
                    "title": item["snippet"]["title"],
                    "channelTitle": item["snippet"]["channelTitle"],
                    "publishedAt": item["snippet"]["publishedAt"],
                    "description": item["snippet"]["description"],
                    "searchTerm": term,
                    "thumbnail": item["snippet"]["thumbnails"]["high"]["url"]
                }
                all_videos.append(video_data)
    
    print(f"Found {len(all_videos)} unique videos")
    return all_videos

def get_video_details(youtube, video_ids):
    """Get additional details for a list of video IDs."""
    # Split video IDs into chunks of 50 (API limit)
    video_id_chunks = [video_ids[i:i+50] for i in range(0, len(video_ids), 50)]
    
    video_details = []
    
    for chunk in video_id_chunks:
        # Get video details
        videos_response = youtube.videos().list(
            part="statistics,contentDetails",
            id=",".join(chunk)
        ).execute()
        
        # Add details to our list
        for item in videos_response.get("items", []):
            video_detail = {
                "videoId": item["id"],
                "duration": item["contentDetails"]["duration"],
                "viewCount": item["statistics"].get("viewCount", 0),
                "likeCount": item["statistics"].get("likeCount", 0),
                "commentCount": item["statistics"].get("commentCount", 0)
            }
            video_details.append(video_detail)
    
    return video_details

def save_results(videos, details, output_folder="uchinaguchi_data"):
    """Save scraped data to CSV and JSON files."""
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Create a timestamp for the filenames
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Merge video data with their details
    video_details_dict = {detail["videoId"]: detail for detail in details}
    
    for video in videos:
        video_id = video["videoId"]
        if video_id in video_details_dict:
            video.update(video_details_dict[video_id])
    
    # Save to CSV
    videos_df = pd.DataFrame(videos)
    csv_path = os.path.join(output_folder, f"uchinaguchi_videos_{timestamp}.csv")
    videos_df.to_csv(csv_path, index=False)
    
    # Save to JSON
    json_path = os.path.join(output_folder, f"uchinaguchi_videos_{timestamp}.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(videos, f, ensure_ascii=False, indent=4)
    
    print(f"Data saved to {csv_path} and {json_path}")
    
    return videos_df

def main():
    # You'll need to get a YouTube Data API key from Google Cloud Console
    # https://console.cloud.google.com/apis/credentials
    API_KEY = "AIzaSyDLPesY2DFZuKx73XVyomCvo7nVzQg4mzY"  # Replace with your actual API key
    
    # Set up the YouTube API client
    youtube = setup_youtube_api(API_KEY)
    
    # Search for videos
    videos = search_uchinaguchi_videos(youtube)
    
    # Get additional details for each video
    video_ids = [video["videoId"] for video in videos]
    details = get_video_details(youtube, video_ids)
    
    # Save the results
    videos_df = save_results(videos, details)
    
    # Print a sample of what we found
    print("\nSample of Uchinaguchi videos found:")
    print(videos_df[["title", "channelTitle", "viewCount"]].head(10))

if __name__ == "__main__":
    main()
