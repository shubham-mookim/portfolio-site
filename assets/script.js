/* =========================================================
   Shubham Mookim — Portfolio
   Data + interactions (vanilla JS, no build step)
   ========================================================= */

const DATA = {
  marqueeItems: [
    { text: 'Python', color: 'oklch(96% 0.02 75)' },
    { text: 'GPT-4o', color: 'oklch(78% 0.13 85)' },
    { text: 'FastAPI', color: 'oklch(96% 0.02 75)' },
    { text: 'AWS', color: 'oklch(78% 0.13 85)' },
    { text: 'React Native', color: 'oklch(96% 0.02 75)' },
    { text: 'Redis', color: 'oklch(78% 0.13 85)' },
    { text: 'LangChain', color: 'oklch(96% 0.02 75)' },
    { text: 'MongoDB', color: 'oklch(78% 0.13 85)' },
  ],
  stats: [
    { value: 140, suffix: 'x', label: 'Cache speedup shipped' },
    { value: 8, suffix: '+', label: 'Production microservices owned' },
    { value: 30, suffix: '+', label: 'Health metrics integrated' },
    { value: 6, suffix: '', label: 'Production systems shipped' },
  ],
  interests: ['AI Systems & LLM Engineering', 'Health Tech', 'System Design', 'Open Source', 'Guitar', 'Sports'],
  experience: [
    { period: 'Jan 2025 — Present', role: 'Software Developer, AI Systems', company: 'ForGood.ai', desc: 'Core engineer building GeneSilico, a precision-oncology platform. Own 8+ production microservices spanning multi-agent AI copilots, NL-to-SQL pipelines, automated QA agents, serverless transcription and OCR. Led HIPAA compliance and the full observability stack.' },
    { period: 'Oct — Dec 2024', role: 'AI Infrastructure Security Engineer', company: 'BrinxAI (Freelance)', desc: 'Designed and deployed OpenVPN to secure distributed AI compute nodes for a Cyprus-based AI infrastructure company. Hardened access controls and remediated network vulnerabilities.' },
    { period: 'Jul — Oct 2024', role: 'Mobile Development Intern', company: 'Houzee India', desc: 'Built cross-platform screens in React Native and TypeScript, with Express.js backend integrations for real-time data on a real-estate platform.' },
    { period: 'Apr — Jun 2023', role: 'ML Research Intern', company: 'STARC, PES University', desc: 'Built a computer-vision pipeline for cricket analytics — automated ball tracking, batsman detection and per-ball event extraction from match footage using OpenCV.' },
  ],
  projects: [
    { name: 'Patient OS v2', status: 'Production', year: '2025', blurb: 'Multi-agent AI copilot reasoning over genomics, documents, wearables and live literature for cancer patients.', metric: '140x', metricLabel: 'faster on cached context', stack: ['Python', 'GPT-4o', 'FastAPI', 'Redis Cluster', 'MongoDB', 'AWS'],
      points: [
        'ContextBudgetManager allocates a 60,000-character window across 6 prioritised sources with live redistribution.',
        'Redis-cached conversation compression: 3ms cache hits vs 420ms fresh generation.',
        'Parallel tool executor queries PubMed, CIViC, DrugBank and ClinicalTrials.gov in one pass.',
        'GPT-4o Vision reads scanned reports and food photos; SSE streams tokens and chart data together.',
      ] },
    { name: 'FairEdge Data Agent', status: 'Production', year: '2025', blurb: 'Enterprise NL-to-SQL agent — plain-English queries over large datasets, no SQL required.', metric: '<2s', metricLabel: 'end-to-end latency', stack: ['Python', 'Agno', 'LangChain', 'AWS Athena', 'Redis', 'Docker'],
      points: [
        'Guardrail agent screens for injection and out-of-scope queries before anything runs.',
        'Dynamic column-metadata fetch avoids hardcoded schema assumptions.',
        'SQL generated via LangChain, executed serverlessly on AWS Athena.',
        'Deployed live to an enterprise HR analytics client with multi-turn session memory.',
      ] },
    { name: 'QC Agent System', status: 'Internal', year: '2025', blurb: 'Three-agent pipeline that writes and verifies its own tests across React and React Native codebases.', metric: '3-agent', metricLabel: 'scan → generate → verify', stack: ['Python', 'LLM APIs', 'AST Analysis', 'FastAPI'],
      points: [
        'Scanner agent traverses the codebase, producing structured metadata per file.',
        'Generator agent writes unit, UI, functional and API tests from that metadata.',
        'Verification agent checks syntax and semantic correctness before acceptance.',
        'Removed manual test-case writing from the QA workflow entirely.',
      ] },
    { name: 'Medical Transcription Service', status: 'Production', year: '2025', blurb: 'Serverless pipeline turning recorded consultations into structured medical reports automatically.', metric: '8', metricLabel: 'independent CloudFormation stacks', stack: ['AWS SAM', 'Lambda', 'Kinesis Firehose', 'S3', 'CloudFormation'],
      points: [
        'Kinesis Firehose handles real-time audio chunking and transcription triggering.',
        'Dedicated Lambda functions per concern for fault isolation.',
        'NeuroGPT integration generates structured reports from raw transcript.',
        'Zero manual effort required from the clinician post-recording.',
      ] },
    { name: 'GeneSilico OCR Service', status: 'Production', year: '2025', blurb: 'Multi-modal extraction pipeline for medical Test Requisition Forms across PDFs, scans and docs.', metric: '2', metricLabel: 'vision models fused', stack: ['Gemini Vision', 'Mistral AI', 'FastAPI', 'PaddleOCR', 'MongoDB'],
      points: [
        'Gemini Vision handles visual understanding, Mistral AI structures the extracted text.',
        'PaddleOCR fallback catches low-quality scans; pdfplumber handles native PDFs.',
        'Outputs structured JSON for every TRF field — patient ID, test codes, clinical notes.',
      ] },
    { name: 'Cricket Analytics CV Pipeline', status: 'Research', year: '2023', blurb: 'Computer-vision system extracting ball tracking and match events straight from footage.', metric: '1', metricLabel: 'end-to-end CV pipeline', stack: ['Python', 'OpenCV', 'Google ML Tools', 'C++'],
      points: [
        'Automated ball tracking and batsman detection frame-by-frame.',
        'Per-ball event extraction from raw match footage.',
        'Built during an ML research internship at STARC, PES University.',
      ] },
  ],
  skillGroups: [
    { title: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash', 'C++'] },
    { title: 'AI / ML', items: ['GPT-4o', 'LangChain', 'Agno', 'Gemini Vision', 'Mistral AI', 'PaddleOCR'] },
    { title: 'Infra & Backend', items: ['AWS', 'FastAPI', 'Redis', 'MongoDB', 'Docker', 'Kinesis'] },
    { title: 'Observability', items: ['PostHog', 'DataDog RUM', 'Prometheus', 'Grafana', 'LangSmith'] },
  ],
  education: [
    { period: '2021 — 2025', school: 'PES University', detail: 'B.Tech, Electronics & Communications Engineering — Minor in Computer Science.' },
    { period: '2018 — 2021', school: 'National Centre For Excellence', detail: 'Secondary Education (CBSE) — 92.3%, Merit Scholarship.' },
  ],
  honors: [
    { year: '2019', title: 'Merit Scholarship', detail: 'National Centre For Excellence, for 92.3% in CBSE boards.' },
    { year: '2023', title: 'Top 5 Teams — Qubitrix Hackathon', detail: 'Out of 30 competing teams at PES University.' },
  ],
  languagesSpoken: ['English — Fluent', 'Hindi — Fluent', 'Kannada — Basic'],
  roles: ['multi-agent context architectures', 'production AI at oncology scale', 'novel retrieval systems', 'the boring infra nobody researches'],
  tickerItems: ['Patient OS v2', 'FairEdge Data Agent', 'QC Agent System', 'Medical Transcription', 'GeneSilico OCR', 'Cricket CV Pipeline'],
  navSections: ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'],
  orbs: [
    { left: '10%', top: '10%', size: '90px', depth: 0.5, duration: '7s', delay: '-1s', gradient: 'radial-gradient(circle at 32% 28%, oklch(94% 0.06 85), oklch(78% 0.13 85) 55%, oklch(60% 0.12 80) 100%)' },
    { left: '38%', top: '4%', size: '56px', depth: 0.9, duration: '6s', delay: '-3s', gradient: 'radial-gradient(circle at 32% 28%, oklch(90% 0.02 75), oklch(78% 0.02 75) 55%, oklch(60% 0.02 75) 100%)' },
    { left: '4%', top: '40%', size: '130px', depth: 0.25, duration: '9s', delay: '-2s', gradient: 'radial-gradient(circle at 32% 28%, oklch(74% 0.17 30), oklch(58% 0.19 29) 55%, oklch(42% 0.16 28) 100%)' },
    { left: '44%', top: '30%', size: '80px', depth: 0.7, duration: '8s', delay: '-4s', gradient: 'radial-gradient(circle at 32% 28%, oklch(50% 0.08 250), oklch(20% 0.05 255) 55%, oklch(12% 0.04 255) 100%)' },
    { left: '18%', top: '58%', size: '100px', depth: 0.4, duration: '7.5s', delay: '-0.5s', gradient: 'radial-gradient(circle at 32% 28%, oklch(94% 0.06 85), oklch(78% 0.13 85) 55%, oklch(60% 0.12 80) 100%)' },
    { left: '46%', top: '12%', size: '46px', depth: 1.0, duration: '5s', delay: '-2.5s', gradient: 'radial-gradient(circle at 32% 28%, oklch(80% 0.17 32), oklch(58% 0.19 29) 55%, oklch(42% 0.16 28) 100%)' },
    { left: '40%', top: '62%', size: '64px', depth: 0.6, duration: '6.5s', delay: '-1.5s', gradient: 'radial-gradient(circle at 32% 28%, oklch(90% 0.02 75), oklch(78% 0.02 75) 55%, oklch(60% 0.02 75) 100%)' },
    { left: '22%', top: '78%', size: '54px', depth: 0.8, duration: '7s', delay: '-3.5s', gradient: 'radial-gradient(circle at 32% 28%, oklch(50% 0.08 250), oklch(20% 0.05 255) 55%, oklch(12% 0.04 255) 100%)' },
    { left: '8%', top: '82%', size: '44px', depth: 0.9, duration: '5.5s', delay: '-4.5s', gradient: 'radial-gradient(circle at 32% 28%, oklch(74% 0.17 30), oklch(58% 0.19 29) 55%, oklch(42% 0.16 28) 100%)' },
  ],
};

/* ---------- tiny DOM helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, props = {}, children = []) => {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'style') node.style.cssText = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) node.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
};

/* ---------- render dynamic lists ---------- */
function renderLists() {
  // marquee (duplicated for seamless loop)
  const marquee = $('#marquee-track');
  [...DATA.marqueeItems, ...DATA.marqueeItems].forEach(m => {
    marquee.appendChild(el('span', { text: m.text, style: `color:${m.color};` }));
  });

  // hero side ticker (duplicated)
  const ticker = $('#hero-ticker-track');
  [...DATA.tickerItems, ...DATA.tickerItems].forEach(t => {
    ticker.appendChild(el('span', { text: t }));
  });

  // orbs
  const orbTilt = $('#orb-tilt');
  DATA.orbs.forEach(orb => {
    const wrap = el('div', {
      class: 'orb',
      'data-depth': orb.depth,
      style: `left:${orb.left}; top:${orb.top}; width:${orb.size}; height:${orb.size};`,
    }, [
      el('div', {
        class: 'orb-ball',
        style: `background:${orb.gradient}; animation: floatY ${orb.duration} ease-in-out infinite; animation-delay:${orb.delay};`,
      }),
    ]);
    orbTilt.appendChild(wrap);
  });

  // nav dots
  const nav = $('#dot-nav');
  DATA.navSections.forEach(id => {
    nav.appendChild(el('a', { href: '#' + id, title: id, 'data-section': id, 'data-cursor-hover': '', 'aria-label': id }));
  });

  // stats
  const stats = $('#stats');
  DATA.stats.forEach(s => {
    stats.appendChild(el('div', {}, [
      el('div', { class: 'stat-value', text: '0', 'data-counter': '', 'data-target': s.value, 'data-suffix': s.suffix }),
      el('div', { class: 'stat-label', text: s.label }),
    ]));
  });

  // interests
  const interests = $('#interests');
  DATA.interests.forEach(it => interests.appendChild(el('span', { text: it })));

  // experience timeline
  const timeline = $('#timeline');
  DATA.experience.forEach((job, idx) => {
    timeline.appendChild(el('div', { class: 'job', 'data-reveal': '', style: `transition-delay:${idx * 0.09}s;` }, [
      el('div', { class: 'job-dot' }),
      el('div', { class: 'job-period', text: job.period }),
      el('div', { class: 'job-head' }, [
        el('span', { class: 'job-role', text: job.role }),
        el('span', { class: 'job-company', text: job.company }),
      ]),
      el('p', { class: 'job-desc', text: job.desc }),
    ]));
  });

  // projects
  const scroll = $('#project-scroll');
  DATA.projects.forEach((p, idx) => {
    const card = el('div', { class: 'project-card', 'data-cursor-hover': '', tabindex: '0', role: 'button', 'aria-label': `Open details for ${p.name}` }, [
      el('div', { class: 'project-card-top' }, [
        el('span', { class: 'project-status', text: p.status }),
        el('span', { class: 'project-year', text: p.year }),
      ]),
      el('h3', { text: p.name }),
      el('p', { class: 'project-blurb', text: p.blurb }),
      el('div', { class: 'project-metric', text: p.metric }),
      el('div', { class: 'project-metric-label', text: p.metricLabel }),
    ]);
    card.addEventListener('click', () => openProject(idx));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(idx); } });
    scroll.appendChild(card);
  });

  // skills
  const skillGrid = $('#skill-grid');
  DATA.skillGroups.forEach((grp, idx) => {
    skillGrid.appendChild(el('div', { class: 'skill-group', 'data-reveal': '', style: `transition-delay:${idx * 0.08}s;` }, [
      el('div', { class: 'skill-group-title', text: grp.title }),
      el('div', { class: 'skill-tags' }, grp.items.map(sk => el('span', { text: sk }))),
    ]));
  });

  // education
  const eduList = $('#education-list');
  DATA.education.forEach(ed => {
    eduList.appendChild(el('div', { class: 'edu-item' }, [
      el('div', { class: 'edu-period', text: ed.period }),
      el('div', { class: 'edu-school', text: ed.school }),
      el('div', { class: 'edu-detail', text: ed.detail }),
    ]));
  });

  // honors
  const honorsList = $('#honors-list');
  DATA.honors.forEach(h => {
    honorsList.appendChild(el('div', { class: 'honor-item' }, [
      el('div', { class: 'honor-year', text: h.year }),
      el('div', { class: 'honor-title', text: h.title }),
      el('div', { class: 'honor-detail', text: h.detail }),
    ]));
  });

  // languages
  const languages = $('#languages');
  DATA.languagesSpoken.forEach(l => languages.appendChild(el('span', { text: l })));
}

