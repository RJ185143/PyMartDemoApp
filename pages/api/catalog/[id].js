import { getCatalogItemByItemCode } from '~/lib/catalog';

export default async function handler(req, res) {
  console.log("here")
  const catalogItem = await getCatalogItemByItemCode(req.query.id);
  res.status(catalogItem.status).json({ catalogItem, logs: [catalogItem.log] });
}
