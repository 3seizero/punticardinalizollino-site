import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import { project } from './config/project.js'
import { content } from './config/content.js'
import { Home, Progetto, OrientationDesk, OrientationLab, JobDay, DonnaPartecipa, MareASinistra, Opportunita, Contatti } from './pages.jsx'
import './App.css'

/* Applica la palette del progetto come variabili CSS su :root */
function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(theme || {}).forEach(([k, v]) => root.style.setProperty(k, v))
  root.dataset.shape = project.shape || 'circle'
}

const hasOpportunita = content.opportunita?.voci?.length > 0

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/progetto', label: 'Il Progetto' },
  { to: '/orientation-desk', label: 'Orientation Desk' },
  { to: '/orientation-lab', label: 'Orientation Lab' },
  { to: '/job-day', label: 'Job Day' },
  { to: '/donna-partecipa', label: 'Puglia Donna Partecipa' },
  { to: '/mareasinistra', label: 'Puglia Attrattiva #mareAsinistra' },
  ...(hasOpportunita ? [{ to: '/opportunita', label: 'Opportunità' }] : []),
  { to: '/contatti', label: 'Contatti' },
]

/* Striscia loghi istituzionali, in cima a tutto */
function InstitutionalBar() {
  if (!project.assets?.logosHeader) return null
  return (
    <div className="inst-bar">
      <div className="container">
        <img src={project.assets.logosHeader} alt="Loghi istituzionali — Unione Europea, Regione Puglia, Punti Cardinali for Work" />
      </div>
    </div>
  )
}

/* Header app: logo progetto + hamburger */
function Header({ onOpen }) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={project.nomeProgetto}>
          {project.assets?.logoHeader
            ? <img src={project.assets.logoHeader} alt={project.nomeProgetto} className="brand__logo" />
            : <span className="brand__text">{project.nomeProgetto}</span>}
        </Link>
        <button className="hamburger" onClick={onOpen} aria-label="Apri il menu" aria-haspopup="true">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}

/* Menu flyout a tutto schermo */
function Flyout({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  return (
    <div className={'flyout' + (open ? ' is-open' : '')} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="flyout__top container">
        {project.assets?.logoHeader
          ? <img src={project.assets.logoHeader} alt={project.nomeProgetto} className="flyout__logo" />
          : <span className="flyout__title">{project.nomeProgetto}</span>}
        <button className="flyout__close" onClick={onClose} aria-label="Chiudi il menu">×</button>
      </div>
      <nav className="flyout__nav" aria-label="Navigazione principale">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} onClick={onClose}
            className={({ isActive }) => 'flyout__link' + (isActive ? ' is-active' : '')}>
            {n.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function Footer() {
  const f = content?.footerIstituzionale || {}
  return (
    <footer className="site-footer">
      <div className="container">
        {project.assets?.logosFooter &&
          <img src={project.assets.logosFooter} alt="Loghi istituzionali e partner di progetto" className="footer-logos" />}
        <div className="footer-inst">
          <p>{f.testo || `Progetto finanziato nell'ambito dell'Avviso Pubblico "PUNTI CARDINALI FOR WORK", PR Puglia FESR-FSE+ 2021-2027 – Azione 5.1 Interventi per l'Occupazione.`}</p>
          <p className="footer-meta">
            <span><strong>Soggetto Beneficiario:</strong> Comune di {project.comune}</span>
            <span><strong>Coordinamento:</strong> ANTFORM APS – Ente del Terzo Settore</span>
            <span><strong>CUP:</strong> {project.cup}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <h1>Pagina non trovata</h1>
        <p><Link to="/">Torna alla home</Link></p>
      </div>
    </section>
  )
}

/* Riporta lo scroll in alto al cambio pagina */
function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { applyTheme(project.theme) }, [])

  return (
    <>
      <ScrollTop />
      <InstitutionalBar />
      <Header onOpen={() => setMenuOpen(true)} />
      <Flyout open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/progetto" element={<Progetto />} />
          <Route path="/orientation-desk" element={<OrientationDesk />} />
          <Route path="/orientation-lab" element={<OrientationLab />} />
          <Route path="/job-day" element={<JobDay />} />
          <Route path="/donna-partecipa" element={<DonnaPartecipa />} />
          <Route path="/mareasinistra" element={<MareASinistra />} />
          {hasOpportunita && <Route path="/opportunita" element={<Opportunita />} />}
          <Route path="/contatti" element={<Contatti />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
