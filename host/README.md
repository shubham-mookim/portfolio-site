# Phone host — self-hosting multiple static sites from Termux

A tiny control layer for serving several static sites/experiments from an
Android phone (Termux) and exposing them through Cloudflare, organized so
adding a new site is a one-line change.

## Layout on the phone

```
~/srv/
  portfolio/           this repo (the control layer lives in host/)
    host/
      serve.js         one secure static server (serves any folder)
      sites.conf       the manifest — list every site here
      up.sh            pull + serve + tunnel everything, print URLs
      down.sh          stop everything
      status.sh        show what's running + current URLs
  sites/               other site repos are auto-cloned here
    <name>/
```

`host/run/` (pids, current URLs) and `host/logs/` are generated at runtime and
git-ignored.

## First-time setup (or after a phone reboot)

```bash
pkg install nodejs cloudflared git          # one time only
mkdir -p ~/srv && cd ~/srv
git clone https://github.com/shubham-mookim/portfolio-site.git portfolio 2>/dev/null || git -C portfolio pull --ff-only
bash portfolio/host/up.sh
```

`up.sh` prints a table of live URLs. Leave the terminal running (screen can be
off). Lock the phone — it keeps serving. Only force-closing Termux stops it.

## Everyday commands

```bash
cd ~/srv/portfolio
bash host/up.sh        # (re)deploy everything and print URLs
bash host/status.sh    # what's running + URLs
bash host/down.sh      # stop everything
tail -f host/logs/portfolio.tunnel.log   # watch a specific tunnel
```

## Add another site

1. Push the site to its own GitHub repo (must have an `index.html`).
2. Add one line to `host/sites.conf`:
   ```
   labs   https://github.com/shubham-mookim/labs.git   8081   quick   .
   ```
   (`name  source  port  expose  subdir` — give each site a unique port.)
3. Commit + push this repo, then on the phone: `git pull && bash host/up.sh`.

`source` can be `self` (serve this repo's own root) or any git URL.
`expose` is `quick` (public Cloudflare URL) or `none` (local only).

## Security

- Every server binds to `127.0.0.1` only — nothing is exposed on your LAN.
- Cloudflare tunnels are **outbound-only**: no router ports opened, no inbound
  firewall holes.
- The server serves only its site folder, and refuses `../` traversal and
  dotfiles (so `.git` and friends can never be fetched).

## Caveats and the next step

`quick` tunnels are account-less: each URL is **random and changes every time
you restart**, and they carry no uptime guarantee. Fine for experiments.

For **stable URLs on your own domain** that survive restarts (e.g.
`portfolio.example.com`, `labs.example.com`), switch to a **named Cloudflare
tunnel**: create it once against your Cloudflare account + domain, add ingress
rules mapping each hostname to a local port, and run `cloudflared tunnel run`
instead of the quick tunnels. The directory layout and ports here already line
up with that — it's a config swap, not a rewrite. Ask and it can be wired up.

## Why not a GitHub Action deploys to the phone?

A GitHub-hosted runner can't reach a phone behind home NAT, and the runner
binary doesn't run on Termux. The working pattern is **pull-based**: push to
GitHub, then on the phone `git pull && bash host/up.sh`. With a named tunnel
(stable URLs) this can be automated with a periodic pull loop.
