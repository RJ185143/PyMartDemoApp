import groups from '~/data/groups.json';

import { createGroup } from '~/lib/groups';
import { createCatalog, createCategories, createSites, createTenant } from '~/lib/pymart';

export default async function handler(_, res) {
  for (let i = 0; i < groups.length; i += 1) {
    console.log(await createGroup(groups[i]));
  }

  let tenantBody = {
    'orgName': 'pymart-testing-1',
    'orgDisplayName': 'PyMart Testing 1'
  };
  let tenant = await createTenant(tenantBody);
  let siteBody = {
    'sizeSmall': 5,
    'sizeMed': 10,
    'sizeLarge': 2
  };
  await createSites(siteBody);
  await createCatalog();
  await createCategories();

  res.status(200).json({});
}
