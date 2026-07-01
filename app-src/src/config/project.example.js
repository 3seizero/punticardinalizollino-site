/* ============================================================
   project.js — IDENTITÀ + TEMA + CONFIG TECNICA del singolo progetto.
   Questo file viene PERSONALIZZATO per ognuno dei 3 progetti.
   I CONTENUTI testuali stanno invece in ./content.js (generato
   dall'Agente Contenuti in _content/<progetto>.js).
   Questo è l'esempio/contratto: la versione reale sostituisce i valori.
   ============================================================ */

export const project = {
  // --- Identità ---
  slug: 'otranto', // otranto | sogliano | zollino
  nomeProgetto: 'Otranto in Movimento',
  sottotitolo: 'Cultura, Agricoltura e Turismo per Nuove Opportunità Lavorative',
  comune: 'Otranto',
  cup: 'E31B25000680002',
  dominio: 'otranto.<DOMINIO_BASE>', // compilato dall'Agente Server

  // --- Tema (palette dall'Agente Grafica, _brand/<progetto>/palette.json) ---
  theme: {
    '--c-primary': '#1a3a5a',
    '--c-primary-dark': '#122a42',
    '--c-secondary': '#2a7bbf',
    '--c-accent': '#f0a830',
    '--c-bg': '#ffffff',
    '--c-bg-alt': '#f4f7fa',
    '--c-text': '#1c2530',
    '--c-text-soft': '#54616e',
    '--c-border': '#e2e8f0',
    '--c-on-primary': '#ffffff',
  },

  // --- Asset brand (in /brand/, copiati da _brand/<progetto>/) ---
  assets: {
    logoHeader: '/brand/logo-header.svg',
    hero: '/brand/hero.webp',
    logosFooter: '/brand/logos-footer.png', // strip loghi istituzionali/partner
    favicon: '/favicon.svg',
  },

  // --- Form CTA (invio email). Vedi _deploy per la scelta del servizio. ---
  form: {
    // provider: 'web3forms' (statico, consigliato) | 'php' (endpoint /contact.php)
    provider: 'web3forms',
    accessKey: '<WEB3FORMS_ACCESS_KEY>', // da Carlo
    endpoint: 'https://api.web3forms.com/submit',
    destinatario: 'orientamento.otranto@example.org', // email Orientation Desk
  },
}

export default project
