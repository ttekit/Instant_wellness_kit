import Card from "../components/ui/Card";
import OrdersTable from "../components/ui/OrdersTable";
import { ShoppingCart, DollarSign, Package, Truck } from "lucide-react";
import { NavLink } from "react-router-dom";
import TaxCalc from "../components/ui/TaxCalc";
import TaxResult from "../components/ui/TaxResult";
import { useState } from "react";

export default function Dashboard() {
  const [hasData, setHasData] = useState(false);
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card
          title="Total Orders"
          value={0}
          descr="All time"
          icon={<ShoppingCart size={20} />}
        />
        <Card
          title="Revenue"
          dollarSign="$"
          value={0}
          descr="Before tax"
          icon={<DollarSign size={20} />}
        />
        <Card
          title="Tax Collected"
          dollarSign="$"
          value={0}
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
            <OrdersTable orders={[]} limit={5} />
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
