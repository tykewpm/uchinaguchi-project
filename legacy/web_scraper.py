import os
import requests
import pandas as pd
import json
from bs4 import BeautifulSoup
from datetime import datetime
import time
import re
from urllib.parse import urljoin, urlparse

class UchinaguchiWebScraper:
    def __init__(self, output_folder="uchinaguchi_data"):
        """Initialize the scraper with an output folder for data."""
        self.output_folder = output_folder
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # Create output folder if it doesn't exist
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

    def scrape_dictionary_site(self, url):
        """Scrape a dictionary website for Uchinaguchi words and definitions."""
        print(f"Scraping dictionary site: {url}")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # This extraction logic will need to be customized for each site
            # Here's a generic approach that looks for tables or definition lists
            dictionary_entries = []
            
            # Try to find dictionary entries in tables
            tables = soup.find_all('table')
            for table in tables:
                rows = table.find_all('tr')
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    if len(cells) >= 2:
                        # Assuming first cell is word, second is definition
                        word = cells[0].get_text(strip=True)
                        definition = cells[1].get_text(strip=True)
                        if word and definition:
                            entry = {
                                'word': word,
                                'definition': definition,
                                'source_url': url
                            }
                            dictionary_entries.append(entry)
            
            # Try to find dictionary entries in definition lists
            dl_lists = soup.find_all('dl')
            for dl in dl_lists:
                dts = dl.find_all('dt')
                dds = dl.find_all('dd')
                for i in range(min(len(dts), len(dds))):
                    word = dts[i].get_text(strip=True)
                    definition = dds[i].get_text(strip=True)
                    if word and definition:
                        entry = {
                            'word': word,
                            'definition': definition,
                            'source_url': url
                        }
                        dictionary_entries.append(entry)
            
            # Look for specifically formatted content
            # This is a placeholder for custom logic per site
            word_def_patterns = [
                (r'([^\s-]+)\s*-\s*(.+)', 'dash-separated'),
                (r'([^\s:]+)\s*:\s*(.+)', 'colon-separated')
            ]
            
            paragraphs = soup.find_all('p')
            for p in paragraphs:
                text = p.get_text(strip=True)
                for pattern, pattern_type in word_def_patterns:
                    matches = re.findall(pattern, text)
                    for match in matches:
                        if len(match) >= 2:
                            word = match[0].strip()
                            definition = match[1].strip()
                            if word and definition and len(word) < 50:  # Basic validation
                                entry = {
                                    'word': word,
                                    'definition': definition,
                                    'source_url': url,
                                    'pattern_type': pattern_type
                                }
                                dictionary_entries.append(entry)
            
            print(f"Found {len(dictionary_entries)} dictionary entries")
            return dictionary_entries
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return []

    def scrape_educational_resource(self, url):
        """Scrape educational content about Uchinaguchi."""
        print(f"Scraping educational resource: {url}")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract article title
            title_element = soup.find(['h1', 'h2', 'header'])
            title = title_element.get_text(strip=True) if title_element else "Untitled"
            
            # Extract main content
            # This needs to be customized based on the site structure
            content_selectors = [
                'article', 'main', '.content', '#content', '.post-content', 
                '.entry-content', '.article-content'
            ]
            
            content_element = None
            for selector in content_selectors:
                content_element = soup.select_one(selector)
                if content_element:
                    break
            
            # If we couldn't find content using selectors, use the body
            if not content_element:
                content_element = soup.body
            
            # Extract text content, preserving some structure
            content = ""
            for element in content_element.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li']):
                tag_text = element.get_text(strip=True)
                if tag_text:
                    tag_name = element.name
                    if tag_name.startswith('h'):
                        content += f"\n\n### {tag_text} ###\n\n"
                    elif tag_name == 'li':
                        content += f"• {tag_text}\n"
                    else:
                        content += f"{tag_text}\n\n"
            
            # Find relevant links within the page
            internal_links = []
            external_links = []
            parsed_url = urlparse(url)
            base_domain = parsed_url.netloc
            
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                full_url = urljoin(url, href)
                link_domain = urlparse(full_url).netloc
                
                link_text = link.get_text(strip=True)
                link_info = {
                    'url': full_url,
                    'text': link_text or "[No Text]"
                }
                
                if link_domain == base_domain:
                    internal_links.append(link_info)
                else:
                    external_links.append(link_info)
            
            # Extract images that might contain useful information
            images = []
            for img in soup.find_all('img', src=True):
                src = img.get('src')
                alt = img.get('alt', '')
                full_src = urljoin(url, src)
                
                image_info = {
                    'url': full_src,
                    'alt_text': alt
                }
                images.append(image_info)
            
            resource_data = {
                'title': title,
                'url': url,
                'content': content,
                'internal_links': internal_links,
                'external_links': external_links,
                'images': images,
                'scraped_at': datetime.now().isoformat()
            }
            
            return resource_data
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return None

    def save_dictionary_data(self, entries, source_name):
        """Save dictionary entries to CSV and JSON."""
        if not entries:
            print("No dictionary entries to save")
            return
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save to CSV
        entries_df = pd.DataFrame(entries)
        csv_path = os.path.join(self.output_folder, f"uchinaguchi_dictionary_{source_name}_{timestamp}.csv")
        entries_df.to_csv(csv_path, index=False)
        
        # Save to JSON
        json_path = os.path.join(self.output_folder, f"uchinaguchi_dictionary_{source_name}_{timestamp}.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(entries, f, ensure_ascii=False, indent=4)
        
        print(f"Dictionary data saved to {csv_path} and {json_path}")

    def save_resource_data(self, resource, source_name):
        """Save educational resource data to JSON and text files."""
        if not resource:
            print("No resource data to save")
            return
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save to JSON
        json_path = os.path.join(self.output_folder, f"uchinaguchi_resource_{source_name}_{timestamp}.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(resource, f, ensure_ascii=False, indent=4)
        
        # Save content to text file for easier reading
        txt_path = os.path.join(self.output_folder, f"uchinaguchi_resource_{source_name}_{timestamp}.txt")
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(f"Title: {resource['title']}\n")
            f.write(f"URL: {resource['url']}\n")
            f.write(f"Scraped at: {resource['scraped_at']}\n\n")
            f.write("=== CONTENT ===\n\n")
            f.write(resource['content'])
            
            f.write("\n\n=== INTERNAL LINKS ===\n\n")
            for link in resource['internal_links']:
                f.write(f"{link['text']}: {link['url']}\n")
                
            f.write("\n\n=== EXTERNAL LINKS ===\n\n")
            for link in resource['external_links']:
                f.write(f"{link['text']}: {link['url']}\n")
                
            f.write("\n\n=== IMAGES ===\n\n")
            for img in resource['images']:
                f.write(f"{img['alt_text']}: {img['url']}\n")
        
        print(f"Resource data saved to {json_path} and {txt_path}")


def main():
    # Initial URLs to scrape - you'll want to customize this list
    dictionary_urls = [
        "http://eall.hawaii.edu/alohaokinawan/index.html",
        "https://www.onookinawa.com/home/learn-uchinaguchi/",
        # Add more dictionary sites
    ]
    
    educational_urls = [
        "https://languagemagazine.com/preserving-uchinaguchi-through-cultural-capital/",
        "https://guides.library.manoa.hawaii.edu/okinawa/languages",
        # Add more educational resources
    ]
    
    scraper = UchinaguchiWebScraper()
    
    # Scrape dictionary sites
    for url in dictionary_urls:
        site_name = urlparse(url).netloc.replace(".", "_")
        entries = scraper.scrape_dictionary_site(url)
        scraper.save_dictionary_data(entries, site_name)
        time.sleep(2)  # Be polite to servers
    
    # Scrape educational resources
    for url in educational_urls:
        site_name = urlparse(url).netloc.replace(".", "_")
        resource = scraper.scrape_educational_resource(url)
        scraper.save_resource_data(resource, site_name)
        time.sleep(2)  # Be polite to servers

if __name__ == "__main__":
    main()