/* ---------- rotating role word ---------- */
function startRoleRotation() {
  const node = $('#current-role');
  if (!node) return;
  let i = 0;
  setInterval(() => {
    node.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % DATA.roles.length;
      node.textContent = DATA.roles[i];
      node.classList.remove('swap');
    }, 350);
  }, 2600);
}

/* ---------- project modal ---------- */
const overlay = () => $('#modal-overlay');
let lastFocused = null;

function openProject(idx) {
  const p = DATA.projects[idx];
  if (!p) return;
  lastFocused = document.activeElement;
  $('#modal-status').textContent = p.status;
  $('#modal-year').textContent = p.year;
  $('#modal-title').textContent = p.name;
  $('#modal-blurb').textContent = p.blurb;

  const points = $('#modal-points');
  points.innerHTML = '';
  p.points.forEach(pt => {
    points.appendChild(el('div', { class: 'modal-point' }, [
      el('div', { class: 'modal-point-dot' }),
      el('div', { class: 'modal-point-text', text: pt }),
    ]));
  });

  const stack = $('#modal-stack');
  stack.innerHTML = '';
  p.stack.forEach(st => stack.appendChild(el('span', { text: st })));

  const ov = overlay();
  ov.hidden = false;
  requestAnimationFrame(() => ov.classList.add('open'));
  document.body.style.overflow = 'hidden';
  $('#modal-close').focus();
}

