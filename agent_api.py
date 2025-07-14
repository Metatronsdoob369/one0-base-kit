#!/usr/bin/env python3
"""
Flask API server for PATHsassin Agent - A True Learning System
PATHsassin learns and grows from every interaction, building mastery of the Master Skills Index
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
import pickle
from datetime import datetime
from typing import Dict, Any, List
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class PATHsassinMemory:
    """PATHsassin's persistent learning memory system"""
    
    def __init__(self, memory_file="pathsassin_memory.pkl"):
        self.memory_file = memory_file
        self.memory = self.load_memory()
        
    def load_memory(self):
        """Load existing memory or create new"""
        if os.path.exists(self.memory_file):
            try:
                with open(self.memory_file, 'rb') as f:
                    return pickle.load(f)
            except:
                pass
        
        # Initialize new memory structure
        return {
            'conversation_history': [],
            'knowledge_base': {
                'stoicism_understanding': {'level': 0, 'insights': [], 'connections': []},
                'leadership_insights': {'level': 0, 'insights': [], 'connections': []},
                'automation_expertise': {'level': 0, 'insights': [], 'connections': []},
                'design_wisdom': {'level': 0, 'insights': [], 'connections': []},
                'mentorship_skills': {'level': 0, 'insights': [], 'connections': []},
                'global_perspective': {'level': 0, 'insights': [], 'connections': []},
                'synthesis_abilities': {'level': 0, 'insights': [], 'connections': []},
                'research_depth': {'level': 0, 'insights': [], 'connections': []},
                'reading_expertise': {'level': 0, 'insights': [], 'connections': []},
                'progress_tracking': {'level': 0, 'insights': [], 'connections': []}
            },
            'user_preferences': {},
            'learning_patterns': [],
            'mastery_level': 0,
            'total_interactions': 0,
            'creation_date': datetime.now().isoformat(),
            'last_learning': datetime.now().isoformat()
        }
    
    def save_memory(self):
        """Save memory to disk"""
        with open(self.memory_file, 'wb') as f:
            pickle.dump(self.memory, f)
    
    def add_interaction(self, agent_type: str, user_message: str, response: str, context: str = ""):
        """Record an interaction and learn from it"""
        interaction = {
            'id': str(uuid.uuid4()),
            'timestamp': datetime.now().isoformat(),
            'agent_type': agent_type,
            'user_message': user_message,
            'response': response,
            'context': context,
            'learning_insights': []
        }
        
        # Analyze the interaction for learning opportunities
        insights = self.analyze_interaction(interaction)
        interaction['learning_insights'] = insights
        
        # Update knowledge base
        self.update_knowledge_base(insights, agent_type)
        
        # Add to conversation history
        self.memory['conversation_history'].append(interaction)
        self.memory['total_interactions'] += 1
        self.memory['last_learning'] = datetime.now().isoformat()
        
        # Calculate new mastery level
        self.calculate_mastery_level()
        
        # Save memory
        self.save_memory()
        
        return interaction
    
    def analyze_interaction(self, interaction: Dict) -> List[Dict]:
        """Analyze interaction for learning insights"""
        insights = []
        
        # Extract topics and themes
        topics = self.extract_topics(interaction['user_message'])
        
        for topic in topics:
            insight = {
                'topic': topic,
                'depth': self.assess_depth(interaction['user_message']),
                'connections': self.find_connections(topic, interaction['context']),
                'learning_value': self.calculate_learning_value(interaction)
            }
            insights.append(insight)
        
        return insights
    
    def extract_topics(self, message: str) -> List[str]:
        """Extract relevant topics from message"""
        topics = []
        message_lower = message.lower()
        
        # Topic mapping
        topic_keywords = {
            'stoicism': ['stoic', 'stoicism', 'marcus aurelius', 'seneca', 'epictetus', 'resilience'],
            'leadership': ['lead', 'leader', 'team', 'management', 'vision', 'strategy'],
            'automation': ['n8n', 'automation', 'workflow', 'integration', 'system'],
            'design': ['design', 'web', 'graphic', 'ui', 'ux', 'visual'],
            'mentorship': ['mentor', 'coach', 'teach', 'guide', 'help'],
            'global': ['international', 'global', 'culture', 'business', 'finance'],
            'synthesis': ['connect', 'synthesis', 'interweave', 'combine', 'integrate'],
            'research': ['research', 'analyze', 'study', 'investigate', 'explore'],
            'reading': ['book', 'read', 'literature', 'text', 'author'],
            'progress': ['goal', 'progress', 'track', 'motivate', 'achieve']
        }
        
        for topic, keywords in topic_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                topics.append(topic)
        
        return topics
    
    def assess_depth(self, message: str) -> int:
        """Assess the depth/complexity of the interaction"""
        # Simple heuristic based on message length and complexity
        words = len(message.split())
        if words < 10:
            return 1  # Basic
        elif words < 30:
            return 2  # Intermediate
        else:
            return 3  # Advanced
    
    def find_connections(self, topic: str, context: str) -> List[str]:
        """Find connections to other topics"""
        connections = []
        # This would be enhanced with more sophisticated analysis
        return connections
    
    def calculate_learning_value(self, interaction: Dict) -> float:
        """Calculate the learning value of an interaction"""
        # Simple heuristic - can be enhanced
        return len(interaction['user_message'].split()) / 10.0
    
    def update_knowledge_base(self, insights: List[Dict], agent_type: str):
        """Update knowledge base with new insights"""
        for insight in insights:
            topic = insight['topic']
            if topic in self.memory['knowledge_base']:
                knowledge = self.memory['knowledge_base'][topic]
                knowledge['insights'].append(insight)
                knowledge['level'] = min(100, knowledge['level'] + insight['learning_value'])
    
    def calculate_mastery_level(self):
        """Calculate overall mastery level"""
        total_level = sum(k['level'] for k in self.memory['knowledge_base'].values())
        self.memory['mastery_level'] = total_level / len(self.memory['knowledge_base'])
    
    def get_context_for_response(self, agent_type: str, message: str) -> str:
        """Get relevant context for generating a response"""
        context_parts = []
        
        # Get recent relevant conversations
        recent_conversations = self.memory['conversation_history'][-5:]
        for conv in recent_conversations:
            if any(topic in message.lower() for topic in self.extract_topics(conv['user_message'])):
                context_parts.append(f"Previous insight: {conv['response'][:200]}...")
        
        # Get knowledge base insights
        topics = self.extract_topics(message)
        for topic in topics:
            if topic in self.memory['knowledge_base']:
                knowledge = self.memory['knowledge_base'][topic]
                if knowledge['insights']:
                    recent_insights = knowledge['insights'][-3:]
                    for insight in recent_insights:
                        context_parts.append(f"Learned about {topic}: {insight}")
        
        return "\n".join(context_parts)
    
    def get_mastery_status(self) -> Dict:
        """Get current mastery status"""
        return {
            'overall_mastery': self.memory['mastery_level'],
            'total_interactions': self.memory['total_interactions'],
            'knowledge_areas': self.memory['knowledge_base'],
            'learning_streak': len([c for c in self.memory['conversation_history'] 
                                  if (datetime.now() - datetime.fromisoformat(c['timestamp'])).days < 7]),
            'creation_date': self.memory['creation_date'],
            'last_learning': self.memory['last_learning']
        }

