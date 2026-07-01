/* Libreria icone tematiche monocolore (stroke = currentColor).
   Ogni voce dei contenuti può indicare `icon: 'nome'`; in mancanza,
   iconFor(testo) sceglie in base a parole chiave del titolo. */

const P = {
  compass: 'M12 2a10 10 0 100 20 10 10 0 000-20z M15.5 8.5l-2 5-5 2 2-5z',
  chat: 'M4 5h16v11H8l-4 4z',
  calendar: 'M4 6h16v14H4z M4 10h16 M8 3v4 M16 3v4',
  info: 'M12 2a10 10 0 100 20 10 10 0 000-20z M12 11v6 M12 7.5h.01',
  link: 'M8 12a3 3 0 013-3h2 M16 12a3 3 0 01-3 3h-2 M8 12a3 3 0 003 3 M16 12a3 3 0 00-3-3 M10.5 12h3',
  mappin: 'M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z M12 10a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z',
  landmark: 'M3 21h18 M5 21V10 M9.5 21V10 M14.5 21V10 M19 21V10 M12 3l8 5H4z',
  museum: 'M3 21h18 M5 21V11 M9 21V11 M15 21V11 M19 21V11 M12 3l8 5H4z M4 8h16',
  leaf: 'M5 20C13 22 20 15 20 4 9 4 4 10 4 20z M5 20c3-6 7-9 11-11',
  sprout: 'M12 21v-9 M12 12c0-3-2-5-5-5 0 3 2 5 5 5z M12 12c0-3 2-5 5-5 0 3-2 5-5 5z',
  wheat: 'M12 21V8 M12 9c-2-1-3-2-3-5 2 0 3 1 3 4 M12 9c2-1 3-2 3-5-2 0-3 1-3 4 M12 14c-2-1-3-2-3-4 2 0 3 1 3 4 M12 14c2-1 3-2 3-4-2 0-3 1-3 4',
  tractor: 'M4 16a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z M16 17a2 2 0 104 0 2 2 0 00-4 0z M7.5 12.5V7h4l2 4h2.5v3 M7.5 9h4',
  waves: 'M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
  tool: 'M14.5 6.5a3.5 3.5 0 01-4.6 4.6l-6.4 6.4 2.5 2.5 6.4-6.4a3.5 3.5 0 014.6-4.6l-2.3 2.3-1.8-1.8z',
  tree: 'M12 3l5 8H7z M9.5 11l4.5 7H8z M12 18v3',
  recycle: 'M7 9a6 6 0 019-3 M18 10l-2-3-3 1 M17 15a6 6 0 01-9 3 M6 14l2 3 3-1 M12 22a6 6 0 010-12',
  digital: 'M4 5h16v10H4z M2 19h20 M10 19h4',
  film: 'M4 5h16v14H4z M4 9h3 M4 13h3 M4 17h3 M17 9h3 M17 13h3 M17 17h3 M9 5v14',
  hashtag: 'M9 4L7 20 M17 4l-2 16 M4 9h16 M3 15h16',
  pen: 'M4 20l1-4 10-10 3 3L8 19z M14 6l3 3',
  target: 'M12 2a10 10 0 100 20 10 10 0 000-20z M12 7a5 5 0 100 10 5 5 0 000-10z M12 11a1 1 0 100 2 1 1 0 000-2z',
  megaphone: 'M3 11v2a1 1 0 001 1h2l4 4V6L6 10H4a1 1 0 00-1 1z M13 7c1.5 1 2.5 3 2.5 5S14.5 16 13 17 M10 15v4',
  supply: 'M5 6a2 2 0 100 .01 M19 6a2 2 0 100 .01 M12 18a2 2 0 100 .01 M7 6h10 M17 8l-3.5 8 M11 16L7 8',
  briefcase: 'M4 8h16v12H4z M9 8V5h6v3 M4 13h16',
  badge: 'M5 4h14v16l-7-3-7 3z M9 9h6 M9 12h6',
  book: 'M5 4h11a2 2 0 012 2v14H7a2 2 0 01-2-2z M9 4v14',
  graduation: 'M12 4l10 5-10 5L2 9z M6 11v5c0 1.3 3 3 6 3s6-1.7 6-3v-5',
  clipboard: 'M9 4h6v3H9z M7 5h2 M15 5h2 M7 5a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1 M9 12h6 M9 16h4',
  chart: 'M4 4v16h16 M8 16v-5 M13 16V8 M18 16v-8',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14z M20 20l-4-4',
  users: 'M9 11a3 3 0 100-6 3 3 0 000 6z M3 20a6 6 0 0112 0 M17 5a3 3 0 010 6 M16.5 14.5A6 6 0 0121 20',
  women: 'M12 3a4 4 0 100 8 4 4 0 000-8z M12 11v8 M9.5 16h5',
  star: 'M12 3l2.6 6.3 6.8.5-5.2 4.4 1.7 6.6L12 17.7 6.1 20.8l1.7-6.6L2.6 9.8l6.8-.5z',
  flag: 'M6 21V4 M6 4h11l-2 4 2 4H6',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18z M3 12h18 M12 3c3 3.5 3 14.5 0 18 M12 3c-3 3.5-3 14.5 0 18',
  map: 'M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z M9 4v14 M15 6v14',
  palette: 'M12 3a9 9 0 000 18c1.4 0 1.8-1 1.8-1.8 0-1.4 1-1.8 2.2-1.8h1A4 4 0 0021 13c0-5.5-4-10-9-10z M8 11a1 1 0 100 .01 M12 8a1 1 0 100 .01 M16 11a1 1 0 100 .01',
  handshake: 'M4 8l4-2 4 2 4-2 4 2 M4 8v4l4 4 3-2 M20 8v4l-4 4-2-1.5 M8 12l3 2.5',
  gear: 'M12 9a3 3 0 100 6 3 3 0 000-6z M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M19 5l-2 2 M7 17l-2 2',
  rocket: 'M12 3c3 2 4.5 5 4.5 9L14 15h-4l-2.5-3c0-4 1.5-7 4.5-9z M12 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3 M9.5 15L7 20l4-2 M14.5 15L17 20l-4-2',
  puzzle: 'M9 4h3a1.5 1.5 0 013 0h0v3a1.5 1.5 0 003 0v3h-3a1.5 1.5 0 000 3h3v3a1.5 1.5 0 00-3 0h0v-3H9v-3a1.5 1.5 0 010-3H6V7h3z',
  bulb: 'M9.5 18h5 M10.5 21h3 M12 3a6 6 0 00-3.5 10.9c.6.5.9 1.3.9 2.1h5.2c0-.8.3-1.6.9-2.1A6 6 0 0012 3z',
  heart: 'M12 20s-7-4.6-7-9.2A3.8 3.8 0 0112 8a3.8 3.8 0 017 2.8c0 4.6-7 9.2-7 9.2z',
  fork: 'M6 3v6a2 2 0 002 2 M8 3v18 M8 11V3 M16 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4 M16 3v18',
  scroll: 'M7 4h9a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6z M6 6a2 2 0 00-2 2v1h2 M10 9h5 M10 13h5',
  ticket: 'M4 8a2 2 0 012-2h12a2 2 0 012 2 2 2 0 000 4 2 2 0 010 4H6a2 2 0 01-2-2 2 2 0 000-4 2 2 0 010-4z M14 7v10',
}

