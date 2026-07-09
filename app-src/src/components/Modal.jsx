import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/* Modal e PolicyLink vivono in un file SENZA import locali (solo React):
   BookingForm li importa da qui — mai da ui.jsx, che a sua volta importa
   BookingForm (l'import circolare ui⇄BookingForm rompe il bundle a runtime). */

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
