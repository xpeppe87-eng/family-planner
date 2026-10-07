# 📅 Family Planner

Applicazione web progressiva (PWA) moderna, reattiva e dal design curato con glassmorphism per organizzare gli impegni, le attività, i luoghi frequenti e i turni di tutta la famiglia in modo coordinato.

---

## 🚀 Caratteristiche Principali

- **Dashboard per la Famiglia**: visualizzazione degli impegni odierni e futuri filtrabili per singolo familiare con un solo tocco.
- **Gestione Avatar Flessibile**: possibilità di aggiungere componenti con avatar 3D personalizzati, anelli colorati e possibilità di rimuovere gli avatar direttamente dalla barra principale.
- **Vista Calendario & Feed**: agenda interattiva e calendario mensile con categorie di impegno (Sport, Scuola, Famiglia, Salute, Lavoro, ecc.).
- **Luoghi Frequenti**: gestione rapida dei punti di riferimento familiari (casa, scuola, palestra, studi medici) con link diretto a Google Maps.
- **PWA & Offline First**: utilizzabile come app a tutto schermo su smartphone, tablet e PC, con Service Worker e cache locale.
- **Sincronizzazione**: salvataggio locale oppure sincronizzazione cloud Appwrite tra familiari autenticati.

---

## 📋 Requisiti di Sistema

- **Sistema Operativo**: Windows 10 o Windows 11 (per l'esecuzione dello script del server locale).
- **PowerShell**: versione 5.1 o superiore (inclusa di default in Windows).
- **Browser Web**: qualsiasi browser moderno (Chrome, Edge, Safari, Firefox).
- **Rete Wi-Fi** (opzionale): necessaria per condividere l'app con smartphone e tablet connessi alla medesima rete domestica.

---

## 📂 Struttura del Progetto e File Necessari

Per il corretto funzionamento dell'applicazione sono necessari i seguenti file:

| File / Cartella | Descrizione |
|---|---|
| `index.html` | Struttura dell'interfaccia utente e layout dell'applicazione |
| `style.css` | Sistema di design, animazioni, glassmorphism e stili responsive |
| `app.js` | Logica applicativa, gestione dello stato, interazioni e sincronizzazione |
| `server.ps1` | Server HTTP locale leggero in PowerShell per servire i file e gestire le API |
| `avvia_server.bat` | Script batch rapido per avviare il server in locale |
| `ferma_server.bat` | Script batch per arrestare il server locale in esecuzione |
| `abilita_accesso_telefoni.bat` | Script per configurare la regola firewall di Windows per l'accesso da smartphone |
| `manifest.json` | Configurazione PWA per l'installazione su dispositivi mobili |
| `sw.js` | Service Worker per supporto offline e caching |
| `assets/` | Icone, loghi e avatar grafici per i profili familiari |
| `data.example.json` | Template anonimo di esempio per l'inizializzazione locale |
| `appwrite-config.js` | Identificativi pubblici del progetto Appwrite (mai inserire chiavi API) |
| `appwrite-cloud.js` | Accesso, autenticazione e sincronizzazione con Appwrite |

---

## 🔒 Gestione dei Dati e Privacy (`data.json`)

Per proteggere la privacy della famiglia, il file con i dati effettivi **`data.json` non è tracciato né incluso nel repository Git** (è escluso nel file `.gitignore`).

### Primo avvio:
1. All'avvio, se `data.json` non è presente, l'applicazione genera automaticamente la struttura dati iniziale a partire dai profili predefiniti.
2. In alternativa, puoi copiare il file di template:
   ```powershell
   Copy-Item data.example.json data.json
   ```
3. Nella modalità locale i dati restano nel file `data.json`; con Appwrite configurato vengono sincronizzati nel progetto cloud dopo l'accesso e l'inizializzazione esplicita.

---

## 🛠️ Istruzioni per Avviare l'App in Locale

### 1. Avvio Rapido da PC
Fai doppio clic sul file:
```
avvia_server.bat
```
oppure apri PowerShell nella cartella del progetto ed esegui:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -port 8080
```

Il terminale mostrerà l'indirizzo locale:
- **Dal tuo computer**: apri il browser all'indirizzo [http://localhost:8080](http://localhost:8080)
- **Da smartphone / tablet** (nella stessa rete Wi-Fi): apri il browser all'indirizzo `http://<IP_DEL_PC>:8080` (es. `http://192.168.1.xxx:8080`)

### 2. Abilitare l'Accesso da Smartphone (Prima volta)
Se i telefoni o tablet collegati alla rete Wi-Fi non riescono a raggiungere l'indirizzo del PC, fai doppio clic con privilegi di amministratore su:
```
abilita_accesso_telefoni.bat
```
Questo script crea automaticamente una regola nel Firewall di Windows per consentire le connessioni in ingresso sulla porta `8080` all'interno della rete privata locale.

### 3. Arrestare il Server
Per fermare il server in esecuzione, fai doppio clic su:
```
ferma_server.bat
```
oppure premi `Ctrl + C` nella finestra del server.

---

## ☁️ Appwrite: configurazione cloud

Il progetto include l'accesso con email/password e la sincronizzazione di una riga condivisa tramite un Team Appwrite. L'account autenticato deve appartenere al Team configurato.

1. Crea un progetto Appwrite nella regione europea scelta dalla Console e aggiungi una piattaforma Web per `localhost` e per l'hostname usato in locale. Dopo la pubblicazione, aggiungi anche l'hostname effettivo del sito.
2. In Auth abilita email e password. Crea un Team per la famiglia e invita gli account familiari al Team.
3. In Databases crea un database TablesDB, una tabella `familyState` con una colonna `payload` di tipo `longtext`, e attiva **Row Security**.
4. Nelle autorizzazioni della tabella consenti **solo Create al Team familiare**; non concedere Read, Update o Delete a livello tabella. La riga iniziale avrà permessi Read e Update limitati al Team.
5. Copia endpoint, Project ID, Database ID, Table ID e Team ID in `appwrite-config.js`. Sono identificativi pubblici; non mettere mai una API key nel browser o in GitHub.
6. Apri l'app, accedi o crea un account membro del Team. Il primo dispositivo mostra il pulsante per inizializzare la riga. Il trasferimento richiede un'ulteriore conferma nell'app e non parte automaticamente.

La riga condivisa contiene l'intero stato familiare nella colonna `payload`. Gli aggiornamenti concorrenti usano una strategia semplice “ultima modifica vince”; per un singolo uso familiare è sufficiente, ma non è una sincronizzazione con modifica simultanea per campo.

### Avvio locale

Il server PowerShell continua a funzionare come modalità locale. Se Appwrite è configurato, l'app usa il cloud dopo l'accesso; se non è configurato, mantiene il salvataggio sul dispositivo e la modalità locale.
