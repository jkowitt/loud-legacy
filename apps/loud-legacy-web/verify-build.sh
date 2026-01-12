#!/bin/bash
# Pre-build verification script to catch common errors

set -e

echo "🔍 Verifying build configuration..."

# Check for CSS import issues
echo "Checking CSS imports..."

# Verify globals.css exists in the correct location
if [ ! -f "app/globals.css" ]; then
    echo "❌ ERROR: app/globals.css not found!"
    echo "The CSS file must be at: apps/loud-legacy-web/app/globals.css"
    exit 1
fi

# Check for duplicate globals.css files
GLOBALS_COUNT=$(find . -name "globals.css" -type f | wc -l)
if [ "$GLOBALS_COUNT" -gt 1 ]; then
    echo "❌ ERROR: Multiple globals.css files found!"
    find . -name "globals.css" -type f
    echo "Only app/globals.css should exist."
    exit 1
fi

# Verify layout.tsx imports correctly
if ! grep -q 'import "./globals.css"' app/layout.tsx; then
    echo "❌ ERROR: layout.tsx does not import './globals.css' correctly!"
    echo "Expected: import \"./globals.css\";"
    exit 1
fi

# Check for common Next.js export issues
if grep -q "output: 'export'" next.config.mjs; then
    echo "✓ Static export configured"

    # Verify netlify.toml doesn't have conflicting redirects
    if grep -q "to = \"/index.html\"" ../../netlify.toml 2>/dev/null; then
        echo "⚠️  WARNING: SPA redirect detected in netlify.toml"
        echo "This may conflict with Next.js static export!"
    fi
fi

echo "✅ All verifications passed!"
echo "Ready to build."
