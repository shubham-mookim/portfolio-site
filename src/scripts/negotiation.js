/* =========================================================
   negotiation.js — a live, simplified model of the bilateral
   compute market from the Agent Compute Negotiation research.

   Nine agents, three intelligence tiers. Each round pairs two
   at random and runs an alternating-offer bargain. A tier differs
   only in where it opens and how fast it concedes.

   Scope: this shows the *mechanism* behind F2 — the agent that will
   not concede ends up with the most surplus. It is not a reproduction
   of the paper. The real strategy matrix deadlocks far more often
   than this toy does; parameters here are tuned so tier inversion is
   visible within about a minute of watching.
   ========================================================= */

/* A tier differs in two ways only: where it opens, and how fast it concedes.
   `open` is the buyer's first bid; a seller of the same tier opens at 1 − open.
   Greedy opens close to a price it would actually accept, then refuses to move. */
const TIERS = [
  { id: 'rule', name: 'Rule-based', short: 'Greedy', color: '#63e6d2', open: 0.30, concede: 0.01 },
  { id: 'rl',   name: 'Q-learning', short: 'RL',     color: '#8ab4ff', open: 0.24, concede: 0.22 },
  { id: 'llm',  name: 'LLM',        short: 'LLM',    color: '#ffb27a', open: 0.10, concede: 0.34 },
];

const MAX_STEPS = 8;      // offers before the pair gives up
const ROUND_MS  = 1300;   // wall-clock time per *animated* negotiation
/* The market runs faster than the animation can show. Each animated bargain is
   one sampled round; this many more are settled silently alongside it, so the
   tier ordering separates in about twenty seconds instead of three minutes. */
const SILENT_PER_ROUND = 11;

const rnd = (a, b) => a + Math.random() * (b - a);

