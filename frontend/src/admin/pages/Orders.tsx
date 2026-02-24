import OrdersTable from "../components/ui/OrdersTable";
import { mockOrders } from "../components/mockData/mockOrders";

export default function Orders() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">All Orders</h2>
      </div>

      <OrdersTable orders={mockOrders} />
    </div>
  );
}
