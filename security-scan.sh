#!/bin/bash

echo "🔒 Security Scan for NodeOut Application"
echo "========================================"

# Check if required tools are installed
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        return 1
    fi
    echo "✅ $1 is available"
    return 0
}

echo "Checking required security tools..."
check_tool "npm" || exit 1
check_tool "docker" || exit 1

echo ""
echo "1. Scanning npm dependencies for vulnerabilities..."
npm audit --audit-level=moderate

echo ""
echo "2. Checking for outdated packages..."
npm outdated

echo ""
echo "3. Scanning Docker image for vulnerabilities..."
if [ -f "Dockerfile" ]; then
    echo "Building Docker image for security scan..."
    docker build -t nodeout-security-scan .
    
    echo "Running Trivy vulnerability scanner..."
    if command -v trivy &> /dev/null; then
        trivy image nodeout-security-scan
    else
        echo "⚠️  Trivy not installed. Install with: brew install trivy"
    fi
else
    echo "❌ Dockerfile not found"
fi

echo ""
echo "4. Checking for secrets in code..."
if command -v detect-secrets &> /dev/null; then
    detect-secrets scan --baseline .secrets.baseline
else
    echo "⚠️  detect-secrets not installed. Install with: pip install detect-secrets"
fi

echo ""
echo "5. Checking file permissions..."
find . -type f -name "*.sh" -exec ls -la {} \;

echo ""
echo "🔒 Security scan completed!"
echo "Review the output above for any security issues." 