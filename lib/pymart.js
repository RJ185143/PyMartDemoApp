import sendRequest from './sendRequest';

const baseUrl = `http://127.0.0.1:5000`;

export async function createCatalog() {
  return await sendRequest(`${baseUrl}/catalog`, 'GET', null);
}

export async function createCategories(org) {
  return await sendRequest(`${baseUrl}/categories`, 'GET', null, null, false, org);
}

export async function createSites(body, org) {
  return await sendRequest(`${baseUrl}/site`, 'POST', body, null, false, org);
}

export async function createTenant(body, org) {
  return await sendRequest(`${baseUrl}/tenant`, 'POST', body, null, false, org);
}
