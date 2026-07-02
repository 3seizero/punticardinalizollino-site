import { Link } from 'react-router-dom'
import { content } from './config/content.js'
import { project } from './config/project.js'
import { Section, PageHero, CardGrid, Bullets, Chips, TextBlock, BookingCTA } from './components/ui.jsx'
import { Icon, iconFor } from './components/icons.jsx'

const C = content

/* ----------------------------- HOME ----------------------------- */
export function Home() {
  const h = C.home
  return (
    <>
      <section className={'hero shape-' + (project.shape || 'circle')} style={project.assets?.hero ? { backgroundImage: `linear-gradient(rgba(15,28,54,0.78),rgba(15,28,54,0.82)), url(${project.assets.hero})` } : undefined}>
        <div className="container hero__inner">
          <h1>{h.hero.titolo}</h1>
          <p className="hero__claim">{h.hero.claim}</p>
          <div className="cta-stack">
            <BookingCTA label="Prenota una consulenza" tipo="consulenza" />
            <Link className="btn btn--ghost" to="/orientation-lab">Scopri i laboratori</Link>
            <Link className="btn btn--ghost" to="/job-day">Partecipa agli eventi</Link>
            {C.opportunita?.voci?.length
              ? <Link className="btn btn--ghost" to="/opportunita">Consulta le opportunità</Link>
              : <Link className="btn btn--ghost" to="/orientation-desk">Scopri i servizi</Link>}
          </div>
        </div>
      </section>

      {/* Prima sezione: testo introduttivo, separato dall'hero */}
      <section className="section intro-lead">
        <div className="container">
          {h.hero.paragrafi.map((p, i) => <p className="lead" key={i}>{p}</p>)}
        </div>
      </section>

      <Section title="Cosa puoi fare" alt>
        <CardGrid items={h.cosaPuoiFare} />
      </Section>

      <Section title="Le 5 azioni del progetto">
        <div className="grid">
          {h.azioni.map((a, i) => {
            const routes = ['/orientation-desk', '/orientation-lab', '/job-day', '/donna-partecipa', '/mareasinistra']
            return (
              <Link to={routes[i]} className="card card--link icard" key={i}>
                <div className="icard__head">
                  <span className="icard__icon"><Icon name={a.icon || iconFor(a.titolo)} /></span>
                  <h3>{a.titolo}</h3>
                </div>
                <p className="card__desc">{a.desc}</p>
              </Link>
            )
          })}
        </div>
      </Section>
    </>
  )
}

/* --------------------------- IL PROGETTO --------------------------- */
export function Progetto() {
  const p = C.progetto
  const perche = p['perchéNasce']
  const coord = p.coordinamento
  return (
    <>
      <PageHero title={p.visione.titolo} subtitle={C.meta.sottotitolo} />
      <Section alt>{p.visione.paragrafi.map((t, i) => <p key={i}>{t}</p>)}</Section>
      <TextBlock titolo={p.intro.titolo} paragrafi={p.intro.paragrafi} />
      <TextBlock titolo={perche.titolo} paragrafi={perche.paragrafi} alt />
      <Section title="A chi si rivolge">
        <p>{p.aChiSiRivolge.intro}</p>
        <Chips items={p.aChiSiRivolge.categorie} />
      </Section>
      <Section title="Obiettivi" alt><Bullets items={p.obiettivi} /></Section>
      <Section title="Gli asset strategici del territorio">
        <CardGrid items={p.assetStrategici} />
      </Section>
      {coord?.descrizione && (
        <Section title="Coordinamento delle attività progettuali" alt kicker={coord.ente}>
          <p>{coord.descrizione}</p>
          {coord['attività']?.length > 0 && <Bullets items={coord['attività']} />}
        </Section>
      )}
    </>
  )
}

