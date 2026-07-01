import { useState } from 'react'
import { project } from '../config/project.js'

/**
 * Form CTA con invio via email.
 * Supporta due provider (vedi project.form.provider):
 *  - 'web3forms' : POST a https://api.web3forms.com/submit (nessun backend)
 *  - 'php'       : POST all'endpoint PHP del sito (/contact.php) configurato su Plesk
 *
 * `tipo` distingue la richiesta (consulenza | laboratorio | evento | info | donna).
 */
export default function BookingForm({ tipo = 'consulenza', titolo, onClose }) {
  const [state, setState] = useState('idle') // idle | sending | ok | error
  const [err, setErr] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setState('sending')
    setErr('')
    const fd = new FormData(e.target)
    const cfg = project.form

    try {
      let res
      if (cfg.provider === 'web3forms') {
        fd.append('access_key', cfg.accessKey)
        fd.append('subject', `[${project.nomeProgetto}] Richiesta: ${tipo}`)
        fd.append('from_name', project.nomeProgetto)
        res = await fetch(cfg.endpoint, { method: 'POST', body: fd })
      } else {
        res = await fetch(cfg.endpoint || '/contact.php', { method: 'POST', body: fd })
      }
      const data = await res.json().catch(() => ({}))
      if (res.ok && (data.success === undefined || data.success)) {
        setState('ok')
        e.target.reset()
      } else {
        throw new Error(data.message || 'Invio non riuscito')
      }
    } catch (e2) {
      setState('error')
      setErr(e2.message)
    }
  }

  if (state === 'ok') {
    return (
      <div className="form-success" role="status">
        <h3>Richiesta inviata ✅</h3>
        <p>Grazie! Ti ricontatteremo al più presto dall'Orientation Desk.</p>
        {onClose && <button className="btn btn--primary" onClick={onClose}>Chiudi</button>}
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {titolo && <h3>{titolo}</h3>}
      <input type="hidden" name="tipo_richiesta" value={tipo} />
      {/* honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex="-1" autoComplete="off" />

      <label>Nome e cognome
        <input name="nome" type="text" required autoComplete="name" />
      </label>
      <label>Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>Telefono
        <input name="telefono" type="tel" autoComplete="tel" />
      </label>
      <label>Messaggio
        <textarea name="messaggio" rows="4" placeholder="Descrivi brevemente la tua richiesta…" />
      </label>
      <label className="consent">
        <input name="privacy" type="checkbox" required />
        <span>Acconsento al trattamento dei dati per essere ricontattato/a (GDPR).</span>
      </label>

      {state === 'error' && <p className="form-error" role="alert">⚠️ {err}</p>}

      <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
      </button>
    </form>
  )
}
