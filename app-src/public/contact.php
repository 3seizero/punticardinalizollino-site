<?php
/**
 * contact.php — Endpoint form CTA.
 * 1) invia la richiesta ad Antform (MAIL_TO)
 * 2) invia un AUTORESPONDER di riepilogo al mittente (email dell'utente)
 * Vale per TUTTI i form. Il form "laboratorio" include i laboratori scelti (checkbox multipli).
 *
 * CREDENZIALI: da file `pcfw-smtp.php` UN LIVELLO SOPRA app/ (non nel repo), con fallback a env.
 *   SMTP_HOST (es. ssl0.ovh.net) · SMTP_PORT (465/587) · SMTP_USER · SMTP_PASS · MAIL_TO
 * PHPMailer: se presente in ./vendor/ usa SMTP autenticato; altrimenti fallback a mail().
 */
declare(strict_types=1);
@ini_set('display_errors', '0'); // mai warning/notice dentro l'output JSON
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito']); exit;
}
if (!empty($_POST['botcheck'] ?? '')) { echo json_encode(['success' => true]); exit; } // honeypot

$clean = fn($s, $max) => mb_substr(str_replace(["\r", "\n"], ' ', trim((string)$s)), 0, $max);

$nome      = $clean($_POST['nome'] ?? '', 120);
$email     = $clean($_POST['email'] ?? '', 254);
$telefono  = $clean($_POST['telefono'] ?? '', 40);
$messaggio = mb_substr(trim((string)($_POST['messaggio'] ?? '')), 0, 5000);
$tipo      = $clean($_POST['tipo_richiesta'] ?? 'richiesta', 120);
$progetto  = $clean($_POST['progetto'] ?? 'Punti Cardinali for Work', 160); // nome completo con riferimento webapp
$nomeForm  = $clean($_POST['nome_form'] ?? '', 120) ?: $tipo;               // "NOMEFORM" (es. Prenota una consulenza)
$rif       = $clean($_POST['rif'] ?? '', 160) ?: $progetto;                 // "Punti Cardinali for Work | <Comune>"
$quando    = $clean($_POST['quando'] ?? '', 160);     // data evento (Job Day / Puglia Attrattiva)
$privacy   = !empty($_POST['privacy'] ?? '');
$aggiorna  = !empty($_POST['aggiornamenti'] ?? '');   // opt-in info su prossimi appuntamenti

// Laboratori selezionati (checkbox multipli), name="laboratori[]"
$labs = $_POST['laboratori'] ?? [];
if (!is_array($labs)) $labs = [$labs];
$labs = array_slice(array_values(array_filter(array_map(fn($s) => $clean($s, 160), $labs))), 0, 30);

// I campi che finiscono negli OGGETTI delle email arrivano dal client: nei
// Subject via SMTP autenticato non devono veicolare URL/spam verso terzi.
$subjSafe = fn($s) => mb_substr(trim(preg_replace('~https?://\S+|www\.\S+~iu', '', $s)), 0, 90);
$nomeFormS = $subjSafe($nomeForm) ?: 'richiesta';
$rifS      = $subjSafe($rif) ?: 'Punti Cardinali for Work';

$errors = [];
if ($nome === '') $errors[] = 'nome mancante';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email non valida';
if (!$privacy) $errors[] = 'consenso privacy mancante';
if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]); exit;
}

// --- Rate limiting per IP ---
// L'autoresponder invia una email all'indirizzo indicato dall'utente: senza un
// tetto agli invii l'endpoint è usabile come relay di spam verso terzi (con
// rischio blacklist del dominio). Finestra scorrevole su file in tmp.
$RL_MAX    = 5;    // invii consentiti per IP...
$RL_WINDOW = 900;  // ...ogni 15 minuti
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
if ($ip !== '') {
    $rlFile = sys_get_temp_dir() . '/pcfw-rl-' . hash('sha256', $ip);
    $now  = time();
    $hits = is_file($rlFile) ? json_decode((string)@file_get_contents($rlFile), true) : [];
    if (!is_array($hits)) $hits = [];
    $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $now - $t < $RL_WINDOW));
    if (count($hits) >= $RL_MAX) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Hai già inviato diverse richieste: attendi qualche minuto e riprova.']); exit;
    }
    $hits[] = $now;
    @file_put_contents($rlFile, json_encode($hits), LOCK_EX);
}

// --- Config SMTP ---
$secrets = [];
foreach ([__DIR__ . '/../pcfw-smtp.php', __DIR__ . '/../../pcfw-smtp.php'] as $sf) {
    if (is_file($sf)) { $tmp = include $sf; if (is_array($tmp)) { $secrets = $tmp; break; } }
}
$cfg = fn($k) => $secrets[$k] ?? (getenv($k) ?: ($_SERVER[$k] ?? ($_ENV[$k] ?? '')));
$SMTP_HOST = (string)$cfg('SMTP_HOST');
$SMTP_PORT = (int)($cfg('SMTP_PORT') ?: 465);
$SMTP_USER = (string)$cfg('SMTP_USER');
$SMTP_PASS = (string)$cfg('SMTP_PASS');
$MAIL_TO   = (string)($cfg('MAIL_TO') ?: $SMTP_USER);
// Mittente visibile (From): può differire dall'account di autenticazione
// (es. From info@antform.it con auth postmaster@ — OVH lo accetta, stesso dominio)
$MAIL_FROM = (string)($cfg('MAIL_FROM') ?: $SMTP_USER);
$SITE      = $_SERVER['HTTP_HOST'] ?? 'webapp';

// Blocco laboratori (testo)
$labsBlock = '';
if ($labs) {
    $labsBlock = "\nLaboratori di interesse:\n - " . implode("\n - ", $labs) . "\n";
}