/* ------------------------ ORIENTATION DESK ------------------------ */
export function OrientationDesk() {
  const d = C.orientationDesk
  return (
    <>
      <PageHero title={d.intro.titolo} />
      <Section alt>{d.intro.paragrafi.map((t, i) => <p key={i}>{t}</p>)}</Section>
      <Section>
        <div className="info-cols">
          <div className="card">
            <h3>Dove</h3>
            <p><strong>{d.dove.nome}</strong><br />{d.dove.indirizzo}</p>
          </div>
          <div className="card">
            <h3>Quando</h3>
            {d.quando.map((q, i) => (
              <p key={i}><strong>{q.giorno}</strong><br />{q.orari.join(' · ')}</p>
            ))}
          </div>
        </div>
      </Section>
      <Section title="Servizi disponibili" alt><CardGrid items={d.servizi} /></Section>
      <Section>
        <div className="cta-stack">
          <BookingCTA label="Prenota un colloquio" tipo="colloquio" />
          <BookingCTA label="Richiedi informazioni" tipo="info" ghost />
        </div>
      </Section>
    </>
  )
}

/* ------------------------- ORIENTATION LAB ------------------------- */
export function OrientationLab() {
  const l = C.orientationLab
  return (
    <>
      <PageHero title={l.titolo} subtitle={l.intro || undefined} />
      {l.aree.map((area, i) => (
        <Section key={i} title={area.titolo} alt={i % 2 === 1}>
          <CardGrid items={area.laboratori} context={area.titolo} />
        </Section>
      ))}
      <Section><div className="cta-stack"><BookingCTA label="Iscriviti a un laboratorio" tipo="laboratorio" labGroups={l.aree} /></div></Section>
    </>
  )
}

/* ----------------------------- JOB DAY ----------------------------- */
export function JobDay() {
  const j = C.jobDay
  const attivita = j['attività']
  return (
    <>
      <PageHero title={j.titolo} subtitle={j.intro || undefined} />
      {j.percorsi?.length > 0 && (
        <Section title="I percorsi" alt><CardGrid items={j.percorsi} /></Section>
      )}
      {attivita?.length > 0 && (
        <Section title="Attività"><Chips items={attivita} /></Section>
      )}
      {j.obiettivi?.length > 0 && (
        <Section title="Obiettivi" alt><Bullets items={j.obiettivi} /></Section>
      )}
      <Section><div className="cta-stack"><BookingCTA label="Partecipa al prossimo Job Day" tipo="evento" /></div></Section>
    </>
  )
}

/* ------------------------ DONNA PARTECIPA ------------------------ */
export function DonnaPartecipa() {
  const w = C.donnaPartecipa
  return (
    <>
      <PageHero title={w.titolo} subtitle={w.intro} />
      <Section title="Tematiche" alt><Chips items={w.tematiche} /></Section>
      {w.format && <Section title="Format"><p>{w.format}</p></Section>}
      <Section><div className="cta-stack"><BookingCTA label="Partecipa al percorso" tipo="donna" /></div></Section>
    </>
  )
}

/* ------------------------- #MAREASINISTRA ------------------------- */
export function MareASinistra() {
  const m = C.mareASinistra
  return (
    <>
      <PageHero title={m.titolo} subtitle={m.intro} />
      {m.obiettivi?.length > 0 && <Section title="Obiettivi" alt><Bullets items={m.obiettivi} /></Section>}
      <Section title="Ambiti di promozione"><Chips items={m.ambiti} /></Section>
    </>
  )
}

/* ---------------------------- OPPORTUNITÀ ---------------------------- */
export function Opportunita() {
  const o = C.opportunita
  return (
    <>
      <PageHero title={o.titolo} />
      <Section alt><CardGrid items={o.voci} /></Section>
    </>
  )
}

/* ----------------------------- CONTATTI ----------------------------- */
export function Contatti() {
  const k = C.contatti
  return (
    <>
      <PageHero title={k.nomeProgetto} />
      <Section>
        <div className="info-cols">
          <div className="card">
            <h3>Orientation Desk</h3>
            <p><strong>{k.orientationDesk.nome}</strong><br />{k.orientationDesk.indirizzo}</p>
            <p><strong>Apertura:</strong> {k.apertura.giorni}<br />{k.apertura.orari.join(' · ')}</p>
          </div>
          <div className="card">
            <h3>Riferimenti</h3>
            <p><strong>Soggetto Beneficiario:</strong> {k.soggettoBeneficiario}</p>
            <p><strong>Coordinamento:</strong> {k.coordinamento}</p>
            <p><strong>CUP:</strong> {k.cup}</p>
          </div>
        </div>
      </Section>
      <Section title="Scrivici" alt>
        <BookingCTA label="Invia una richiesta" tipo="contatto" />
      </Section>
    </>
  )
}
