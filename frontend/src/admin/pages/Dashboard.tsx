import Card from "../components/ui/Card";
import OrdersTable from "../components/ui/OrdersTable";
import { ShoppingCart, DollarSign, Package, Truck } from "lucide-react";
import { NavLink } from "react-router-dom";
import TaxCalc from "../components/ui/TaxCalc";
import TaxResult from "../components/ui/TaxResult";
import { useEffect, useState } from "react";
import { Order } from "../types/Orders.types";

export default function Dashboard() {
  const [hasData, setHasData] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4200/orders");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.subtotal || '0'), 0);
  const totalTaxCollected = orders.reduce((sum, order) => sum + parseFloat(order.tax_amount || '0'), 0);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card
          title="Total Orders"
          value={totalOrders}
          descr="All time"
          icon={<ShoppingCart size={20} />}
        />
        <Card
          title="Revenue"
          dollarSign="$"
          value={totalRevenue}
          descr="Before tax"
          icon={<DollarSign size={20} />}
        />
        <Card
          title="Tax Collected"
          dollarSign="$"
          value={totalTaxCollected}
          descr="Sales tax"
          icon={<Package size={20} />}
        />
        <Card
          title="Active Deliveries"
          value={0}
          descr="In transit"
          icon={<Truck size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-6 pb-2">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-0">
            <OrdersTable orders={orders} limit={5} />
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Tax Lookup
            </h2>
            <NavLink
              to="/tax-lookup"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Full Tool
            </NavLink>
          </div>

          <TaxCalc compact onSearch={() => setHasData(true)} />
          <TaxResult hasData={hasData} />
        </div>
      </div>
    </div>
  );
}
