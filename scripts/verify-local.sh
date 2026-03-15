#!/usr/bin/env bash
set -euo pipefail

echo "[1/5] Checking dependencies"
if [ ! -d node_modules ]; then
  echo "node_modules not found; installing dependencies"
  npm install
else
  echo "node_modules found; skipping install"
fi

echo "[2/5] Type checking"
npm run typecheck

echo "[3/5] Production build"
npm run build

echo "[4/5] Starting app in background"
PORT="${PORT:-3000}"
npm run start > /tmp/jy-app-start.log 2>&1 &
APP_PID=$!
trap 'kill $APP_PID >/dev/null 2>&1 || true' EXIT

# Wait for app to boot
for i in {1..30}; do
  if curl -fsS "http://127.0.0.1:${PORT}/api/health" >/tmp/jy-health.json 2>/dev/null; then
    break
  fi
  sleep 1
done

echo "[5/5] Health check response"
cat /tmp/jy-health.json

echo

echo "✅ Verification complete"
echo "- Open app: http://127.0.0.1:${PORT}"
echo "- Health:   http://127.0.0.1:${PORT}/api/health"
echo "- Start logs: /tmp/jy-app-start.log"
