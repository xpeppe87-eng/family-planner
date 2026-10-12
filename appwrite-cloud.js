/* Client-only Appwrite access. Family-only cloud synchronization (Authenticated Family Account). */
(function () {
  'use strict';

  const config = window.FAMILY_PLANNER_APPWRITE || {};
  let client;
  let account;
  let databases;
  let originBlocked = false;

  function isConfigured() {
    return Boolean(
      window.Appwrite &&
      config.endpoint &&
      config.projectId &&
      config.databaseId &&
      (config.tableId || config.collectionId) &&
      (config.rowId || config.documentId)
    );
  }

  function isOriginBlocked() {
    return originBlocked;
  }

  function initialize() {
    if (!isConfigured()) {
      throw new Error('Configurazione Appwrite incompleta. Controlla appwrite-config.js.');
    }
    if (!client) {
      client = new Appwrite.Client()
        .setEndpoint(config.endpoint)
        .setProject(config.projectId);
      account = new Appwrite.Account(client);
      databases = new Appwrite.Databases(client);
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

  /**
   * Assicura che l'utente sia autenticato con email/password.
   * Rifiuta sessioni anonime: solo chi ha fatto login con l'account di famiglia puo' accedere.
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

  /**
   * Verifica che l'utente sia autenticato con l'account di famiglia.
   */
  async function isFamilyMember(user) {
    if (!user || !user.email) return false;
    return true;
  }

  /** Richiede un utente autenticato con email/password. */
  async function requireFamilyUser() {
    const user = await ensureSession();
    if (!user) {
      const err = new Error('LOGIN_REQUIRED');
      err.type = 'login_required';
      err.code = 401;
      throw err;
    }
    return user;
  }

  async function getUser() {
    return ensureSession();
  }

  async function register(email, password, name) {
    initialize();
    try { await account.deleteSession('current'); } catch (e) {}
    await account.create(Appwrite.ID.unique(), email, password, name || 'Famiglia');
    await account.createEmailPasswordSession(email, password);
    originBlocked = false;
    return account.get();
  }

  async function login(email, password) {
    initialize();
    try { await account.deleteSession('current'); } catch (e) {}
    await account.createEmailPasswordSession(email, password);
    originBlocked = false;
    return account.get();
  }

  async function logout() {
    initialize();
    try {
      await account.deleteSession('current');
    } catch (error) {
      if (error && error.code !== 401) throw error;
    }
  }

  /** 
   * Permessi assegnati al documento: 
   * Lettura e modifica concesse agli utenti autenticati (Users). 
   * Nessun accesso a ospiti o visitatori anonimi.
   */
  function getPermissions() {
    const usersRole = Appwrite.Role.users();
    return [
      Appwrite.Permission.read(usersRole),
      Appwrite.Permission.update(usersRole)
    ];
  }

  async function loadState() {
    initialize();
    await requireFamilyUser();
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
    await requireFamilyUser();
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
