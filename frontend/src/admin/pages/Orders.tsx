import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import OrdersTable from "../components/ui/OrdersTable";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";
import { mockOrders } from "../components/mockData/mockOrders";
import { mockJurisdictions } from "../components/mockData/mockJurisdictions";
import { OrderInfo } from "../components/ui/OrdersTable";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(mockOrders);
  const [editOrder, setEditOrder] = useState<OrderInfo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<OrderInfo | null>(null);

  const filtered = orders.filter((order) => {
    const s = search.toLowerCase();
    return (
      order.customer.toLowerCase().includes(s) ||
      order.orderID.toLowerCase().includes(s) ||
      order.jurisdiction.toLowerCase().includes(s) ||
      order.kit.toLowerCase().includes(s) ||
      order.status.toLowerCase().includes(s)
    );
  });

  const saveEdit = () => {
    if (!editOrder) return;
    setOrders(
      orders.map((o) => (o.orderID === editOrder.orderID ? editOrder : o)),
    );
    setEditOrder(null);
  };

  const updateSubtotal = (value: number) => {
    if (!editOrder) return;
    const tax = parseFloat(((value * editOrder.taxRate) / 100).toFixed(2));
    setEditOrder({ ...editOrder, subtotal: value, tax, total: value + tax });
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.subtotal, 0);
  const totalTax = orders.reduce((sum, o) => sum + o.tax, 0);
  const totalIncTax = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">
            Total Revenue (Pre-Tax)
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">
            Total Sales Tax Collected
          </h3>
          <p className="text-3xl font-bold text-green-600">
            ${totalTax.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">
            Total Revenue (Inc. Tax)
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            ${totalIncTax.toFixed(2)}
          </p>
        </div>
      </div>

      <SearchBar
        placeholder="Search by customer, order ID, or jurisdiction..."
        value={search}
        onChange={setSearch}
      />
      <div className="mt-4">
        <OrdersTable
          orders={filtered}
          onEdit={setEditOrder}
          onDelete={setConfirmDelete}
        />
      </div>

      <Window
        isOpen={!!editOrder}
        onClose={() => setEditOrder(null)}
        onSave={saveEdit}
        title="Edit Order"
      >
        {editOrder && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Order ID
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editOrder.orderID}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, orderID: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Customer
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editOrder.customer}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, customer: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Kit</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editOrder.kit}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, kit: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdiction
              </label>
              <select
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editOrder.jurisdiction}
                onChange={(e) =>
                  setEditOrder({ ...editOrder, jurisdiction: e.target.value })
                }
              >
                {mockJurisdictions.map((j) => (
                  <option key={j.id} value={j.name}>
                    {j.name} {j.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Subtotal
              </label>
              <input
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editOrder.subtotal}
                onChange={(e) => updateSubtotal(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Total</label>
              <input
                readOnly
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500"
                value={(editOrder.subtotal + editOrder.tax).toFixed(2)}
              />
            </div>
          </div>
        )}
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          setOrders(orders.filter((o) => o.orderID !== confirmDelete?.orderID));
          setConfirmDelete(null);
        }}
        name={confirmDelete?.orderID ?? ""}
        type="Order"
      />
    </div>
  );
}
