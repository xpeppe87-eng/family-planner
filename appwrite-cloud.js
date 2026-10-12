/* Client-only Appwrite access. Family-only cloud synchronization (Team members). */
(function () {
  'use strict';

  const config = window.FAMILY_PLANNER_APPWRITE || {};
  let client;
  let account;
  let databases;
  let teams;
  let originBlocked = false;
  let membershipCache = { userId: null, ok: false };

  function isConfigured() {
    return Boolean(
      window.Appwrite &&
      config.endpoint &&
      config.projectId &&
      config.databaseId &&
      (config.tableId || config.collectionId) &&
      (config.rowId || config.documentId) &&
      config.teamId
    );
  }

  function isOriginBlocked() {
    return originBlocked;
  }

  function initialize() {
    if (!isConfigured()) {
      throw new Error('Configurazione Appwrite incompleta. Controlla appwrite-config.js (serve anche teamId).');
    }
    if (!client) {
      client = new Appwrite.Client()
        .setEndpoint(config.endpoint)
        .setProject(config.projectId);
      account = new Appwrite.Account(client);
      databases = new Appwrite.Databases(client);
      if (Appwrite.Teams) teams = new Appwrite.Teams(client);
    }
  }

  function isOriginError(error) {
    if (!error) return false;
    if (error.type === 'general_unknown_origin') return true;
    return typeof error.message === 'string' && error.message.toLowerCase().includes('invalid origin');
  }

  function originError() {
    const err = new Error('ORIGIN_NOT_ALLOWED');
    err.type = 'general_unknown_origin';
    err.code = 403;
    return err;
  }

  function notMemberError() {
    const err = new Error('NOT_FAMILY_MEMBER');
    err.type = 'not_family_member';
    err.code = 403;
    return err;
  }

  /**
   * Restituisce l'utente autenticato con email/password, oppure null se non c'e' accesso.
   * Le vecchie sessioni anonime vengono chiuse: non danno piu' accesso ai dati.
   */
  async function ensureSession() {
    if (!isConfigured()) return null;
    if (originBlocked) throw originError();

    initialize();
    let user;
    try {
      user = await account.get();
    } catch (error) {
      if (isOriginError(error)) {
        originBlocked = true;
        throw originError();
      }
      if (error && error.code === 401) return null;
      throw error;
    }

    if (!user || !user.email) {
      try { await account.deleteSession('current'); } catch (e) {}
      return null;
    }
    return user;
  }

  /** Verifica che l'utente appartenga al Team della famiglia. */
  async function isFamilyMember(user) {
    if (!user) return false;
    if (membershipCache.userId === user.$id) return membershipCache.ok;
    let ok = false;
    if (teams) {
      try {
        const result = await teams.list();
        ok = Boolean(result && Array.isArray(result.teams) && result.teams.some((t) => t.$id === config.teamId));
      } catch (error) {
        if (error && error.code !== 401) console.warn('Verifica Team non riuscita:', error);
      }
    }
    membershipCache = { userId: user.$id, ok };
    return ok;
  }

  /** Richiede un utente autenticato e membro del Team, altrimenti lancia un errore. */
  async function requireFamilyMember() {
    const user = await ensureSession();
    if (!user) {
      const err = new Error('LOGIN_REQUIRED');
      err.type = 'login_required';
      err.code = 401;
      throw err;
    }
    if (!(await isFamilyMember(user))) throw notMemberError();
    return user;
  }

  async function getUser() {
    return ensureSession();
  }

  async function register(email, password, name) {
    initialize();
    try { await account.deleteSession('current'); } catch (e) {}
    await account.create(Appwrite.ID.unique(), email, password, name || 'Familiare');
    await account.createEmailPasswordSession(email, password);
    originBlocked = false;
    membershipCache = { userId: null, ok: false };
    return account.get();
  }

  async function login(email, password) {
    initialize();
    try { await account.deleteSession('current'); } catch (e) {}
    await account.createEmailPasswordSession(email, password);
    originBlocked = false;
    membershipCache = { userId: null, ok: false };
    return account.get();
  }

  async function logout() {
    initialize();
    membershipCache = { userId: null, ok: false };
    try {
      await account.deleteSession('current');
    } catch (error) {
      if (error && error.code !== 401) throw error;
    }
  }

  /** Solo il Team della famiglia puo' leggere e modificare la riga condivisa (nessuna cancellazione). */
  function getPermissions() {
    const teamRole = Appwrite.Role.team(config.teamId);
    return [
      Appwrite.Permission.read(teamRole),
      Appwrite.Permission.update(teamRole)
    ];
  }

  async function loadState() {
    initialize();
    await requireFamilyMember();
    const databaseId = config.databaseId;
    const collectionId = config.tableId || config.collectionId;
    const documentId = config.rowId || config.documentId;
    try {
      const doc = await databases.getDocument(databaseId, collectionId, documentId);
      if (doc && doc.payload) {
        return typeof doc.payload === 'string' ? JSON.parse(doc.payload) : doc.payload;
      }
      return null;
    } catch (error) {
      if (error && (error.code === 404 || error.type === 'document_not_found')) {
        return null;
      }
      throw error;
    }
  }

  async function saveState(state, createDocument) {
    initialize();
    await requireFamilyMember();
    const databaseId = config.databaseId;
    const collectionId = config.tableId || config.collectionId;
    const documentId = config.rowId || config.documentId;
    const data = { payload: JSON.stringify(state) };
    const permissions = getPermissions();

    if (createDocument) {
      try {
        return await databases.createDocument(databaseId, collectionId, documentId, data, permissions);
      } catch (error) {
        if (error && error.code === 409) {
          return await databases.updateDocument(databaseId, collectionId, documentId, data, permissions);
        }
        throw error;
      }
    }

    try {
      return await databases.updateDocument(databaseId, collectionId, documentId, data, permissions);
    } catch (error) {
      if (error && (error.code === 404 || error.type === 'document_not_found')) {
        return await databases.createDocument(databaseId, collectionId, documentId, data, permissions);
      }
      throw error;
    }
  }

  window.AppwriteCloud = {
    isConfigured, isOriginBlocked, ensureSession, getUser, isFamilyMember,
    register, login, logout, loadState, saveState
  };
})();
