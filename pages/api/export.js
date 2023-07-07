import groups from '~/data/groups.json';
import { createGroup } from '~/lib/groups';
import { createCatalog, createCategories, createSites, createTenant } from '~/lib/pymart';

export default async function handler(_, res) {
  for (let i = 0; i < groups.length; i += 1) {
    await createGroup(groups[i]);
  }

  let tenantBody = {
    orgDisplayName: 'PyMart Testing Demo App'
  };

  await createTenant(tenantBody);

  let siteBody = {
    numSmall: 5,
    numMed: 10,
    numLarge: 2
  };
  await createSites(siteBody, tenantBody.orgName);
  await createCatalog(tenantBody.orgName);
  await createCategories(tenantBody.orgName);

  res.status(200).json({ orgName: tenantBody.orgName });
}