// --- Corpo email per ANTFORM (postmaster) ---
$subjectAntform = "Nuova richiesta ricevuta da \"{$nomeFormS}\" - {$rifS}";
$bodyAntform  = "Questi i dati inviati:\n\n";
$bodyAntform .= "Form: {$nomeForm}\n";
if ($quando !== '') $bodyAntform .= "Quando: {$quando}\n";
$bodyAntform .= "Nome: {$nome}\n";
$bodyAntform .= "Email: {$email}\n";
$bodyAntform .= "Telefono: " . ($telefono !== '' ? $telefono : '—') . "\n";
$bodyAntform .= $labsBlock;
$bodyAntform .= "Messaggio: " . ($messaggio !== '' ? $messaggio : '—') . "\n";
$bodyAntform .= "Consenso al trattamento dei dati personali: sì\n";
$bodyAntform .= "Opt-in informazioni sui prossimi appuntamenti: " . ($aggiorna ? 'SÌ' : 'no') . "\n";

// --- Corpo AUTORESPONDER per il mittente ---
$subjectUser = "\"{$nomeFormS}\" - {$rifS}";
$bodyUser  = "Gentile {$nome},\n\n";
$bodyUser .= "grazie per averci contattato. Abbiamo ricevuto la tua richiesta \"{$nomeForm}\" e ti ricontatteremo al più presto dall'Orientation Desk.\n\n";
$bodyUser .= "Riepilogo dei dati inviati:\n";
$bodyUser .= "- Richiesta: {$nomeForm}\n";
if ($quando !== '') $bodyUser .= "- Quando: {$quando}\n";
$bodyUser .= "- Nome: {$nome}\n";
$bodyUser .= "- Email: {$email}\n";
$bodyUser .= "- Telefono: " . ($telefono !== '' ? $telefono : '—') . "\n";
if ($labs) $bodyUser .= "- Laboratori di interesse:\n   • " . implode("\n   • ", $labs) . "\n";
$bodyUser .= "- Messaggio: " . ($messaggio !== '' ? $messaggio : '—') . "\n";
$bodyUser .= "- Consenso al trattamento dei dati personali: sì\n";
$bodyUser .= "- Ricevere informazioni sui prossimi appuntamenti: " . ($aggiorna ? 'sì' : 'no') . "\n";
if ($aggiorna) $bodyUser .= "\nTi terremo aggiornato/a sui prossimi appuntamenti e su tutte le attività del progetto.\n";
$bodyUser .= "\nQuesta è una email automatica di conferma, non è necessario rispondere.\n\n";
$bodyUser .= "{$progetto}\nCoordinamento: ANTFORM APS – Ente del Terzo Settore";

// ============================================================
// Invio: PHPMailer (SMTP) se disponibile, altrimenti mail()
// ============================================================
$sentAntform = false;
// PHPMailer: cercato in ./vendor/ e UN LIVELLO SOPRA app/ (come pcfw-smtp.php:
// sopravvive ai deploy, che svuotano app/). NB: mail() locale NON consegna —
// Postfix del server tratta antform.it come dominio locale (caselle inesistenti).
$autoload = null;
foreach ([__DIR__ . '/vendor/autoload.php', __DIR__ . '/../vendor/autoload.php'] as $af) {
    if (is_file($af)) { $autoload = $af; break; }
}

if ($autoload && $SMTP_HOST !== '') {
    require $autoload;
    $make = function () use ($SMTP_HOST, $SMTP_PORT, $SMTP_USER, $SMTP_PASS, $MAIL_FROM, $progetto) {
        $m = new \PHPMailer\PHPMailer\PHPMailer(true);
        $m->isSMTP();
        $m->Host = $SMTP_HOST; $m->SMTPAuth = true;
        $m->Username = $SMTP_USER; $m->Password = $SMTP_PASS;
        $m->SMTPSecure = $SMTP_PORT === 465 ? 'ssl' : 'tls';
        $m->Port = $SMTP_PORT; $m->CharSet = 'UTF-8';
        $m->setFrom($MAIL_FROM, $progetto);
        return $m;
    };
    // 1) ad Antform
    try {
        $m = $make(); $m->addAddress($MAIL_TO); $m->addReplyTo($email, $nome);
        $m->Subject = $subjectAntform; $m->Body = $bodyAntform; $m->send();
        $sentAntform = true;
    } catch (\Throwable $e) { $sentAntform = false; }
    // 2) autoresponder al mittente (non blocca l'esito)
    try {
        $m = $make(); $m->addAddress($email, $nome); $m->addReplyTo($MAIL_TO, $progetto);
        $m->Subject = $subjectUser; $m->Body = $bodyUser; $m->send();
    } catch (\Throwable $e) { /* ignora: l'importante è la mail ad Antform */ }
} else {
    // Fallback mail() nativo
    $from = $MAIL_FROM ?: ('no-reply@' . $SITE);
    $h1 = ['From: ' . $progetto . ' <' . $from . '>', 'Reply-To: ' . $email, 'Content-Type: text/plain; charset=UTF-8', 'MIME-Version: 1.0'];
    $sentAntform = mail($MAIL_TO, $subjectAntform, $bodyAntform, implode("\r\n", $h1));
    $h2 = ['From: ' . $progetto . ' <' . $from . '>', 'Reply-To: ' . $MAIL_TO, 'Content-Type: text/plain; charset=UTF-8', 'MIME-Version: 1.0'];
    @mail($email, $subjectUser, $bodyUser, implode("\r\n", $h2));
}

if ($sentAntform) {
    echo json_encode(['success' => true, 'message' => 'Richiesta inviata']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Invio non riuscito']);
}
