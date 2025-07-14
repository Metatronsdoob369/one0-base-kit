#!/bin/bash

# Script to open image files
# Usage: ./open_image.sh filename.png

if [ $# -eq 0 ]; then
    echo "Usage: $0 <image_file>"
    echo "Example: $0 gunmetal-brushed.png"
    exit 1
fi

filename="$1"

if [ -f "$filename" ]; then
    echo "Opening $filename..."
    open "$filename"
elif [ -f "public/$filename" ]; then
    echo "Opening public/$filename..."
    open "public/$filename"
else
    echo "File not found: $filename"
    echo "Searched in current directory and public/ folder"
    echo ""
    echo "Available image files:"
    find . -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" 2>/dev/null | grep -v node_modules | grep -v venv
fi 