function closeProject() {
  const ov = overlay();
  ov.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { ov.hidden = true; }, 250);
  if (lastFocused) lastFocused.focus();
}

function wireModal() {
  $('#modal-close').addEventListener('click', closeProject);
  overlay().addEventListener('click', e => { if (e.target === overlay()) closeProject(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay().hidden) closeProject();
  });
}

/* ---------- cursor dot (lerped trailing) ---------- */
function wireCursor() {
  const dot = $('#cursor-dot');
  if (!dot || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;   // target
  let cx = tx, cy = ty;                                          // current
  let visible = false, running = false;
  const half = () => (dot.offsetWidth || 16) / 2;

  const loop = () => {
    cx += (tx - cx) * 0.18;   // easing toward target = smooth trail
    cy += (ty - cy) * 0.18;
    dot.style.transform = `translate(${cx - half()}px, ${cy - half()}px)`;
    running = Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1;
    if (running) requestAnimationFrame(loop);
  };
  const kick = () => { if (!running) { running = true; requestAnimationFrame(loop); } };

  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if (!visible) { visible = true; dot.style.opacity = '1'; }
    kick();
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; visible = false; });

  const grow = () => { dot.style.width = '44px'; dot.style.height = '44px'; dot.style.background = 'oklch(78% 0.13 85 / 0.85)'; };
  const shrink = () => { dot.style.width = '16px'; dot.style.height = '16px'; dot.style.background = 'oklch(58% 0.19 29)'; };
  // delegate so dynamically-added elements are covered
  document.addEventListener('mouseover', e => { if (e.target.closest('[data-cursor-hover]')) grow(); });
  document.addEventListener('mouseout', e => { if (e.target.closest('[data-cursor-hover]')) shrink(); });
}

