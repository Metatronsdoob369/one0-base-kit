import requests
import json
import time
import re
from typing import Dict, List, Optional, Any, Union
from urllib.parse import urljoin, urlparse
from datetime import datetime
import logging
from bs4 import BeautifulSoup
import feedparser
from dataclasses import dataclass, asdict
import hashlib
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ScrapedContent:
    """Data class for scraped content"""
    url: str
    title: str
    content: str
    metadata: Dict[str, Any]
    timestamp: str
    status: int
    word_count: int
    links: List[str]
    images: List[str]
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2, ensure_ascii=False)

class WebScraper:
    """Comprehensive web scraping utility for agents"""
    
    def __init__(self, 
                 timeout: int = 30,
                 max_retries: int = 3,
                 delay: float = 1.0,
                 user_agent: str = None,
                 session: requests.Session = None):
        
        self.timeout = timeout
        self.max_retries = max_retries
        self.delay = delay
        
        # Default headers
        self.headers = {
            'User-Agent': user_agent or 'Mozilla/5.0 (compatible; PATHsassinBot/1.0; +https://github.com/pathsassin)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        # Use provided session or create new one
        self.session = session or requests.Session()
        self.session.headers.update(self.headers)
        
        # Cache for storing scraped content
        self.cache = {}
        self.cache_dir = "scraper_cache"
        
        # Create cache directory if it doesn't exist
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)

    def scrape_page(self, 
                   url: str, 
                   extract_text: bool = True,
                   extract_links: bool = True,
                   extract_images: bool = True,
                   clean_html: bool = True,
                   remove_scripts: bool = True,
                   remove_styles: bool = True,
                   use_cache: bool = True) -> ScrapedContent:
        """
        Scrape a single webpage
        
        Args:
            url: URL to scrape
            extract_text: Whether to extract text content
            extract_links: Whether to extract links
            extract_images: Whether to extract images
            clean_html: Whether to clean HTML
            remove_scripts: Whether to remove script tags
            remove_styles: Whether to remove style tags
            use_cache: Whether to use cached results
            
        Returns:
            ScrapedContent object
        """
        
        # Check cache first
        if use_cache:
            cached_content = self._get_cached_content(url)
            if cached_content:
                logger.info(f"📋 Using cached content for: {url}")
                return cached_content
        
        try:
            logger.info(f"🔍 Scraping: {url}")
            
            # Make request with retries
            response = self._make_request(url)
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Clean HTML if requested
            if clean_html:
                self._clean_html(soup)
            
            if remove_scripts:
                for script in soup(["script"]):
                    script.decompose()
            
            if remove_styles:
                for style in soup(["style"]):
                    style.decompose()
            
            # Extract content
            title = self._extract_title(soup)
            content = self._extract_text(soup) if extract_text else ""
            metadata = self._extract_metadata(soup)
            links = self._extract_links(soup, url) if extract_links else []
            images = self._extract_images(soup, url) if extract_images else []
            
            # Create scraped content object
            scraped_content = ScrapedContent(
                url=url,
                title=title,
                content=content,
                metadata=metadata,
                timestamp=datetime.now().isoformat(),
                status=response.status_code,
                word_count=len(content.split()),
                links=links,
                images=images
            )
            
            # Cache the result
            if use_cache:
                self._cache_content(url, scraped_content)
            
            logger.info(f"✅ Successfully scraped: {url} ({scraped_content.word_count} words)")
            return scraped_content
            
        except Exception as e:
            logger.error(f"❌ Failed to scrape {url}: {str(e)}")
            raise

    def scrape_pages(self, 
                    urls: List[str], 
                    **kwargs) -> List[ScrapedContent]:
        """
        Scrape multiple pages
        
        Args:
            urls: List of URLs to scrape
            **kwargs: Additional arguments for scrape_page
            
        Returns:
            List of ScrapedContent objects
        """
        results = []
        
        for i, url in enumerate(urls):
            try:
                result = self.scrape_page(url, **kwargs)
                results.append(result)
                
                # Add delay between requests (except for last request)
                if i < len(urls) - 1 and self.delay > 0:
                    time.sleep(self.delay)
                    
            except Exception as e:
                logger.error(f"Failed to scrape {url}: {str(e)}")
                # Continue with other URLs even if one fails
        
        return results

    def scrape_website(self, 
                      base_url: str,
                      max_pages: int = 10,
                      follow_internal_links: bool = True,
                      allowed_domains: List[str] = None,
                      exclude_patterns: List[str] = None,
                      **kwargs) -> List[ScrapedContent]:
        """
        Scrape a website and follow links to find related content
        
        Args:
            base_url: Starting URL
            max_pages: Maximum number of pages to scrape
            follow_internal_links: Whether to follow internal links
            allowed_domains: List of allowed domains
            exclude_patterns: Patterns to exclude from scraping
            **kwargs: Additional arguments for scrape_page
            
        Returns:
            List of ScrapedContent objects
        """
        visited = set()
        to_visit = [base_url]
        results = []
        
        allowed_domains = allowed_domains or [urlparse(base_url).netloc]
        exclude_patterns = exclude_patterns or []
        
        while to_visit and len(results) < max_pages:
            url = to_visit.pop(0)
            
            if url in visited:
                continue
                
            visited.add(url)
            
            try:
                content = self.scrape_page(url, **kwargs)
                results.append(content)
                
                # Find new links to visit
                if follow_internal_links and len(results) < max_pages:
                    new_links = self._find_internal_links(
                        content.links, 
                        base_url, 
                        allowed_domains, 
                        exclude_patterns
                    )
                    
                    for link in new_links:
                        if link not in visited and link not in to_visit:
                            to_visit.append(link)
                
                # Add delay between requests
                if self.delay > 0:
                    time.sleep(self.delay)
                    
            except Exception as e:
                logger.error(f"Failed to scrape {url}: {str(e)}")
        
        return results

    def extract_data(self, 
                    url: str, 
                    selectors: Dict[str, str]) -> Dict[str, List[str]]:
        """
        Extract specific data from a webpage using CSS selectors
        
        Args:
            url: URL to scrape
            selectors: Dictionary of {key: css_selector}
            
        Returns:
            Dictionary of extracted data
        """
        content = self.scrape_page(url)
        soup = BeautifulSoup(content.content, 'html.parser')
        
        extracted = {}
        
        for key, selector in selectors.items():
            elements = soup.select(selector)
            extracted[key] = [elem.get_text(strip=True) for elem in elements]
        
        return extracted

    def scrape_rss(self, rss_url: str) -> List[Dict[str, str]]:
        """
        Scrape RSS feeds
        
        Args:
            rss_url: URL of the RSS feed
            
        Returns:
            List of RSS items
        """
        try:
            logger.info(f"📡 Scraping RSS: {rss_url}")
            
            response = self._make_request(rss_url)
            feed = feedparser.parse(response.content)
            
            items = []
            for entry in feed.entries:
                item = {
                    'title': entry.get('title', ''),
                    'description': entry.get('description', ''),
                    'link': entry.get('link', ''),
                    'pubDate': entry.get('published', ''),
                    'author': entry.get('author', ''),
                }
                items.append(item)
            
            logger.info(f"✅ Successfully scraped RSS: {rss_url} ({len(items)} items)")
            return items
            
        except Exception as e:
            logger.error(f"❌ Failed to scrape RSS {rss_url}: {str(e)}")
            raise

    def scrape_api(self, 
                  url: str, 
                  method: str = 'GET',
                  data: Dict = None,
                  headers: Dict = None) -> Any:
        """
        Scrape JSON APIs
        
        Args:
            url: API endpoint URL
            method: HTTP method
            data: Request data
            headers: Additional headers
            
        Returns:
            API response data
        """
        try:
            logger.info(f"🔌 Scraping API: {url}")
            
            request_headers = self.headers.copy()
            if headers:
                request_headers.update(headers)
            
            if method.upper() == 'GET':
                response = self._make_request(url, headers=request_headers)
            else:
                response = self.session.request(
                    method, 
                    url, 
                    json=data, 
                    headers=request_headers,
                    timeout=self.timeout
                )
                response.raise_for_status()
            
            result = response.json()
            logger.info(f"✅ Successfully scraped API: {url}")
            return result
            
        except Exception as e:
            logger.error(f"❌ Failed to scrape API {url}: {str(e)}")
            raise

    def search_and_scrape(self, 
                         search_query: str,
                         search_engine: str = 'google',
                         max_results: int = 5,
                         **kwargs) -> List[ScrapedContent]:
        """
        Search for content and scrape the results
        
        Args:
            search_query: Search query
            search_engine: Search engine to use ('google', 'bing', 'duckduckgo')
            max_results: Maximum number of results to scrape
            **kwargs: Additional arguments for scrape_page
            
        Returns:
            List of ScrapedContent objects
        """
        # This is a simplified implementation
        # In practice, you'd need to use search APIs or implement search scraping
        
        logger.info(f"🔍 Searching for: {search_query}")
        
        # For now, return empty list - implement based on search engine APIs
        logger.warning("Search functionality requires search engine APIs")
        return []

    def save_to_file(self, 
                    content: ScrapedContent, 
                    filename: str = None,
                    format: str = 'json') -> str:
        """
        Save scraped content to file
        
        Args:
            content: ScrapedContent object
            filename: Output filename (auto-generated if None)
            format: Output format ('json', 'txt', 'html')
            
        Returns:
            Path to saved file
        """
        if not filename:
            # Generate filename from URL
            url_hash = hashlib.md5(content.url.encode()).hexdigest()[:8]
            filename = f"scraped_{url_hash}.{format}"
        
        filepath = os.path.join(self.cache_dir, filename)
        
        try:
            if format == 'json':
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(content.to_dict(), f, indent=2, ensure_ascii=False)
            elif format == 'txt':
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(f"Title: {content.title}\n")
                    f.write(f"URL: {content.url}\n")
                    f.write(f"Date: {content.timestamp}\n")
                    f.write(f"Word Count: {content.word_count}\n")
                    f.write("-" * 50 + "\n")
                    f.write(content.content)
            elif format == 'html':
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(f"<html><head><title>{content.title}</title></head>")
                    f.write(f"<body><h1>{content.title}</h1>")
                    f.write(f"<p><strong>URL:</strong> {content.url}</p>")
                    f.write(f"<p><strong>Date:</strong> {content.timestamp}</p>")
                    f.write(f"<div>{content.content}</div></body></html>")
            
            logger.info(f"💾 Saved content to: {filepath}")
            return filepath
            
        except Exception as e:
            logger.error(f"Failed to save content: {str(e)}")
            raise

    # Private helper methods

    def _make_request(self, url: str, headers: Dict[str, str] | None = None) -> requests.Response:
        """Make HTTP request with retries"""
        request_headers = self.headers.copy()
        if headers:
            request_headers.update(headers)
        
        for attempt in range(self.max_retries):
            try:
                response = self.session.get(
                    url, 
                    headers=request_headers,
                    timeout=self.timeout
                )
                response.raise_for_status()
                return response
                
            except requests.RequestException as e:
                if attempt == self.max_retries - 1:
                    raise
                logger.warning(f"Retry {attempt + 1}/{self.max_retries} for {url}")
                time.sleep(2 ** attempt)  # Exponential backoff

    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Extract page title"""
        title = soup.find('title')
        if title:
            return title.get_text(strip=True)
        
        h1 = soup.find('h1')
        if h1:
            return h1.get_text(strip=True)
        
        og_title = soup.find('meta', property='og:title')
        if og_title:
            return og_title.get('content', '')
        
        return ''

    def _extract_text(self, soup: BeautifulSoup) -> str:
        """Extract text content"""
        # Remove unwanted elements
        for element in soup(['script', 'style', 'nav', 'footer', 'header', 'aside']):
            element.decompose()
        
        # Get text from body or main content area
        text_elements = soup.find('body') or soup.find('main') or soup.find('article')
        if text_elements:
            text = text_elements.get_text()
        else:
            text = soup.get_text()
        
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def _extract_metadata(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract metadata from page"""
        metadata = {}
        
        # Description
        desc_meta = soup.find('meta', attrs={'name': 'description'})
        if desc_meta:
            metadata['description'] = desc_meta.get('content', '')
        
        og_desc = soup.find('meta', property='og:description')
        if og_desc:
            metadata['description'] = og_desc.get('content', '')
        
        # Keywords
        keywords_meta = soup.find('meta', attrs={'name': 'keywords'})
        if keywords_meta:
            keywords = keywords_meta.get('content', '')
            metadata['keywords'] = [k.strip() for k in keywords.split(',')]
        
        # Author
        author_meta = soup.find('meta', attrs={'name': 'author'})
        if author_meta:
            metadata['author'] = author_meta.get('content', '')
        
        # Date
        date_meta = soup.find('meta', property='article:published_time')
        if date_meta:
            metadata['date'] = date_meta.get('content', '')
        
        # Language
        html_tag = soup.find('html')
        if html_tag:
            metadata['language'] = html_tag.get('lang', 'en')
        
        return metadata

    def _extract_links(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Extract all links from page"""
        links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            try:
                absolute_url = urljoin(base_url, href)
                links.append(absolute_url)
            except:
                continue
        return list(set(links))  # Remove duplicates

    def _extract_images(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Extract all images from page"""
        images = []
        for img in soup.find_all('img', src=True):
            src = img['src']
            try:
                absolute_url = urljoin(base_url, src)
                images.append(absolute_url)
            except:
                continue
        return list(set(images))  # Remove duplicates

    def _clean_html(self, soup: BeautifulSoup):
        """Clean HTML by removing unwanted elements"""
        # Remove common unwanted elements
        for element in soup(['script', 'style', 'noscript', 'iframe', 'embed', 'object']):
            element.decompose()
        
        # Remove elements with common ad/spam classes
        for element in soup.find_all(class_=re.compile(r'ad|spam|banner')):
            element.decompose()
        
        for element in soup.find_all(id=re.compile(r'ad|spam')):
            element.decompose()
        
        # Remove empty elements
        for element in soup.find_all(['p', 'div', 'span']):
            if not element.get_text(strip=True):
                element.decompose()

    def _find_internal_links(self, 
                           links: List[str], 
                           base_url: str, 
                           allowed_domains: List[str], 
                           exclude_patterns: List[str]) -> List[str]:
        """Find internal links from a list of links"""
        base_domain = urlparse(base_url).netloc
        
        internal_links = []
        for link in links:
            try:
                parsed = urlparse(link)
                
                # Check if it's an internal link
                is_internal = (parsed.netloc == base_domain or 
                             parsed.netloc in allowed_domains)
                
                # Check if it should be excluded
                is_excluded = any(pattern in link or pattern in parsed.path 
                                for pattern in exclude_patterns)
                
                if is_internal and not is_excluded:
                    internal_links.append(link)
                    
            except:
                continue
        
        return internal_links

    def _get_cached_content(self, url: str) -> Optional[ScrapedContent]:
        """Get cached content for URL"""
        url_hash = hashlib.md5(url.encode()).hexdigest()
        cache_file = os.path.join(self.cache_dir, f"cache_{url_hash}.json")
        
        if os.path.exists(cache_file):
            try:
                with open(cache_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    return ScrapedContent(**data)
            except:
                pass
        
        return None

    def _cache_content(self, url: str, content: ScrapedContent):
        """Cache content for URL"""
        url_hash = hashlib.md5(url.encode()).hexdigest()
        cache_file = os.path.join(self.cache_dir, f"cache_{url_hash}.json")
        
        try:
            with open(cache_file, 'w', encoding='utf-8') as f:
                json.dump(content.to_dict(), f, ensure_ascii=False)
        except Exception as e:
            logger.warning(f"Failed to cache content: {str(e)}")

# Convenience functions for easy use
def scrape_page(url: str, **kwargs) -> ScrapedContent:
    """Scrape a single page"""
    scraper = WebScraper()
    return scraper.scrape_page(url, **kwargs)

def scrape_pages(urls: List[str], **kwargs) -> List[ScrapedContent]:
    """Scrape multiple pages"""
    scraper = WebScraper()
    return scraper.scrape_pages(urls, **kwargs)

def scrape_website(base_url: str, **kwargs) -> List[ScrapedContent]:
    """Scrape a website"""
    scraper = WebScraper()
    return scraper.scrape_website(base_url, **kwargs)

def extract_data(url: str, selectors: Dict[str, str]) -> Dict[str, List[str]]:
    """Extract specific data from a page"""
    scraper = WebScraper()
    return scraper.extract_data(url, selectors)

def scrape_rss(rss_url: str) -> List[Dict[str, str]]:
    """Scrape RSS feed"""
    scraper = WebScraper()
    return scraper.scrape_rss(rss_url)

def scrape_api(url: str, **kwargs) -> Any:
    """Scrape API endpoint"""
    scraper = WebScraper()
    return scraper.scrape_api(url, **kwargs) 