export function initNegotiation(root) {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- state ---------- */
  let agents = [];
  let pair = null, phase = 0, deals = 0, deadlocks = 0;
  let running = false, raf = null, last = 0, acc = 0;

  function reset() {
    agents = [];
    TIERS.forEach((t, ti) => {
      for (let i = 0; i < 3; i++) {
        agents.push({ tier: t, ti, wealth: 0, flash: 0, idx: agents.length });
      }
    });
    pair = null; phase = 0; deals = 0; deadlocks = 0;
    newRound();
  }

  /* One alternating-offer bargain, run to completion. Pure — the animation
     just replays the offer track it returns. */
  function bargain(buyer, seller) {
    let bid = buyer.tier.open * rnd(0.95, 1.05);
    let ask = (1 - seller.tier.open) * rnd(0.95, 1.05);
    const bidCap   = rnd(0.68, 0.82);  // the most this buyer would ever pay
    const askFloor = rnd(0.18, 0.32);  // the least this seller would ever take

    const track = [];
    let struck = false, price = 0, steps = 0;

    for (let s = 0; s < MAX_STEPS; s++) {
      steps = s + 1;
      track.push({ bid, ask });
      if (bid >= ask) { struck = true; price = (bid + ask) / 2; break; }
      bid = Math.min(bidCap,   bid + (bidCap - bid)   * buyer.tier.concede);
      ask = Math.max(askFloor, ask - (ask - askFloor) * seller.tier.concede);
    }
    track.push({ bid, ask });

    // each side banks the distance between the price and its own reservation:
    // hold firm and the price lands near your number. That is all F2 is.
    let bGain = 0, sGain = 0;
    if (struck) {
      const span = Math.max(0.05, bidCap - askFloor);
      bGain = Math.max(0, Math.min(1, (bidCap - price) / span));
      sGain = Math.max(0, Math.min(1, (price - askFloor) / span));
    }
    return { track, struck, steps, bGain, sGain };
  }

  function twoAgents() {
    const a = Math.floor(Math.random() * agents.length);
    let b = Math.floor(Math.random() * agents.length);
    while (b === a) b = Math.floor(Math.random() * agents.length);
    return [agents[a], agents[b]];
  }

  function apply(buyer, seller, r) {
    if (r.struck) {
      deals++;
      buyer.wealth  += r.bGain;
      seller.wealth += r.sGain;
    } else {
      deadlocks++;
    }
  }

  function newRound() {
    const [buyer, seller] = twoAgents();
    pair = { buyer, seller, ...bargain(buyer, seller), settled: false };
    phase = 0;
  }

  function settle() {
    if (!pair || pair.settled) return;
    pair.settled = true;

    apply(pair.buyer, pair.seller, pair);
    if (pair.struck) pair.buyer.flash = pair.seller.flash = 1;

    // the rest of the market's round, settled without an animation
    for (let i = 0; i < SILENT_PER_ROUND; i++) {
      const [b, s] = twoAgents();
      apply(b, s, bargain(b, s));
    }
    paintStats();
  }

  /* ---------- readouts ---------- */
  const elDeals = root.querySelector('[data-deals]');
  const elDead  = root.querySelector('[data-deadlocks]');
  const bars    = TIERS.map((t) => root.querySelector(`[data-bar="${t.id}"]`));
  const vals    = TIERS.map((t) => root.querySelector(`[data-val="${t.id}"]`));

  function paintStats() {
    const total = deals + deadlocks;
    const pct = total ? Math.round((deadlocks / total) * 100) : 0;
    if (elDeals) elDeals.textContent = String(deals);
    if (elDead)  elDead.textContent  = `${pct}%`;

    const means = TIERS.map((t) => {
      const g = agents.filter((a) => a.tier.id === t.id);
      return g.reduce((s, a) => s + a.wealth, 0) / g.length;
    });
    const top = Math.max(0.001, ...means);
    means.forEach((m, i) => {
      if (bars[i]) bars[i].style.width = `${(m / top) * 100}%`;
      if (vals[i]) vals[i].textContent = m.toFixed(1);
    });
  }

  /* ---------- drawing ---------- */
  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function nodeAt(i) {
    const n = agents.length;
    const cx = W / 2, cy = H / 2;
    const r = Math.min(W, H) * 0.36;
    const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r };
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    if (!pair) return;

    const A = nodeAt(pair.buyer.idx);
    const B = nodeAt(pair.seller.idx);

    // the live bargain: two markers converging along the chord
    const p = Math.min(1, phase);
    const step = Math.min(pair.track.length - 1, p * (pair.track.length - 1));
    const i0 = Math.floor(step), i1 = Math.min(pair.track.length - 1, i0 + 1);
    const f = step - i0;
    const bid = pair.track[i0].bid + (pair.track[i1].bid - pair.track[i0].bid) * f;
    const ask = pair.track[i0].ask + (pair.track[i1].ask - pair.track[i0].ask) * f;

    const lerp = (u) => ({ x: A.x + (B.x - A.x) * u, y: A.y + (B.y - A.y) * u });

    // the chord
    ctx.strokeStyle = 'rgba(234,244,246,.12)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();

    // the contested gap between bid and ask
    const pb = lerp(bid), pa = lerp(ask);
    const closed = pair.struck && p >= 0.985;
    ctx.strokeStyle = closed ? 'rgba(99,230,210,.85)'
                    : (p >= 0.985 ? 'rgba(255,120,120,.6)' : 'rgba(234,244,246,.30)');
    ctx.lineWidth = closed ? 2.5 : 1.5;
    if (!closed && p >= 0.985) ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(pb.x, pb.y); ctx.lineTo(pa.x, pa.y); ctx.stroke();
    ctx.setLineDash([]);

    // the two offers
    [[pb, pair.buyer], [pa, pair.seller]].forEach(([pt, ag]) => {
      ctx.fillStyle = ag.tier.color;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, 3.2, 0, 7); ctx.fill();
    });

    // agents
    agents.forEach((ag, i) => {
      const n = nodeAt(i);
      const active = pair && (ag === pair.buyer || ag === pair.seller);
      const r = 5 + Math.min(11, ag.wealth * 0.85);

      if (ag.flash > 0.01) {
        ctx.fillStyle = ag.tier.color;
        ctx.globalAlpha = ag.flash * 0.22;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 16 * (1 - ag.flash), 0, 7); ctx.fill();
        ctx.globalAlpha = 1;
        ag.flash *= 0.94;
      }

      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 7);
      ctx.fillStyle = active ? ag.tier.color : 'rgba(6,22,32,.9)';
      ctx.fill();
      ctx.strokeStyle = ag.tier.color;
      ctx.globalAlpha = active ? 1 : 0.5;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // round label
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(234,244,246,.42)';
    ctx.textAlign = 'center';
    const label = p < 0.985
      ? `${pair.buyer.tier.short} ↔ ${pair.seller.tier.short} · round ${Math.min(pair.steps, i0 + 1)}`
      : (pair.struck ? 'DEAL' : 'DEADLOCK');
    ctx.fillStyle = p < 0.985 ? 'rgba(234,244,246,.42)'
                  : (pair.struck ? '#63e6d2' : 'rgba(255,120,120,.9)');
    ctx.fillText(label, W / 2, H / 2 + 4);
  }

  function frame(now) {
    if (!running) return;
    const dt = last ? Math.min(64, now - last) : 16;
    last = now;
    acc += dt;

    phase = Math.min(1.15, acc / (ROUND_MS * 0.78));
    if (phase >= 1 && pair && !pair.settled) settle();
    if (acc >= ROUND_MS) { acc = 0; newRound(); }

    draw(now);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true; last = 0;
    raf = requestAnimationFrame(frame);
    root.dataset.running = 'true';
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    root.dataset.running = 'false';
  }

  /* ---------- wiring ---------- */
  const ro = new ResizeObserver(() => { resize(); draw(0); });
  ro.observe(canvas);
  resize();
  reset();
  paintStats();
  draw(0);

  root.querySelector('[data-toggle]')?.addEventListener('click', (e) => {
    running ? stop() : start();
    e.currentTarget.textContent = running ? 'Pause' : 'Play';
  });
  root.querySelector('[data-reset]')?.addEventListener('click', () => {
    reset(); paintStats(); draw(0);
  });

  // only run while it is actually on screen
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !reduced) start();
    else stop();
  }, { threshold: 0.25 }).observe(root);

  return { stop };
}
