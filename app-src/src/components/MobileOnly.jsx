import { useEffect, useRef, useState } from 'react'
import { project } from '../config/project.js'
import { ui } from '../config/ui.js'

/**
 * Avviso bloccante: la webapp va usata dallo smartphone, in verticale.
 * Copre il contenuto finché la condizione non rientra (rotazione o schermo stretto).
 * Reversibile: ui.mobileOnly = false lo disattiva ovunque.
 *
 * Due messaggi:
 * - 'ruota'   → telefono touch ruotato in orizzontale
 * - 'desktop' → schermo largo senza touch (computer) o tablet troppo grande
 */
const MAX_WIDTH = 900 // px: oltre questa larghezza non è uno smartphone in verticale

/* Sui dispositivi touch l'orientamento va letto dallo SCHERMO FISICO
   (screen.orientation): la tastiera su Android riduce la viewport e farebbe
   risultare "landscape" un telefono tenuto in verticale, con l'overlay che
   scatta mentre si compila il form. Fallback: media query sulla viewport. */
function verticaleFisico() {
  const t = window.screen?.orientation?.type
  if (t) return t.startsWith('portrait')
  return window.matchMedia
    ? window.matchMedia('(orientation: portrait)').matches
    : window.innerHeight >= window.innerWidth
}

function stato() {
  const touch = window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false
  if (touch) {
    // Lato corto dello schermo fisico: se supera la soglia (tablet grande),
    // ruotare non basterebbe mai → istruzioni da 'desktop', non "ruota".
    const latoCorto = Math.min(
      window.screen?.width || window.innerWidth,
      window.screen?.height || window.innerHeight,
    )
    if (latoCorto > MAX_WIDTH) return 'desktop'
    return verticaleFisico() ? null : 'ruota'
  }
  const verticale = window.matchMedia
    ? window.matchMedia('(orientation: portrait)').matches
    : window.innerHeight >= window.innerWidth
  return verticale && window.innerWidth <= MAX_WIDTH ? null : 'desktop'
}

export default function MobileOnly() {
  // Stato iniziale calcolato subito (non in effect): evita il flash del contenuto.
  const [avviso, setAvviso] = useState(() => (ui.mobileOnly === false ? null : stato()))
  const boxRef = useRef(null)

  useEffect(() => {
    if (ui.mobileOnly === false) return
    const aggiorna = () => setAvviso(stato())
    const suResize = () => {
      // Resize con un campo a fuoco = quasi sempre tastiera che si apre/chiude,
      // non una rotazione: non rivalutare (le rotazioni vere arrivano dagli
      // eventi orientationchange / screen.orientation change qui sotto).
      const el = document.activeElement
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      aggiorna()
    }
    window.addEventListener('resize', suResize)
    window.addEventListener('orientationchange', aggiorna)
    window.screen?.orientation?.addEventListener?.('change', aggiorna)
    return () => {
      window.removeEventListener('resize', suResize)
      window.removeEventListener('orientationchange', aggiorna)
      window.screen?.orientation?.removeEventListener?.('change', aggiorna)
    }
  }, [])

  // Ad avviso attivo: scroll della pagina sottostante bloccato e focus
  // dentro l'overlay (Tab non deve raggiungere i controlli coperti).
  useEffect(() => {
    if (!avviso) return
    const prima = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    boxRef.current?.focus()
    return () => { document.body.style.overflow = prima }
  }, [avviso])

  if (!avviso) return null

  return (
    <div className="mobile-only" role="dialog" aria-modal="true" aria-label="Avviso: usa lo smartphone in verticale">
      <div className="mobile-only__box" ref={boxRef} tabIndex={-1}>
        {project.assets?.logoHeader && (
          <img className="mobile-only__logo" src={project.assets.logoHeader} alt={project.nomeProgetto} />
        )}
        <svg className="mobile-only__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="2" width="8" height="20" rx="2" />
          <path d="M12 18h.01" />
        </svg>
        {avviso === 'ruota' ? (
          <>
            <strong className="mobile-only__title">Ruota il dispositivo</strong>
            <p>Questa webapp è pensata per lo <b>smartphone in verticale</b>. Ruota il telefono per continuare.</p>
          </>
        ) : (
          <>
            <strong className="mobile-only__title">Apri la webapp dallo smartphone</strong>
            <p>Questa webapp può essere utilizzata <b>esclusivamente da smartphone, in verticale</b>. Aprila dal tuo telefono all'indirizzo <b>{window.location.hostname}</b>, tenendolo in verticale.</p>
          </>
        )}
      </div>
    </div>
  )
}
