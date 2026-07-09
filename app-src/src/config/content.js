// =============================================================================
// TRADIZIONI DIGITALI — configurazione contenuti webapp
// Progetto "Punti Cardinali for Work" — PR Puglia FESR-FSE+ 2021-2027
// Comune di Zollino — CUP I41D25000090002 — Coordinamento ANTFORM APS
// Schema condiviso e intercambiabile: vedi _content/SCHEMA.md
// -----------------------------------------------------------------------------
// DIFFERENZE NOTE DI QUESTO PROGETTO (vedi anche _content/REPORT.md):
// - Orientation Desk aperto MERCOLEDÌ e VENERDÌ.
// - Forte caratterizzazione su Grecìa Salentina / lingua Grika / Pozzelle.
// - Orientation Lab: 3 AREE da 10 laboratori, SOLO NOMI (nessuna descrizione);
//   nessun paragrafo introduttivo ai lab nel documento sorgente.
// - Job Day in formato "3 percorsi tematici" (Radici Future / Viaggi Digitali /
//   Voci Antiche, Strumenti Nuovi); NON ha liste "attività"/"obiettivi".
// - Puglia Donna Partecipa: 4 tematiche, nessun "format" nel documento.
// - Puglia Attrattiva #mareAsinistra: NESSUNA lista "obiettivi" nel documento.
// - Nessuna pagina "Opportunità" e nessun blocco "Coordinamento" dettagliato.
// - Servizi Orientation Desk: 7 voci senza descrizione.
// =============================================================================