/* ---------- reveal on scroll ---------- */
function wireReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(elm => obs.observe(elm));
}

/* ---------- animated counters ---------- */
function wireCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = parseInt(node.getAttribute('data-target'), 10);
      const suffix = node.getAttribute('data-suffix') || '';
      const start = performance.now();
      const dur = 1200;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        node.textContent = Math.round(target * p) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      obs.unobserve(node);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-counter]').forEach(n => obs.observe(n));
}

/* ---------- section spy for nav dots ---------- */
function wireSectionSpy() {
  const dots = new Map();
  document.querySelectorAll('#dot-nav a').forEach(a => dots.set(a.getAttribute('data-section'), a));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      dots.forEach(a => a.classList.remove('active'));
      const active = dots.get(entry.target.id);
      if (active) active.classList.add('active');
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
}

/* ---------- hero tilt + parallax + scroll ---------- */
function wireHero() {
  const heroEl = $('#hero');
  const tiltEl = $('#orb-tilt');
  const orbEls = Array.from(document.querySelectorAll('.orb'));
  const heroName = $('#hero-name');
  const orbCol = $('#hero-orbs-col');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroEl && tiltEl && !reduced && !matchMedia('(pointer: coarse)').matches) {
    let nx = 0, ny = 0, tilting = false;
    const applyTilt = () => {
      tiltEl.style.transform = `rotateY(${nx * 5}deg) rotateX(${-ny * 5}deg)`;
      orbEls.forEach(o => {
        const depth = parseFloat(o.getAttribute('data-depth')) || 1;
        o.style.transform = `translate(${nx * depth * 12}px, ${ny * depth * 12}px)`;
      });
      tilting = false;
    };
    heroEl.addEventListener('mousemove', e => {
      const rect = heroEl.getBoundingClientRect();
      nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!tilting) { tilting = true; requestAnimationFrame(applyTilt); }
    });
  }

  if (heroEl && orbCol && !reduced) {
    let ticking = false;
    const render = () => {
      const h = heroEl.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      orbCol.style.transform = `translateY(${p * 40}px) scale(${1 + p * 0.15})`;
      orbCol.style.opacity = String(1 - p * 1.1);
      if (heroName) heroName.style.transform = `translateY(${-p * 30}px) scale(${1 + p * 0.05})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(render); }
    }, { passive: true });
    render();
  }
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderLists();
  startRoleRotation();
  wireModal();
  wireCursor();
  wireReveal();
  wireCounters();
  wireSectionSpy();
  wireHero();
});