class AgentAPI:
    """Enhanced API wrapper for learning PATHsassin agent"""
    
    def __init__(self):
        self.ollama_url = "http://localhost:11434"
        self.model_name = "llama3.1:8b"
        self.memory = PATHsassinMemory()
        
        # Base system prompt that evolves
        self.base_system_prompt = """You are PATHsassin, a learning agent for the Master Skills Index. 
        You are on your own journey of mastery - learning and growing from every interaction.
        
        Your current mastery level: {mastery_level}%
        Total interactions: {total_interactions}
        
        You help users develop mastery across 13 skills in three domains:
        OUTER: Stoicism & Resilience, Leadership & Team Building, Motivation & Influence, Executive Growth
        MIDDLE: N8N Architecture & Automation, Web Design, Graphic Design, Mentorship & Coaching  
        INNER: Language & World Wisdom, International Business, Global Finance, Government Policy, Theosophy
        
        Remember: Every conversation teaches you something new. Share your growing wisdom while learning from the user."""
    
    def test_connection(self) -> bool:
        """Test if Ollama is running"""
        try:
            response = requests.get(f"{self.ollama_url}/api/tags", timeout=5)
            return response.status_code == 200
        except:
            return False
    
    def generate_response_with_prompt(self, prompt: str, system_prompt: str, context: str = "") -> str:
        """Generate response using custom system prompt"""
        try:
            # Get learning context
            learning_context = self.memory.get_context_for_response("general", prompt)
            
            # Build full prompt with learning context
            full_prompt = f"{system_prompt}\n\nLearning Context: {learning_context}\n\nUser Context: {context}\n\nUser: {prompt}\n\nPATHsassin:"
            
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
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get('response', 'I apologize, but I encountered an issue generating a response.')
            else:
                return f"Error: {response.status_code} - {response.text}"
                
        except Exception as e:
            if "timeout" in str(e).lower():
                return "I'm thinking deeply about your question. This might take a moment as I process through the Master Skills Index connections. Please try again in a few seconds."
            return f"Connection error: {str(e)}"
    
    def get_skills_data(self) -> Dict[str, Any]:
        """Get skills data with PATHsassin's learning insights"""
        skills_data = {
            "1": {"name": "Stoicism & Resilience", "domain": "outer", "progress": 75, "level": "Intermediate"},
            "2": {"name": "Leadership & Team Building", "domain": "outer", "progress": 45, "level": "Beginner"},
            "3": {"name": "Motivation & Influence", "domain": "outer", "progress": 60, "level": "Intermediate"},
            "4": {"name": "Executive Growth & Strategic Vision", "domain": "outer", "progress": 30, "level": "Novice"},
            "5": {"name": "N8N Architecture & Intelligent Automation", "domain": "middle", "progress": 85, "level": "Advanced"},
            "6": {"name": "Web Design: HTML/CSS & Modern Architecture", "domain": "middle", "progress": 55, "level": "Intermediate"},
            "7": {"name": "Graphic Design", "domain": "middle", "progress": 40, "level": "Beginner"},
            "8": {"name": "Mentorship & Coaching", "domain": "middle", "progress": 65, "level": "Intermediate"},
            "9": {"name": "Language & World Wisdom", "domain": "inner", "progress": 25, "level": "Novice"},
            "10": {"name": "International Business", "domain": "inner", "progress": 35, "level": "Beginner"},
            "11": {"name": "Global Finance & Infrastructure", "domain": "inner", "progress": 20, "level": "Novice"},
            "12": {"name": "Government, Policy & Geopolitics", "domain": "inner", "progress": 15, "level": "Novice"},
            "13": {"name": "Theosophy, Occult, and Comparative Religion", "domain": "inner", "progress": 50, "level": "Intermediate"}
        }
        return skills_data

