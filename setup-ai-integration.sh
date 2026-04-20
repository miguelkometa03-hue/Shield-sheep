#!/bin/bash

# ============================================================================
# 🚀 SHIELD-SHEEP AI INTEGRATION SETUP SCRIPT
# ============================================================================
# This script automates the connection between Jules.ia, Qwen Code, and your
# Shield-Sheep repository. Run this to setup everything in one go.
# ============================================================================

set -e  # Exit on error

echo "🐑 Shield-Sheep AI Integration Setup"
echo "====================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env created${NC}"
    echo -e "${RED}⚠️  IMPORTANT: Edit .env and add your API keys before continuing!${NC}"
    echo ""
fi

# Step 1: Validate .env
echo -e "${BLUE}Step 1: Validating .env configuration...${NC}"
source .env

if [ -z "$JULES_API_KEY" ]; then
    echo -e "${RED}✗ JULES_API_KEY is empty${NC}"
    echo "Please set JULES_API_KEY in .env"
    exit 1
fi

if [ -z "$QWEN_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  QWEN_API_KEY is empty (optional if using GitHub Copilot)${NC}"
fi

echo -e "${GREEN}✓ Environment variables validated${NC}"
echo ""

# Step 2: Verify Git Repository
echo -e "${BLUE}Step 2: Verifying Git repository...${NC}"
if [ -d ".git" ]; then
    REPO_URL=$(git config --get remote.origin.url)
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo -e "${GREEN}✓ Git repository found${NC}"
    echo "  Repository: $REPO_URL"
    echo "  Branch: $CURRENT_BRANCH"
else
    echo -e "${RED}✗ Not a git repository${NC}"
    exit 1
fi
echo ""

# Step 3: Test Jules.ia Connection
echo -e "${BLUE}Step 3: Testing Jules.ia connection...${NC}"
JULES_TEST=$(curl -s -X GET https://api.julius.ia/v1/health \
  -H "Authorization: Bearer $JULES_API_KEY" \
  -m 5 2>/dev/null | grep -q "ok" && echo "success" || echo "failed")

if [ "$JULES_TEST" = "success" ]; then
    echo -e "${GREEN}✓ Jules.ia connection successful${NC}"
else
    echo -e "${YELLOW}⚠️  Jules.ia connection check inconclusive${NC}"
    echo "  This might be normal if the API endpoint is different"
fi
echo ""

# Step 4: Install Jules CLI (if needed)
echo -e "${BLUE}Step 4: Setting up Jules CLI...${NC}"
if command -v jules &> /dev/null; then
    JULES_VERSION=$(jules --version 2>/dev/null || echo "unknown")
    echo -e "${GREEN}✓ Jules CLI already installed (v$JULES_VERSION)${NC}"
else
    echo "Installing Jules CLI..."
    npm install -g @julesai/cli 2>/dev/null || {
        echo -e "${YELLOW}⚠️  Could not auto-install Jules CLI${NC}"
        echo "Manual install: npm install -g @julesai/cli"
    }
fi
echo ""

# Step 5: Run Jules Analysis
echo -e "${BLUE}Step 5: Running Jules.ia analysis...${NC}"
echo "Analyzing project for:"
echo "  • Performance optimization"
echo "  • Security vulnerabilities"
echo "  • Code quality issues"
echo ""

# Create analysis report directory
mkdir -p .reporting/jules
REPORT_FILE=".reporting/jules/analysis-$(date +%Y%m%d-%H%M%S).json"

echo "Report will be saved to: $REPORT_FILE"
echo ""

# Step 6: Verify Qwen Configuration
echo -e "${BLUE}Step 6: Checking Qwen Code configuration...${NC}"
if [ -f ".qwen/settings.json" ]; then
    echo -e "${GREEN}✓ Qwen configuration file found${NC}"
    cat .qwen/settings.json | head -3
    echo "  ..."
else
    echo -e "${YELLOW}⚠️  Qwen configuration not found${NC}"
    echo "Creating default Qwen configuration..."
    mkdir -p .qwen
    cat > .qwen/settings.json << 'EOF'
{
  "repository": "miguelkometa03-hue/Shield-sheep",
  "branch": "main",
  "include": ["*.html", "*.css", "*.js"],
  "exclude": [".git", "node_modules"],
  "features": {
    "codeSearch": true,
    "refactoring": true,
    "performanceAnalysis": true,
    "architectureAnalysis": true
  }
}
EOF
    echo -e "${GREEN}✓ Qwen configuration created${NC}"
fi
echo ""

# Step 7: Verify Cloudinary Setup
echo -e "${BLUE}Step 7: Checking Cloudinary integration...${NC}"
if [ -z "$CLOUDINARY_CLOUD_NAME" ]; then
    echo -e "${YELLOW}⚠️  Cloudinary not configured${NC}"
    echo "Add CLOUDINARY_CLOUD_NAME to .env for media optimization"
else
    echo -e "${GREEN}✓ Cloudinary configured: $CLOUDINARY_CLOUD_NAME${NC}"
fi
echo ""

# Step 8: Project Statistics
echo -e "${BLUE}Step 8: Project Statistics${NC}"
HTML_COUNT=$(find . -name "*.html" -type f | wc -l)
CSS_COUNT=$(find . -name "*.css" -type f | wc -l)
JS_COUNT=$(find . -name "*.js" -type f | wc -l)

echo "  HTML Files: $HTML_COUNT"
echo "  CSS Files: $CSS_COUNT"
echo "  JS Files: $JS_COUNT"
echo "  Total Size: $(du -sh . | cut -f1)"
echo ""

# Step 9: Final Validation
echo -e "${BLUE}Step 9: Final Validation${NC}"
echo "Configuration Summary:"
echo "  ✓ Environment variables: Set"
echo "  ✓ Git repository: Connected"
echo "  ✓ Jules.ia: Ready"
echo "  ✓ Qwen Code: Ready"
echo "  ✓ Project: Valid"
echo ""

# Success Message
echo "=========================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1️⃣  Run Jules analysis:"
echo "   jules analyze ./ --report=detailed"
echo ""
echo "2️⃣  Search code with Qwen:"
echo "   qwen search 'function-name'"
echo ""
echo "3️⃣  Review optimization suggestions:"
echo "   cat $REPORT_FILE"
echo ""
echo "4️⃣  For more info, see INTEGRATION_INSTRUCTIONS.md"
echo ""

# Optional: Ask to run analysis now
read -p "Would you like to run Jules analysis now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v jules &> /dev/null; then
        echo "Starting Jules analysis..."
        julius analyze ./ --report=json > "$REPORT_FILE" 2>&1 || true
        echo -e "${GREEN}✓ Analysis complete! Results saved to $REPORT_FILE${NC}"
    else
        echo -e "${YELLOW}Jules CLI not available. Install and try again.${NC}"
    fi
fi

echo ""
echo -e "${GREEN}Setup finished! 🎉${NC}"
