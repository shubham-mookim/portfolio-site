export type Frame = {
  src: string; alt: string; caption: string; meta: string;
  /** object-position for the crop — where the subject actually sits in the frame */
  focal?: string;
  /** set from the real file, so a tall photo is never forced into a wide band */
  orient?: 'portrait' | 'landscape';
};

export type Trip = { id: string; name: string; when: string; note: string };

export type Place = {
  slug: string; trip: string;
  city: string; country: string; coords: string; when: string;
  altitude: string;
  lede: string;
  hero: Frame;
  body: { head: string; text: string }[];
  frames: Frame[];
};

export const trips: Trip[] = [
  { id: 'turkiye', name: 'Türkiye', when: 'September 2024',
    note: 'My first proper trip out — balloons at dawn, a city on two continents, and a coastline I was not ready for.' },
  { id: 'europe', name: 'Europe', when: 'September 2025',
    note: 'Three cities in autumn, one black coat, and a lot of rain I had not planned for.' },
];

export const places: Place[] = [
  /* ------------------------------- TÜRKIYE ------------------------------- */
  {
    slug: 'cappadocia', trip: 'turkiye',
    city: 'Cappadocia', country: 'Türkiye',
    coords: '38.64° N, 34.83° E', when: 'September 2024',
    altitude: '+ 1,100 m',
    lede: 'You get up at four in the morning in the cold and the dark, and then the sky fills with two hundred balloons and you forgive everything.',
    hero: {
      src: '/photos/cappadocia-convertible.webp', orient: 'portrait', focal: 'center 52%',
      alt: 'Sitting in an open-top red convertible at sunrise in Cappadocia with dozens of hot-air balloons in the sky above',
      caption: 'Göreme, just after sunrise',
      meta: '38.64° N — the good morning',
    },
    body: [
      { head: 'Two hundred at once',
        text: 'They do not go up one at a time. There is a window of about forty minutes when the wind is right, and every operator in the valley launches into it at once. So you stand in a field in the cold watching nothing, and then the whole sky is occupied. I have not seen anything else that switches state that fast.' },
      { head: 'The cars',
        text: 'Somebody in Göreme worked out that people will pay to photograph a vintage convertible with balloons behind it, and now there is a small fleet of them parked in the valley at dawn. It is completely staged and I loved every second of it.' },
      { head: 'Rock that people live in',
        text: 'The valleys are soft volcanic tuff, which means for a couple of thousand years the local answer to needing a room has been to carve one. Hotels, churches, whole underground cities. The town looks like weather rather than architecture.' },
    ],
    frames: [
      { src: '/photos/cappadocia-dawn.webp', orient: 'portrait', focal: 'center 44%', alt: 'Hot-air balloons rising over the Cappadocian valley at dawn while people watch from the ridge',
        caption: 'Göreme valley', meta: 'The launch window' },
      { src: '/photos/cappadocia-dusk.webp', orient: 'portrait', focal: 'center 56%', alt: 'Vintage cars parked in a field at dusk with balloons in a purple and orange sky',
        caption: 'Göreme', meta: 'The other end of the day' },
      { src: '/photos/cappadocia-cars.webp', orient: 'portrait', focal: 'center 48%', alt: 'A balloon descending close to the rock formations behind a parked red car',
        caption: 'Love Valley', meta: 'Coming down' },
      { src: '/photos/cappadocia-window.webp', orient: 'portrait', focal: 'center 46%', alt: 'View through a wooden-framed window onto the cave town and rock cliffs of Cappadocia',
        caption: 'From breakfast', meta: 'Rock, and houses in it' },
    ],
  },
  {
    slug: 'istanbul', trip: 'turkiye',
    city: 'Istanbul', country: 'Türkiye',
    coords: '41.01° N, 28.98° E', when: 'September 2024',
    altitude: '+ 40 m',
    lede: 'A city that has been the centre of something for seventeen hundred years and has the layered, argued-over look of it.',
    hero: {
      src: '/photos/istanbul-galata.webp', orient: 'portrait', focal: 'center 42%',
      alt: 'A crowded sloping street in Istanbul with the Galata Tower rising at the end between painted buildings',
      caption: 'Looking up to the Galata Tower',
      meta: '41.01° N — the slope',
    },
    body: [
      { head: 'Density',
        text: 'Istanbul is the most crowded place I have been that never once felt hostile. Every street is a slope, every slope ends in a view, and the crowd moves like it has done this before. I walked until my legs gave out and then took the tram and regretted it.' },
      { head: 'The arcades',
        text: 'Off the main streets there are covered passages — nineteenth-century arcades with vaulted ceilings and chandeliers, full of shops that have been there longer than my country has had its current constitution. Nobody treats them as special. They are just where you buy things.' },
      { head: 'Two continents',
        text: 'You can cross from Europe to Asia on a commuter ferry for the price of a bus ticket, surrounded by people doing it because it is Tuesday.' },
    ],
    frames: [
      { src: '/photos/istanbul-arcade.webp', orient: 'portrait', focal: 'center 44%', alt: 'Ornate covered arcade in Istanbul with large hanging lanterns and shops along both sides',
        caption: 'A covered passage', meta: 'Chandeliers over a shoe shop' },
      { src: '/photos/istanbul-mosque.webp', orient: 'portrait', focal: 'center 40%', alt: 'A stone mosque with a tall minaret against a deep blue sky',
        caption: 'Kılıç Ali Paşa', meta: 'Sixteenth century' },
      { src: '/photos/istanbul-street.webp', orient: 'portrait', focal: 'center 50%', alt: 'Walking down a tree-lined Istanbul street in daylight with shops and a red truck',
        caption: 'Nişantaşı', meta: 'Midday, still walking' },
      { src: '/photos/istanbul-night.webp', orient: 'portrait', focal: 'center 46%', alt: 'A lit stone facade in Istanbul at night with people passing below',
        caption: 'İstiklal Caddesi', meta: 'After dark' },
    ],
  },
  {
    slug: 'antalya', trip: 'turkiye',
    city: 'Antalya', country: 'Türkiye',
    coords: '36.90° N, 30.69° E', when: 'September 2024',
    altitude: '+ 30 m',
    lede: 'Roman gates, a Mediterranean the wrong shade of blue, and mountains that start where the sea stops.',
    hero: {
      src: '/photos/antalya-sea.webp', orient: 'landscape', focal: 'center 44%',
      alt: 'Looking through tall windows over a bright turquoise Mediterranean sea toward a mountain range',
      caption: 'Breakfast, facing the Taurus mountains',
      meta: '36.90° N — the wrong blue',
    },
    body: [
      { head: 'That colour',
        text: 'I assumed the turquoise in photographs of the Turkish coast was a filter. It is not. It is limestone under the water, and it makes the sea look like something rendered rather than something wet.' },
      { head: 'Hadrian walked through here',
        text: 'There is a triumphal gate in the old town built for a visit by the emperor Hadrian in 130 AD. It is not fenced off or ticketed. It is a gate, in a street, and people walk through it to get to a café.' },
      { head: 'Shade as infrastructure',
        text: 'Restaurants built under plane trees along the water, tables in dappled light, the whole thing designed around not being in the sun. A very good idea I intend to steal.' },
    ],
    frames: [
      { src: '/photos/antalya-gate.webp', orient: 'portrait', focal: 'center 46%', alt: 'The Roman-era Hadrian’s Gate in Antalya, stone arch and column above excavated paving',
        caption: 'Hadrian’s Gate', meta: '130 AD, still a shortcut' },
      { src: '/photos/antalya-riverside.webp', orient: 'portrait', focal: 'center 50%', alt: 'Restaurant tables set out under plane trees beside a river',
        caption: 'Under the plane trees', meta: 'Shade, on purpose' },
    ],
  },

  /* -------------------------------- EUROPE ------------------------------- */
  {
    slug: 'paris', trip: 'europe',
    city: 'Paris', country: 'France',
    coords: '48.86° N, 2.35° E', when: 'September 2025',
    altitude: '+ 35 m',
    lede: 'It rained most of the week. I have decided this is the correct weather for Paris and will not be taking questions.',
    hero: {
      src: '/photos/orsay-window.webp', orient: 'portrait', focal: 'center 46%',
      alt: 'A figure silhouetted against a huge arched window inside the Musée d’Orsay, looking out over the Seine',
      caption: 'Musée d’Orsay',
      meta: '48.86° N — the window',
    },
    body: [
      { head: 'The window',
        text: 'The Orsay is a converted railway station, which means the windows were built to be looked through by people in a hurry. I stood at this one for a while. Outside, the Seine and a sky doing four things at once; inside, a parquet floor that has been walked on by roughly everybody. It is the only photograph from the trip I would put on a wall.' },
      { head: 'Looking up',
        text: 'Everyone photographs the Eiffel Tower from far enough away to fit it in. Standing underneath it is a different object entirely — less monument, more argument about iron. You can see every rivet of the reasoning.' },
      { head: 'The rest of it',
        text: 'Versailles in the cold, an avenue of trees going orange near the Arc, and a clear umbrella I bought in a panic and then genuinely liked.' },
    ],
    frames: [
      { src: '/photos/eiffel-look-up.webp', orient: 'portrait', focal: 'center 38%', alt: 'The Eiffel Tower photographed from directly underneath, iron lattice filling the frame',
        caption: 'Champ de Mars', meta: 'From underneath' },
      { src: '/photos/orsay-hall.webp', orient: 'portrait', focal: 'center 50%', alt: 'Standing in the great vaulted hall of the Musée d’Orsay with an audio guide',
        caption: 'Musée d’Orsay', meta: 'The great hall' },
      { src: '/photos/eiffel-umbrella.webp', orient: 'portrait', focal: 'center 54%', alt: 'Standing with a clear umbrella on a wet street with the Eiffel Tower behind',
        caption: 'Rue de l’Université', meta: 'The panic umbrella' },
      { src: '/photos/paris-avenue.webp', orient: 'portrait', focal: 'center 48%', alt: 'Standing on a Paris avenue lined with trees turning orange',
        caption: 'Avenue near the Arc', meta: 'Autumn arriving' },
      { src: '/photos/versailles.webp', orient: 'portrait', focal: 'center 46%', alt: 'Standing in front of the long facade of the Palace of Versailles on an overcast day',
        caption: 'Château de Versailles', meta: 'Cold, enormous' },
    ],
  },
  {
    slug: 'amsterdam', trip: 'europe',
    city: 'Amsterdam', country: 'Netherlands',
    coords: '52.37° N, 4.90° E', when: 'September 2025',
    altitude: '+ 12 m',
    lede: 'A city that solved a hard engineering problem so long ago that it now reads as charm.',
    hero: {
      src: '/photos/amsterdam-canal.webp', orient: 'portrait', focal: 'center 46%',
      alt: 'Standing on a bridge over an Amsterdam canal with gabled houses and autumn trees behind',
      caption: 'On a bridge, somewhere central',
      meta: '52.37° N — the canal',
    },
    body: [
      { head: 'Everything is on purpose',
        text: 'Amsterdam is below sea level and stays there because of a system that has been maintained, argued about and rebuilt for centuries. Nobody visits for the hydrology. But you feel it — the whole place is a very old piece of infrastructure that someone is still on call for.' },
      { head: 'Zaanse Schans',
        text: 'Windmills that are not decoration. They were sawmills, oil mills, paint mills — the industrial revolution running on weather. A swan came over to be unimpressed by me while I was taking this in.' },
    ],
    frames: [
      { src: '/photos/zaanse-windmills.webp', orient: 'portrait', focal: 'center 46%', alt: 'Standing by the water at Zaanse Schans with historic windmills across the river',
        caption: 'Zaanse Schans', meta: 'Industry, powered by weather' },
    ],
  },
  {
    slug: 'london', trip: 'europe',
    city: 'London', country: 'United Kingdom',
    coords: '51.51° N, 0.13° W', when: 'September 2025',
    altitude: '+ 24 m',
    lede: 'Loud, expensive, and at night genuinely one of the best-lit places I have stood in.',
    hero: {
      src: '/photos/piccadilly-night.webp', orient: 'landscape', focal: 'center 50%',
      alt: 'Standing in Piccadilly Circus at night, lit by advertising screens with a red double-decker bus passing',
      caption: 'Piccadilly Circus',
      meta: '51.51° N — after dark',
    },
    body: [
      { head: 'The lit crossroads',
        text: 'Piccadilly at night is a light source before it is a place. Everyone stands in roughly the same spot for roughly the same photograph and I am not above it — I went and stood there too, and it was worth it.' },
      { head: 'Free museums',
        text: 'The National Gallery costs nothing. You can walk in off Trafalgar Square, stand under that dome, look at paintings for an hour and leave. I think about this more than I expected to.' },
      { head: 'Old stone',
        text: 'The Tower is nine hundred years old and sits in the middle of a financial district, which is a very London way to treat a castle.' },
    ],
    frames: [
      { src: '/photos/london-bigben.webp', orient: 'landscape', focal: 'center 46%', alt: 'Standing near the Elizabeth Tower and Big Ben with a red double-decker bus behind',
        caption: 'Westminster', meta: 'The obligatory one' },
      { src: '/photos/london-gallery.webp', orient: 'portrait', focal: 'center 38%', alt: 'The domed central hall of the National Gallery with visitors on the staircase below',
        caption: 'National Gallery', meta: 'Free, somehow' },
      { src: '/photos/london-tower.webp', orient: 'portrait', focal: 'center 46%', alt: 'Walking up the cobbled approach inside the Tower of London with crowds ahead',
        caption: 'Tower of London', meta: 'Nine hundred years' },
      { src: '/photos/london-street.webp', orient: 'portrait', focal: 'center 50%', alt: 'Standing on a London street in daylight beside a bus stop, terracotta buildings behind',
        caption: 'Knightsbridge', meta: 'Daylight, camera bag' },
    ],
  },
];

export const placesByTrip = (id: string) => places.filter((p) => p.trip === id);