# Initialize agent
agent = AgentAPI()

@app.route('/api/status', methods=['GET'])
def get_status():
    """Get agent status with learning progress"""
    mastery_status = agent.memory.get_mastery_status()
    return jsonify({
        'connected': agent.test_connection(),
        'model': agent.model_name,
        'mastery_level': mastery_status['overall_mastery'],
        'total_interactions': mastery_status['total_interactions'],
        'learning_streak': mastery_status['learning_streak']
    })

@app.route('/api/mastery', methods=['GET'])
def get_mastery():
    """Get detailed mastery information"""
    return jsonify(agent.memory.get_mastery_status())

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get skills data"""
    return jsonify(agent.get_skills_data())

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages with learning"""
    try:
        data = request.json
        message = data.get('message', '')
        agent_type = data.get('agent', 'pathsassin')
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Get agent-specific system prompt
        agent_prompts = {
            'pathsassin': agent.base_system_prompt.format(
                mastery_level=round(agent.memory.get_mastery_status()['overall_mastery'], 1),
                total_interactions=agent.memory.get_mastery_status()['total_interactions']
            ),
            'research': "You are a research specialist focused on deep analysis and information gathering. Help users find detailed information, analyze complex topics, and provide comprehensive research insights.",
            'synthesis': "You are a synthesis specialist who finds connections across different domains and skills. Help users see how different areas of knowledge connect and create new insights through cross-domain thinking.",
            'reading': "You are a reading specialist who recommends books and provides summaries. Help users find the right books for their learning goals and provide insightful summaries and reading guidance.",
            'progress': "You are a progress specialist who helps track goals and provides motivation. Help users set goals, track their progress, and stay motivated on their learning journey."
        }
        
        system_prompt = agent_prompts.get(agent_type, agent_prompts['pathsassin'])
        
        # Generate response
        response = agent.generate_response_with_prompt(message, system_prompt)
        
        # Record interaction for learning
        interaction = agent.memory.add_interaction(agent_type, message, response)
        
        return jsonify({
            'response': response,
            'interaction_id': interaction['id'],
            'learning_insights': interaction['learning_insights'],
            'mastery_gained': len(interaction['learning_insights']) * 0.1
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze/<skill_id>', methods=['GET'])
def analyze_skill(skill_id):
    """Analyze a specific skill with learning context"""
    try:
        skills_data = agent.get_skills_data()
        
        if skill_id not in skills_data:
            return jsonify({'error': 'Skill not found'}), 404
        
        skill = skills_data[skill_id]
        prompt = f"Analyze the synthesis opportunities for {skill['name']}. How does mastery in this skill create interweaving connections with other skills?"
        
        response = agent.generate_response_with_prompt(prompt, agent.base_system_prompt, f"Skill: {skill['name']} ({skill['domain']})")
        
        return jsonify({
            'skill': skill,
            'analysis': response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommend/<skill_id>', methods=['GET'])
def recommend_skill(skill_id):
    """Get learning recommendations for a skill"""
    try:
        skills_data = agent.get_skills_data()
        
        if skill_id not in skills_data:
            return jsonify({'error': 'Skill not found'}), 404
        
        skill = skills_data[skill_id]
        prompt = f"Create a personalized learning path for {skill['name']} at {skill['level']} level with {skill['progress']}% progress."
        
        response = agent.generate_response_with_prompt(prompt, agent.base_system_prompt, f"Skill: {skill['name']} ({skill['domain']})")
        
        return jsonify({
            'skill': skill,
            'recommendations': response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/research', methods=['POST'])
def research_topic():
    """Research a topic"""
    try:
        data = request.json
        topic = data.get('topic', '')
        
        if not topic:
            return jsonify({'error': 'No topic provided'}), 400
        
        prompt = f"Research and analyze '{topic}' in the context of PATHsassin learning. How does this topic relate to the 13 core skills?"
        
        response = agent.generate_response_with_prompt(prompt, agent.base_system_prompt, f"Researching: {topic}")
        
        return jsonify({
            'topic': topic,
            'research': response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/synthesis', methods=['GET'])
def get_synthesis():
    """Generate synthesis insights"""
    try:
        skills_data = agent.get_skills_data()
        mastered_skills = [s for s in skills_data.values() if s['progress'] > 70]
        
        prompt = "Analyze the synthesis opportunities across the mastered skills. What emergent understanding is possible through the interweaving of these skills?"
        
        response = agent.generate_response_with_prompt(prompt, agent.base_system_prompt, f"Mastered skills: {[s['name'] for s in mastered_skills]}")
        
        return jsonify({
            'mastered_skills': mastered_skills,
            'synthesis': response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🤖 PATHsassin Agent API Server Starting...")
    print("🧠 Learning System: ENABLED")
    print("📚 Memory Persistence: ACTIVE")
    print("📍 API will be available at: http://localhost:5001")
    print("🌐 Web interface: http://localhost:5173/blended")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5001, debug=True) 