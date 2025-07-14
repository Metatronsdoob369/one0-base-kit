#!/usr/bin/env python3
"""
Example script demonstrating how an agent can use the scraping tools
for various tasks in the PATHsassin Master Skills Index context.
"""

import asyncio
import json
from datetime import datetime
from scraper_tools import WebScraper, scrape_page, scrape_pages, scrape_rss, extract_data
from learning_tools import LearningTools

class AgentScrapingExample:
    """Example class showing how an agent can use scraping tools"""
    
    def __init__(self):
        self.scraper = WebScraper(
            timeout=30,
            max_retries=3,
            delay=2.0,
            user_agent='PATHsassinAgent/1.0'
        )
        self.learning_tools = LearningTools()
    
    def research_skill_topic(self, skill_id: str, topic: str):
        """Research a specific topic for skill development"""
        print(f"🔍 Researching '{topic}' for skill {skill_id}")
        
        # Example research URLs (in practice, these would be discovered dynamically)
        research_urls = [
            f"https://wikipedia.org/wiki/{topic.replace(' ', '_')}",
            f"https://medium.com/search?q={topic}",
            f"https://dev.to/search?q={topic}"
        ]
        
        try:
            results = scrape_pages(research_urls, extract_text=True, clean_html=True)
            
            for result in results:
                if result.word_count > 100:  # Only meaningful content
                    print(f"📄 Found: {result.title} ({result.word_count} words)")
                    
                    # Add to learning tools if relevant
                    if self._is_relevant_to_skill(result.content, skill_id):
                        self.learning_tools.manage_reading_list(
                            action='add',
                            skill_id=skill_id,
                            book_title=result.title,
                            status='reference'
                        )
                        print(f"✅ Added to learning list for skill {skill_id}")
            
            return results
            
        except Exception as e:
            print(f"❌ Research failed: {e}")
            return []
    
    def monitor_learning_feeds(self, skill_id: str):
        """Monitor RSS feeds for learning content"""
        print(f"📡 Monitoring learning feeds for skill {skill_id}")
        
        # Example RSS feeds for different skills
        skill_feeds = {
            "5": ["https://n8n.io/blog/feed", "https://automation.blog/feed"],  # n8n
            "6": ["https://css-tricks.com/feed", "https://web.dev/feed"],       # Web Design
            "1": ["https://dailystoic.com/feed", "https://philosophy.blog/feed"] # Stoicism
        }
        
        feeds = skill_feeds.get(skill_id, [])
        
        for feed_url in feeds:
            try:
                items = scrape_rss(feed_url)
                print(f"📰 Found {len(items)} items in {feed_url}")
                
                for item in items:
                    if self._is_relevant_to_skill(item['description'], skill_id):
                        print(f"🎯 Relevant: {item['title']}")
                        # Could add to learning list or notify user
                        
            except Exception as e:
                print(f"❌ Failed to scrape feed {feed_url}: {e}")
    
    def extract_structured_data(self, url: str, skill_context: str):
        """Extract structured data from a webpage"""
        print(f"🎯 Extracting structured data from {url}")
        
        # Define selectors based on skill context
        selectors = {
            "tutorial": {
                "steps": ".tutorial-step, .step, .instruction",
                "code_blocks": "pre code, .code-block",
                "tips": ".tip, .note, .warning"
            },
            "documentation": {
                "sections": "h1, h2, h3",
                "code_examples": "pre, .example",
                "parameters": ".param, .parameter"
            },
            "article": {
                "headings": "h1, h2, h3, h4",
                "quotes": "blockquote, .quote",
                "key_points": ".key-point, .highlight"
            }
        }
        
        context_selectors = selectors.get(skill_context, selectors["article"])
        
        try:
            data = extract_data(url, context_selectors)
            
            print(f"📊 Extracted data:")
            for key, values in data.items():
                if values:
                    print(f"  {key}: {len(values)} items")
                    for i, value in enumerate(values[:3]):  # Show first 3
                        print(f"    {i+1}. {value[:100]}...")
            
            return data
            
        except Exception as e:
            print(f"❌ Data extraction failed: {e}")
            return {}
    
    def crawl_learning_site(self, base_url: str, skill_id: str, max_pages: int = 10):
        """Crawl a learning site for relevant content"""
        print(f"🕷️ Crawling {base_url} for skill {skill_id} content")
        
        try:
            results = self.scraper.scrape_website(
                base_url,
                max_pages=max_pages,
                follow_internal_links=True,
                extract_text=True,
                clean_html=True
            )
            
            relevant_content = []
            for result in results:
                if self._is_relevant_to_skill(result.content, skill_id):
                    relevant_content.append(result)
                    print(f"📚 Relevant: {result.title}")
                    
                    # Save relevant content
                    filename = f"skill_{skill_id}_{result.title[:30].replace(' ', '_')}.txt"
                    self.scraper.save_to_file(result, filename, 'txt')
            
            print(f"✅ Found {len(relevant_content)} relevant pages out of {len(results)} total")
            return relevant_content
            
        except Exception as e:
            print(f"❌ Crawling failed: {e}")
            return []
    
    def analyze_skill_connections(self, skill_id: str):
        """Analyze connections between skills by scraping related content"""
        print(f"🔗 Analyzing connections for skill {skill_id}")
        
        skill_name = self.learning_tools.skills_index[skill_id]["name"]
        
        # Search for content that connects this skill to others
        connection_urls = [
            f"https://medium.com/search?q={skill_name}%20leadership",
            f"https://dev.to/search?q={skill_name}%20automation",
            f"https://wikipedia.org/wiki/{skill_name.replace(' ', '_')}"
        ]
        
        try:
            results = scrape_pages(connection_urls, extract_text=True)
            
            connections = []
            for result in results:
                # Look for mentions of other skills
                for other_id, other_skill in self.learning_tools.skills_index.items():
                    if other_id != skill_id:
                        if other_skill["name"].lower() in result.content.lower():
                            connection = {
                                "source_skill": skill_name,
                                "target_skill": other_skill["name"],
                                "content_title": result.title,
                                "url": result.url
                            }
                            connections.append(connection)
                            print(f"🔗 Found connection: {skill_name} → {other_skill['name']}")
            
            return connections
            
        except Exception as e:
            print(f"❌ Connection analysis failed: {e}")
            return []
    
    def _is_relevant_to_skill(self, content: str, skill_id: str) -> bool:
        """Check if content is relevant to a specific skill"""
        skill = self.learning_tools.skills_index[skill_id]
        skill_keywords = skill["name"].lower().split()
        
        content_lower = content.lower()
        
        # Check if skill keywords appear in content
        keyword_matches = sum(1 for keyword in skill_keywords if keyword in content_lower)
        
        # Content is relevant if at least 2 keywords match
        return keyword_matches >= 2
    
    def generate_learning_report(self, skill_id: str):
        """Generate a comprehensive learning report using scraped data"""
        print(f"📋 Generating learning report for skill {skill_id}")
        
        skill = self.learning_tools.skills_index[skill_id]
        
        report = {
            "skill_name": skill["name"],
            "domain": skill["domain"],
            "generated_at": datetime.now().isoformat(),
            "research_sources": [],
            "learning_materials": [],
            "connections": [],
            "recommendations": []
        }
        
        # Research current topics
        research_results = self.research_skill_topic(skill_id, skill["name"])
        report["research_sources"] = [r.title for r in research_results]
        
        # Find skill connections
        connections = self.analyze_skill_connections(skill_id)
        report["connections"] = connections
        
        # Generate recommendations
        if research_results:
            report["recommendations"].append("Focus on practical application of concepts")
        if connections:
            report["recommendations"].append("Explore cross-domain connections")
        
        # Save report
        report_filename = f"learning_report_skill_{skill_id}_{datetime.now().strftime('%Y%m%d')}.json"
        with open(report_filename, 'w') as f:
            json.dump(report, f, indent=2)
        
        print(f"✅ Learning report saved to {report_filename}")
        return report

def main():
    """Main example function"""
    print("🤖 PATHsassin Agent Scraping Example")
    print("=" * 50)
    
    agent = AgentScrapingExample()
    
    # Example 1: Research a specific skill
    print("\n1. Researching Stoicism & Resilience...")
    agent.research_skill_topic("1", "stoicism leadership")
    
    # Example 2: Monitor learning feeds
    print("\n2. Monitoring n8n learning feeds...")
    agent.monitor_learning_feeds("5")
    
    # Example 3: Extract structured data
    print("\n3. Extracting tutorial data...")
    agent.extract_structured_data("https://example-tutorial-site.com", "tutorial")
    
    # Example 4: Analyze skill connections
    print("\n4. Analyzing skill connections...")
    agent.analyze_skill_connections("1")
    
    # Example 5: Generate learning report
    print("\n5. Generating learning report...")
    agent.generate_learning_report("1")
    
    print("\n✅ Agent scraping examples completed!")

if __name__ == "__main__":
    main() 