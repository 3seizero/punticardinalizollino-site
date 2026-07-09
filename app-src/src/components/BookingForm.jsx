import { useState } from 'react'
import { project } from '../config/project.js'
import { PolicyLink } from './Modal.jsx'

/**
 * Form CTA con invio via email (provider 'php' → /contact.php, o 'web3forms').
 * `tipo` distingue la richiesta. `labGroups` (array di aree {titolo, laboratori:[{nome}]})
 * abilita la selezione multipla dei laboratori (checkbox) — usato dal form "laboratorio".
 * `quando` (stringa data evento) mostra il campo "Quando" in sola lettura (Job Day /
 * Puglia Attrattiva) e viene incluso nell'email.
 * Il backend invia la mail ad Antform E un autoresponder di riepilogo al mittente.
 */
export default function BookingForm({ tipo = 'consulenza', titolo, labGroups, quando, onClose }) {
  const [state, setState] = useState('idle') // idle | sending | ok | error
  const [err, setErr] = useState('')
  const [openArea, setOpenArea] = useState(null) // accordion aree laboratori

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
        fd.append('subject', `Nuova richiesta ricevuta da "${titolo || tipo}" - ${project.riferimento || project.nomeProgetto}`)
        fd.append('from_name', project.nomeCompleto || project.nomeProgetto)
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
        <p>Grazie! Ti ricontatteremo al più presto dall'Orientation Desk.<br />
           Riceverai a breve una <strong>email di riepilogo</strong> all'indirizzo indicato.</p>
        {onClose && <button className="btn btn--primary" onClick={onClose}>Chiudi</button>}
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {titolo && <h3>{titolo}</h3>}
      <input type="hidden" name="tipo_richiesta" value={tipo} />
      {/* progetto = nome completo con riferimento webapp; nome_form = "NOMEFORM"
          negli oggetti email; rif = "Punti Cardinali for Work | <Comune>" */}
      <input type="hidden" name="progetto" value={project.nomeCompleto || project.nomeProgetto} />
      <input type="hidden" name="nome_form" value={titolo || tipo} />
      <input type="hidden" name="rif" value={project.riferimento || ''} />
      {/* honeypot anti-spam */}
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex="-1" autoComplete="off" />

      {quando && (
        <label>Quando
          <input name="quando" type="text" value={quando} readOnly />
        </label>
      )}

      <label>Nome e cognome
        <input name="nome" type="text" required autoComplete="name" />
      </label>
      <label>Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>Telefono
        <input name="telefono" type="tel" autoComplete="tel" />
      </label>

      {labGroups && labGroups.length > 0 && (
        <fieldset className="lab-picker">
          <legend>Laboratori di interesse</legend>
          {labGroups.map((area, i) => (
            <div className={'lab-acc' + (openArea === i ? ' is-open' : '')} key={i}>
              <button type="button" className="lab-acc__head"
                onClick={() => setOpenArea((cur) => (cur === i ? null : i))}
                aria-expanded={openArea === i}>
                <span>{area.titolo}</span>
                <span className="lab-acc__chev" aria-hidden="true">+</span>
              </button>
              <div className="lab-acc__body">
                <div className="lab-acc__inner">
                  {area.laboratori.map((lab, j) => (
                    <label className="lab-picker__item" key={j}>
                      <input type="checkbox" name="laboratori[]" value={lab.nome} />
                      <span>{lab.nome}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </fieldset>
      )}

      <label>Messaggio
        <textarea name="messaggio" rows="4" placeholder="Descrivi brevemente la tua richiesta…" />
      </label>
      <label className="consent">
        <input name="privacy" type="checkbox" required />
        <span>
          Ho letto l'<PolicyLink url={project.privacy?.policyUrl} title="Informativa Privacy">Informativa Privacy</PolicyLink> e
          acconsento al trattamento dei dati personali inviati per dare seguito alla mia richiesta,
          ai sensi del Regolamento UE 2016/679 (GDPR).
        </span>
      </label>
      <label className="consent">
        <input name="aggiornamenti" type="checkbox" />
        <span>Desidero ricevere informazioni sui prossimi appuntamenti e sulle attività del progetto.</span>
      </label>

      {state === 'error' && <p className="form-error" role="alert">⚠️ {err}</p>}

      <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
      </button>
    </form>
  )
}