export const content = {
  meta: {
    nomeProgetto: "Tradizioni Digitali",
    sottotitolo: "Innovazione e Sostenibilità per la Promozione del Territorio",
    comune: "Zollino",
    cup: "I41D25000090002",
    slug: "zollino",
  },

  home: {
    hero: {
      titolo: "Tradizioni Digitali",
      claim: "La webapp che connette persone, competenze, identità e opportunità",
      paragrafi: [
        "Uno spazio digitale dedicato all'orientamento, alla formazione e al lavoro, nato per accompagnare cittadini e cittadine nella scoperta delle opportunità professionali offerte dal territorio di Zollino.",
        "Attraverso servizi di orientamento, laboratori esperienziali, eventi, attività di empowerment e iniziative di promozione territoriale, il progetto sostiene giovani, adulti, donne e persone in cerca di occupazione nella costruzione del proprio percorso professionale.",
      ],
    },
    cta: [
      "Prenota una consulenza",
      "Scopri i laboratori",
      "Partecipa agli eventi",
      "Consulta le opportunità",
    ],
    cosaPuoiFare: [
      { titolo: "Orientarti", icon: "compass", desc: "Prenotare colloqui individuali e ricevere supporto personalizzato." },
      { titolo: "Partecipare", icon: "users", desc: "Iscriverti ai laboratori e agli eventi del progetto." },
      { titolo: "Informarti", icon: "info", desc: "Consultare opportunità formative e lavorative." },
      { titolo: "Connetterti", icon: "link", desc: "Entrare in contatto con servizi, imprese e reti territoriali." },
    ],
    azioni: [
      { titolo: "Orientation Desk", icon: "chat", desc: "Uno sportello permanente di orientamento e accompagnamento personalizzato." },
      { titolo: "Orientation Lab", icon: "book", desc: "30 laboratori esperienziali dedicati allo sviluppo delle competenze e all'orientamento professionale." },
      { titolo: "Job Day", icon: "calendar", desc: "Eventi dedicati all'incontro tra persone, imprese e servizi per il lavoro." },
      { titolo: "Puglia Donna Partecipa", icon: "women", desc: "Percorsi di empowerment femminile e valorizzazione delle competenze." },
      { titolo: "Puglia Attrattiva #mareAsinistra", icon: "globe", desc: "Attività di promozione del territorio e delle sue opportunità oltre i confini comunali." },
    ],
  },

  progetto: {
    intro: {
      titolo: "Cos'è Tradizioni Digitali",
      paragrafi: [
        "Tradizioni Digitali – Innovazione e Sostenibilità per la Promozione del Territorio è il progetto promosso dal Comune di Zollino, soggetto beneficiario dell'Avviso Pubblico \"PUNTI CARDINALI FOR WORK – Punti di orientamento per la formazione e il lavoro\", finanziato nell'ambito del PR Puglia FESR-FSE+ 2021-2027 – Priorità Occupazione – Azione 5.1 Interventi per l'Occupazione.",
        "Il progetto nasce per rafforzare il sistema territoriale di orientamento, favorire l'incontro tra domanda e offerta di lavoro e accompagnare le persone nella costruzione di percorsi formativi e professionali coerenti con le vocazioni culturali, agricole e turistiche del territorio.",
        "Le attività progettuali sono coordinate da ANTFORM APS – Ente del Terzo Settore, ente di formazione professionale accreditato dalla Regione Puglia e partner del progetto.",
      ],
    },
    "perchéNasce": {
      titolo: "Perché nasce",
      paragrafi: [
        "Zollino rappresenta uno dei luoghi simbolo della Grecìa Salentina, custode di un patrimonio culturale, linguistico e identitario unico. La lingua Grika, le produzioni agroalimentari locali, il patrimonio rurale e le Pozzelle costituiscono risorse strategiche da valorizzare per generare nuove opportunità occupazionali.",
        "Il progetto nasce per sostenere l'occupabilità delle persone, favorire la partecipazione attiva e promuovere l'innovazione attraverso il dialogo tra tradizione e nuove tecnologie.",
      ],
    },
    aChiSiRivolge: {
      intro: "Il progetto è rivolto a persone di età compresa tra i 16 e i 65 anni, con particolare attenzione a:",
      categorie: [
        "giovani",
        "studenti",
        "NEET",
        "disoccupati",
        "inoccupati",
        "donne",
        "persone inattive",
        "immigrati",
        "soggetti fragili",
        "lavoratori in fase di riqualificazione professionale",
      ],
    },
    visione: {
      titolo: "Una comunità che orienta",
      paragrafi: [
        "Tradizioni Digitali intende costruire un sistema territoriale stabile di orientamento capace di mettere in relazione cittadini, istituzioni, imprese, enti di formazione e realtà sociali.",
        "Attraverso un approccio partecipativo e innovativo, il progetto accompagna le persone nelle scelte formative e professionali, valorizzando competenze, talenti e opportunità presenti sul territorio.",
      ],
    },
    obiettivi: [
      "rafforzare il sistema locale di orientamento",
      "migliorare l'accesso alle informazioni e ai servizi",
      "favorire l'occupabilità",
      "accompagnare le transizioni scuola-lavoro",
      "promuovere l'inclusione sociale",
      "sostenere la partecipazione attiva dei cittadini",
      "valorizzare le eccellenze culturali, linguistiche e produttive di Zollino",
    ],
    assetStrategici: [
      { titolo: "Agroalimentare", icon: "leaf", desc: "Prodotti tipici, filiere corte, innovazione agricola e sostenibilità." },
      { titolo: "Cultura Grika", icon: "landmark", desc: "Lingua, tradizioni e patrimonio immateriale della Grecìa Salentina." },
      { titolo: "Turismo Esperienziale", icon: "mappin", desc: "Valorizzazione delle Pozzelle, del paesaggio rurale e del turismo identitario." },
      { titolo: "Innovazione Digitale", icon: "digital", desc: "Tecnologie applicate alla promozione del territorio e delle competenze." },
      { titolo: "Sostenibilità", icon: "tree", desc: "Economia verde, agricoltura sociale e sviluppo locale sostenibile." },
      { titolo: "Comunità", icon: "users", desc: "Partecipazione attiva e cittadinanza responsabile." },
    ],
    coordinamento: {
      ente: "ANTFORM APS – Ente del Terzo Settore",
      descrizione: "",
      "attività": [],
    },
  },

  orientationDesk: {
    intro: {
      titolo: "Lo sportello di orientamento",
      paragrafi: [
        "L'Orientation Desk rappresenta il punto di accesso ai servizi del progetto.",
        "Uno spazio dedicato all'ascolto, all'orientamento e all'accompagnamento personalizzato.",
      ],
    },
    dove: {
      nome: "Palazzo Raho",
      indirizzo: "Via Vittorio Emanuele II n. 1, 73010 Zollino (LE)",
    },
    quando: [
      { giorno: "Mercoledì", orari: ["09:30 – 12:30", "16:00 – 19:00"] },
      { giorno: "Venerdì", orari: ["09:30 – 12:30", "16:00 – 19:00"] },
    ],
    servizi: [
      { nome: "Accoglienza e primo orientamento", icon: "chat", desc: "" },
      { nome: "Bilancio delle competenze", icon: "clipboard", desc: "" },
      { nome: "Piano di sviluppo professionale", icon: "chart", desc: "" },
      { nome: "Ricerca attiva del lavoro", icon: "search", desc: "" },
      { nome: "Accesso alla formazione", icon: "book", desc: "" },
      { nome: "Supporto all'autoimpiego", icon: "rocket", desc: "" },
      { nome: "Accompagnamento ai servizi territoriali", icon: "link", desc: "" },
    ],
    cta: [],
  },

  orientationLab: {
    titolo: "30 LABORATORI PER ORIENTARSI, CRESCERE E COSTRUIRE IL PROPRIO FUTURO",
    intro: "Gli Orientation Lab sono percorsi esperienziali della **durata di 6 ore** ciascuno: metodologie attive e partecipative per scoprire le proprie competenze e conoscere le opportunità offerte dal territorio.",
    aree: [
      {
        titolo: "AREA 1 – AGROALIMENTARE E SOSTENIBILITÀ",
        laboratori: [
          { nome: "Smart Farming e Innovazione Rurale", icon: "tractor", desc: "" },
          { nome: "Coltivare in Digitale", icon: "sprout", desc: "" },
          { nome: "Ricette in Realtà Aumentata", icon: "fork", desc: "" },
          { nome: "Saperi Agricoli e Tecnologie Verdi", icon: "leaf", desc: "" },
          { nome: "Storie di Filiera a Km 0", icon: "supply", desc: "" },
          { nome: "Nuovi Mestieri dell'Agroecologia", icon: "wheat", desc: "" },
          { nome: "Agricoltura Sociale e Inclusiva", icon: "heart", desc: "" },
          { nome: "Cultura Contadina 4.0", icon: "tool", desc: "" },
          { nome: "Comunicazione dei Prodotti Tipici", icon: "megaphone", desc: "" },
          { nome: "Cucina e Tradizione in Digitale", icon: "digital", desc: "" },
        ],
      },
      {
        titolo: "AREA 2 – TURISMO CULTURALE E SMART TOURISM",
        laboratori: [
          { nome: "Gamification e Beni Culturali", icon: "target", desc: "" },
          { nome: "Pozzelle Experience AR", icon: "mappin", desc: "" },
          { nome: "Turismo Lento e Sostenibile", icon: "compass", desc: "" },
          { nome: "La Mappa delle Emozioni", icon: "map", desc: "" },
          { nome: "Nuove Professioni del Turismo Digitale", icon: "briefcase", desc: "" },
          { nome: "Narrazione del Territorio", icon: "scroll", desc: "" },
          { nome: "Progettare Esperienze Culturali", icon: "palette", desc: "" },
          { nome: "Guida Turistica 4.0", icon: "flag", desc: "" },
          { nome: "Creative Tourism e Storytelling", icon: "film", desc: "" },
          { nome: "Turismo Accessibile e Inclusivo", icon: "heart", desc: "" },
        ],
      },
      {
        titolo: "AREA 3 – LINGUA E CULTURA DEL GRIKO",
        laboratori: [
          { nome: "Griko Base – Imparare Giocando", icon: "book", desc: "" },
          { nome: "Storie Orali e Podcast", icon: "chat", desc: "" },
          { nome: "Teatro e Lingua Minoritaria", icon: "ticket", desc: "" },
          { nome: "Canti e Danze del Griko", icon: "star", desc: "" },
          { nome: "Identità e Comunicazione Interculturale", icon: "globe", desc: "" },
          { nome: "Griko per Immagini", icon: "pen", desc: "" },
          { nome: "Laboratorio Video in Griko", icon: "film", desc: "" },
          { nome: "Memorie Digitali del Territorio", icon: "digital", desc: "" },
          { nome: "Griko e Nuove Generazioni", icon: "graduation", desc: "" },
          { nome: "Tradurre Cultura in Digitale", icon: "scroll", desc: "" },
        ],
      },
    ],
  },

  jobDay: {
    titolo: "Tre percorsi per scoprire il proprio futuro",
    intro: "",
    percorsi: [
      { nome: "Radici Future", icon: "sprout", desc: "Innovazione agroalimentare, sostenibilità e nuove professioni agricole." },
      { nome: "Viaggi Digitali", icon: "mappin", desc: "Turismo, cultura e promozione del territorio." },
      { nome: "Voci Antiche, Strumenti Nuovi", icon: "landmark", desc: "Lingua Grika, tradizioni e professioni culturali." },
    ],
    "attività": [],
    obiettivi: [],
  },

  donnaPartecipa: {
    titolo: "Donne protagoniste del cambiamento",
    intro: "Percorso dedicato all'autonomia, all'occupabilità e alla partecipazione attiva delle donne.",
    tematiche: [
      "Empowerment e Leadership Femminile",
      "Conciliazione Vita-Lavoro",
      "Donne nei Settori Produttivi",
      "Autonomia Economica e Imprenditorialità",
    ],
    format: "",
  },

  mareASinistra: {
    titolo: "Zollino si racconta oltre i propri confini",
    intro: "Puglia Attrattiva #mareAsinistra è la linea di intervento dedicata alla promozione delle eccellenze culturali, linguistiche, agricole e turistiche di Zollino.",
    // Prossimo appuntamento: alimenta il blocco "CALENDARIO" e il campo "Quando" del form
    appuntamento: {
      data: "12 e 13 giugno 2026",
      orario: "dalle 9:00 alle 15:00",
      luogo: "Convitto Palmieri – manifestazione \"Fandango Factory\"",
      citta: "Lecce",
    },
    obiettivi: [],
    ambiti: [
      "Cultura Grika",
      "Turismo esperienziale",
      "Pozzelle e patrimonio rurale",
      "Agroalimentare locale",
      "Innovazione sociale",
      "Sostenibilità ambientale",
    ],
  },

  opportunita: {
    titolo: "Opportunità",
    voci: [],
  },

  contatti: {
    nomeProgetto: "TRADIZIONI DIGITALI",
    orientationDesk: {
      nome: "Palazzo Raho",
      indirizzo: "Via Vittorio Emanuele II n. 1, 73010 Zollino (LE)",
    },
    apertura: {
      giorni: "Mercoledì e Venerdì",
      orari: ["09:30 – 12:30", "16:00 – 19:00"],
    },
    soggettoBeneficiario: "Comune di Zollino",
    coordinamento: "ANTFORM APS – Ente del Terzo Settore",
    cup: "I41D25000090002",
  },

  footerIstituzionale: {
    testo: "Progetto finanziato nell'ambito dell'Avviso Pubblico \"PUNTI CARDINALI FOR WORK – Punti di orientamento per la formazione e il lavoro\", PR Puglia FESR-FSE+ 2021-2027 – Azione 5.1 Interventi per l'Occupazione.",
    soggettoBeneficiario: "Comune di Zollino",
    coordinamento: "ANTFORM APS – Ente del Terzo Settore",
    cup: "I41D25000090002",
  },
};

export default content;
