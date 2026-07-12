#!/usr/bin/env bash
# Self-host the portfolio from Termux (or any machine) and expose it over a
# free Cloudflare quick tunnel. Starts the localhost-only static server, then
# opens the tunnel. Ctrl-C stops both.
#
# Usage:  bash host.sh [port]     (default 8080)

set -euo pipefail
cd "$(dirname "$0")"

PORT="${1:-8080}"

command -v node >/dev/null || { echo "node is required (pkg install nodejs)"; exit 1; }
command -v cloudflared >/dev/null || { echo "cloudflared is required (pkg install cloudflared)"; exit 1; }

echo "Starting static server on 127.0.0.1:$PORT ..."
node serve.js "$PORT" &
NODE_PID=$!
trap 'kill "$NODE_PID" 2>/dev/null || true' EXIT INT TERM
sleep 1

echo "Opening Cloudflare tunnel — your public link appears below as https://<something>.trycloudflare.com"
echo "-----------------------------------------------------------------------------------------------"
cloudflared tunnel --url "http://127.0.0.1:$PORT"
