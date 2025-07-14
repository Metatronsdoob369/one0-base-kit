# Agent Scraping Toolkit Guide

## Overview

This toolkit provides comprehensive web scraping capabilities for agents to gather information from websites, documents, APIs, and RSS feeds. The toolkit includes both TypeScript and Python implementations with advanced features for respectful and efficient scraping.

## Available Tools

### 1. TypeScript Scraper (`src/lib/scraper.ts`)
- **WebScraper Class**: Main scraping utility
- **Convenience Functions**: Easy-to-use standalone functions
- **TypeScript Interfaces**: Strong typing for scraped content

### 2. Python Scraper (`scraper_tools.py`)
- **WebScraper Class**: Full-featured Python implementation
- **Convenience Functions**: Simple function calls
- **Caching System**: Built-in content caching
- **File Export**: Save scraped content in multiple formats

## Core Capabilities

### 🔍 Basic Page Scraping
```typescript
// TypeScript
import { scrapePage } from './src/lib/scraper';

const content = await scrapePage('https://example.com');
console.log(`Scraped: ${content.title} (${content.metadata.wordCount} words)`);
```

```python
# Python
from scraper_tools import scrape_page

content = scrape_page('https://example.com')
print(f"Scraped: {content.title} ({content.word_count} words)")
```

### 📚 Multiple Page Scraping
```typescript
// TypeScript
import { scrapePages } from './src/lib/scraper';

const urls = ['https://example1.com', 'https://example2.com'];
const results = await scrapePages(urls);
```

```python
# Python
from scraper_tools import scrape_pages

urls = ['https://example1.com', 'https://example2.com']
results = scrape_pages(urls)
```

### 🌐 Website Crawling
```typescript
// TypeScript
import { scrapeWebsite } from './src/lib/scraper';

const results = await scrapeWebsite('https://example.com', {
  maxPages: 20,
  followInternalLinks: true,
  allowedDomains: ['example.com'],
  excludePatterns: ['/admin/', '/private/']
});
```

```python
# Python
from scraper_tools import scrape_website

results = scrape_website(
    'https://example.com',
    max_pages=20,
    follow_internal_links=True,
    allowed_domains=['example.com'],
    exclude_patterns=['/admin/', '/private/']
)
```

### 🎯 Targeted Data Extraction
```typescript
// TypeScript
import { extractData } from './src/lib/scraper';

const selectors = {
  titles: 'h1, h2, h3',
  prices: '.price',
  descriptions: '.product-description'
};

const data = await extractData('https://example.com', selectors);
```

```python
# Python
from scraper_tools import extract_data

selectors = {
    'titles': 'h1, h2, h3',
    'prices': '.price',
    'descriptions': '.product-description'
}

data = extract_data('https://example.com', selectors)
```

### 📡 RSS Feed Scraping
```typescript
// TypeScript
import { scrapeRSS } from './src/lib/scraper';

const feed = await scrapeRSS('https://example.com/feed.xml');
feed.forEach(item => console.log(item.title));
```

```python
# Python
from scraper_tools import scrape_rss

feed = scrape_rss('https://example.com/feed.xml')
for item in feed:
    print(item['title'])
```

### 🔌 API Scraping
```typescript
// TypeScript
import { scrapeAPI } from './src/lib/scraper';

const data = await scrapeAPI('https://api.example.com/data');
```

```python
# Python
from scraper_tools import scrape_api

data = scrape_api('https://api.example.com/data')
```

## Advanced Features

### 🔧 Custom Configuration
```typescript
// TypeScript
import { WebScraper } from './src/lib/scraper';

const scraper = new WebScraper({
  timeout: 60000,
  maxRetries: 5,
  delay: 2000,
  headers: {
    'User-Agent': 'CustomBot/1.0',
    'Authorization': 'Bearer token'
  }
});
```

```python
# Python
from scraper_tools import WebScraper

scraper = WebScraper(
    timeout=60,
    max_retries=5,
    delay=2.0,
    user_agent='CustomBot/1.0'
)
```

### 💾 Content Caching (Python Only)
```python
# Python
from scraper_tools import WebScraper

scraper = WebScraper()
content = scraper.scrape_page('https://example.com', use_cache=True)
```

### 📁 File Export (Python Only)
```python
# Python
from scraper_tools import scrape_page

content = scrape_page('https://example.com')

# Save as JSON
scraper.save_to_file(content, 'output.json', 'json')

# Save as text
scraper.save_to_file(content, 'output.txt', 'txt')

# Save as HTML
scraper.save_to_file(content, 'output.html', 'html')
```

## Agent Use Cases

### 1. Research and Information Gathering
```python
# Research a topic across multiple sources
from scraper_tools import scrape_pages

research_urls = [
    'https://wikipedia.org/wiki/Topic',
    'https://scholar.google.com/...',
    'https://research-paper-site.com/...'
]

research_data = scrape_pages(research_urls, extract_text=True, clean_html=True)
```

### 2. Content Monitoring
```python
# Monitor RSS feeds for updates
from scraper_tools import scrape_rss

feeds = [
    'https://blog.example.com/feed',
    'https://news.example.com/rss',
    'https://updates.example.com/feed'
]

for feed_url in feeds:
    items = scrape_rss(feed_url)
    for item in items:
        print(f"New: {item['title']} - {item['link']}")
```

