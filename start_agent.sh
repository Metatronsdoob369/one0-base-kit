#!/bin/bash

echo "🤖 Starting PATHsassin Agent System..."
echo "=================================================="

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Ollama is not running. Starting Ollama..."
    brew services start ollama
    sleep 3
fi

# Check if Ollama is now running
if curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "✅ Ollama is running"
else
    echo "❌ Failed to start Ollama. Please start it manually: brew services start ollama"
    exit 1
fi

# Activate virtual environment
echo "🐍 Activating Python environment..."
source venv/bin/activate

# Start the API server in the background
echo "🚀 Starting Agent API Server..."
python agent_api.py &
API_PID=$!

# Wait a moment for the API to start
sleep 2

# Check if API is running
if curl -s http://localhost:5001/api/status > /dev/null; then
    echo "✅ Agent API is running on http://localhost:5001"
else
    echo "❌ Failed to start Agent API"
    exit 1
fi

# Start the web interface if not already running
echo "🌐 Starting Web Interface..."
if ! curl -s http://localhost:5183 > /dev/null; then
    echo "Starting Vite development server..."
    npm run dev &
    VITE_PID=$!
    sleep 5
fi

# Open the web interface
echo "🔗 Opening Web Interface..."
open http://localhost:5183/agent

echo ""
echo "🎉 PATHsassin Agent System is ready!"
echo "=================================================="
echo "🌐 Web Interface: http://localhost:5183/agent"
echo "🔌 API Server: http://localhost:5001"
echo "🤖 Local LLM: http://localhost:11434"
echo ""
echo "💡 You can now interact with your agent through the web interface!"
echo "   No more terminal commands needed!"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
trap "echo '🛑 Stopping services...'; kill $API_PID $VITE_PID 2>/dev/null; exit" INT
wait 