import { getAllOrders } from '~/lib/order';

export default async function handler(req, res) {
  const orders = await getAllOrders();
  console.log(orders);
  res.status(orders.status).json({
    orders,
    logs: [orders.log]
  });
}
