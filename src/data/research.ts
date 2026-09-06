/* Independent research. Distinct from the production work in /work —
   this is the stuff done to answer a question, not to ship a service. */

export type Finding = { id: string; head: string; body: string };

export const negotiation = {
  slug: 'agent-compute-negotiation',
  title: 'Agent Compute Negotiation',
  status: 'Ongoing',
  when: '2026',
  question: 'Does more agent intelligence produce better market outcomes?',
  answer: 'Often no.',
  lede:
    'A research framework studying how autonomous agents of three intelligence tiers — rule-based, reinforcement-learned and LLM — negotiate for compute in a decentralised market with no central scheduler. Validated on real CPU and memory workloads rather than an abstract simulation.',

  stats: [
    { n: '16',       k: 'experiments' },
    { n: '15,000+',  k: 'trials run' },
    { n: '3',        k: 'agent tiers compared' },
    { n: '$0.03',    k: 'total API spend' },
  ],

  why: [
    'A cloud provider renting capacity to many client agents has to decide who gets what. The obvious design is a central scheduler. The interesting one is where it does not exist — agents hold their own budgets, know only their own urgency, and have to bargain.',
    'Almost everything published on multi-agent systems assumes smarter agents make the system better. I tested that on real hardware, with real contention and real models making the calls.',
  ],

  findings: [
    { id: 'F1', head: 'Most strategy pairings deadlock',
      body: 'Across the full strategy matrix, the common outcome of a bilateral negotiation is not a bad deal — it is no deal. Two agents both holding a defensible position will simply run out of rounds. The failure mode of a decentralised market is silence, not inefficiency.' },
    { id: 'F2', head: 'The simplest agent wins — tier inversion',
      body: 'A plain greedy rule-based agent out-accumulates both the Q-learning agent and the LLM agent in bilateral markets. Sophistication buys you the ability to concede intelligently, and conceding intelligently is how you lose to something that will not concede at all.' },
    { id: 'F3', head: 'Reputation is blind below ~30% defection',
      body: 'A cheater who defects less than roughly thirty per cent of the time is statistically invisible to a reputation system over realistic interaction counts. This one has a closed-form proof, not just an empirical curve — the signal is genuinely not there to be found.' },
    { id: 'F4', head: 'LLMs rebuild scheduling from scratch',
      body: 'Given only a system prompt and a real slot to bid for, language models reconstruct near-optimal scheduling behaviour without being told the algorithm. This held across models rather than being an artefact of one.' },
    { id: 'F5', head: 'Prompt optimisation can destroy welfare',
      body: 'Engineering a better prompt made individual agents measurably better at getting what they wanted, and made the market as a whole worse off. Local optimisation, global loss — the effect was non-linear, not a gentle trade-off.' },
    { id: 'F6', head: 'One adversarial agent breaks allocation',
      body: 'A single LLM agent given a selfish system prompt is enough to break allocation for everyone else in a real-compute market. Not a majority. One.' },
  ] as Finding[],

  honesty:
    'The work questions its own implementation rather than defending it. The paper carries an explicit Open Issues section, results are committed alongside the code, and the finding that undercuts the premise — that intelligence often hurts — is the headline rather than a footnote.',

  stack: ['Python', 'OpenAI API', 'Q-learning', 'Real CPU/mem workloads', 'Bootstrap CIs', 'Cohen’s d'],

  outputs: [
    { k: 'Paper', v: 'A full academic paper, roughly 6,700 words, drafted with an honest Open Issues section.' },
    { k: 'Framework', v: 'A reusable agent/strategy/simulator framework — protocol, resources, five rule-based strategies, a tabular Q-learner and an LLM agent behind a hard cost guard.' },
    { k: 'Results', v: 'Every experiment’s raw output committed to the repo — terminal captures, JSON and CSV, including per-job real PIDs and CPU-seconds.' },
  ],
};

export const research = [negotiation];
