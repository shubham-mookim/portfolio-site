export type Project = {
  slug: string; name: string; status: string; year: string;
  blurb: string; metric: string; metricLabel: string;
  depth: string;            // where it sits on the axis, for flavour
  stack: string[];
  problem: string;
  points: { head: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'patient-os',
    name: 'Patient OS v2',
    status: 'Production', year: '2025',
    blurb: 'A multi-agent copilot reasoning across genomics, documents, wearables and live literature — for people with cancer.',
    metric: '140×', metricLabel: 'faster on cached context',
    depth: '−3,800 m',
    stack: ['Python', 'GPT-4o', 'FastAPI', 'Redis Cluster', 'MongoDB', 'AWS'],
    problem:
      'A cancer patient’s context does not fit in a context window. Genomic reports, years of scanned documents, daily wearable telemetry and a moving front of published literature all matter at once — and the wrong answer is not a bad demo, it is a person making a decision on bad information.',
    points: [
      { head: 'A budget, not a prompt',
        body: 'ContextBudgetManager allocates a 60,000-character window across six prioritised sources and redistributes live as the conversation moves. Sources that go quiet give their allocation back.' },
      { head: 'Compression that stays warm',
        body: 'Conversation compression is cached in Redis: 3 ms on a hit against 420 ms to regenerate. That is the 140× — and it is what makes multi-turn feel instant instead of thoughtful-and-slow.' },
      { head: 'Four sources, one pass',
        body: 'A parallel tool executor queries PubMed, CIViC, DrugBank and ClinicalTrials.gov concurrently rather than in sequence, so breadth costs latency once instead of four times.' },
      { head: 'It reads what it is handed',
        body: 'GPT-4o Vision ingests scanned reports and food photographs. SSE streams tokens and chart data down the same channel, so the interface builds itself as the answer arrives.' },
    ],
  },
  {
    slug: 'fairedge',
    name: 'FairEdge Data Agent',
    status: 'Production', year: '2025',
    blurb: 'An enterprise NL-to-SQL agent. Plain English in, correct answers over large datasets out — no SQL required.',
    metric: '< 2 s', metricLabel: 'end to end',
    depth: '−2,400 m',
    stack: ['Python', 'Agno', 'LangChain', 'AWS Athena', 'Redis', 'Docker'],
    problem:
      'Analysts wait on engineers to answer questions the data already contains. Letting a model write SQL against production removes the wait and introduces a much worse problem: a confident query that is wrong, or hostile.',
    points: [
      { head: 'Guardrails run first',
        body: 'A dedicated guardrail agent screens every question for prompt injection and out-of-scope intent before a single query is planned, let alone executed.' },
      { head: 'No hardcoded schema',
        body: 'Column metadata is fetched at query time. Schemas drift; an agent that memorised them silently rots. This one asks.' },
      { head: 'Serverless execution',
        body: 'SQL is generated through LangChain and executed on AWS Athena, so cost tracks usage rather than uptime.' },
      { head: 'Shipped, not demoed',
        body: 'Live with an enterprise HR analytics client, holding multi-turn session memory across a working conversation.' },
    ],
  },
  {
    slug: 'qc-agents',
    name: 'QC Agent System',
    status: 'Internal', year: '2025',
    blurb: 'Three agents that write the test suite for React and React Native codebases — then check their own work.',
    metric: '3', metricLabel: 'agents: scan → generate → verify',
    depth: '−1,900 m',
    stack: ['Python', 'LLM APIs', 'AST analysis', 'FastAPI'],
    problem:
      'Test writing is the work engineers postpone most reliably. A model that generates tests is easy; a model whose tests actually compile and mean something is the whole problem.',
    points: [
      { head: 'Scan',
        body: 'An agent walks the codebase and emits structured metadata per file — exports, props, call graph, side effects — instead of dumping source into a prompt.' },
      { head: 'Generate',
        body: 'A second agent writes unit, UI, functional and API tests from that metadata, so it is reasoning over structure rather than guessing from text.' },
      { head: 'Verify',
        body: 'A third agent checks syntax and semantic correctness before anything is accepted. The pipeline refuses its own bad output.' },
      { head: 'Outcome',
        body: 'Manual test-case writing left the QA workflow entirely.' },
    ],
  },
  {
    slug: 'transcription',
    name: 'Medical Transcription',
    status: 'Production', year: '2025',
    blurb: 'A serverless pipeline turning a recorded consultation into a structured medical report, with nothing asked of the clinician.',
    metric: '8', metricLabel: 'independent CloudFormation stacks',
    depth: '−3,100 m',
    stack: ['AWS SAM', 'Lambda', 'Kinesis Firehose', 'S3', 'CloudFormation'],
    problem:
      'Clinicians write notes after the patient leaves, from memory, at the end of a long day. The recording already exists. Everything between the recording and the report is undifferentiated work.',
    points: [
      { head: 'Real-time chunking',
        body: 'Kinesis Firehose handles audio chunking and triggers transcription as the consultation happens, not after it.' },
      { head: 'One Lambda per concern',
        body: 'Eight independent stacks mean a failure stays where it happened instead of taking the pipeline with it.' },
      { head: 'Structure at the end',
        body: 'NeuroGPT turns the raw transcript into a structured report against the fields the record actually needs.' },
      { head: 'Zero post-effort',
        body: 'The clinician stops recording. That is the last action required of them.' },
    ],
  },
  {
    slug: 'ocr',
    name: 'GeneSilico OCR',
    status: 'Production', year: '2025',
    blurb: 'Multi-modal extraction for medical Test Requisition Forms — native PDFs, bad scans, photographs of paper.',
    metric: '2', metricLabel: 'vision models fused',
    depth: '−2,700 m',
    stack: ['Gemini Vision', 'Mistral AI', 'FastAPI', 'PaddleOCR', 'MongoDB'],
    problem:
      'A requisition form arrives as a clean PDF, a fax of a fax, or a photograph taken at an angle in bad light. All three have to produce the same structured record.',
    points: [
      { head: 'Vision, then structure',
        body: 'Gemini Vision does the visual understanding; Mistral turns what comes back into structure. Splitting the two makes each replaceable.' },
      { head: 'Fallbacks that matter',
        body: 'PaddleOCR catches degraded scans and pdfplumber takes the native PDFs, so the expensive path is only used where it earns its cost.' },
      { head: 'Structured out',
        body: 'Emits JSON for every TRF field — patient ID, test codes, clinical notes — ready for the record rather than for a human to retype.' },
    ],
  },
  {
    slug: 'cricket-cv',
    name: 'Cricket Analytics CV',
    status: 'Research', year: '2023',
    blurb: 'A computer-vision system pulling ball tracking and match events straight out of raw footage.',
    metric: '1', metricLabel: 'end-to-end CV pipeline',
    depth: '−900 m',
    stack: ['Python', 'OpenCV', 'Google ML tools', 'C++'],
    problem:
      'Match analysis is done by people watching video and typing what they saw. The footage contains the events already; the work is getting them out reliably enough to trust.',
    points: [
      { head: 'Tracking',
        body: 'Frame-by-frame ball tracking and batsman detection across unedited broadcast footage.' },
      { head: 'Events',
        body: 'Per-ball event extraction, turning continuous video into a discrete record you can query.' },
      { head: 'Where',
        body: 'Built during an ML research internship at STARC, PES University — my first taste of a research question that had to survive contact with real data.' },
    ],
  },
];
