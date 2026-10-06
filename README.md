# 📅 Family Planner

Applicazione web progressiva (PWA) moderna, reattiva e dal design curato con glassmorphism per organizzare gli impegni, le attività, i luoghi frequenti e i turni di tutta la famiglia in tempo reale.

---

## 🚀 Caratteristiche Principali

- **Dashboard per la Famiglia**: visualizzazione degli impegni odierni e futuri filtrabili per singolo familiare con un solo tocco.
- **Gestione Avatar Flessibile**: possibilità di aggiungere componenti con avatar 3D personalizzati, anelli colorati e possibilità di rimuovere gli avatar direttamente dalla barra principale.
- **Vista Calendario & Feed**: agenda interattiva e calendario mensile con categorie di impegno (Sport, Scuola, Famiglia, Salute, Lavoro, ecc.).
- **Luoghi Frequenti**: gestione rapida dei punti di riferimento familiari (casa, scuola, palestra, studi medici) con link diretto a Google Maps.
- **PWA & Offline First**: utilizzabile come app a tutto schermo su smartphone, tablet e PC, con Service Worker e cache locale.
- **Sincronizzazione in Tempo Reale**: sincronizzazione bidirezionale tra tutti i dispositivi collegati alla stessa rete locale.

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
| `data.example.json` | Template di esempio con dati fittizi per l'inizializzazione del database locale |

---

## 🔒 Gestione dei Dati e Privacy (`data.json`)

Per proteggere la privacy della famiglia, il file con i dati effettivi **`data.json` non è tracciato né incluso nel repository Git** (è escluso nel file `.gitignore`).

### Primo avvio:
1. All'avvio, se `data.json` non è presente, l'applicazione genera automaticamente la struttura dati iniziale a partire dai profili predefiniti.
2. In alternativa, puoi copiare il file di template:
   ```powershell
   Copy-Item data.example.json data.json
   ```
3. Tutti i dati inseriti o modificati rimarranno salvati esclusivamente sul tuo computer locale nel file `data.json`.

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

## ⚠️ Nota sull'Architettura di Sincronizzazione e Appwrite

> [!NOTE]
> **Stato attuale della sincronizzazione**:
> Il progetto utilizza attualmente un **server HTTP locale in PowerShell** (`server.ps1`) che espone l'endpoint `/api/data` per salvare e sincronizzare lo stato in locale (`data.json`) tra i dispositivi connessi alla medesima rete domestica / Wi-Fi.
> 
> **Utilizzo online / Appwrite**:
> Il progetto **non è ancora pronto per l'uso online con Appwrite**. La migrazione del backend da file locale a un servizio Cloud Backend (come Appwrite Database & Auth per consentire la sincronizzazione remota al di fuori della rete Wi-Fi di casa) è pianificata per una fase successiva di sviluppo.
