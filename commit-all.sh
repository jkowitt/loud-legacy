#!/bin/bash
# Quick commit script - commits and pushes all changes

set -e

cd /home/user/loud-legacy

# Add all changes
git add -A

# Check if there are changes
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
    exit 0
fi

# Get current branch
BRANCH=$(git branch --show-current)

# Commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "auto: commit changes at $TIMESTAMP"

# Push to remote
git push origin "$BRANCH"

echo "✅ Changes committed and pushed to $BRANCH"
