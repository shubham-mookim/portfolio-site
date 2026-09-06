export const experience = [
  { when: 'Jan 2025 — now', depth: '−3,800 m',
    role: 'Software Developer, AI Systems', where: 'ForGood.ai',
    desc: 'Core engineer on GeneSilico, a precision-oncology platform. I own 8+ production microservices — multi-agent copilots, NL-to-SQL pipelines, automated QA agents, serverless transcription and OCR — and led HIPAA compliance and the observability stack.',
    tags: ['Multi-agent systems', 'Context architecture', 'HIPAA', 'Observability'] },
  { when: 'Oct — Dec 2024', depth: '−1,400 m',
    role: 'AI Infrastructure Security Engineer', where: 'BrinxAI · freelance',
    desc: 'Designed and deployed OpenVPN to secure distributed AI compute nodes for a Cyprus-based infrastructure company. Hardened access controls and closed network vulnerabilities across the fleet.',
    tags: ['OpenVPN', 'Network security', 'Distributed compute'] },
  { when: 'Jul — Oct 2024', depth: '−600 m',
    role: 'Mobile Development Intern', where: 'Houzee India',
    desc: 'Cross-platform screens in React Native and TypeScript, wired to Express.js services for real-time data on a real-estate platform.',
    tags: ['React Native', 'TypeScript', 'Express.js'] },
  { when: 'Apr — Jun 2023', depth: '−200 m',
    role: 'ML Research Intern', where: 'STARC, PES University',
    desc: 'A computer-vision pipeline for cricket analytics — ball tracking, batsman detection and per-ball event extraction straight from match footage.',
    tags: ['OpenCV', 'Computer vision', 'Research'] },
];

export const education = [
  { when: '2021 — 2025', title: 'PES University',
    detail: 'B.Tech, Electronics & Communications Engineering. Minor in Computer Science.' },
  { when: '2018 — 2021', title: 'National Centre For Excellence',
    detail: 'CBSE secondary education — 92.3%, merit scholarship.' },
];

export const honors = [
  { when: '2023', title: 'Top 5 — Qubitrix Hackathon', detail: 'Out of 30 teams at PES University.' },
  { when: '2019', title: 'Merit Scholarship', detail: 'National Centre For Excellence, for 92.3% in the CBSE boards.' },
];

export const kit = [
  { title: 'Languages',        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash', 'C++'] },
  { title: 'AI / ML',          items: ['GPT-4o', 'LangChain', 'Agno', 'Gemini Vision', 'Mistral AI', 'PaddleOCR'] },
  { title: 'Infra & backend',  items: ['AWS', 'FastAPI', 'Redis', 'MongoDB', 'Docker', 'Kinesis'] },
  { title: 'Observability',    items: ['PostHog', 'DataDog RUM', 'Prometheus', 'Grafana', 'LangSmith'] },
];

/* How I actually work — the part a skills list never says. */
export const principles = [
  { n: '01', head: 'The failure mode sets the bar',
    body: 'A recommendation engine that is wrong costs a click. A patient copilot that is wrong costs something else. I let the consequence of being wrong decide how much rigour a system gets, rather than spreading it evenly.' },
  { n: '02', head: 'Budget the context, do not fill it',
    body: 'Most agent systems fail because everything is shoved into the window until something falls out. Deciding what deserves to persist, surface, or disappear is the actual engineering.' },
  { n: '03', head: 'Own it in production or you did not build it',
    body: 'I would rather run eight services I understand at 3 a.m. than hand off twelve I do not. Observability goes in before the feature, not after the incident.' },
  { n: '04', head: 'The boring infrastructure is the research',
    body: 'Caching, retries, schema drift, fallbacks for bad scans. Nobody writes papers about them and they are what separates a demo from a system.' },
];
