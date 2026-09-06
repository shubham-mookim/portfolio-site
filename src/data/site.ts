/* Identity + the two worlds. Everything the nav needs. */

export const me = {
  name: 'Shubham Mookim',
  role: 'Research Engineer, AI Systems',
  company: 'ForGood.ai',
  city: 'Bengaluru, India',
  coords: '12.97° N, 77.59° E',
  email: 'shubhammookim@gmail.com',
  linkedin: 'https://linkedin.com/in/shubhammookim',
  github: 'https://github.com/shubham-mookim',
};

export type World = 'below' | 'above' | 'surface';

/* The professional world is one continuous descent: six sections on a single
   page, each deeper than the last. The nav quick-scrolls between them. */
export const below = {
  id: 'below' as const,
  name: 'The Deep',
  tag: 'Professional',
  home: '/deep/',
  sections: [
    { href: '/deep/#specimens', id: 'specimens', label: 'Specimens', note: 'What I have built' },
    { href: '/deep/#research',  id: 'research',  label: 'Research',  note: 'Open questions' },
    { href: '/deep/#descent',   id: 'descent',   label: 'Descent',   note: 'Where I have been' },
    { href: '/deep/#toolbox',   id: 'toolbox',   label: 'Toolbox',   note: 'How I work' },
    { href: '/deep/#record',    id: 'record',    label: 'Record',    note: 'Study and honors' },
    { href: '/deep/#abyss',     id: 'abyss',     label: 'Abyss',     note: 'Get in touch' },
  ],
};

export const above = {
  id: 'above' as const,
  name: 'Above Water',
  tag: 'Personal',
  home: '/about/',
  sections: [
    { href: '/about/', id: 'about', label: 'Portrait', note: 'Who I am' },
    { href: '/atlas/', id: 'atlas', label: 'Atlas',    note: 'Where I have been' },
    { href: '/now/',   id: 'now',   label: 'Now',      note: 'This month' },
  ],
};

export const worlds = { below, above };