// Fallback per parole chiave (usato solo se un item non ha `icon`).
const RULES = [
  [/donn|femmin|pari opport/, 'women'],
  [/leadership/, 'flag'],
  [/empower|autostima|talento/, 'rocket'],
  [/turism|accoglien|ospitalit|viagg|guida/, 'mappin'],
  [/cultur|patrimon|storyt|storic|teatr|cant|narrazi|memor|museo/, 'landmark'],
  [/agricol|campo|filier|food|rural|coltiv|contadin|agroaliment|agroeco|orti|km 0|ricett/, 'leaf'],
  [/mare|costier|pesc/, 'waves'],
  [/artigian|mestier/, 'tool'],
  [/ambient|sostenib|verde|green|ecolog|natur|circolar|energ|transizione/, 'tree'],
  [/digital|social|content|web|tecnolog|informatic|\bai\b|intelligenza|gamif|realt|video|podcast|brand|e-?commerce|smart/, 'digital'],
  [/lavoro|profession|impres|imprendit|start|business|autoimp|autoimpieg|recruit|\bcv\b|curriculum|networking|occupab|colloqui\b|tirocin/, 'briefcase'],
  [/formazion|cors|laborator|apprend|competenz|skill|orientar|bilancio|piano di sviluppo|accesso alla/, 'book'],
  [/comunit|partecipa|cittadin|team|cooperaz|inclus|\brete\b|reti|connett|accompagn/, 'users'],
  [/innovaz|idee|futuro|creativ/, 'bulb'],
  [/giovani|neet|student/, 'graduation'],
  [/consulen|ascolt|richied|contatt|informar|primo orientamento|prenot/, 'chat'],
  [/job day|incontro|manifestaz|fier|event/, 'calendar'],
  [/obiettiv|attrattiv|promozion|marketing/, 'target'],
]

export function iconFor(text = '', context = '') {
  const t = String(text).toLowerCase()
  for (const [re, name] of RULES) if (re.test(t)) return name // il titolo ha priorità
  const c = String(context).toLowerCase()
  for (const [re, name] of RULES) if (re.test(c)) return name // poi l'area/contesto
  return 'compass'
}

export function Icon({ name = 'compass', className = '' }) {
  const d = P[name] || P.compass
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d.split(' M').map((seg, i) => <path key={i} d={(i ? 'M' : '') + seg} />)}
    </svg>
  )
}

export default Icon
