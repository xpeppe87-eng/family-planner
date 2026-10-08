/* Client-only Appwrite access. Real-time family cloud synchronization. */
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

  function isCorsOrOriginError(error) {
    if (!error) return false;
    if (error.type === 'general_unknown_origin' || error.code === 403) return true;
    if (typeof error.message === 'string') {
      const msg = error.message.toLowerCase();
      if (msg.includes('invalid origin') || msg.includes('failed to fetch') || msg.includes('networkerror') || msg.includes('cors')) {
        return true;
      }
    }
    if (error.name === 'TypeError' && typeof error.message === 'string' && error.message.includes('fetch')) {
      return true;
    }
    return false;
  }

  /**
   * Assicura una sessione attiva (esistente, login email o sessione anonima automatica).
   * Permette a qualsiasi telefono della famiglia di sincronizzarsi istantaneamente
   * senza barriere di registrazione o password obbligatorie.
   */
  async function ensureSession() {
    if (!isConfigured()) return null;
    if (originBlocked) {
      const err = new Error('ORIGIN_NOT_ALLOWED');
      err.type = 'general_unknown_origin';
      err.code = 403;
      throw err;
    }

    initialize();
    try {
      return await account.get();
    } catch (error) {
      if (isCorsOrOriginError(error)) {
        originBlocked = true;
        const err = new Error('ORIGIN_NOT_ALLOWED');
        err.type = 'general_unknown_origin';
        err.code = 403;
        throw err;
      }
      try {
        await account.createAnonymousSession();
        return await account.get();
      } catch (anonError) {
        if (isCorsOrOriginError(anonError)) {
          originBlocked = true;
          const err = new Error('ORIGIN_NOT_ALLOWED');
          err.type = 'general_unknown_origin';
          err.code = 403;
          throw err;
        }
        console.warn('Creazione sessione automatica:', anonError);
        if (error && error.code === 401) return null;
        throw error;
      }
    }
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

  function getPermissions() {
    const permissions = [];
    if (!window.Appwrite) return undefined;
    // Permessi per chiunque abbia accesso al link (compresi dispositivi mobili della famiglia)
    try {
      const anyRole = Appwrite.Role.any();
      permissions.push(Appwrite.Permission.read(anyRole));
      permissions.push(Appwrite.Permission.update(anyRole));
      permissions.push(Appwrite.Permission.delete(anyRole));
    } catch (e) {}

    // Permessi per utenti autenticati con email
    try {
      const usersRole = Appwrite.Role.users();
      permissions.push(Appwrite.Permission.read(usersRole));
      permissions.push(Appwrite.Permission.update(usersRole));
      permissions.push(Appwrite.Permission.delete(usersRole));
    } catch (e) {}

    // Permessi per eventuale team configurato
    if (config.teamId) {
      try {
        const teamRole = Appwrite.Role.team(config.teamId);
        permissions.push(Appwrite.Permission.read(teamRole));
        permissions.push(Appwrite.Permission.update(teamRole));
        permissions.push(Appwrite.Permission.delete(teamRole));
      } catch (e) {}
    }
    return permissions.length ? permissions : undefined;
  }

  async function loadState() {
    initialize();
    await ensureSession();
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
    await ensureSession();
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

  window.AppwriteCloud = { isConfigured, isOriginBlocked, ensureSession, getUser, register, login, logout, loadState, saveState };
})();
