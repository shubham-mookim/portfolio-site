#!/usr/bin/env bash
# Stop every server and tunnel that up.sh started.
set -u
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
RUN="$SCRIPT_DIR/run"
[ -d "$RUN" ] || { echo "Nothing to stop."; exit 0; }

for pidf in "$RUN"/*.pid; do
  [ -e "$pidf" ] || continue
  pid=$(cat "$pidf" 2>/dev/null || true)
  [ -n "${pid:-}" ] && kill "$pid" 2>/dev/null || true
  rm -f "$pidf"
done
rm -f "$RUN"/*.url "$RUN"/urls.txt 2>/dev/null || true
echo "Stopped all managed servers and tunnels."
