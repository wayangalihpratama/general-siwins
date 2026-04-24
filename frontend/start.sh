#!/bin/sh
set -eu

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
  npm install
fi

# Run Next.js in development mode (disable turbo due to native dependency issues in Docker)
npm run dev -- -p 3000 -H 0.0.0.0 --no-turbo