### 3. Data Collection for Analysis
```python
# Collect structured data from e-commerce sites
from scraper_tools import extract_data

selectors = {
    'product_names': '.product-name',
    'prices': '.product-price',
    'ratings': '.product-rating',
    'reviews': '.product-review'
}

data = extract_data('https://shop.example.com', selectors)
```

### 4. Document Processing
```python
# Process documentation sites
from scraper_tools import scrape_website

docs = scrape_website(
    'https://docs.example.com',
    max_pages=50,
    follow_internal_links=True,
    exclude_patterns=['/api/', '/examples/']
)

# Save all documentation
for doc in docs:
    scraper.save_to_file(doc, f"docs/{doc.title[:50]}.txt", 'txt')
```

## Best Practices for Agents

### 1. Respectful Scraping
- Always use delays between requests
- Respect robots.txt files
- Use appropriate User-Agent headers
- Don't overwhelm servers

### 2. Error Handling
```python
try:
    content = scrape_page(url)
except Exception as e:
    print(f"Failed to scrape {url}: {e}")
    # Continue with other tasks
```

### 3. Content Validation
```python
content = scrape_page(url)
if content.word_count < 100:
    print("Warning: Very little content found")
if not content.title:
    print("Warning: No title found")
```

### 4. Rate Limiting
```python
# Use built-in delays
scraper = WebScraper(delay=2.0)  # 2 second delay between requests

# Or implement custom rate limiting
import time
for url in urls:
    content = scrape_page(url)
    time.sleep(5)  # 5 second delay
```

## Integration with PATHsassin Skills

### Learning Content Scraping
```python
# Scrape learning materials for skill development
from scraper_tools import scrape_website
from learning_tools import LearningTools

learning_tools = LearningTools()

# Scrape documentation for n8n automation
n8n_docs = scrape_website(
    'https://docs.n8n.io',
    max_pages=30,
    follow_internal_links=True
)

# Add scraped content to reading list
for doc in n8n_docs:
    learning_tools.manage_reading_list(
        action='add',
        skill_id='5',  # n8n Architecture
        book_title=doc.title,
        status='reference'
    )
```

### Cross-Domain Research
```python
# Research connections between different skill domains
from scraper_tools import scrape_pages

# Research stoicism and leadership connections
research_urls = [
    'https://philosophy-site.com/stoicism-leadership',
    'https://business-site.com/stoic-leaders',
    'https://research-site.com/emotional-control-management'
]

research_data = scrape_pages(research_urls)

# Analyze connections
for content in research_data:
    if 'stoicism' in content.content.lower() and 'leadership' in content.content.lower():
        print(f"Found connection: {content.title}")
```

## Security Considerations

### 1. Input Validation
```python
import re
from urllib.parse import urlparse

def validate_url(url):
    parsed = urlparse(url)
    if parsed.scheme not in ['http', 'https']:
        raise ValueError("Only HTTP/HTTPS URLs allowed")
    return url
```

### 2. Content Sanitization
```python
import html

def sanitize_content(content):
    # Decode HTML entities
    content = html.unescape(content)
    # Remove potentially dangerous content
    content = re.sub(r'<script.*?</script>', '', content, flags=re.DOTALL)
    return content
```

### 3. Access Control
```python
# Only scrape allowed domains
ALLOWED_DOMAINS = ['example.com', 'trusted-site.com']

def is_allowed_domain(url):
    domain = urlparse(url).netloc
    return domain in ALLOWED_DOMAINS
```

## Troubleshooting

### Common Issues

1. **Timeout Errors**
   - Increase timeout value
   - Check network connectivity
   - Verify URL is accessible

2. **Blocked Requests**
   - Change User-Agent
   - Add delays between requests
   - Use proxy if necessary

3. **Empty Content**
   - Check if site uses JavaScript
   - Verify CSS selectors
   - Try different content extraction methods

### Debug Mode
```python
import logging

# Enable debug logging
logging.basicConfig(level=logging.DEBUG)

# Scrape with detailed logging
content = scrape_page('https://example.com')
```

## Performance Optimization

### 1. Parallel Processing
```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def scrape_multiple_parallel(urls):
    with ThreadPoolExecutor(max_workers=5) as executor:
        loop = asyncio.get_event_loop()
        tasks = [loop.run_in_executor(executor, scrape_page, url) for url in urls]
        return await asyncio.gather(*tasks)
```

### 2. Caching Strategy
```python
# Use caching for frequently accessed content
scraper = WebScraper()
content = scraper.scrape_page(url, use_cache=True)
```

### 3. Selective Scraping
```python
# Only extract needed content
content = scrape_page(url, 
    extract_text=True,
    extract_links=False,  # Skip if not needed
    extract_images=False  # Skip if not needed
)
```

## Conclusion

This scraping toolkit provides agents with powerful, respectful, and efficient web scraping capabilities. By following the best practices outlined in this guide, agents can gather valuable information while being good web citizens.

Remember to always respect website terms of service and robots.txt files, and use the tools responsibly for legitimate purposes. 