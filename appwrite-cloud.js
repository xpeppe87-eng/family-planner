/* Client-only Appwrite access. Real-time family cloud synchronization. */
(function () {
  'use strict';

  const config = window.FAMILY_PLANNER_APPWRITE || {};
  let client;
  let account;
  let databases;

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

  async function getUser() {
    if (!isConfigured()) return null;
    initialize();
    try {
      return await account.get();
    } catch (error) {
      if (error.code === 401) return null;
      throw error;
    }
  }

  async function register(email, password, name) {
    initialize();
    // Chiudi eventuali sessioni residue per evitare l'errore "session already active"
    try { await account.deleteSession('current'); } catch (e) {}
    await account.create(Appwrite.ID.unique(), email, password, name || 'Familiare');
    await account.createEmailPasswordSession(email, password);
    return account.get();
  }

  async function login(email, password) {
    initialize();
    // Chiudi eventuali sessioni residue prima di accedere
    try { await account.deleteSession('current'); } catch (e) {}
    await account.createEmailPasswordSession(email, password);
    return account.get();
  }

  async function logout() {
    initialize();
    try {
      await account.deleteSession('current');
    } catch (error) {
      if (error.code !== 401) throw error;
    }
  }

  function getPermissions() {
    const permissions = [];
    if (config.teamId) {
      try {
        const teamRole = Appwrite.Role.team(config.teamId);
        permissions.push(Appwrite.Permission.read(teamRole));
        permissions.push(Appwrite.Permission.update(teamRole));
        permissions.push(Appwrite.Permission.delete(teamRole));
      } catch (e) {}
    }
    try {
      // Consenti a tutti i familiari autenticati nel progetto di leggere e aggiornare
      const usersRole = Appwrite.Role.users();
      permissions.push(Appwrite.Permission.read(usersRole));
      permissions.push(Appwrite.Permission.update(usersRole));
      permissions.push(Appwrite.Permission.delete(usersRole));
    } catch (e) {}
    return permissions.length ? permissions : undefined;
  }

  async function loadState() {
    initialize();
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
      if (error.code === 404) return null;
      throw error;
    }
  }

  async function saveState(state, createDocument) {
    initialize();
    const databaseId = config.databaseId;
    const collectionId = config.tableId || config.collectionId;
    const documentId = config.rowId || config.documentId;
    const data = { payload: JSON.stringify(state) };
    const permissions = getPermissions();

    if (createDocument) {
      try {
        return await databases.createDocument(databaseId, collectionId, documentId, data, permissions);
      } catch (error) {
        // Se il documento esiste già (409 conflict), aggiornalo invece di fallire
        if (error.code === 409) {
          return await databases.updateDocument(databaseId, collectionId, documentId, data, permissions);
        }
        throw error;
      }
    }

    try {
      return await databases.updateDocument(databaseId, collectionId, documentId, data, permissions);
    } catch (error) {
      // Se il documento non esiste ancora (404 not found), crealo
      if (error.code === 404) {
        return await databases.createDocument(databaseId, collectionId, documentId, data, permissions);
      }
      throw error;
    }
  }

  window.AppwriteCloud = { isConfigured, getUser, register, login, logout, loadState, saveState };
})();
