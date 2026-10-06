/**
 * FAMILY PLANNER - Modern Application Engine
 * Designed for Giuseppe, Veronica, Domenico & Alessandra
 */

(function () {
  'use strict';

  // --- DEFAULT FAMILY MEMBERS DEFINITION ---
  const DEFAULT_MEMBERS = {
    papa: {
      id: 'papa',
      name: 'Papà',
      fullName: 'Giuseppe',
      role: 'Capofamiglia',
      color: '#38bdf8',
      glow: 'rgba(56, 189, 248, 0.5)',
      ringClass: 'ring-blue',
      avatar: 'assets/papa.png'
    },
    mamma: {
      id: 'mamma',
      name: 'Mamma',
      fullName: 'Veronica',
      role: 'Super Mamma',
      color: '#fb7185',
      glow: 'rgba(251, 113, 133, 0.5)',
      ringClass: 'ring-pink',
      avatar: 'assets/mamma.png'
    },
    luca: {
      id: 'luca',
      name: 'Domenico',
      fullName: 'Domenico (8 anni)',
      role: 'Figlio maggiore',
      color: '#34d399',
      glow: 'rgba(52, 211, 153, 0.5)',
      ringClass: 'ring-green',
      avatar: 'assets/luca.png'
    },
    sofia: {
      id: 'sofia',
      name: 'Alessandra',
      fullName: 'Alessandra (5 anni)',
      role: 'Piccola di casa',
      color: '#fbbf24',
      glow: 'rgba(251, 191, 36, 0.5)',
      ringClass: 'ring-yellow',
      avatar: 'assets/sofia.png'
    }
  };

  let FAMILY_MEMBERS = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));

  // --- DEFAULT SAVED PLACES ---
  const DEFAULT_PLACES = [
    { id: 'p1', name: 'Casa', address: 'Via delle Rose 14', note: 'Base famiglia' },
    { id: 'p2', name: 'Scuola Primaria', address: 'Via Roma 45', note: 'Scuola di Domenico (Classe 3°B)' },
    { id: 'p3', name: 'Scuola Materna', address: 'Via Garibaldi 12', note: 'Scuola materna di Alessandra' },
    { id: 'p4', name: 'Campo Sportivo Comunale', address: 'Viale dello Sport 8', note: 'Allenamenti calcio Domenico' },
    { id: 'p5', name: 'Palestra Danza Harmony', address: 'Via Verdi 22', note: 'Danza Alessandra' },
    { id: 'p6', name: 'Studio Dentistico / Medico', address: 'Corso Italia 90', note: 'Pediatra Dott. Rossi' },
    { id: 'p7', name: 'Casa dei Nonni', address: 'Via Dante 5', note: 'Nonno Antonio & Nonna Maria' }
  ];

  // Helper to format date YYYY-MM-DD
  function toDateStr(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // --- SEED EVENTS FOR IMMEDIATE VIBRANT EXPERIENCE ---
  function getSeedEvents() {
    const today = new Date();
    const d0 = toDateStr(today);

    const tmrw = new Date(today);
    tmrw.setDate(today.getDate() + 1);
    const d1 = toDateStr(tmrw);

    const monday = new Date(today);
    monday.setDate(today.getDate() + (today.getDay() === 0 ? 1 : (8 - today.getDay())));
    const dMon = toDateStr(monday);

    const tuesday = new Date(today);
    tuesday.setDate(today.getDate() + (today.getDay() === 0 ? 2 : (9 - today.getDay())));
    const dTue = toDateStr(tuesday);

    return [
      {
        id: 'evt-1',
        title: 'Allenamento Calcio Domenico',
        date: d0,
        startTime: '16:30',
        endTime: '18:00',
        members: ['luca', 'papa'],
        place: 'Campo Sportivo Comunale',
        driver: 'Papà accompagna e riprende',
        category: 'Sport',
        notes: 'Portare borsa con parastinchi e borraccia'
      },
      {
        id: 'evt-2',
        title: 'Danza Classica Alessandra',
        date: d0,
        startTime: '16:45',
        endTime: '17:45',
        members: ['sofia', 'mamma'],
        place: 'Palestra Danza Harmony',
        driver: 'Mamma accompagna e riprende',
        category: 'Sport',
        notes: 'Body rosa e scarpette'
      },
      {
        id: 'evt-3',
        title: 'Cena e Pizza in Famiglia',
        date: d0,
        startTime: '20:00',
        endTime: '22:30',
        members: ['papa', 'mamma', 'luca', 'sofia'],
        place: 'Pizzeria Da Mario',
        driver: 'Tutti insieme',
        category: 'Famiglia',
        notes: 'Tavolo prenotato a nome Giuseppe'
      },
      {
        id: 'evt-4',
        title: 'Festa di Compleanno Matteo',
        date: d1,
        startTime: '16:00',
        endTime: '19:00',
        members: ['luca', 'sofia', 'mamma'],
        place: 'Casa dei Nonni',
        driver: 'Mamma accompagna, Papà riprende',
        category: 'Tempo Libero',
        notes: 'Regalo già acquistato da Veronica'
      },
      {
        id: 'evt-5',
        title: 'Controllo Pediatrico Alessandra',
        date: dMon,
        startTime: '15:30',
        endTime: '16:30',
        members: ['sofia', 'mamma'],
        place: 'Studio Dentistico / Medico',
        driver: 'Mamma',
        category: 'Salute',
        notes: 'Libretto vaccinazioni'
      },
      {
        id: 'evt-6',
        title: 'Riunione Progetto Papà',
        date: dMon,
        startTime: '10:00',
        endTime: '12:00',
        members: ['papa'],
        place: 'Casa',
        driver: 'Nessuno',
        category: 'Lavoro',
        notes: 'Call video importante'
      },
      {
        id: 'evt-7',
        title: 'Uscita Anticipata Scuola Domenico',
        date: dTue,
        startTime: '12:30',
        endTime: '13:00',
        members: ['luca', 'papa'],
        place: 'Scuola Primaria',
        driver: 'Papà accompagna e riprende',
        category: 'Scuola',
        notes: 'Gita scolastica pomeridiana'
      }
    ];
  }

  // --- AUDIO SYNTHESIZER (Gentle Apple-like clicks & chimes) ---
  const SoundFX = {
    ctx: null,
    enabled: true,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },
    playClick() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {
        // Fallback silently
      }
    },
    playSuccess() {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.08, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.12);
        });
      } catch (e) {
        // Fallback silently
      }
    }
  };

  // --- STATE MANAGEMENT ---
  const STATE = {
    events: [],
    places: [],
    members: FAMILY_MEMBERS,
    deletedMembers: [],
    activeFilter: 'all', // 'all' | memberId
    calDate: new Date(), // current calendar month reference
    calView: 'agenda',   // 'agenda' | 'month' | 'day'
    selectedDate: toDateStr(new Date())
  };

  // --- IMAGE COMPRESSOR FOR LOCALSTORAGE AVATARS ---
  function compressImage(file, maxWidth, maxHeight, quality, callback) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Crop square center
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        ctx.drawImage(img, startX, startY, size, size, 0, 0, maxWidth, maxHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Load from LocalStorage
  function loadState() {
    try {
      const stored = localStorage.getItem('family_planner_data_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.events) {
          parsed.events.forEach(ev => {
            if (ev.title) {
              ev.title = ev.title.replace(/\bLuca\b/g, 'Domenico').replace(/\bSofia\b/g, 'Alessandra');
            }
            if (ev.notes) {
              ev.notes = ev.notes.replace(/\bLuca\b/g, 'Domenico').replace(/\bSofia\b/g, 'Alessandra');
            }
          });
        }
        if (parsed.places) {
          parsed.places.forEach(p => {
            if (p.name) {
              p.name = p.name.replace(/\bLuca\b/g, 'Domenico').replace(/\bSofia\b/g, 'Alessandra');
            }
            if (p.note) {
              p.note = p.note.replace(/\bLuca\b/g, 'Domenico').replace(/\bSofia\b/g, 'Alessandra');
            }
          });
        }
        STATE.events = parsed.events || getSeedEvents();
        STATE.places = parsed.places || DEFAULT_PLACES;
        STATE.deletedMembers = Array.isArray(parsed.deletedMembers) ? parsed.deletedMembers : [];

        // Dynamic Members Hydration
        FAMILY_MEMBERS = {};
        // 1. Ensure initial base members are present (unless explicitly deleted)
        Object.keys(DEFAULT_MEMBERS).forEach(key => {
          if (!STATE.deletedMembers.includes(key)) {
            FAMILY_MEMBERS[key] = { ...DEFAULT_MEMBERS[key] };
          }
        });

        // 2. Load all saved members (including custom and new ones)
        if (parsed.members && typeof parsed.members === 'object') {
          Object.keys(parsed.members).forEach(key => {
            if (!STATE.deletedMembers.includes(key)) {
              FAMILY_MEMBERS[key] = {
                ...(FAMILY_MEMBERS[key] || {}),
                ...parsed.members[key]
              };
            }
          });
        }

        // 3. Backward-compatible name updates for Domenico and Alessandra
        if (FAMILY_MEMBERS.luca) {
          if (FAMILY_MEMBERS.luca.name === 'Luca') FAMILY_MEMBERS.luca.name = DEFAULT_MEMBERS.luca.name;
          if (FAMILY_MEMBERS.luca.fullName === 'Luca (8 anni)') FAMILY_MEMBERS.luca.fullName = DEFAULT_MEMBERS.luca.fullName;
        }
        if (FAMILY_MEMBERS.sofia) {
          if (FAMILY_MEMBERS.sofia.name === 'Sofia') FAMILY_MEMBERS.sofia.name = DEFAULT_MEMBERS.sofia.name;
          if (FAMILY_MEMBERS.sofia.fullName === 'Sofia (5 anni)') FAMILY_MEMBERS.sofia.fullName = DEFAULT_MEMBERS.sofia.fullName;
        }

        // 4. Upgrade any legacy .svg avatars to new 3D Pixar .png avatars
        Object.keys(FAMILY_MEMBERS).forEach(key => {
          const m = FAMILY_MEMBERS[key];
          if (m && m.avatar && m.avatar.endsWith('.svg')) {
            m.avatar = m.avatar.replace('.svg', '.png');
          }
        });

        STATE.members = FAMILY_MEMBERS;
      } else {
        STATE.events = getSeedEvents();
        STATE.places = DEFAULT_PLACES;
        STATE.deletedMembers = [];
        FAMILY_MEMBERS = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
        STATE.members = FAMILY_MEMBERS;
        saveState();
      }
    } catch (err) {
      STATE.events = getSeedEvents();
      STATE.places = DEFAULT_PLACES;
      STATE.deletedMembers = [];
      FAMILY_MEMBERS = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
      STATE.members = FAMILY_MEMBERS;
    }

    // Bidirectional Server Sync (Real-time multi-device synchronization)
    fetchServerState();
  }

  // --- BIDIRECTIONAL CLIENT-SERVER SYNC ---
  let isSyncing = false;
  let pushTimer = null;

  async function fetchServerState() {
    if (isSyncing) return;
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      
      // If server has stored data, hydrate and reconcile
      if (data && data.events && Array.isArray(data.events) && data.events.length > 0) {
        let changed = false;
        if (JSON.stringify(STATE.events) !== JSON.stringify(data.events)) {
          STATE.events = data.events;
          changed = true;
        }
        if (data.places && JSON.stringify(STATE.places) !== JSON.stringify(data.places)) {
          STATE.places = data.places;
          changed = true;
        }
        if (data.deletedMembers && Array.isArray(data.deletedMembers)) {
          STATE.deletedMembers = data.deletedMembers;
        }
        if (data.members && typeof data.members === 'object') {
          const syncedMembers = {};
          Object.keys(data.members).forEach(k => {
            if (!STATE.deletedMembers || !STATE.deletedMembers.includes(k)) {
              syncedMembers[k] = data.members[k];
            }
          });
          FAMILY_MEMBERS = syncedMembers;
          STATE.members = FAMILY_MEMBERS;
          changed = true;
        }

        if (changed) {
          try {
            localStorage.setItem('family_planner_data_v2', JSON.stringify({
              events: STATE.events,
              places: STATE.places,
              members: FAMILY_MEMBERS,
              deletedMembers: STATE.deletedMembers || []
            }));
          } catch(e){}

          updateMemberNamesUI();
          updateMemberBadges();
          updateTodayBanner();
          renderUpcomingFeed();
          renderDashboardMembers();
          renderFamilyProfiles();
          if (typeof renderCalendarView === 'function') renderCalendarView();
        }

        const badge = document.getElementById('syncStatusText');
        if (badge) badge.textContent = 'Server Famiglia: Sincronizzazione Attiva';
      } else {
        // If server is empty, push local state to server
        pushStateToServer();
      }
    } catch (e) {
      // Offline mode: quietly keep local state
      const badge = document.getElementById('syncStatusText');
      if (badge) badge.textContent = 'Modalità Locale / Offline (Dati Salvati)';
    }
  }

  function pushStateToServer() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(async () => {
      try {
        isSyncing = true;
        const payload = {
          events: STATE.events,
          places: STATE.places,
          members: FAMILY_MEMBERS,
          deletedMembers: STATE.deletedMembers || [],
          lastUpdated: Date.now()
        };
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const badge = document.getElementById('syncStatusText');
        if (badge) badge.textContent = 'Server Famiglia: Sincronizzazione Attiva';
      } catch (err) {
        // Offline / server not reachable
      } finally {
        isSyncing = false;
      }
    }, 250);
  }

  function saveState() {
    try {
      localStorage.setItem('family_planner_data_v2', JSON.stringify({
        events: STATE.events,
        places: STATE.places,
        members: FAMILY_MEMBERS,
        deletedMembers: STATE.deletedMembers || []
      }));
    } catch (e) {
      console.warn('Storage error:', e);
    }
    pushStateToServer();
  }

  // --- DYNAMIC RENDERING: DASHBOARD CHIPS & AVATAR REMOVAL ---
  let isRemoveMode = false;

  function toggleRemoveMode(forceVal) {
    isRemoveMode = (typeof forceVal === 'boolean') ? forceVal : !isRemoveMode;
    const row = document.getElementById('membersRow');
    const banner = document.getElementById('removeModeBanner');
    const btn = document.getElementById('btnToggleRemoveMemberMode');
    const btnText = document.getElementById('removeModeBtnText');

    if (row) row.classList.toggle('remove-mode', isRemoveMode);
    if (banner) banner.style.display = isRemoveMode ? 'flex' : 'none';
    if (btn) btn.classList.toggle('active', isRemoveMode);
    if (btnText) btnText.textContent = isRemoveMode ? 'Fatto ✓' : 'Rimuovi';

    if (isRemoveMode) {
      SoundFX.playClick();
    }
  }

  function restoreDefaultMembers() {
    if (!confirm('Vuoi ripristinare i 4 componenti base della famiglia (Papà, Mamma, Domenico, Alessandra)?')) return;
    STATE.deletedMembers = [];
    FAMILY_MEMBERS = JSON.parse(JSON.stringify(DEFAULT_MEMBERS));
    STATE.members = FAMILY_MEMBERS;
    saveState();
    renderDashboardMembers();
    renderParticipantSelector();
    renderCalendarFilterPills();
    renderFamilyProfiles();
    updateMemberBadges();
    updateTodayBanner();
    renderUpcomingFeed();
    renderCalendarView();
    SoundFX.playSuccess();
    showToast('Famiglia iniziale ripristinata con successo! ✨');
  }

  function renderDashboardMembers() {
    const row = document.getElementById('membersRow');
    if (!row) return;

    const todayStr = toDateStr(new Date());
    const memberEntries = Object.values(FAMILY_MEMBERS);

    if (isRemoveMode) {
      row.classList.add('remove-mode');
    } else {
      row.classList.remove('remove-mode');
    }

    let html = '';

    if (memberEntries.length === 0) {
      html += `
        <div class="empty-members-bar">
          <span>Nessun avatar presente nella barra.</span>
          <button type="button" class="btn-restore-defaults-bar" id="btnRestoreDefaultMembers">
            Ripristina Iniziali
          </button>
        </div>
      `;
    } else {
      memberEntries.forEach(m => {
        const isSelected = STATE.activeFilter === m.id;
        const count = STATE.events.filter(e => e.date >= todayStr && Array.isArray(e.members) && e.members.includes(m.id)).length;
        const ringClass = m.ringClass || '';
        const customStyle = m.color ? `border-color: ${m.color}; color: ${m.color}; box-shadow: 0 0 ${isSelected ? '22px' : '14px'} ${m.color}80;` : '';
        const activeDotStyle = m.color ? `background: ${m.color}; box-shadow: 0 0 8px ${m.color};` : '';

        html += `
          <div class="member-chip ${isSelected ? 'selected' : ''}" data-member="${m.id}" id="chip-${m.id}" role="button" tabindex="0" aria-label="Filtra impegni ${escapeHtml(m.name)}" title="Tocca per filtrare, o premi la ✕ per rimuoverlo">
            <div class="avatar-wrap-box">
              <div class="avatar-ring ${ringClass}" style="${customStyle}">
                <img src="${m.avatar}" alt="Avatar ${escapeHtml(m.name)}" class="avatar-img">
                <span class="active-dot" style="${activeDotStyle}"></span>
              </div>
              <button type="button" class="chip-delete-btn" data-delete-avatar="${m.id}" title="Rimuovi ${escapeHtml(m.name)} dalla barra" aria-label="Rimuovi ${escapeHtml(m.name)}">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <span class="member-badge" id="badge-${m.id}">${count}</span>
            </div>
            <span class="member-name">${escapeHtml(m.name)}</span>
          </div>
        `;
      });
    }

    html += `
      <button class="member-chip add-member-chip" id="addMemberChip" title="Aggiungi nuovo familiare">
        <div class="avatar-ring ring-add">
          <span class="plus-icon-add">+</span>
        </div>
        <span class="member-name">Aggiungi</span>
      </button>
    `;

    row.innerHTML = html;

    // Attach chip event listeners
    row.querySelectorAll('.member-chip[data-member]').forEach(chip => {
      const memberId = chip.getAttribute('data-member');

      // Click on chip delete button
      const delBtn = chip.querySelector('.chip-delete-btn');
      if (delBtn) {
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          confirmDeleteMember(memberId);
        });
      }

      // Click on chip
      chip.addEventListener('click', (e) => {
        if (e.target.closest('.chip-delete-btn')) return;

        if (isRemoveMode) {
          confirmDeleteMember(memberId);
          return;
        }

        SoundFX.playClick();
        if (STATE.activeFilter === memberId) {
          // Deselect
          STATE.activeFilter = 'all';
          chip.classList.remove('selected');
          const filterInd = document.getElementById('filterIndicator');
          if (filterInd) filterInd.style.display = 'none';
        } else {
          row.querySelectorAll('.member-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          STATE.activeFilter = memberId;
          const filterInd = document.getElementById('filterIndicator');
          const filterText = document.getElementById('filterText');
          if (filterInd && filterText && FAMILY_MEMBERS[memberId]) {
            filterText.innerHTML = `Filtrato per: <strong>${escapeHtml(FAMILY_MEMBERS[memberId].name)}</strong>`;
            filterInd.style.display = 'flex';
          }
        }
        updateTodayBanner();
        renderUpcomingFeed();
      });

      // Keyboard support
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chip.click();
        }
      });

      // Double-click to edit profile directly
      chip.addEventListener('dblclick', () => {
        if (!isRemoveMode) {
          openEditMemberModal(memberId);
        }
      });

      // Touch Long-Press to trigger remove mode (mobile friendly)
      let longPressTimer = null;
      chip.addEventListener('touchstart', () => {
        longPressTimer = setTimeout(() => {
          if (!isRemoveMode) {
            if (navigator.vibrate) navigator.vibrate(50);
            toggleRemoveMode(true);
          }
        }, 550);
      }, { passive: true });
      chip.addEventListener('touchend', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
      chip.addEventListener('touchmove', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
      });
    });

    // Add Member Chip in row
    document.getElementById('addMemberChip')?.addEventListener('click', () => {
      openAddMemberModal();
    });

    // Restore Defaults button
    document.getElementById('btnRestoreDefaultMembers')?.addEventListener('click', () => {
      restoreDefaultMembers();
    });
  }

  // --- DYNAMIC RENDERING: PARTICIPANT SELECTOR IN EVENT FORM ---
  function renderParticipantSelector() {
    const container = document.getElementById('participantSelector');
    if (!container) return;

    container.innerHTML = Object.values(FAMILY_MEMBERS).map(m => `
      <label class="participant-option" data-member="${m.id}">
        <input type="checkbox" name="members" value="${m.id}">
        <div class="p-card ${m.ringClass || ''}" style="${m.color ? 'border-color: ' + m.color + ';' : ''}">
          <img src="${m.avatar}" alt="${escapeHtml(m.name)}">
          <span>${escapeHtml(m.name)}</span>
        </div>
      </label>
    `).join('');
  }

  // --- DYNAMIC RENDERING: CALENDAR FILTER PILLS ---
  function renderCalendarFilterPills() {
    const container = document.getElementById('modalMemberFilters');
    if (!container) return;

    let html = `<button class="m-filter-pill ${STATE.activeFilter === 'all' ? 'active' : ''}" data-filter="all">Tutti</button>`;
    Object.values(FAMILY_MEMBERS).forEach(m => {
      const isActive = STATE.activeFilter === m.id;
      const customStyle = isActive && m.color ? `background: ${m.color}; border-color: ${m.color}; color: #04121e; font-weight: 700;` : '';
      html += `<button class="m-filter-pill ${isActive ? 'active' : ''}" data-filter="${m.id}" style="${customStyle}">${escapeHtml(m.name)}</button>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('.m-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        SoundFX.playClick();
        container.querySelectorAll('.m-filter-pill').forEach(p => {
          p.classList.remove('active');
          p.removeAttribute('style');
        });
        pill.classList.add('active');
        const filterVal = pill.getAttribute('data-filter');
        STATE.activeFilter = filterVal;
        if (filterVal !== 'all' && FAMILY_MEMBERS[filterVal] && FAMILY_MEMBERS[filterVal].color) {
          pill.style.background = FAMILY_MEMBERS[filterVal].color;
          pill.style.borderColor = FAMILY_MEMBERS[filterVal].color;
          pill.style.color = '#04121e';
          pill.style.fontWeight = '700';
        }
        renderCalendarView();
      });
    });
  }

  // Synchronize all member UI components
  function updateMemberNamesUI() {
    renderDashboardMembers();
    renderParticipantSelector();
    renderCalendarFilterPills();
    renderFamilyProfiles();
    updateMemberBadges();

    // Update filter indicator text if active
    if (STATE.activeFilter !== 'all' && FAMILY_MEMBERS[STATE.activeFilter]) {
      const filterText = document.getElementById('filterText');
      if (filterText) {
        filterText.innerHTML = `Filtrato per: <strong>${escapeHtml(FAMILY_MEMBERS[STATE.activeFilter].name)}</strong>`;
      }
    }
  }

  // --- MEMBER MODAL CONTROLLERS (ADD & EDIT) ---
  let activeMemberFormColor = '#38bdf8';
  let activeMemberFormAvatar = 'assets/avatar_nonno.png';

  function updateMemberModalPreview() {
    const previewRing = document.getElementById('newMemberAvatarPreviewRing');
    const previewImg = document.getElementById('newMemberAvatarPreviewImg');
    if (previewRing) {
      previewRing.style.borderColor = activeMemberFormColor;
      previewRing.style.boxShadow = `0 0 18px ${activeMemberFormColor}99`;
    }
    if (previewImg) {
      previewImg.src = activeMemberFormAvatar;
    }
  }

  function openAddMemberModal() {
    SoundFX.playClick();
    document.getElementById('editMemberId').value = '';
    document.getElementById('memberModalTitle').textContent = 'Nuovo Membro Famiglia';
    document.getElementById('memberModalSubtitle').textContent = 'Aggiungi un familiare con il suo avatar';
    document.getElementById('newMemberName').value = '';
    document.getElementById('newMemberRole').value = '';
    document.getElementById('saveMemberBtn').textContent = '+ Aggiungi alla Famiglia';

    activeMemberFormColor = '#38bdf8';
    activeMemberFormAvatar = 'assets/avatar_nonno.png';

    // Highlight palette button
    document.querySelectorAll('#newMemberColorPalette .color-dot-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-color') === activeMemberFormColor);
    });

    // Highlight preset avatar
    document.querySelectorAll('#presetAvatarsGrid .preset-avatar-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-src') === activeMemberFormAvatar);
    });

    const modalDelBtn = document.getElementById('deleteMemberFromModalBtn');
    if (modalDelBtn) modalDelBtn.style.display = 'none';

    updateMemberModalPreview();
    window.app.openModal('addMemberModal');
  }

  function openEditMemberModal(memberId) {
    SoundFX.playClick();
    const m = FAMILY_MEMBERS[memberId];
    if (!m) return;

    // Close family modal if open to prevent stacking
    closeModal(document.getElementById('familyModal'));

    document.getElementById('editMemberId').value = m.id;
    document.getElementById('memberModalTitle').textContent = `Modifica: ${m.name}`;
    document.getElementById('memberModalSubtitle').textContent = 'Modifica nome, ruolo, colore e avatar';
    document.getElementById('newMemberName').value = m.name;
    document.getElementById('newMemberRole').value = m.role || m.fullName || '';
    document.getElementById('saveMemberBtn').textContent = 'Salva Modifiche';

    const modalDelBtn = document.getElementById('deleteMemberFromModalBtn');
    if (modalDelBtn) {
      modalDelBtn.style.display = 'inline-flex';
      modalDelBtn.onclick = () => {
        confirmDeleteMember(m.id);
        closeModal(document.getElementById('addMemberModal'));
      };
    }

    activeMemberFormColor = m.color || '#38bdf8';
    activeMemberFormAvatar = m.avatar || 'assets/avatar_nonno.png';

    // Highlight palette button
    document.querySelectorAll('#newMemberColorPalette .color-dot-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-color') === activeMemberFormColor);
    });

    // Highlight preset avatar if matching
    document.querySelectorAll('#presetAvatarsGrid .preset-avatar-item').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-src') === activeMemberFormAvatar);
    });

    updateMemberModalPreview();
    window.app.openModal('addMemberModal');
  }

  function saveMemberForm(e) {
    e.preventDefault();
    const editId = document.getElementById('editMemberId').value;
    const name = document.getElementById('newMemberName').value.trim();
    const role = document.getElementById('newMemberRole').value.trim();

    if (!name) {
      alert('Inserisci il nome del familiare.');
      return;
    }

    if (editId && FAMILY_MEMBERS[editId]) {
      // Modifica membro esistente
      FAMILY_MEMBERS[editId].name = name;
      FAMILY_MEMBERS[editId].fullName = role || name;
      FAMILY_MEMBERS[editId].role = role || 'Membro della famiglia';
      FAMILY_MEMBERS[editId].color = activeMemberFormColor;
      FAMILY_MEMBERS[editId].glow = `${activeMemberFormColor}88`;
      FAMILY_MEMBERS[editId].avatar = activeMemberFormAvatar;
      showToast(`${name} aggiornato con successo! ✨`);
    } else {
      // Creazione nuovo membro
      const newId = 'mem_' + Date.now();
      FAMILY_MEMBERS[newId] = {
        id: newId,
        name: name,
        fullName: role || name,
        role: role || 'Membro della famiglia',
        color: activeMemberFormColor,
        glow: `${activeMemberFormColor}88`,
        ringClass: '',
        avatar: activeMemberFormAvatar
      };
      showToast(`${name} aggiunto alla famiglia! 🎉`);
    }

    saveState();
    renderDashboardMembers();
    renderParticipantSelector();
    renderCalendarFilterPills();
    renderFamilyProfiles();
    updateMemberBadges();
    updateTodayBanner();
    renderUpcomingFeed();
    renderCalendarView();

    SoundFX.playSuccess();
    closeModal(document.getElementById('addMemberModal'));
  }

  function confirmDeleteMember(memberId) {
    const m = FAMILY_MEMBERS[memberId];
    if (!m) return;

    // Check associated events
    const count = STATE.events.filter(e => Array.isArray(e.members) && e.members.includes(memberId)).length;
    let confirmMsg = `Vuoi davvero rimuovere "${m.name}" dalla barra della famiglia?`;
    if (count > 0) {
      confirmMsg = `⚠️ "${m.name}" è associato/a a ${count} impegn${count === 1 ? 'o' : 'i'} nel calendario.\n\nRimuovendolo dalla barra, gli impegni rimarranno comunque registrati nel calendario.\n\nVuoi confermare la rimozione?`;
    }

    if (!confirm(confirmMsg)) return;

    if (!STATE.deletedMembers) STATE.deletedMembers = [];
    if (!STATE.deletedMembers.includes(memberId)) {
      STATE.deletedMembers.push(memberId);
    }
    delete FAMILY_MEMBERS[memberId];

    if (STATE.activeFilter === memberId) {
      STATE.activeFilter = 'all';
      const filterInd = document.getElementById('filterIndicator');
      if (filterInd) filterInd.style.display = 'none';
    }

    if (Object.keys(FAMILY_MEMBERS).length === 0 && isRemoveMode) {
      toggleRemoveMode(false);
    }

    saveState();
    renderDashboardMembers();
    renderParticipantSelector();
    renderCalendarFilterPills();
    renderFamilyProfiles();
    updateMemberBadges();
    updateTodayBanner();
    renderUpcomingFeed();
    renderCalendarView();

    SoundFX.playClick();
    showToast(`"${m.name}" rimosso dalla barra. 👋`);
  }

  function openEditNamesModal() {
    SoundFX.playClick();
    ['papa', 'mamma', 'luca', 'sofia'].forEach(id => {
      const nameInp = document.getElementById(`nameInput-${id}`);
      const roleInp = document.getElementById(`roleInput-${id}`);
      if (FAMILY_MEMBERS[id]) {
        if (nameInp) nameInp.value = FAMILY_MEMBERS[id].name;
        if (roleInp) roleInp.value = FAMILY_MEMBERS[id].fullName || FAMILY_MEMBERS[id].role || '';
      }
    });
    window.app.openModal('editNamesModal');
  }

  function saveEditedNames(e) {
    e.preventDefault();
    ['papa', 'mamma', 'luca', 'sofia'].forEach(id => {
      const nameInp = document.getElementById(`nameInput-${id}`);
      const roleInp = document.getElementById(`roleInput-${id}`);
      if (FAMILY_MEMBERS[id]) {
        if (nameInp && nameInp.value.trim()) {
          FAMILY_MEMBERS[id].name = nameInp.value.trim();
        }
        if (roleInp && roleInp.value.trim()) {
          FAMILY_MEMBERS[id].fullName = roleInp.value.trim();
          FAMILY_MEMBERS[id].role = roleInp.value.trim();
        }
      }
    });

    saveState();
    updateMemberNamesUI();
    updateTodayBanner();
    renderUpcomingFeed();
    renderCalendarView();
    SoundFX.playSuccess();
    showToast('Nomi della famiglia aggiornati con successo! ✨');
    closeModal(document.getElementById('editNamesModal'));
  }

  // --- CONFLICT DETECTION LOGIC ---
  function findConflictsForDate(dateStr) {
    const dayEvents = STATE.events.filter(e => e.date === dateStr);
    const conflicts = [];

    // Helper to convert time "HH:MM" to minutes
    function toMin(tStr) {
      if (!tStr) return 0;
      const [h, m] = tStr.split(':').map(Number);
      return h * 60 + m;
    }

    for (let i = 0; i < dayEvents.length; i++) {
      for (let j = i + 1; j < dayEvents.length; j++) {
        const e1 = dayEvents[i];
        const e2 = dayEvents[j];

        const s1 = toMin(e1.startTime);
        const end1 = toMin(e1.endTime || e1.startTime) + (e1.endTime ? 0 : 60);
        const s2 = toMin(e2.startTime);
        const end2 = toMin(e2.endTime || e2.startTime) + (e2.endTime ? 0 : 60);

        // Check if time ranges overlap
        const isTimeOverlap = Math.max(s1, s2) < Math.min(end1, end2);

        if (isTimeOverlap) {
          // Check common members
          const common = e1.members.filter(m => e2.members.includes(m));
          if (common.length > 0) {
            conflicts.push({
              type: 'member_overlap',
              memberIds: common,
              event1: e1,
              event2: e2,
              message: `${common.map(id => FAMILY_MEMBERS[id]?.name || 'Membro').join(', ')} ha due impegni contemporanei: "${e1.title}" e "${e2.title}".`
            });
          }

          // Check logistics for kids
          const isLucaInE1 = e1.members.includes('luca');
          const isSofiaInE2 = e2.members.includes('sofia');
          const isSofiaInE1 = e1.members.includes('sofia');
          const isLucaInE2 = e2.members.includes('luca');

          if (((isLucaInE1 && isSofiaInE2) || (isSofiaInE1 && isLucaInE2)) && e1.place !== e2.place) {
            conflicts.push({
              type: 'logistics_kids',
              event1: e1,
              event2: e2,
              message: `Domenico e Alessandra hanno attività simultanee in due luoghi diversi: "${e1.place}" e "${e2.place}". È necessaria l'organizzazione di entrambi i genitori o dei nonni!`
            });
          }
        }
      }
    }

    return conflicts;
  }

  // --- UI CONTROLLERS ---

  // Live Clock Updater
  function updateLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}`;
  }

  // Update Family Member Badges
  function updateMemberBadges() {
    const todayStr = toDateStr(new Date());
    const counts = {};
    Object.keys(FAMILY_MEMBERS).forEach(mId => {
      counts[mId] = 0;
    });

    STATE.events.forEach(evt => {
      // Count today or future events
      if (evt.date >= todayStr && Array.isArray(evt.members)) {
        evt.members.forEach(m => {
          if (counts[m] !== undefined) counts[m]++;
        });
      }
    });

    Object.keys(counts).forEach(mId => {
      const badge = document.getElementById(`badge-${mId}`);
      if (badge) {
        badge.textContent = counts[mId];
      }
    });
  }

  // Update Today Banner
  function updateTodayBanner() {
    const todayStr = toDateStr(new Date());
    let todayEvents = STATE.events.filter(e => e.date === todayStr);

    if (STATE.activeFilter !== 'all') {
      todayEvents = todayEvents.filter(e => e.members.includes(STATE.activeFilter));
    }

    todayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));

    const countText = document.getElementById('todayCountText');
    const nextText = document.getElementById('todayNextText');

    if (!countText || !nextText) return;

    if (todayEvents.length === 0) {
      countText.textContent = 'Nessun impegno oggi';
      nextText.textContent = 'Famiglia libera da appuntamenti! 🎉';
    } else {
      countText.textContent = `${todayEvents.length} impegn${todayEvents.length === 1 ? 'o' : 'i'} in programma`;
      const nextEvt = todayEvents[0];
      nextText.textContent = `Prossimo: Ore ${nextEvt.startTime} ${nextEvt.title}`;
    }
  }

  // Render Up Next Feed on Dashboard
  function renderUpcomingFeed() {
    const feed = document.getElementById('upcomingEventsFeed');
    if (!feed) return;

    const todayStr = toDateStr(new Date());
    let events = STATE.events.filter(e => e.date >= todayStr);

    if (STATE.activeFilter !== 'all') {
      events = events.filter(e => e.members.includes(STATE.activeFilter));
    }

    events.sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
    const next3 = events.slice(0, 3);

    if (next3.length === 0) {
      feed.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.85rem;">
          Nessun impegno futuro per questo filtro.<br>Tocca <strong>+</strong> per aggiungerne uno!
        </div>
      `;
      return;
    }

    feed.innerHTML = next3.map(evt => {
      // Primary color from first valid member
      const firstValidId = Array.isArray(evt.members) ? evt.members.find(mId => FAMILY_MEMBERS[mId]) : null;
      const mainMember = firstValidId ? FAMILY_MEMBERS[firstValidId] : (FAMILY_MEMBERS.papa || { color: '#38bdf8' });
      const avatarsHtml = Array.isArray(evt.members) ? evt.members.map(mId => {
        const m = FAMILY_MEMBERS[mId];
        if (!m) return '';
        return `<img src="${m.avatar}" class="f-avatar-mini" alt="${escapeHtml(m.name)}" title="${escapeHtml(m.name)}">`;
      }).filter(Boolean).join('') : '';

      const isToday = evt.date === todayStr;
      const dateDisplay = isToday ? 'Oggi' : formatDatePretty(evt.date);

      return `
        <div class="feed-event-card" data-event-id="${evt.id}">
          <div class="f-event-left">
            <div class="f-event-color-bar" style="background: ${mainMember.color};"></div>
            <div class="f-event-info">
              <h4>${escapeHtml(evt.title)}</h4>
              <div class="f-event-meta">
                <span>🕒 ${dateDisplay}, ${evt.startTime}</span>
                <span>📍 ${escapeHtml(evt.place || 'Casa')}</span>
              </div>
            </div>
          </div>
          <div class="f-event-avatars">
            ${avatarsHtml}
          </div>
        </div>
      `;
    }).join('');

    // Attach click to open edit
    feed.querySelectorAll('.feed-event-card').forEach(card => {
      card.addEventListener('click', () => {
        SoundFX.playClick();
        const id = card.getAttribute('data-event-id');
        openEditEventModal(id);
      });
    });
  }

  // --- CALENDAR RENDERING SYSTEM ---
  const MONTH_NAMES = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  function renderCalendarView() {
    const label = document.getElementById('calCurrentLabel');
    const month = STATE.calDate.getMonth();
    const year = STATE.calDate.getFullYear();
    if (label) label.textContent = `${MONTH_NAMES[month]} ${year}`;

    // Switch containers
    const agendaC = document.getElementById('calendarAgendaContainer');
    const monthC = document.getElementById('calendarMonthContainer');
    const dayC = document.getElementById('calendarDayContainer');

    if (agendaC) agendaC.style.display = STATE.calView === 'agenda' ? 'block' : 'none';
    if (monthC) monthC.style.display = STATE.calView === 'month' ? 'block' : 'none';
    if (dayC) dayC.style.display = STATE.calView === 'day' ? 'block' : 'none';

    if (STATE.calView === 'agenda') {
      renderAgendaView();
    } else if (STATE.calView === 'month') {
      renderMonthView();
    } else if (STATE.calView === 'day') {
      renderDayView();
    }
  }

  function renderAgendaView() {
    const container = document.getElementById('agendaTimeline');
    if (!container) return;

    let events = [...STATE.events];
    if (STATE.activeFilter !== 'all') {
      events = events.filter(e => e.members.includes(STATE.activeFilter));
    }

    events.sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));

    if (events.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted);">
          Nessun impegno trovato.<br>
          <button class="btn btn-secondary btn-small" style="margin-top: 10px;" onclick="window.app.openModal('addEventModal')">+ Aggiungi Nuovo</button>
        </div>
      `;
      return;
    }

    // Group events by date
    const groups = {};
    events.forEach(evt => {
      if (!groups[evt.date]) groups[evt.date] = [];
      groups[evt.date].push(evt);
    });

    const todayStr = toDateStr(new Date());

    let html = '';
    Object.keys(groups).sort().forEach(dateStr => {
      const isToday = dateStr === todayStr;
      const headingText = isToday ? `Oggi, ${formatDatePretty(dateStr)}` : formatDatePretty(dateStr);

      html += `<div class="agenda-day-group">`;
      html += `<div class="agenda-date-heading" style="${isToday ? 'color: #38bdf8;' : ''}">${headingText}</div>`;

      groups[dateStr].forEach(evt => {
        const avatars = Array.isArray(evt.members) ? evt.members.map(mId => {
          const m = FAMILY_MEMBERS[mId];
          if (!m) return '';
          return `<img src="${m.avatar}" class="f-avatar-mini" alt="${escapeHtml(m.name)}" title="${escapeHtml(m.name)}">`;
        }).filter(Boolean).join('') : '';

        const firstValidId = Array.isArray(evt.members) ? evt.members.find(mId => FAMILY_MEMBERS[mId]) : null;
        const mainColor = firstValidId && FAMILY_MEMBERS[firstValidId] ? FAMILY_MEMBERS[firstValidId].color : '#38bdf8';

        html += `
          <div class="agenda-item" data-event-id="${evt.id}">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 4px; height: 34px; border-radius: 4px; background: ${mainColor};"></div>
              <div>
                <strong style="color: #fff; font-size: 0.88rem;">${escapeHtml(evt.title)}</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; gap: 8px;">
                  <span>🕒 ${evt.startTime}${evt.endTime ? ' - ' + evt.endTime : ''}</span>
                  <span>📍 ${escapeHtml(evt.place || 'Casa')}</span>
                </div>
                ${evt.driver ? `<div style="font-size: 0.72rem; color: #38bdf8; margin-top: 2px;">🚗 ${escapeHtml(evt.driver)}</div>` : ''}
              </div>
            </div>
            <div class="f-event-avatars">${avatars}</div>
          </div>
        `;
      });

      html += `</div>`;
    });

    container.innerHTML = html;

    container.querySelectorAll('.agenda-item').forEach(item => {
      item.addEventListener('click', () => {
        SoundFX.playClick();
        const id = item.getAttribute('data-event-id');
        openEditEventModal(id);
      });
    });
  }

  function renderMonthView() {
    const grid = document.getElementById('calendarDaysGrid');
    if (!grid) return;

    const year = STATE.calDate.getFullYear();
    const month = STATE.calDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Days in current month
    const totalDays = lastDay.getDate();

    // In Europe, Monday is day 0 in grid
    let startDayIdx = firstDay.getDay() - 1;
    if (startDayIdx === -1) startDayIdx = 6;

    // Previous month filler days
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const todayStr = toDateStr(new Date());

    let cellsHtml = '';

    // Prev month days
    for (let i = startDayIdx - 1; i >= 0; i--) {
      const dNum = prevMonthLastDay - i;
      cellsHtml += `<div class="cal-day-cell other-month"><span class="cal-day-num">${dNum}</span></div>`;
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const curDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = curDateStr === todayStr;
      const isSelected = curDateStr === STATE.selectedDate;

      // Filter events
      let dayEvents = STATE.events.filter(e => e.date === curDateStr);
      if (STATE.activeFilter !== 'all') {
        dayEvents = dayEvents.filter(e => e.members.includes(STATE.activeFilter));
      }

      // Member colored dots
      const memberDots = new Set();
      dayEvents.forEach(e => e.members.forEach(m => memberDots.add(m)));

      let dotsHtml = '';
      memberDots.forEach(mId => {
        const m = FAMILY_MEMBERS[mId];
        if (m) {
          dotsHtml += `<span class="cal-dot" style="background: ${m.color};"></span>`;
        }
      });

      cellsHtml += `
        <div class="cal-day-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${curDateStr}">
          <span class="cal-day-num">${d}</span>
          <div class="cal-day-dots">${dotsHtml}</div>
        </div>
      `;
    }

    // Trailing days for grid completeness (42 cells total)
    const currentCells = startDayIdx + totalDays;
    const remaining = 42 - currentCells;
    if (remaining < 7) {
      for (let r = 1; r <= remaining; r++) {
        cellsHtml += `<div class="cal-day-cell other-month"><span class="cal-day-num">${r}</span></div>`;
      }
    }

    grid.innerHTML = cellsHtml;

    // Handle day click
    grid.querySelectorAll('.cal-day-cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        SoundFX.playClick();
        STATE.selectedDate = cell.getAttribute('data-date');
        renderMonthView();
        // Switch to agenda or day view for that date
        STATE.calView = 'agenda';
        document.querySelectorAll('.cal-tab').forEach(t => t.classList.remove('active'));
        document.querySelector('.cal-tab[data-view="agenda"]')?.classList.add('active');
        renderCalendarView();
      });
    });
  }

  function renderDayView() {
    const container = document.getElementById('dayViewHours');
    if (!container) return;

    const dayStr = STATE.selectedDate || toDateStr(new Date());
    let dayEvents = STATE.events.filter(e => e.date === dayStr);

    if (STATE.activeFilter !== 'all') {
      dayEvents = dayEvents.filter(e => e.members.includes(STATE.activeFilter));
    }

    dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));

    let html = `<div style="padding: 10px 0; font-size: 0.9rem; font-weight: 700; color: #38bdf8;">Programma per ${formatDatePretty(dayStr)}:</div>`;

    if (dayEvents.length === 0) {
      html += `<div style="color: var(--text-muted); padding: 20px 0; text-align: center;">Nessun impegno previsto per questo giorno.</div>`;
    } else {
      dayEvents.forEach(evt => {
        const avatars = Array.isArray(evt.members) ? evt.members.map(mId => {
          const m = FAMILY_MEMBERS[mId];
          return m ? `<img src="${m.avatar}" class="f-avatar-mini" alt="${escapeHtml(m.name)}" title="${escapeHtml(m.name)}">` : '';
        }).filter(Boolean).join('') : '';
        html += `
          <div class="agenda-item" data-event-id="${evt.id}">
            <div>
              <strong style="color: #fff;">${escapeHtml(evt.title)}</strong>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
                Ore ${evt.startTime}${evt.endTime ? ' - ' + evt.endTime : ''} &bull; ${escapeHtml(evt.place || 'Casa')}
              </div>
              ${evt.driver ? `<div style="font-size: 0.72rem; color: #38bdf8; margin-top: 2px;">🚗 ${escapeHtml(evt.driver)}</div>` : ''}
            </div>
            <div class="f-event-avatars">${avatars}</div>
          </div>
        `;
      });
    }

    container.innerHTML = html;

    container.querySelectorAll('.agenda-item').forEach(item => {
      item.addEventListener('click', () => {
        SoundFX.playClick();
        const id = item.getAttribute('data-event-id');
        openEditEventModal(id);
      });
    });
  }

  // --- FORM CONTROLLER (ADD / EDIT EVENT) ---
  function openAddEventModal(presetDate) {
    const form = document.getElementById('eventForm');
    form.reset();
    document.getElementById('eventId').value = '';
    document.getElementById('eventModalTitle').textContent = 'Nuovo Impegno';
    document.getElementById('deleteEventBtn').style.display = 'none';

    // Preset Date
    document.getElementById('eventDate').value = presetDate || toDateStr(new Date());
    document.getElementById('eventStartTime').value = '16:30';
    document.getElementById('eventEndTime').value = '17:30';

    // Refresh dynamic participant selector
    renderParticipantSelector();

    // Check filtered member or default to first
    document.querySelectorAll('#participantSelector input').forEach(input => {
      input.checked = (STATE.activeFilter !== 'all' && input.value === STATE.activeFilter);
    });
    if (!document.querySelector('#participantSelector input:checked')) {
      const firstCheck = document.querySelector('#participantSelector input');
      if (firstCheck) firstCheck.checked = true;
    }

    // Reset alert
    document.getElementById('formConflictAlert').style.display = 'none';

    window.app.openModal('addEventModal');
  }

  function openEditEventModal(eventId) {
    const evt = STATE.events.find(e => e.id === eventId);
    if (!evt) return;

    document.getElementById('eventId').value = evt.id;
    document.getElementById('eventModalTitle').textContent = 'Modifica Impegno';
    document.getElementById('deleteEventBtn').style.display = 'inline-block';

    document.getElementById('eventTitle').value = evt.title;
    document.getElementById('eventDate').value = evt.date;
    document.getElementById('eventStartTime').value = evt.startTime;
    document.getElementById('eventEndTime').value = evt.endTime || '';
    document.getElementById('eventDriver').value = evt.driver || '';
    document.getElementById('eventNotes').value = evt.notes || '';

    // Refresh dynamic participant selector
    renderParticipantSelector();

    // Check participants
    document.querySelectorAll('#participantSelector input').forEach(input => {
      input.checked = Array.isArray(evt.members) && evt.members.includes(input.value);
    });

    // Places
    const placeSelect = document.getElementById('eventPlaceSelect');
    const customPlace = document.getElementById('eventCustomPlace');
    const hasPreset = Array.from(placeSelect.options).some(o => o.value === evt.place);
    if (hasPreset) {
      placeSelect.value = evt.place;
      customPlace.value = '';
    } else {
      placeSelect.value = 'Altro';
      customPlace.value = evt.place;
    }

    // Categories
    document.querySelectorAll('.cat-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-cat') === evt.category);
    });

    document.getElementById('formConflictAlert').style.display = 'none';

    window.app.openModal('addEventModal');
  }

  // --- SMART ANALYZER CONTROLLER ---
  function runDayAnalysis(targetDate) {
    const dateStr = targetDate || toDateStr(new Date());
    const dateInput = document.getElementById('analyzerDateInput');
    if (dateInput) dateInput.value = dateStr;

    const conflicts = findConflictsForDate(dateStr);
    const pill = document.getElementById('analyzerStatusPill');
    const conflictsSection = document.getElementById('analyzerConflictsSection');
    const recoSection = document.getElementById('analyzerRecommendations');

    const dayEvents = STATE.events.filter(e => e.date === dateStr);
    dayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (conflicts.length > 0) {
      pill.className = 'status-pill status-warning';
      pill.innerHTML = `⚠️ ${conflicts.length} Conflitt${conflicts.length === 1 ? 'o' : 'i'} Rilevat${conflicts.length === 1 ? 'o' : 'i'}`;

      conflictsSection.innerHTML = conflicts.map(c => `
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: 12px; padding: 10px 14px; margin-bottom: 8px;">
          <strong style="color: #fca5a5; font-size: 0.82rem;">${c.type === 'logistics_kids' ? '🚗 Conflitto Spostamenti Bimbi' : '⏱️ Sovrapposizione Orari'}</strong>
          <p style="font-size: 0.78rem; color: #fff; margin-top: 3px;">${escapeHtml(c.message)}</p>
        </div>
      `).join('');
    } else {
      pill.className = 'status-pill status-success';
      pill.innerHTML = `✅ Giornata Fluida - Nessun conflitto logistico`;
      conflictsSection.innerHTML = `
        <p style="font-size: 0.8rem; color: #6ee7b7;">Tutti gli orari sono compatibili e ben distribuiti tra Papà e Mamma.</p>
      `;
    }

    // Generate Smart Family Plan
    let planHtml = '';
    if (dayEvents.length === 0) {
      planHtml = `<div class="solution-item">Nessuna attività programmata per questo giorno. Tempo ideale per relax in famiglia! 🏡</div>`;
    } else {
      dayEvents.forEach(evt => {
        const names = Array.isArray(evt.members) ? evt.members.map(m => FAMILY_MEMBERS[m]?.name || 'Membro').join(' e ') : '';
        let note = `<strong>Ore ${evt.startTime}:</strong> ${names} &bull; ${escapeHtml(evt.title)}`;
        if (evt.driver) {
          note += `<br><span style="color: #38bdf8;">&rarr; Logistica: ${escapeHtml(evt.driver)}</span>`;
        }
        planHtml += `<div class="solution-item">${note}</div>`;
      });
    }

    recoSection.innerHTML = planHtml;
  }

  // --- PLACES CONTROLLER ---
  function renderPlacesModal() {
    const list = document.getElementById('placesList');
    if (!list) return;

    list.innerHTML = STATE.places.map(p => `
      <div class="place-item">
        <div class="place-left">
          <h4>${escapeHtml(p.name)}</h4>
          <p>${escapeHtml(p.address)} ${p.note ? '&bull; ' + escapeHtml(p.note) : ''}</p>
        </div>
        <a class="place-map-link" href="https://maps.google.com/?q=${encodeURIComponent(p.address || p.name)}" target="_blank" rel="noopener">
          Mappa &rarr;
        </a>
      </div>
    `).join('');
  }

  // --- FAMILY PROFILES CONTROLLER ---
  function renderFamilyProfiles() {
    const list = document.getElementById('familyProfilesList');
    const bars = document.getElementById('familyStatsBars');
    if (!list) return;

    const todayStr = toDateStr(new Date());

    list.innerHTML = Object.values(FAMILY_MEMBERS).map(m => {
      const activeCount = STATE.events.filter(e => e.date >= todayStr && Array.isArray(e.members) && e.members.includes(m.id)).length;
      const ringStyle = m.color ? `border-color: ${m.color}; color: ${m.color}; box-shadow: 0 0 10px ${m.color}66;` : '';
      return `
        <div class="profile-item-card" data-member-id="${m.id}">
          <div class="profile-left">
            <div class="profile-avatar-wrap ${m.ringClass || ''}" style="${ringStyle}">
              <img src="${m.avatar}" alt="${escapeHtml(m.name)}">
            </div>
            <div class="profile-meta">
              <h4>${escapeHtml(m.fullName || m.name)}</h4>
              <p>${escapeHtml(m.role || 'Membro della famiglia')}</p>
            </div>
          </div>
          <div class="profile-right-group">
            <div class="profile-stats-badge">
              <span style="font-size: 0.85rem; font-weight: 700; color: ${m.color || '#38bdf8'};">${activeCount}</span>
              <div style="font-size: 0.7rem; color: var(--text-muted);">impegni futuri</div>
            </div>
            <div class="profile-action-buttons">
              <button type="button" class="btn-member-action btn-member-edit" data-edit-member="${m.id}" title="Modifica ${escapeHtml(m.name)}">
                ✏️ Modifica
              </button>
              <button type="button" class="btn-member-action btn-member-delete" data-delete-member="${m.id}" title="Elimina ${escapeHtml(m.name)}">
                🗑️
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners for Edit and Delete
    list.querySelectorAll('[data-edit-member]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-member');
        openEditMemberModal(id);
      });
    });

    list.querySelectorAll('[data-delete-member]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-member');
        confirmDeleteMember(id);
      });
    });

    if (bars) {
      bars.innerHTML = Object.values(FAMILY_MEMBERS).map(m => {
        const count = STATE.events.filter(e => Array.isArray(e.members) && e.members.includes(m.id)).length;
        const widthPct = Math.min(100, Math.max(15, count * 14));
        return `
          <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 3px;">
              <span>${escapeHtml(m.name)}</span>
              <span style="font-weight: 700;">${count}</span>
            </div>
            <div style="background: rgba(255,255,255,0.08); border-radius: 6px; height: 8px; overflow: hidden;">
              <div style="background: ${m.color || '#38bdf8'}; width: ${widthPct}%; height: 100%; border-radius: 6px;"></div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // --- SERVER SHARE URL & QR CODE SYSTEM ---
  let cachedServerUrl = null;

  async function getServerShareUrl() {
    if (cachedServerUrl) return cachedServerUrl;
    // If opened via local IP address or remote host
    if (window.location.hostname && /^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)) {
      cachedServerUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port || '8080'}/`;
      return cachedServerUrl;
    }
    // Try querying local server info endpoint
    try {
      const res = await fetch('/api/info');
      if (res.ok) {
        const data = await res.json();
        if (data && data.url) {
          cachedServerUrl = data.url;
          return cachedServerUrl;
        }
      }
    } catch (e) {}
    // Default verified Wi-Fi IP
    cachedServerUrl = 'http://192.168.1.65:8080/';
    return cachedServerUrl;
  }

  async function renderShareQR() {
    const container = document.getElementById('qrContainer');
    const input = document.getElementById('shareUrlInput');
    if (!container) return;

    const url = await getServerShareUrl();
    if (input) input.value = url;

    // Real high-contrast scannable QR Code on pure white canvas
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(url)}`;
    
    container.innerHTML = `
      <img src="${qrUrl}" alt="QR Code per aprire Family Planner su cellulare" class="qr-img" style="width: 210px; height: 210px; display: block; margin: 0 auto;" onerror="this.onerror=null; this.outerHTML='<div style=\\'padding: 20px; font-weight: bold; color: #0284c7; text-align: center;\\'>${url}</div>';">
    `;
  }

  // --- WHATSAPP SHARING GENERATOR ---
  async function shareViaWhatsApp() {
    const url = await getServerShareUrl();
    const todayStr = toDateStr(new Date());
    const todayEvents = STATE.events.filter(e => e.date === todayStr);

    let msg = `🏡 *Family Planner - La nostra famiglia*\n\n`;
    msg += `📲 *Apri l'app dal tuo cellulare (iPhone / Android):*\n${url}\n\n`;
    msg += `📅 *Impegni di Oggi (${formatDatePretty(todayStr)}):*\n`;

    if (todayEvents.length === 0) {
      msg += `Nessun impegno in programma per oggi! Godiamoci la giornata insieme ❤️\n`;
    } else {
      todayEvents.sort((a, b) => a.startTime.localeCompare(b.startTime));
      todayEvents.forEach(e => {
        const names = Array.isArray(e.members) ? e.members.map(m => FAMILY_MEMBERS[m]?.name || 'Membro').join(', ') : '';
        msg += `⏰ *${e.startTime}* - *${e.title}* (${names})\n`;
        if (e.place) msg += `📍 ${e.place}\n`;
      });
    }
    msg += `\n✨ _Tutti i cambiamenti si sincronizzano automaticamente tra noi!_`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    showToast('Apertura WhatsApp con il link dell\'app...');
  }

  // --- HELPERS ---
  function formatDatePretty(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }

  function showToast(text) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- MODAL CONTROLLER ---
  function openModal(id) {
    SoundFX.playClick();
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');

      // Initialize modal-specific contents
      if (id === 'calendarModal') renderCalendarView();
      if (id === 'familyModal') renderFamilyProfiles();
      if (id === 'placesModal') renderPlacesModal();
      if (id === 'analyzerModal') runDayAnalysis(toDateStr(new Date()));
      if (id === 'settingsModal') renderShareQR();
    }
  }

  function closeModal(modalEl) {
    SoundFX.playClick();
    if (modalEl) {
      modalEl.classList.remove('open');
      modalEl.setAttribute('aria-hidden', 'true');
    }
  }

  // --- SETUP EVENT LISTENERS ---
  function setupListeners() {
    // 6 Cards on Dashboard
    document.getElementById('cardCalendar')?.addEventListener('click', () => openModal('calendarModal'));
    document.getElementById('cardAddEvent')?.addEventListener('click', () => openAddEventModal());
    document.getElementById('cardFamily')?.addEventListener('click', () => openModal('familyModal'));
    document.getElementById('cardPlaces')?.addEventListener('click', () => openModal('placesModal'));
    document.getElementById('cardAnalyzer')?.addEventListener('click', () => openModal('analyzerModal'));
    document.getElementById('cardSettings')?.addEventListener('click', () => openModal('settingsModal'));

    // Bottom Navigation
    document.getElementById('navHomeBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      document.querySelectorAll('.modal-backdrop').forEach(closeModal);
    });
    document.getElementById('navCalBtn')?.addEventListener('click', () => openModal('calendarModal'));
    document.getElementById('navAddBtn')?.addEventListener('click', () => openAddEventModal());
    document.getElementById('navAnalyzeBtn')?.addEventListener('click', () => openModal('analyzerModal'));
    document.getElementById('navShareBtn')?.addEventListener('click', () => openModal('settingsModal'));

    // See all feed events
    document.getElementById('seeAllEventsBtn')?.addEventListener('click', () => openModal('calendarModal'));

    // Modal Close Buttons
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = btn.closest('.modal-backdrop');
        closeModal(modal);
      });
    });

    // Close on backdrop tap
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    });

    // Add Member Shortcut buttons
    document.getElementById('quickAddMemberBtn')?.addEventListener('click', openAddMemberModal);
    document.getElementById('openAddMemberFromFamilyModalBtn')?.addEventListener('click', openAddMemberModal);

    // Toggle Remove Avatar Mode buttons
    document.getElementById('btnToggleRemoveMemberMode')?.addEventListener('click', () => toggleRemoveMode());
    document.getElementById('btnDoneRemoveMode')?.addEventListener('click', () => toggleRemoveMode(false));

    // Quick Edit Names button opens familyModal overview
    document.getElementById('quickEditNamesBtn')?.addEventListener('click', () => {
      openModal('familyModal');
    });
    document.getElementById('openEditNamesFromFamilyModalBtn')?.addEventListener('click', () => {
      closeModal(document.getElementById('familyModal'));
      setTimeout(openEditNamesModal, 250);
    });
    document.getElementById('editNamesForm')?.addEventListener('submit', saveEditedNames);

    // Add/Edit Member Color Palette buttons
    document.querySelectorAll('#newMemberColorPalette .color-dot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.playClick();
        document.querySelectorAll('#newMemberColorPalette .color-dot-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMemberFormColor = btn.getAttribute('data-color') || '#38bdf8';
        updateMemberModalPreview();
      });
    });

    // Preset Avatars Grid buttons
    document.querySelectorAll('#presetAvatarsGrid .preset-avatar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        SoundFX.playClick();
        document.querySelectorAll('#presetAvatarsGrid .preset-avatar-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMemberFormAvatar = btn.getAttribute('data-src');
        updateMemberModalPreview();
      });
    });

    // Custom Photo Upload with Canvas Compression
    document.getElementById('newMemberPhotoUpload')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      compressImage(file, 160, 160, 0.82, (compressedDataUrl) => {
        activeMemberFormAvatar = compressedDataUrl;
        document.querySelectorAll('#presetAvatarsGrid .preset-avatar-item').forEach(b => b.classList.remove('active'));
        updateMemberModalPreview();
        SoundFX.playSuccess();
        showToast('Fotografia caricata e ottimizzata! 📸');
      });
    });

    // Add/Edit Member Form Submit
    document.getElementById('addMemberForm')?.addEventListener('submit', saveMemberForm);

    document.getElementById('clearFilterBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      STATE.activeFilter = 'all';
      document.querySelectorAll('.member-chip').forEach(c => c.classList.remove('selected'));
      document.getElementById('filterIndicator').style.display = 'none';
      updateTodayBanner();
      renderUpcomingFeed();
    });

    // Calendar Tab Views (Agenda, Mese, Giorno)
    document.querySelectorAll('.cal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        SoundFX.playClick();
        document.querySelectorAll('.cal-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        STATE.calView = tab.getAttribute('data-view');
        renderCalendarView();
      });
    });

    // Calendar Navigation (Prev, Next, Oggi)
    document.getElementById('calPrevBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      STATE.calDate.setMonth(STATE.calDate.getMonth() - 1);
      renderCalendarView();
    });

    document.getElementById('calNextBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      STATE.calDate.setMonth(STATE.calDate.getMonth() + 1);
      renderCalendarView();
    });

    document.getElementById('calTodayBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      STATE.calDate = new Date();
      STATE.selectedDate = toDateStr(new Date());
      renderCalendarView();
    });

    // Calendar Member Filter Pills
    document.querySelectorAll('.m-filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        SoundFX.playClick();
        document.querySelectorAll('.m-filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        STATE.activeFilter = pill.getAttribute('data-filter');
        renderCalendarView();
      });
    });

    document.getElementById('calAddEventBtn')?.addEventListener('click', () => {
      openAddEventModal(STATE.selectedDate);
    });

    // Category Chips selection
    document.querySelectorAll('.cat-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        SoundFX.playClick();
        document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    // Place Selector in Form
    document.getElementById('eventPlaceSelect')?.addEventListener('change', (e) => {
      const customInput = document.getElementById('eventCustomPlace');
      if (e.target.value === 'Altro' || e.target.value === '') {
        customInput.style.display = 'block';
        customInput.focus();
      } else {
        customInput.value = e.target.value;
      }
    });

    // Event Form Submit (Add / Save)
    document.getElementById('eventForm')?.addEventListener('submit', (e) => {
      e.preventDefault();

      const eventId = document.getElementById('eventId').value;
      const title = document.getElementById('eventTitle').value.trim();
      const date = document.getElementById('eventDate').value;
      const startTime = document.getElementById('eventStartTime').value;
      const endTime = document.getElementById('eventEndTime').value;
      const driver = document.getElementById('eventDriver').value;
      const notes = document.getElementById('eventNotes').value.trim();

      // Participants
      const checkedMembers = Array.from(document.querySelectorAll('#participantSelector input:checked')).map(i => i.value);
      if (checkedMembers.length === 0) {
        alert('Seleziona almeno un familiare che partecipa all\'impegno.');
        return;
      }

      // Place
      const placeSel = document.getElementById('eventPlaceSelect').value;
      const customPlace = document.getElementById('eventCustomPlace').value.trim();
      const place = customPlace || (placeSel !== 'Altro' ? placeSel : 'Casa');

      // Category
      const activeCat = document.querySelector('.cat-chip.active')?.getAttribute('data-cat') || 'Famiglia';

      if (eventId) {
        // Edit existing
        const idx = STATE.events.findIndex(ev => ev.id === eventId);
        if (idx !== -1) {
          STATE.events[idx] = {
            ...STATE.events[idx],
            title, date, startTime, endTime, members: checkedMembers, place, driver, category: activeCat, notes
          };
          showToast('Impegno aggiornato con successo! ✨');
        }
      } else {
        // Create new
        const newEvt = {
          id: 'evt-' + Date.now(),
          title, date, startTime, endTime, members: checkedMembers, place, driver, category: activeCat, notes
        };
        STATE.events.push(newEvt);
        showToast('Nuovo impegno salvato e sincronizzato! 🗓️');
      }

      SoundFX.playSuccess();
      saveState();
      updateMemberBadges();
      updateTodayBanner();
      renderUpcomingFeed();
      renderCalendarView();

      closeModal(document.getElementById('addEventModal'));
    });

    // Delete Event Button
    document.getElementById('deleteEventBtn')?.addEventListener('click', () => {
      const id = document.getElementById('eventId').value;
      if (!id) return;
      if (confirm('Vuoi davvero eliminare questo impegno?')) {
        STATE.events = STATE.events.filter(e => e.id !== id);
        saveState();
        updateMemberBadges();
        updateTodayBanner();
        renderUpcomingFeed();
        renderCalendarView();
        showToast('Impegno eliminato.');
        closeModal(document.getElementById('addEventModal'));
      }
    });

    // Analyzer Date Picker Change
    document.getElementById('analyzerDateInput')?.addEventListener('change', (e) => {
      runDayAnalysis(e.target.value);
    });

    // Share Plan to WhatsApp Button in Analyzer & Settings
    document.getElementById('sharePlanWhatsAppBtn')?.addEventListener('click', shareViaWhatsApp);
    document.getElementById('sendWhatsAppScheduleBtn')?.addEventListener('click', shareViaWhatsApp);

    // Open in Mobile Web Browser Button
    document.getElementById('openMobileWebBtn')?.addEventListener('click', async () => {
      const url = await getServerShareUrl();
      window.open(url, '_blank');
    });

    // Copy Share Link Button
    document.getElementById('copyShareLinkBtn')?.addEventListener('click', async () => {
      SoundFX.playSuccess();
      const url = await getServerShareUrl();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Link per i cellulari copiato negli appunti! 📋');
        }).catch(() => {
          prompt('Copia questo link:', url);
        });
      } else {
        prompt('Copia questo link:', url);
      }
    });

    // Add New Place
    document.getElementById('saveNewPlaceBtn')?.addEventListener('click', () => {
      const name = document.getElementById('newPlaceName').value.trim();
      const addr = document.getElementById('newPlaceAddress').value.trim();
      if (!name) {
        alert('Inserisci il nome del luogo.');
        return;
      }
      STATE.places.push({
        id: 'place-' + Date.now(),
        name,
        address: addr || name,
        note: 'Aggiunto dalla famiglia'
      });
      saveState();
      renderPlacesModal();
      document.getElementById('newPlaceName').value = '';
      document.getElementById('newPlaceAddress').value = '';
      showToast('Nuovo luogo aggiunto alla lista! 📍');
      SoundFX.playSuccess();
    });

    // Reset Demo Data
    document.getElementById('resetDemoBtn')?.addEventListener('click', () => {
      if (confirm('Vuoi ripristinare gli impegni di esempio per tutta la famiglia?')) {
        STATE.events = getSeedEvents();
        STATE.places = DEFAULT_PLACES;
        saveState();
        updateMemberBadges();
        updateTodayBanner();
        renderUpcomingFeed();
        renderCalendarView();
        showToast('Dati dimostrativi ripristinati!');
        SoundFX.playSuccess();
      }
    });

    // Export JSON Backup
    document.getElementById('exportDataBtn')?.addEventListener('click', () => {
      const json = JSON.stringify({ events: STATE.events, places: STATE.places }, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `family_planner_backup_${toDateStr(new Date())}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Backup salvato sul dispositivo!');
    });

    // Import JSON Backup
    document.getElementById('importDataInput')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.events) {
            STATE.events = parsed.events;
            if (parsed.places) STATE.places = parsed.places;
            saveState();
            updateMemberBadges();
            updateTodayBanner();
            renderUpcomingFeed();
            renderCalendarView();
            showToast('Dati importati con successo! 🎉');
            SoundFX.playSuccess();
          }
        } catch (err) {
          alert('Errore nel formato del file di backup.');
        }
      };
      reader.readAsText(file);
    });

    // Quick Share button in Header
    document.getElementById('headerShareBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      openModal('settingsModal');
    });

    // Copy Share Link button
    document.getElementById('copyShareLinkBtn')?.addEventListener('click', async () => {
      SoundFX.playClick();
      const input = document.getElementById('shareUrlInput');
      const url = input ? input.value : await getServerShareUrl();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('Link copiato negli appunti! 📋');
          SoundFX.playSuccess();
        }).catch(() => {
          input?.select();
          document.execCommand('copy');
          showToast('Link copiato negli appunti! 📋');
        });
      } else {
        input?.select();
        document.execCommand('copy');
        showToast('Link copiato! 📋');
      }
    });

    // Send WhatsApp Link & Daily Schedule
    document.getElementById('sendWhatsAppScheduleBtn')?.addEventListener('click', () => {
      SoundFX.playClick();
      shareViaWhatsApp();
    });

    // Open Mobile Web
    document.getElementById('openMobileWebBtn')?.addEventListener('click', async () => {
      SoundFX.playClick();
      const url = await getServerShareUrl();
      window.open(url, '_blank');
    });

    // Sound toggle
    document.getElementById('soundToggle')?.addEventListener('change', (e) => {
      SoundFX.enabled = e.target.checked;
    });
  }

  // --- INITIALIZATION ---
  function init() {
    loadState();
    updateLiveClock();
    setInterval(updateLiveClock, 30000);

    updateMemberNamesUI();
    updateMemberBadges();
    updateTodayBanner();
    renderUpcomingFeed();
    setupListeners();

    // Register Service Worker for PWA (Android & iOS offline caching)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    }

    // Auto-sync interval & visibility change listeners
    setInterval(fetchServerState, 10000);
    window.addEventListener('focus', fetchServerState);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) fetchServerState();
    });

    // Expose minimal helpers to global scope for inline button handlers
    window.app = {
      openModal,
      closeModal,
      openAddEventModal,
      openEditEventModal,
      openAddMemberModal,
      openEditMemberModal,
      confirmDeleteMember,
      openEditNamesModal,
      shareViaWhatsApp,
      fetchServerState,
      FAMILY_MEMBERS,
      STATE
    };
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
