#!/bin/bash
set -e

echo "🚀 Starting Tiger Motos build process..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

# Build the React application
echo "🔨 Building React application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output located in: frontend/build/" 