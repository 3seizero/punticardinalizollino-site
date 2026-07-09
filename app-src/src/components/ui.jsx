import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import BookingForm from './BookingForm.jsx'
import { ui } from '../config/ui.js'
import { Icon, iconFor } from './icons.jsx'

/* Mini-markdown per i testi di config: rende **testo** in grassetto */
export function emph(text) {
  if (typeof text !== 'string' || !text.includes('**')) return text
  return text.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

/* Sezione con titolo opzionale. Gli sfondi si alternano automaticamente
   (bianco/grigio) via CSS in index.css — nessun prop da gestire. */
export function Section({ title, kicker, children, id }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        {kicker && <p className="kicker">{kicker}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  )
}

/* Hero di pagina interna */
export function PageHero({ title, subtitle, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="page-hero__sub">{emph(subtitle)}</p>}
        {children}
      </div>
    </section>
  )
}

/* Card con icona tematica + descrizione rivelata al rollover / tap.
   Lo stato "aperto" è gestito dalla griglia (accordion: uno solo aperto). */
function IconCard({ item, context, open, onToggle }) {
  const title = item.titolo || item.nome
  const hasDesc = !!item.desc
  const interactive = hasDesc && ui.hoverReveal
  const toggle = () => interactive && onToggle()
  return (
    <article
      className={'icard' + (hasDesc ? ' has-desc' : '') + (interactive ? ' interactive' : '') + (open ? ' is-open' : '')}
      onClick={toggle}
      tabIndex={interactive ? 0 : undefined}
      aria-expanded={interactive ? open : undefined}
      onKeyDown={(e) => { if (interactive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle() } }}
    >
      <div className="icard__head">
        {ui.icons && <span className="icard__icon"><Icon name={item.icon || iconFor(title, context)} /></span>}
        <h3>{title}</h3>
      </div>
      {hasDesc && (
        ui.hoverReveal
          ? <div className="icard__reveal"><p>{item.desc}</p></div>
          : <p className="card__desc">{item.desc}</p>
      )}
    </article>
  )
}

/* Griglia di card {titolo/nome, desc}. `context` aiuta la scelta dell'icona.
   Gestisce l'accordion: apre una card e chiude la precedente. */
export function CardGrid({ items, max, context }) {
  const list = max ? items.slice(0, max) : items
  const [openIdx, setOpenIdx] = useState(null)
  if (ui.icons || ui.hoverReveal) {
    return (
      <div className="grid grid--icards">
        {list.map((it, i) => (
          <IconCard key={i} item={it} context={context}
            open={openIdx === i}
            onToggle={() => setOpenIdx((cur) => (cur === i ? null : i))} />
        ))}
      </div>
    )
  }
  return (
    <div className="grid">
      {list.map((it, i) => (
        <article className="card" key={i}>
          <h3>{it.titolo || it.nome}</h3>
          {it.desc && <p className="card__desc">{it.desc}</p>}
        </article>
      ))}
    </div>
  )
}

/* Lista a pallini semplice */
export function Bullets({ items }) {
  return (
    <ul className={'bullets' + (ui.shapeBullets ? ' bullets--shape' : '')}>
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  )
}

/* Tag/chip (es. destinatari) */
export function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((t, i) => <span className="chip" key={i}>{t}</span>)}
    </div>
  )
}

/* Blocco di testo: titolo + paragrafi[] */
export function TextBlock({ titolo, paragrafi, kicker }) {
  return (
    <Section title={titolo} kicker={kicker}>
      {(paragrafi || []).map((p, i) => <p key={i}>{p}</p>)}
    </Section>
  )
}

/* Blocco scroll "body fixed" con CONTATORE: regge le modali annidate
   (es. Informativa Privacy aperta da dentro il form). Solo la prima
   attivazione blocca, solo l'ultima chiusura sblocca e ripristina lo scroll. */
let bodyLocks = 0
let bodyLockScrollY = 0
function lockBody() {
  if (++bodyLocks > 1) return
  bodyLockScrollY = window.scrollY
  const b = document.body
  b.style.position = 'fixed'
  b.style.top = `-${bodyLockScrollY}px`
  b.style.insetInline = '0'
  b.style.width = '100%'
}
function unlockBody() {
  if (--bodyLocks > 0) return
  const b = document.body
  b.style.position = ''
  b.style.top = ''
  b.style.insetInline = ''
  b.style.width = ''
  window.scrollTo(0, bodyLockScrollY)
}

/* Stack delle modali aperte: ESC chiude solo quella in cima (con modali
   annidate non deve chiudere anche il form sottostante già compilato). */
const modalStack = []

/* Modale accessibile */
export function Modal({ open, onClose, children, title, wide }) {
  useEffect(() => {
    if (!open) return
    const token = {}
    modalStack.push(token)
    const onKey = (e) => {
      if (e.key === 'Escape' && modalStack[modalStack.length - 1] === token) onClose()
    }
    document.addEventListener('keydown', onKey)
    lockBody()
    return () => {
      modalStack.splice(modalStack.indexOf(token), 1)
      document.removeEventListener('keydown', onKey)
      unlockBody()
    }
  }, [open, onClose])
  if (!open) return null
  // Portal su <body>: il modal è sempre sopra header/sezioni (nessun ritaglio o
  // sovrapposizione da stacking context della pagina)
  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className={'modal' + (wide ? ' modal--wide' : '')} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Chiudi">×</button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

/* Link a Informativa Privacy / Cookie Policy iubenda: apre la policy in una
   MODALE (iframe con variante ?ifr=true, come il widget iubenda), non in una
   nuova pagina. L'href resta per apertura in nuova scheda (cmd/ctrl+click). */
export function PolicyLink({ url, title, children }) {
  const [open, setOpen] = useState(false)
  if (!url) return children || null
  const src = url + (url.includes('?') ? '&' : '?') + 'ifr=true'
  return (
    <>
      <a href={url} onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault(); setOpen(true)
      }}>{children}</a>
      <Modal open={open} onClose={() => setOpen(false)} title={title || 'Informativa'} wide>
        <iframe className="policy-frame" src={src} title={title || 'Informativa'} />
      </Modal>
    </>
  )
}

/* Pulsante CTA che apre la modale col form di prenotazione.
   `labGroups` abilita la selezione multipla dei laboratori nel form.
   `quando` mostra la data dell'evento nel form (campo in sola lettura). */
export function BookingCTA({ label, tipo = 'consulenza', ghost, titoloForm, labGroups, quando }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button className={'btn ' + (ghost ? 'btn--ghost' : 'btn--primary')} onClick={() => setOpen(true)}>
        {label}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={label}>
        <BookingForm tipo={tipo} titolo={titoloForm || label} labGroups={labGroups} quando={quando} onClose={() => setOpen(false)} />
      </Modal>
    </>
  )
}
