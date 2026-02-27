import { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import OrdersTable, { OrderInfo } from "../components/ui/OrdersTable";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";
import { Jurisdiction, DBOrder } from "../types";



export default function Orders() {
  const [search, setSearch] = useState<string>("");
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [jurisdictions, setJurisdictions] = useState<Jurisdiction[]>([]);
  const [editOrder, setEditOrder] = useState<OrderInfo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<OrderInfo | null>(null);

  const fetchOrders = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(import.meta.env.VITE_API_ORDERS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data: DBOrder[] = await response.json();
        const formatted: OrderInfo[] = data.map((o) => ({
          orderID: String(o.id),
          customer: o.user?.name || o.user?.email || `User #${o.userId}`,
          kit: "Wellness Kit",
          jurisdiction: o.jurisdictions[0]?.jurisdiction.name || "N/A",
          status: "Delivered",
          subtotal: Number(o.subtotal),
          taxRate: Number(o.composite_tax_rate) * 100,
          tax: Number(o.tax_amount),
          total: Number(o.total_amount)
        }));
        setOrders(formatted);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchJurisdictions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(import.meta.env.VITE_API_JURISDICTIONS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data: Jurisdiction[] = await response.json();
          setJurisdictions(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
    fetchJurisdictions();
  }, []);

  const filtered = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.orderID.includes(search)
  );

  const saveEdit = async (): Promise<void> => {
    if (!editOrder) return;
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${import.meta.env.VITE_API_ORDERS_URL}/${editOrder.orderID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subtotal: editOrder.subtotal,
          tax_amount: editOrder.tax,
          total_amount: editOrder.total
        })
      });
      if (res.ok) {
        fetchOrders();
        setEditOrder(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteOrder = async (): Promise<void> => {
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${import.meta.env.VITE_API_ORDERS_URL}/${confirmDelete.orderID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(orders.filter(o => o.orderID !== confirmDelete.orderID));
        setConfirmDelete(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateSubtotal = (val: number) => {
    if (!editOrder) return;
    const tax = Number((val * (editOrder.taxRate / 100)).toFixed(2));
    setEditOrder({ ...editOrder, subtotal: val, tax, total: val + tax });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">${orders.reduce((s, o) => s + o.subtotal, 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Tax Collected</h3>
          <p className="text-3xl font-bold text-green-600">${orders.reduce((s, o) => s + o.tax, 0).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Total (Inc. Tax)</h3>
          <p className="text-3xl font-bold text-gray-900">${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}</p>
        </div>
      </div>

      <SearchBar placeholder="Search orders..." value={search} onChange={setSearch} />

      <div className="mt-4">
        <OrdersTable orders={filtered} onEdit={setEditOrder} onDelete={setConfirmDelete} />
      </div>

      <Window isOpen={!!editOrder} onClose={() => setEditOrder(null)} onSave={saveEdit} title="Edit Order">
        {editOrder && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Customer</label>
              <input readOnly className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" value={editOrder.customer} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Subtotal</label>
              <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editOrder.subtotal} onChange={(e) => updateSubtotal(Number(e.target.value))} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Total (Inc. Tax)</label>
              <input readOnly className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50" value={editOrder.total.toFixed(2)} />
            </div>
          </div>
        )}
      </Window>

      <ConfirmDelete isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)}
        onConfirm={deleteOrder} name={confirmDelete?.orderID ?? ""} type="Order" />
    </div>
  );
}