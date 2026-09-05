#!/usr/bin/env bash
# Show what's running and the current public URLs.
set -u
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
RUN="$SCRIPT_DIR/run"

echo "Processes:"
found=0
for pidf in "$RUN"/*.pid; do
  [ -e "$pidf" ] || continue
  found=1
  n=$(basename "$pidf" .pid); pid=$(cat "$pidf" 2>/dev/null || true)
  if kill -0 "${pid:-x}" 2>/dev/null; then st="up  "; else st="DOWN"; fi
  printf "  [%s] %-22s pid %s\n" "$st" "$n" "${pid:-?}"
done
[ "$found" -eq 0 ] && echo "  (nothing running — start with: bash $SCRIPT_DIR/up.sh)"

echo
echo "Public URLs:"
if [ -s "$RUN/urls.txt" ]; then sed 's/^/  /' "$RUN/urls.txt"; else echo "  (none)"; fi
