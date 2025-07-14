import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

class LearningTools:
    """Additional learning tools for PATH_sassin Master Skills Index"""
    
    def __init__(self):
        self.db = firestore.client()
        self.skills_index = {
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

    def manage_reading_list(self, action: str, skill_id: str = None, book_title: str = None, status: str = "to_read") -> str:
        """Manage reading list for skill development"""
        valid_actions = ["add", "remove", "update", "list", "recommend"]
        valid_statuses = ["to_read", "reading", "completed", "reference"]
        
        if action not in valid_actions:
            return f"Error: Invalid action. Use one of: {', '.join(valid_actions)}"
        
        if action == "list":
            return self._get_reading_list(skill_id)
        elif action == "recommend":
            return self._get_reading_recommendations(skill_id)
        elif action == "add":
            if not skill_id or not book_title:
                return "Error: skill_id and book_title required for add action"
            return self._add_book_to_list(skill_id, book_title, status)
        elif action == "remove":
            if not skill_id or not book_title:
                return "Error: skill_id and book_title required for remove action"
            return self._remove_book_from_list(skill_id, book_title)
        elif action == "update":
            if not skill_id or not book_title or status not in valid_statuses:
                return f"Error: skill_id, book_title, and valid status required for update action"
            return self._update_book_status(skill_id, book_title, status)
        
        return "Error: Invalid action"

    def find_cross_domain_connections(self, skill_id: str = None, connection_type: str = "all") -> str:
        """Find connections between different skill domains"""
        if skill_id and skill_id not in self.skills_index:
            return f"Error: Skill ID {skill_id} not found"
        
        connections = {
            "stoicism_to_leadership": {
                "description": "Stoic principles of emotional control directly enhance leadership effectiveness",
                "examples": ["Marcus Aurelius as emperor", "Seneca's influence on Nero", "Epictetus' impact on Roman society"],
                "practical_applications": ["Using stoic calm in crisis management", "Applying virtue ethics to team decisions"]
            },
            "leadership_to_mentorship": {
                "description": "Leadership skills form the foundation for effective mentorship",
                "examples": ["Steve Jobs mentoring at Apple", "Warren Buffett's investment in people"],
                "practical_applications": ["Delegation techniques in coaching", "Vision casting for mentee development"]
            },
            "technical_to_business": {
                "description": "Technical skills enable business innovation and automation",
                "examples": ["Elon Musk's engineering background", "Bill Gates' programming expertise"],
                "practical_applications": ["Automating business processes", "Technical due diligence in investments"]
            },
            "language_to_international": {
                "description": "Language skills enable deeper international business relationships",
                "examples": ["Confucian principles in Asian business", "Greek philosophy in Western thought"],
                "practical_applications": ["Cross-cultural negotiation", "International market entry"]
            },
            "finance_to_geopolitics": {
                "description": "Understanding finance reveals the underlying forces of global politics",
                "examples": ["Gold standard's impact on world wars", "Petrodollar system"],
                "practical_applications": ["Geopolitical risk assessment", "Currency strategy in international business"]
            },
            "theosophy_to_all": {
                "description": "Mystical understanding provides deeper insight into all human endeavors",
                "examples": ["Jung's psychology in business", "Hermetic principles in science"],
                "practical_applications": ["Symbolic thinking in branding", "Archetypal patterns in leadership"]
            }
        }
        
        if skill_id:
            skill_name = self.skills_index[skill_id]["name"]
            relevant_connections = []
            
            for key, connection in connections.items():
                if skill_name.lower() in key or any(word in skill_name.lower() for word in key.split('_to_')):
                    relevant_connections.append(f"**{key.replace('_', ' ').title()}:** {connection['description']}")
            
            if relevant_connections:
                return f"## Cross-Domain Connections for {skill_name}\n\n" + "\n\n".join(relevant_connections)
            else:
                return f"No specific cross-domain connections found for {skill_name}"
        
        # Return all connections
        result = "# Cross-Domain Connections in PATH_sassin Master Skills Index\n\n"
        for key, connection in connections.items():
            result += f"## {key.replace('_', ' ').title()}\n"
            result += f"**Description:** {connection['description']}\n\n"
            result += f"**Examples:** {', '.join(connection['examples'])}\n\n"
            result += f"**Practical Applications:** {', '.join(connection['practical_applications'])}\n\n"
        
        return result

    def assess_mastery_level(self, skill_id: str, assessment_type: str = "comprehensive") -> str:
        """Assess mastery level in a specific skill area"""
        if skill_id not in self.skills_index:
            return f"Error: Skill ID {skill_id} not found"
        
        skill = self.skills_index[skill_id]
        
        # Get historical data
        activities = self._get_skill_activities(skill_id)
        
        assessment = f"# Mastery Assessment: {skill['name']}\n\n"
        assessment += f"**Domain:** {skill['domain'].title()}\n"
        assessment += f"**Assessment Type:** {assessment_type.title()}\n\n"
        
        if assessment_type == "comprehensive":
            assessment += self._comprehensive_assessment(skill_id, activities)
        elif assessment_type == "quick":
            assessment += self._quick_assessment(skill_id, activities)
        elif assessment_type == "practical":
            assessment += self._practical_assessment(skill_id, activities)
        else:
            assessment += self._comprehensive_assessment(skill_id, activities)
        
        return assessment

    def generate_learning_path(self, current_skill: str = None, focus_area: str = "progressive") -> str:
        """Generate a personalized learning path"""
        if focus_area == "progressive":
            return self._generate_progressive_path(current_skill)
        elif focus_area == "jump":
            return self._generate_jump_path(current_skill)
        elif focus_area == "domain":
            return self._generate_domain_path(current_skill)
        else:
            return self._generate_progressive_path(current_skill)

    def _get_reading_list(self, skill_id: str = None) -> str:
        """Get current reading list"""
        try:
            if skill_id:
                query = self.db.collection('reading_list').where('skill_id', '==', skill_id)
            else:
                query = self.db.collection('reading_list')
            
            docs = query.stream()
            books = []
            
            for doc in docs:
                book_data = doc.to_dict()
                books.append(f"- **{book_data.get('title', 'Unknown')}** ({book_data.get('status', 'unknown')})")
            
            if not books:
                return "No books found in reading list."
            
            return "## Reading List\n\n" + "\n".join(books)
        except Exception as e:
            return f"Error retrieving reading list: {e}"

    def _get_reading_recommendations(self, skill_id: str = None) -> str:
        """Get reading recommendations based on skill level and interests"""
        recommendations = {
            "1": ["Meditations (Marcus Aurelius)", "Letters from a Stoic (Seneca)", "The Obstacle Is the Way (Ryan Holiday)"],
            "2": ["Start With Why (Simon Sinek)", "Team of Teams (Gen. Stanley McChrystal)", "The Effective Executive (Peter Drucker)"],
            "3": ["Awaken the Giant Within (Tony Robbins)", "Grit (Angela Duckworth)", "Daring Greatly (Brené Brown)"],
            "4": ["Zero to One (Peter Thiel)", "Principles (Ray Dalio)", "The Hard Thing About Hard Things (Ben Horowitz)"],
            "5": ["n8n Documentation", "The Phoenix Project (Gene Kim)", "Accelerate (Nicole Forsgren)"],
            "6": ["HTML & CSS: Design and Build Websites (Jon Duckett)", "CSS Secrets (Lea Verou)", "Don't Make Me Think (Steve Krug)"],
            "7": ["The Elements of Typographic Style (Robert Bringhurst)", "Logo Modernism (Jens Müller)", "Grid Systems in Graphic Design (Josef Müller-Brockmann)"],
            "8": ["The Trillion Dollar Coach (Bill Campbell)", "The Art of Mentoring (Mike Pegg)", "Mastery (Robert Greene)"],
            "9": ["The Art of War (Sun Tzu)", "Analects (Confucius)", "The Republic (Plato)", "Zohar (Kabbalah)"],
            "10": ["Getting to Yes (Fisher & Ury)", "The Culture Map (Erin Meyer)", "Total Global Strategy (Yip)"],
            "11": ["The Ascent of Money (Niall Ferguson)", "Lords of Finance (Liaquat Ahamed)", "Debt: The First 5,000 Years (David Graeber)"],
            "12": ["The Republic (Plato)", "Democracy in America (de Tocqueville)", "Why Nations Fail (Acemoglu & Robinson)"],
            "13": ["The Secret Doctrine (Helena Blavatsky)", "The Secret Teachings of All Ages (Manly P. Hall)", "Corpus Hermeticum (Hermes Trismegistus)"]
        }
        
        if skill_id and skill_id in recommendations:
            skill_name = self.skills_index[skill_id]["name"]
            books = recommendations[skill_id]
            return f"## Reading Recommendations for {skill_name}\n\n" + "\n".join([f"- {book}" for book in books])
        else:
            return "## General Reading Recommendations\n\n" + "\n".join([f"- {skill['name']}: {recommendations.get(skill_id, ['No specific recommendations'])[0]}" for skill_id, skill in self.skills_index.items()])

    def _add_book_to_list(self, skill_id: str, book_title: str, status: str) -> str:
        """Add a book to the reading list"""
        try:
            doc_ref = self.db.collection('reading_list').document()
            doc_ref.set({
                'skill_id': skill_id,
                'skill_name': self.skills_index[skill_id]["name"],
                'title': book_title,
                'status': status,
                'added_date': firestore.SERVER_TIMESTAMP
            })
            return f"Added '{book_title}' to reading list for {self.skills_index[skill_id]['name']} (Status: {status})"
        except Exception as e:
            return f"Error adding book: {e}"

    def _remove_book_from_list(self, skill_id: str, book_title: str) -> str:
        """Remove a book from the reading list"""
        try:
            query = self.db.collection('reading_list').where('skill_id', '==', skill_id).where('title', '==', book_title)
            docs = query.stream()
            
            for doc in docs:
                doc.reference.delete()
            
            return f"Removed '{book_title}' from reading list"
        except Exception as e:
            return f"Error removing book: {e}"

    def _update_book_status(self, skill_id: str, book_title: str, status: str) -> str:
        """Update the status of a book in the reading list"""
        try:
            query = self.db.collection('reading_list').where('skill_id', '==', skill_id).where('title', '==', book_title)
            docs = query.stream()
            
            for doc in docs:
                doc.reference.update({'status': status})
            
            return f"Updated '{book_title}' status to {status}"
        except Exception as e:
            return f"Error updating book status: {e}"

    def _get_skill_activities(self, skill_id: str) -> List[Dict]:
        """Get activities for a specific skill"""
        try:
            query = self.db.collection('clay_i_skills').where('skill_id', '==', skill_id)
            docs = query.stream()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            return []

    def _comprehensive_assessment(self, skill_id: str, activities: List[Dict]) -> str:
        """Generate comprehensive mastery assessment"""
        skill = self.skills_index[skill_id]
        
        assessment = f"## Comprehensive Assessment for {skill['name']}\n\n"
        
        # Activity analysis
        if activities:
            recent_activities = sorted(activities, key=lambda x: x.get('date', ''), reverse=True)[:5]
            assessment += "### Recent Activities\n"
            for activity in recent_activities:
                assessment += f"- {activity.get('activity', 'Unknown')} ({activity.get('date', 'Unknown date')})\n"
            assessment += "\n"
        
        # Progress indicators
        assessment += "### Progress Indicators\n"
        assessment += "- **Consistency:** Regular engagement with skill area\n"
        assessment += "- **Depth:** Understanding of core concepts and principles\n"
        assessment += "- **Application:** Practical use in real-world scenarios\n"
        assessment += "- **Integration:** Connection to other skill areas\n\n"
        
        # Mastery levels
        assessment += "### Mastery Levels\n"
        assessment += "1. **Novice (0-25%):** Basic awareness and initial learning\n"
        assessment += "2. **Beginner (25-50%):** Fundamental understanding and basic application\n"
        assessment += "3. **Intermediate (50-75%):** Competent application and deeper understanding\n"
        assessment += "4. **Advanced (75-90%):** Expert-level application and teaching ability\n"
        assessment += "5. **Master (90-100%):** Complete mastery and innovation in the field\n\n"
        
        # Recommendations
        assessment += "### Recommendations for Growth\n"
        assessment += "- Continue daily practice and application\n"
        assessment += "- Seek mentorship from advanced practitioners\n"
        assessment += "- Teach others to solidify understanding\n"
        assessment += "- Explore cross-domain connections\n"
        
        return assessment

    def _quick_assessment(self, skill_id: str, activities: List[Dict]) -> str:
        """Generate quick mastery assessment"""
        skill = self.skills_index[skill_id]
        
        assessment = f"## Quick Assessment for {skill['name']}\n\n"
        
        # Simple metrics
        activity_count = len(activities)
        recent_activity = any(activity.get('date', '') > (datetime.now() - timedelta(days=7)).isoformat() for activity in activities)
        
        assessment += f"**Total Activities:** {activity_count}\n"
        assessment += f"**Recent Activity (7 days):** {'Yes' if recent_activity else 'No'}\n"
        assessment += f"**Current Focus:** {'Active' if recent_activity else 'Needs attention'}\n\n"
        
        assessment += "### Quick Recommendations\n"
        if activity_count < 5:
            assessment += "- Increase engagement with this skill area\n"
        if not recent_activity:
            assessment += "- Resume regular practice\n"
        assessment += "- Set specific learning goals\n"
        
        return assessment

    def _practical_assessment(self, skill_id: str, activities: List[Dict]) -> str:
        """Generate practical mastery assessment"""
        skill = self.skills_index[skill_id]
        
        assessment = f"## Practical Assessment for {skill['name']}\n\n"
        
        assessment += "### Practical Application Checklist\n"
        assessment += "- [ ] Can explain core concepts to others\n"
        assessment += "- [ ] Has applied skills in real projects\n"
        assessment += "- [ ] Can troubleshoot common challenges\n"
        assessment += "- [ ] Understands advanced techniques\n"
        assessment += "- [ ] Can innovate within the field\n\n"
        
        assessment += "### Real-World Scenarios\n"
        assessment += "Consider how you would apply this skill in:\n"
        assessment += "- Professional challenges\n"
        assessment += "- Personal development\n"
        assessment += "- Teaching others\n"
        assessment += "- Cross-domain integration\n"
        
        return assessment

    def _generate_progressive_path(self, current_skill: str = None) -> str:
        """Generate progressive learning path (outer to inner)"""
        path = "# Progressive Learning Path (Outer to Inner)\n\n"
        
        path += "## 🌍 Phase 1: Outer Skills (Foundation)\n"
        path += "1. **Stoicism & Resilience** - Build mental foundation\n"
        path += "2. **Leadership & Team Building** - Develop influence and collaboration\n"
        path += "3. **Motivation & Influence** - Master inspiration and persuasion\n"
        path += "4. **Executive Growth & Strategic Vision** - Cultivate strategic thinking\n\n"
        
        path += "## 🔧 Phase 2: Middle Skills (Application)\n"
        path += "5. **n8n Architecture & Intelligent Automation** - Technical implementation\n"
        path += "6. **Web Design: HTML/CSS & Modern Architecture** - Digital craftsmanship\n"
        path += "7. **Graphic Design** - Visual communication and aesthetics\n"
        path += "8. **Mentorship & Coaching** - Teaching and guiding others\n\n"
        
        path += "## 🕯️ Phase 3: Inner Skills (Wisdom)\n"
        path += "9. **Language & World Wisdom** - Cross-cultural understanding\n"
        path += "10. **International Business** - Global commerce and relationships\n"
        path += "11. **Global Finance & Infrastructure** - Economic and financial systems\n"
        path += "12. **Government, Policy & Geopolitics** - Political and social structures\n"
        path += "13. **Theosophy, Occult, and Comparative Religion** - Spiritual and mystical understanding\n\n"
        
        path += "## 🎯 Recommended Approach\n"
        path += "- Master each phase before moving to the next\n"
        path += "- Allow 3-6 months per phase for deep learning\n"
        path += "- Practice daily application of skills\n"
        path += "- Document insights and connections\n"
        
        return path

    def _generate_jump_path(self, current_skill: str = None) -> str:
        """Generate jump learning path (skill-specific focus)"""
        path = "# Jump Learning Path (Skill-Specific Focus)\n\n"
        
        path += "## 🎯 How to Use Jump Learning\n"
        path += "1. **Identify Immediate Need** - What skill is most relevant right now?\n"
        path += "2. **Deep Dive** - Focus intensively on that skill for 2-4 weeks\n"
        path += "3. **Apply Immediately** - Use the skill in real projects\n"
        path += "4. **Return to Path** - Come back to progressive learning\n\n"
        
        path += "## 🚀 Quick Start Options\n"
        for skill_id, skill in self.skills_index.items():
            path += f"{skill_id}. **{skill['name']}** - {self._get_skill_description(skill_id)}\n"
        
        path += "\n## 📋 Jump Learning Checklist\n"
        path += "- [ ] Identify specific skill need\n"
        path += "- [ ] Set clear learning objectives\n"
        path += "- [ ] Gather resources and materials\n"
        path += "- [ ] Create practice opportunities\n"
        path += "- [ ] Track progress and application\n"
        path += "- [ ] Document insights for future reference\n"
        
        return path

    def _generate_domain_path(self, current_skill: str = None) -> str:
        """Generate domain-focused learning path"""
        path = "# Domain-Focused Learning Path\n\n"
        
        domains = {
            "outer": {
                "name": "Outer Skills",
                "description": "Foundation skills for personal and professional effectiveness",
                "skills": ["1", "2", "3", "4"],
                "focus": "Building mental resilience, leadership, and strategic thinking"
            },
            "middle": {
                "name": "Middle Skills", 
                "description": "Technical and practical application skills",
                "skills": ["5", "6", "7", "8"],
                "focus": "Technical implementation, design, and teaching abilities"
            },
            "inner": {
                "name": "Inner Skills",
                "description": "Wisdom and understanding of complex systems",
                "skills": ["9", "10", "11", "12", "13"],
                "focus": "Cross-cultural understanding, global systems, and spiritual insight"
            }
        }
        
        for domain_key, domain in domains.items():
            path += f"## {domain['name']}\n"
            path += f"**Description:** {domain['description']}\n"
            path += f"**Focus:** {domain['focus']}\n\n"
            
            for skill_id in domain['skills']:
                skill = self.skills_index[skill_id]
                path += f"- **{skill['name']}** - {self._get_skill_description(skill_id)}\n"
            
            path += "\n"
        
        return path

    def _get_skill_description(self, skill_id: str) -> str:
        """Get brief description of a skill"""
        descriptions = {
            "1": "Mental resilience and emotional control",
            "2": "Leading teams and building organizations",
            "3": "Inspiring and influencing others",
            "4": "Strategic thinking and executive skills",
            "5": "Workflow automation and system integration",
            "6": "Web development and digital architecture",
            "7": "Visual design and communication",
            "8": "Teaching and guiding others",
            "9": "Cross-cultural communication and wisdom",
            "10": "International commerce and relationships",
            "11": "Financial systems and economic understanding",
            "12": "Political systems and global dynamics",
            "13": "Spiritual understanding and mystical insight"
        }
        return descriptions.get(skill_id, "Skill development and mastery")

# Tool functions for AgentGPT integration
def manage_reading_list(action: str, skill_id: str = None, book_title: str = None, status: str = "to_read") -> str:
    """Manage reading list for skill development"""
    tools = LearningTools()
    return tools.manage_reading_list(action, skill_id, book_title, status)

def find_cross_domain_connections(skill_id: str = None, connection_type: str = "all") -> str:
    """Find connections between different skill domains"""
    tools = LearningTools()
    return tools.find_cross_domain_connections(skill_id, connection_type)

def assess_mastery_level(skill_id: str, assessment_type: str = "comprehensive") -> str:
    """Assess mastery level in a specific skill area"""
    tools = LearningTools()
    return tools.assess_mastery_level(skill_id, assessment_type)

def generate_learning_path(current_skill: str = None, focus_area: str = "progressive") -> str:
    """Generate a personalized learning path"""
    tools = LearningTools()
    return tools.generate_learning_path(current_skill, focus_area) 