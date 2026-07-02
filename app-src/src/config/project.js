/* TRADIZIONI DIGITALI (Zollino) — identità + tema + config tecnica.
   Contenuti testuali in ./content.js.
   NOTA GRAFICA: per Zollino esistono solo il logo e 2 immagini Facebook.
   Mancano header/footer istituzionali e hero dedicati (da produrre). */

export const project = {
  slug: 'zollino',
  nomeProgetto: 'Tradizioni Digitali',
  sottotitolo: 'Innovazione e Sostenibilità per la Promozione del Territorio',
  comune: 'Zollino',
  cup: 'I41D25000090002',
  dominio: 'punticardinalizollino.antform.it',
  shape: 'square', // shape decorativa (palette): Zollino = quadrato

  // Palette dalla Palette.pdf: rosso scuro identitario
  theme: {
    '--c-primary': '#711403',
    '--c-primary-dark': '#4F0E02',
    '--c-secondary': '#C0392B',
    '--c-accent': '#F2A93B',
    '--c-bg': '#FFFFFF',
    '--c-bg-alt': '#FBEDEC',
    '--c-text': '#2A1A16',
    '--c-text-soft': '#6A5A56',
    '--c-border': '#E8D6D2',
    '--c-on-primary': '#FFFFFF',
  },

  assets: {
    logosHeader: '', // striscia istituzionale mancante (da produrre)
    logoHeader: '/brand/logo.png',
    hero: '', // hero su rosso pieno (foto hero dedicata: da produrre)
    logosFooter: '', // striscia loghi footer mancante (da produrre)
    favicon: '/favicon-96x96.png',
    icon: '/icons/icon-192.png',
  },

  form: {
    provider: 'php',
    endpoint: '/contact.php',
  },
}

export default project
