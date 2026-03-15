#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker is not installed. Install Docker first: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "❌ Docker Compose plugin is missing. Install it and retry."
  exit 1
fi

if [ ! -f .env ]; then
  echo "ℹ️  .env not found, creating from .env.example"
  cp .env.example .env
  echo "⚠️  Please edit .env and set NEXT_PUBLIC_ADMIN_PASSWORD before production use."
fi

echo "🚀 Building and starting container"
docker compose up -d --build

echo "🔎 Container status"
docker compose ps

echo "🔎 Health endpoint (try): http://127.0.0.1:3000/api/health"
