import { useEffect, useState } from 'react'
import { project } from '../config/project.js'
import { ui } from '../config/ui.js'

/**
 * Avviso bloccante: la webapp va usata dallo smartphone, in verticale.
 * Copre il contenuto finché la condizione non rientra (rotazione o schermo stretto).
 * Reversibile: ui.mobileOnly = false lo disattiva ovunque.
 *
 * Due messaggi:
 * - 'ruota'   → dispositivo touch non in verticale (telefono/tablet ruotato)
 * - 'desktop' → schermo largo senza touch (computer)
 */
const MAX_WIDTH = 900 // px: oltre questa larghezza non è uno smartphone in verticale

function stato() {
  const mm = window.matchMedia
  const verticale = mm ? mm('(orientation: portrait)').matches : window.innerHeight >= window.innerWidth
  const stretto = window.innerWidth <= MAX_WIDTH
  if (verticale && stretto) return null
  const touch = mm ? mm('(pointer: coarse)').matches : false
  return touch ? 'ruota' : 'desktop'
}

export default function MobileOnly() {
  const [avviso, setAvviso] = useState(null)

  useEffect(() => {
    if (ui.mobileOnly === false) return
    const aggiorna = () => setAvviso(stato())
    aggiorna()
    window.addEventListener('resize', aggiorna)
    window.addEventListener('orientationchange', aggiorna)
    return () => {
      window.removeEventListener('resize', aggiorna)
      window.removeEventListener('orientationchange', aggiorna)
    }
  }, [])

  if (!avviso) return null

  return (
    <div className="mobile-only" role="dialog" aria-modal="true" aria-label="Avviso: usa lo smartphone in verticale">
      <div className="mobile-only__box">
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
            <p>Questa webapp è pensata per essere usata <b>dallo smartphone, in verticale</b>. Riporta il telefono in posizione verticale per continuare.</p>
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
