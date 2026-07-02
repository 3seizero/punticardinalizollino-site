import { useEffect, useState } from 'react'
import { project } from '../config/project.js'

/**
 * Avviso di installazione PWA (Aggiungi a schermata Home), alla prima visita.
 * - Android/Chrome/Edge: usa l'evento beforeinstallprompt → pulsante "Installa".
 * - iOS/Safari: nessun prompt nativo → mostra le istruzioni (Condividi → Aggiungi a Home).
 * Non compare se l'app è già installata (standalone) o se già chiuso in precedenza.
 */
const DISMISS_KEY = 'pcfw-install-dismissed'

const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
const isIos = () =>
  /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false)
  const [deferred, setDeferred] = useState(null)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    try { if (localStorage.getItem(DISMISS_KEY)) return } catch { /* storage non disponibile */ }

    const onBIP = (e) => { e.preventDefault(); setDeferred(e); setVisible(true) }
    window.addEventListener('beforeinstallprompt', onBIP)
    const onInstalled = () => { setVisible(false); try { localStorage.setItem(DISMISS_KEY, '1') } catch { /* noop */ } }
    window.addEventListener('appinstalled', onInstalled)

    let t
    if (isIos()) { setIos(true); t = setTimeout(() => setVisible(true), 1800) }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBIP)
      window.removeEventListener('appinstalled', onInstalled)
      if (t) clearTimeout(t)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try { localStorage.setItem(DISMISS_KEY, '1') } catch { /* noop */ }
  }

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    try { await deferred.userChoice } catch { /* noop */ }
    setDeferred(null)
    dismiss()
  }

  if (!visible) return null

  return (
    <div className="install-prompt" role="dialog" aria-label={`Installa l'app di ${project.nomeProgetto}`}>
      <button className="install-prompt__close" onClick={dismiss} aria-label="Chiudi">×</button>
      {project.assets?.icon || project.assets?.logoHeader ? (
        <img className="install-prompt__icon" src={project.assets.icon || project.assets.logoHeader} alt="" />
      ) : null}
      <div className="install-prompt__body">
        <strong>Installa l'app di {project.nomeProgetto}</strong>
        {ios ? (
          <p>Tocca il pulsante <b>Condividi</b> nella barra di Safari e scegli <em>«Aggiungi alla schermata Home»</em> per aprirla a schermo intero.</p>
        ) : (
          <p>Aggiungila alla schermata Home per accedervi rapidamente, a schermo intero.</p>
        )}
      </div>
      {!ios && <button className="btn btn--primary install-prompt__cta" onClick={install}>Installa</button>}
    </div>
  )
}
