#!/usr/bin/env bash
# Bring up every site listed in sites.conf: pull latest, serve each on its
# own localhost port, open a Cloudflare quick tunnel for the exposed ones,
# then print a table of public URLs. Safe to re-run any time.
set -eu

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(dirname "$SCRIPT_DIR")
SRV="${SRV:-$HOME/srv}"
SITES="$SRV/sites"
RUN="$SCRIPT_DIR/run"
LOGS="$SCRIPT_DIR/logs"
CONF="$SCRIPT_DIR/sites.conf"

for c in node cloudflared git; do
  command -v "$c" >/dev/null || { echo "Missing '$c'. Install with: pkg install ${c/node/nodejs}"; exit 1; }
done

mkdir -p "$SITES" "$RUN" "$LOGS"

# clear whatever we started previously (frees the ports, avoids duplicates)
bash "$SCRIPT_DIR/down.sh" >/dev/null 2>&1 || true

echo "==> Deploying from $CONF"
while read -r name source port expose subdir _rest || [ -n "${name:-}" ]; do
  [ -z "${name:-}" ] && continue
  case "$name" in \#*) continue ;; esac
  subdir="${subdir:-.}"; expose="${expose:-quick}"

  if [ "$source" = "self" ]; then
    sitedir="$REPO_ROOT/$subdir"
  else
    # a source may pin a branch as  <git-url>#<branch>  (default: the repo default)
    case "$source" in
      *'#'*) url="${source%%#*}"; branch="${source##*#}" ;;
      *)     url="$source";       branch="" ;;
    esac
    repodir="$SITES/$name"
    if [ -d "$repodir/.git" ]; then
      echo "  - $name: git pull${branch:+ ($branch)}"
      git -C "$repodir" fetch --depth 1 origin ${branch:+"$branch"} >/dev/null 2>&1 || true
      git -C "$repodir" reset --hard "origin/${branch:-HEAD}" >/dev/null 2>&1 \
        || git -C "$repodir" pull --ff-only \
        || echo "    (pull failed — serving existing checkout)"
    else
      echo "  - $name: git clone${branch:+ ($branch)}"
      git clone --depth 1 ${branch:+--branch "$branch"} "$url" "$repodir"
    fi
    sitedir="$repodir/$subdir"
  fi

  if [ ! -f "$sitedir/index.html" ]; then
    echo "    ! no index.html in $sitedir — skipping $name"; continue
  fi

  node "$SCRIPT_DIR/serve.cjs" "$sitedir" "$port" >"$LOGS/$name.server.log" 2>&1 &
  echo $! >"$RUN/$name.server.pid"
  echo "    $name -> 127.0.0.1:$port ($expose)"

  if [ "$expose" = "quick" ]; then
    : >"$LOGS/$name.tunnel.log"
    cloudflared tunnel --url "http://127.0.0.1:$port" >"$LOGS/$name.tunnel.log" 2>&1 &
    echo $! >"$RUN/$name.tunnel.pid"
  fi
done < "$CONF"

echo "==> Waiting for tunnels to come up..."
: >"$RUN/urls.txt"
for _ in $(seq 1 15); do
  sleep 2; missing=0
  for pidf in "$RUN"/*.tunnel.pid; do
    [ -e "$pidf" ] || continue
    n=$(basename "$pidf" .tunnel.pid)
    [ -f "$RUN/$n.url" ] && continue
    url=$(grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' "$LOGS/$n.tunnel.log" 2>/dev/null | head -1 || true)
    if [ -n "$url" ]; then echo "$url" >"$RUN/$n.url"; else missing=1; fi
  done
  [ "$missing" -eq 0 ] && break
done

echo
echo "=========================== LIVE ==========================="
for pidf in "$RUN"/*.server.pid; do
  [ -e "$pidf" ] || continue
  n=$(basename "$pidf" .server.pid)
  if [ -f "$RUN/$n.url" ]; then
    u=$(cat "$RUN/$n.url"); printf "  %-14s %s\n" "$n" "$u"
    printf "%-14s %s\n" "$n" "$u" >>"$RUN/urls.txt"
  else
    printf "  %-14s (local only)\n" "$n"
  fi
done
echo "============================================================"
echo "Leave this terminal running (screen can be off)."
echo "Stop everything:  bash $SCRIPT_DIR/down.sh      Status:  bash $SCRIPT_DIR/status.sh"

# keep the script in the foreground so closing it tears everything down cleanly
trap 'bash "$SCRIPT_DIR/down.sh" >/dev/null 2>&1 || true' INT TERM
echo "(Ctrl-C here stops all sites.)"
while :; do sleep 3600; done
