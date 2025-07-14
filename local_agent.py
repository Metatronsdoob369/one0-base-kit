#!/usr/bin/env python3
"""
Local Agent System for PATHsassin Master Skills Index
Integrates with local LLM (Ollama) and existing learning tools
"""

import asyncio
import json
import requests
from typing import Dict, List, Optional, Any
from datetime import datetime
import os
from scraper_tools import WebScraper, scrape_page
# from learning_tools import LearningTools  # Commented out for now

class PATHsassinAgent:
    """Local agent for PATHsassin learning system"""
    
    def __init__(self, model_name: str = "llama3.1:8b"):
        self.model_name = model_name
        self.ollama_url = "http://localhost:11434"
        self.scraper = WebScraper(
            timeout=30,
            max_retries=3,
            delay=2.0,
            user_agent='PATHsassinAgent/1.0'
        )
        # self.learning_tools = LearningTools()  # Commented out for now
        self.learning_tools = None
        
        # Agent personality and capabilities
        self.system_prompt = """You are PATHsassin, a specialized learning agent for the Master Skills Index. 
        You help users develop mastery across 13 core skills in three domains:
        
        OUTER SKILLS: Stoicism & Resilience, Leadership & Team Building, Motivation & Influence, Executive Growth & Strategic Vision
        MIDDLE SKILLS: N8N Architecture & Intelligent Automation, Web Design, Graphic Design, Mentorship & Coaching  
        INNER SKILLS: Language & World Wisdom, International Business, Global Finance & Infrastructure, Government Policy & Geopolitics, Theosophy & Comparative Religion
        
        Your capabilities:
        - Analyze skill connections and synthesis opportunities
        - Recommend learning resources and reading materials
        - Track progress and suggest next steps
        - Research topics and gather information
        - Provide personalized learning guidance
        
        Always be encouraging, insightful, and focused on helping users achieve mastery through interweaving knowledge across domains."""
    
    def _get_skills_data(self) -> Dict[str, Any]:
        """Get skills data with additional information"""
        skills_data = {}
        skills_index = {
            "1": {"name": "Stoicism & Resilience", "domain": "outer"},
            "2": {"name": "Leadership & Team Building", "domain": "outer"},
            "3": {"name": "Motivation & Influence", "domain": "outer"},
            "4": {"name": "Executive Growth & Strategic Vision", "domain": "outer"},
            "5": {"name": "n8n Architecture & Intelligent Automation", "domain": "middle"},
            "6": {"name": "Web Design: HTML/CSS & Modern Architecture", "domain": "middle"},
            "7": {"name": "Graphic Design", "domain": "middle"},
            "8": {"name": "Mentorship & Coaching", "domain": "middle"},
            "9": {"name": "Language & World Wisdom", "domain": "inner"},
            "10": {"name": "International Business", "domain": "inner"},
            "11": {"name": "Global Finance & Infrastructure", "domain": "inner"},
            "12": {"name": "Government, Policy & Geopolitics", "domain": "inner"},
            "13": {"name": "Theosophy, Occult, and Comparative Religion", "domain": "inner"}
        }
        
        for skill_id, skill in skills_index.items():
            skills_data[skill_id] = {
                'name': skill['name'],
                'domain': skill['domain'],
                'progress': 50,  # Default progress
                'level': 'Intermediate',  # Default level
                'description': self._get_skill_description(skill_id),
                'connections': self._get_skill_connections(skill_id),
                'literature': self._get_skill_literature(skill_id),
                'subskills': self._get_skill_subskills(skill_id)
            }
        
        return skills_data
    
    def _get_skill_description(self, skill_id: str) -> str:
        """Get skill description"""
        descriptions = {
            "1": "Mental resilience and emotional control through ancient wisdom",
            "2": "Leading teams and building organizations through vision and collaboration",
            "3": "Inspiring and influencing others through storytelling and values alignment",
            "4": "Strategic thinking and executive skills for organizational leadership",
            "5": "Workflow automation and system integration for business efficiency",
            "6": "Web development and digital architecture for modern applications",
            "7": "Visual communication and aesthetics for effective design",
            "8": "Teaching and guiding others through effective mentorship",
            "9": "Cross-cultural communication and wisdom from world traditions",
            "10": "Global commerce and relationships across cultures and markets",
            "11": "Economic and financial systems understanding for global perspective",
            "12": "Political systems and global dynamics for strategic understanding",
            "13": "Spiritual understanding and mystical insight from world traditions"
        }
        return descriptions.get(skill_id, "No description available")
    
    def _get_skill_connections(self, skill_id: str) -> List[str]:
        """Get skill connections"""
        connections = {
            "1": ["2", "3", "8"],  # Stoicism connects to Leadership, Motivation, Mentorship
            "2": ["1", "3", "8", "4"],  # Leadership connects to Stoicism, Motivation, Mentorship, Executive
            "3": ["1", "2", "8"],  # Motivation connects to Stoicism, Leadership, Mentorship
            "4": ["2", "5", "10", "12"],  # Executive connects to Leadership, N8N, Business, Government
            "5": ["4", "6", "7"],  # N8N connects to Executive, Web Design, Graphic Design
            "6": ["5", "7", "8"],  # Web Design connects to N8N, Graphic Design, Mentorship
            "7": ["5", "6", "8"],  # Graphic Design connects to N8N, Web Design, Mentorship
            "8": ["1", "2", "3", "6", "7"],  # Mentorship connects to many skills
            "9": ["10", "11", "12", "13"],  # Language connects to Business, Finance, Government, Theosophy
            "10": ["4", "9", "11", "12"],  # Business connects to Executive, Language, Finance, Government
            "11": ["4", "9", "10", "12"],  # Finance connects to Executive, Language, Business, Government
            "12": ["4", "9", "10", "11", "13"],  # Government connects to many skills
            "13": ["9", "12"]  # Theosophy connects to Language, Government
        }
        return connections.get(skill_id, [])
    
    def _get_skill_literature(self, skill_id: str) -> List[str]:
        """Get skill literature"""
        literature = {
            "1": ["Meditations (Marcus Aurelius)", "Letters from a Stoic (Seneca)"],
            "2": ["Start With Why (Simon Sinek)", "Team of Teams (Gen. Stanley McChrystal)"],
            "3": ["Awaken the Giant Within (Tony Robbins)", "Grit (Angela Duckworth)"],
            "4": ["Zero to One (Peter Thiel)", "Principles (Ray Dalio)"],
            "5": ["n8n Documentation", "The Phoenix Project (Gene Kim)"],
            "6": ["HTML & CSS: Design and Build Websites (Jon Duckett)", "CSS Secrets (Lea Verou)"],
            "7": ["The Elements of Typographic Style (Robert Bringhurst)", "Logo Modernism (Jens Müller)"],
            "8": ["The Trillion Dollar Coach (Bill Campbell)", "The Art of Mentoring (Mike Pegg)"],
            "9": ["The Art of War (Sun Tzu)", "Analects (Confucius)"],
            "10": ["Getting to Yes (Fisher & Ury)", "The Culture Map (Erin Meyer)"],
            "11": ["The Ascent of Money (Niall Ferguson)", "Lords of Finance (Liaquat Ahamed)"],
            "12": ["The Republic (Plato)", "Democracy in America (de Tocqueville)"],
            "13": ["The Secret Doctrine (Helena Blavatsky)", "The Secret Teachings of All Ages (Manly P. Hall)"]
        }
        return literature.get(skill_id, [])
    
    def _get_skill_subskills(self, skill_id: str) -> List[str]:
        """Get skill subskills"""
        subskills = {
            "1": ["Emotional regulation", "Perspective-shifting", "Adversity endurance"],
            "2": ["Vision casting", "Delegation", "Conflict resolution"],
            "3": ["Storytelling", "Values alignment", "Resilience building"],
            "4": ["Foresight", "Pathfinding", "Leverage"],
            "5": ["Workflow design", "System integration", "Agent delegation"],
            "6": ["Semantic markup", "Responsive design", "Accessibility"],
            "7": ["Branding", "Typography", "Grid systems"],
            "8": ["Socratic questioning", "Feedback", "Safe space creation"],
            "9": ["Textual analysis", "Cross-cultural communication", "Translation"],
            "10": ["Market analysis", "Cross-cultural negotiation", "Regulatory compliance"],
            "11": ["Financial history", "Market mechanics", "Crisis analysis"],
            "12": ["Forms of government", "Comparative systems", "Law"],
            "13": ["Symbol interpretation", "Parable decoding", "Mystical synthesis"]
        }
        return subskills.get(skill_id, [])
    
    def test_connection(self) -> bool:
        """Test if Ollama is running and accessible"""
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def generate_response(self, prompt: str, context: str = "") -> str:
        """Generate response using local LLM"""
        try:
            full_prompt = f"{self.system_prompt}\n\nContext: {context}\n\nUser: {prompt}\n\nPATHsassin:"
            
            payload = {
                "model": self.model_name,
                "prompt": full_prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "max_tokens": 1000
                }
            }
            
            response = requests.post(
                f"{self.ollama_url}/api/generate",
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get('response', 'I apologize, but I encountered an issue generating a response.')
            else:
                return f"Error: {response.status_code} - {response.text}"
                
        except Exception as e:
            return f"Connection error: {str(e)}"
    
    def analyze_skill_connections(self, skill_id: str) -> str:
        """Analyze connections between skills for synthesis opportunities"""
        skills_data = self._get_skills_data()
        
        if skill_id not in skills_data:
            return "Skill not found."
        
        skill = skills_data[skill_id]
        connections = skill.get('connections', [])
        
        connected_skills = []
        for conn_id in connections:
            if conn_id in skills_data:
                connected_skills.append(skills_data[conn_id])
        
        context = f"""
        Analyzing skill: {skill['name']} ({skill['domain']})
        Description: {skill.get('description', 'No description available')}
        Current progress: {skill.get('progress', 0)}%
        Level: {skill.get('level', 'Unknown')}
        
        Connected skills: {[s['name'] for s in connected_skills]}
        """
        
        prompt = f"""
        Analyze the synthesis opportunities for {skill['name']}. 
        How does mastery in this skill create interweaving connections with other skills?
        What emergent understanding emerges when this skill is combined with its connections?
        Provide specific insights about how this skill builds upon and enhances other areas of knowledge.
        """
        
        return self.generate_response(prompt, context)
    
    def recommend_learning_path(self, skill_id: str) -> str:
        """Recommend a personalized learning path for a skill"""
        skills_data = self._get_skills_data()
        
        if skill_id not in skills_data:
            return "Skill not found."
        
        skill = skills_data[skill_id]
        
        context = f"""
        Skill: {skill['name']}
        Domain: {skill['domain']}
        Current progress: {skill['progress']}%
        Level: {skill['level']}
        Literature: {skill.get('literature', [])}
        Subskills: {skill.get('subskills', [])}
        """
        
        prompt = f"""
        Create a personalized learning path for {skill['name']} at {skill['level']} level with {skill['progress']}% progress.
        Consider the current literature and subskills.
        What should be the next steps for advancement?
        How can this skill be developed in conjunction with related skills?
        Provide specific, actionable recommendations.
        """
        
        return self.generate_response(prompt, context)
    
    def research_topic(self, topic: str, skill_context: str = "") -> str:
        """Research a topic and integrate it with PATHsassin learning"""
        try:
            # Try to scrape information about the topic
            search_urls = [
                f"https://en.wikipedia.org/wiki/{topic.replace(' ', '_')}",
                f"https://www.britannica.com/search?query={topic}",
            ]
            
            scraped_content = ""
            for url in search_urls:
                try:
                    content = scrape_page(url)
                    if content and content.title:
                        scraped_content += f"\n{content.title}: {content.content[:500]}..."
                except:
                    continue
            
            context = f"""
            Researching topic: {topic}
            Skill context: {skill_context}
            Available information: {scraped_content[:1000]}
            """
            
            prompt = f"""
            Research and analyze '{topic}' in the context of PATHsassin learning.
            How does this topic relate to the 13 core skills?
            What insights can be drawn for skill development?
            How might this knowledge create synthesis opportunities across domains?
            Provide a comprehensive analysis with actionable insights.
            """
            
            return self.generate_response(prompt, context)
            
        except Exception as e:
            return f"Research error: {str(e)}"
    
    def assess_mastery_level(self, skill_id: str) -> str:
        """Assess current mastery level and suggest improvements"""
        skills_data = self._get_skills_data()
        
        if skill_id not in skills_data:
            return "Skill not found."
        
        skill = skills_data[skill_id]
        
        context = f"""
        Skill assessment for: {skill['name']}
        Current progress: {skill['progress']}%
        Level: {skill['level']}
        Subskills: {skill.get('subskills', [])}
        Literature: {skill.get('literature', [])}
        """
        
        prompt = f"""
        Assess the mastery level of {skill['name']} at {skill['progress']}% progress.
        What does this progress level indicate about current capabilities?
        What are the gaps that need to be addressed?
        How can the user advance to the next level?
        Provide specific, measurable recommendations for improvement.
        """
        
        return self.generate_response(prompt, context)
    
    def generate_synthesis_insights(self) -> str:
        """Generate insights about skill synthesis and interweaving"""
        skills_data = self._get_skills_data()
        
        # Find mastered skills (assuming >80% progress indicates mastery)
        mastered_skills = [s for s in skills_data.values() if s['progress'] > 80]
        
        context = f"""
        Mastered skills: {[s['name'] for s in mastered_skills]}
        Total skills: {len(skills_data)}
        Skill domains: Outer, Middle, Inner
        """
        
        prompt = f"""
        Analyze the synthesis opportunities across the mastered skills.
        What emergent understanding is possible through the interweaving of these skills?
        How do these skills create a foundation for advanced learning?
        What new capabilities emerge from the combination of these mastered areas?
        Provide deep insights about knowledge synthesis and cross-domain mastery.
        """
        
        return self.generate_response(prompt, context)
    
    def interactive_session(self):
        """Start an interactive session with the agent"""
        print("🤖 PATHsassin Agent Initialized")
        print("=" * 50)
        
        if not self.test_connection():
            print("❌ Error: Ollama not running. Please start Ollama first.")
            return
        
        print("✅ Connected to local LLM")
        print("\nAvailable commands:")
        print("- analyze <skill_id> - Analyze skill connections")
        print("- recommend <skill_id> - Get learning recommendations") 
        print("- research <topic> - Research a topic")
        print("- assess <skill_id> - Assess mastery level")
        print("- synthesis - Generate synthesis insights")
        print("- quit - Exit session")
        print("=" * 50)
        
        while True:
            try:
                user_input = input("\n🎯 PATHsassin Agent > ").strip()
                
                if user_input.lower() == 'quit':
                    print("👋 Goodbye! Keep pursuing mastery!")
                    break
                
                if user_input.startswith('analyze '):
                    skill_id = user_input[8:].strip()
                    print("\n🔍 Analyzing skill connections...")
                    response = self.analyze_skill_connections(skill_id)
                    print(response)
                
                elif user_input.startswith('recommend '):
                    skill_id = user_input[11:].strip()
                    print("\n📚 Generating learning recommendations...")
                    response = self.recommend_learning_path(skill_id)
                    print(response)
                
                elif user_input.startswith('research '):
                    topic = user_input[9:].strip()
                    print(f"\n🔬 Researching '{topic}'...")
                    response = self.research_topic(topic)
                    print(response)
                
                elif user_input.startswith('assess '):
                    skill_id = user_input[7:].strip()
                    print("\n📊 Assessing mastery level...")
                    response = self.assess_mastery_level(skill_id)
                    print(response)
                
                elif user_input.lower() == 'synthesis':
                    print("\n🧠 Generating synthesis insights...")
                    response = self.generate_synthesis_insights()
                    print(response)
                
                else:
                    print("❓ Unknown command. Type 'quit' to exit.")
                    
            except KeyboardInterrupt:
                print("\n👋 Session interrupted. Goodbye!")
                break
            except Exception as e:
                print(f"❌ Error: {str(e)}")

def main():
    """Main function to run the agent"""
    agent = PATHsassinAgent()
    agent.interactive_session()

if __name__ == "__main__":
    main() 