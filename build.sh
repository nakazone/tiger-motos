#!/bin/bash
set -e

echo "🚀 Starting Tiger Motos build process..."

# Update git submodules
echo "📦 Updating git submodules..."
git submodule update --init --recursive

# Navigate to frontend directory
cd frontend

# Clean install dependencies
echo "📥 Installing dependencies..."
npm ci --legacy-peer-deps

# Build the React application
echo "🔨 Building React application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output located in: frontend/build/" 