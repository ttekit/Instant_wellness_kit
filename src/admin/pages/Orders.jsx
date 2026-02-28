import { useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import OrdersTable from "../components/ui/OrdersTable";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";
export default function Orders() {
    const [search, setSearch] = useState("");
    const [orders, setOrders] = useState([]);
    const [jurisdictions, setJurisdictions] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJurisdictionToAdd, setSelectedJurisdictionToAdd] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("ASC");
    const [totalOrdersCount, setTotalOrdersCount] = useState(0);
    useEffect(() => {
        const fetchOrdersAndJurisdictions = async () => {
            try {
                const ordersResponse = await fetch(`http://localhost:4200/orders/details?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
                if (!ordersResponse.ok) {
                    throw new Error(`HTTP error! status: ${ordersResponse.status}`);
                }
                const responseData = await ordersResponse.json();
                setOrders(responseData.data || []);
                setTotalOrdersCount(responseData.totalCount || 0);
                const jurisdictionResponse = await fetch("http://localhost:4200/jurisdictions");
                if (!jurisdictionResponse.ok) {
                    throw new Error(`HTTP error! status: ${jurisdictionResponse.status}`);
                }
                const jurisdictionData = await jurisdictionResponse.json();
                setJurisdictions(jurisdictionData);
            }
            catch (e) {
                setError(e.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrdersAndJurisdictions();
    }, [currentPage, itemsPerPage, sortBy, sortOrder]);
    const handleAddJurisdiction = () => {
        if (!editOrder || !selectedJurisdictionToAdd)
            return;
        const newJurisdiction = jurisdictions.find((j) => j.id === selectedJurisdictionToAdd);
        if (newJurisdiction &&
            !editOrder.jurisdictions.some((oj) => oj.jurisdiction.id === newJurisdiction.id)) {
            setEditOrder({
                ...editOrder,
                jurisdictions: [
                    ...editOrder.jurisdictions,
                    {
                        order_id: editOrder.id,
                        jurisdiction_id: newJurisdiction.id,
                        jurisdiction: newJurisdiction,
                    },
                ],
            });
            setSelectedJurisdictionToAdd("");
        }
    };
    const handleRemoveJurisdiction = (jurisdictionId) => {
        if (!editOrder)
            return;
        setEditOrder({
            ...editOrder,
            jurisdictions: editOrder.jurisdictions.filter((oj) => oj.jurisdiction.id !== jurisdictionId),
        });
    };
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4200/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedOrder = await response.json();
            setOrders((prevOrders) => prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
        }
        catch (e) {
            setError(e.message);
        }
    };
    const filtered = orders.filter((order) => {
        const s = search.toLowerCase();
        const jurisdictionName = order.jurisdictions?.[0]?.jurisdiction?.name || "";
        return (String(order.id).toLowerCase().includes(s) ||
            jurisdictionName.toLowerCase().includes(s));
    });
    const saveEdit = async () => {
        if (!editOrder)
            return;
        try {
            const response = await fetch(`http://localhost:4200/orders/${editOrder.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subtotal: parseFloat(editOrder.subtotal),
                    composite_tax_rate: parseFloat(editOrder.composite_tax_rate),
                    tax_amount: parseFloat(editOrder.tax_amount),
                    total_amount: parseFloat(editOrder.total_amount),
                    jurisdictions: editOrder.jurisdictions.map((oj) => ({
                        jurisdiction_id: oj.jurisdiction.id,
                        order_id: oj.order_id,
                    })),
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedOrder = await response.json();
            setOrders(orders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
            setEditOrder(null);
        }
        catch (e) {
            setError(e.message);
        }
    };
    const updateSubtotal = (value) => {
        if (!editOrder)
            return;
        const currentTaxRate = parseFloat(editOrder.composite_tax_rate || "0");
        const newTaxAmount = value * currentTaxRate;
        const newTotalAmount = value + newTaxAmount;
        setEditOrder({
            ...editOrder,
            subtotal: String(value),
            tax_amount: newTaxAmount.toFixed(2),
            total_amount: newTotalAmount.toFixed(2),
        });
    };
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.subtotal || "0"), 0);
    const totalTax = orders.reduce((sum, o) => sum + parseFloat(o.tax_amount || "0"), 0);
    const totalIncTax = orders.reduce((sum, o) => sum + parseFloat(o.total_amount || "0"), 0);
    return (<div className="p-8 bg-gray-50 min-h-screen">
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

      {loading && (<div className="p-8 text-center text-gray-600">Loading orders...</div>)}
      {error && (<div className="p-8 text-center text-red-600">Error: {error}</div>)}

      {!loading && !error && (<>
          <SearchBar placeholder="Search by order ID, or jurisdiction..." value={search} onChange={setSearch}/>
          <div className="mt-4">
            <OrdersTable orders={filtered} onEdit={setEditOrder} onDelete={setConfirmDelete} onStatusChange={handleStatusChange} sortBy={sortBy} sortOrder={sortOrder} onSort={(column) => {
                if (column === sortBy) {
                    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
                }
                else {
                    setSortBy(column);
                    setSortOrder("ASC");
                }
            }}/>
            
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(totalOrdersCount / itemsPerPage) || 1}
              </span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalOrdersCount / itemsPerPage) || 1))} disabled={currentPage === (Math.ceil(totalOrdersCount / itemsPerPage) || 1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300">
                Next
              </button>
            </div>
          </div>

          <Window isOpen={!!editOrder} onClose={() => setEditOrder(null)} onSave={saveEdit} title={`Edit Order #${editOrder?.id}`}>
            {editOrder && (<div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="editOrderId" className="text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <input id="editOrderId" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" value={editOrder.id} readOnly/>
                </div>
                <div>
                  <label htmlFor="editCustomer" className="text-sm font-medium text-gray-700">
                    Customer
                  </label>
                  <input id="editCustomer" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editOrder.customerName || "N/A"} readOnly/>
                </div>
                <div>
                  <label htmlFor="editKit" className="text-sm font-medium text-gray-700">
                    Kit
                  </label>
                  <input id="editKit" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editOrder.orderPackage?.package || "N/A"} readOnly/>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Assigned Jurisdictions
                  </label>
                  <div className="mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50 max-h-24 overflow-y-auto">
                    {editOrder.jurisdictions &&
                    editOrder.jurisdictions.length > 0 ? (<ul className="list-none space-y-1">
                        {editOrder.jurisdictions.map((orderJurisdiction) => (<li key={orderJurisdiction.jurisdiction.id} className="flex justify-between items-center text-sm text-gray-700">
                            <span>{orderJurisdiction.jurisdiction.name}</span>
                            <button type="button" onClick={() => handleRemoveJurisdiction(orderJurisdiction.jurisdiction.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">
                              Remove
                            </button>
                          </li>))}
                      </ul>) : (<p className="text-sm text-gray-500">
                        No jurisdictions assigned
                      </p>)}
                  </div>
                </div>
                <div>
                  <label htmlFor="addJurisdiction" className="text-sm font-medium text-gray-700">
                    Add Jurisdiction
                  </label>
                  <div className="mt-1 flex gap-2">
                    <select id="addJurisdiction" className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-sm" value={selectedJurisdictionToAdd} onChange={(e) => setSelectedJurisdictionToAdd(Number(e.target.value))} disabled={jurisdictions.length === 0}>
                      <option value="">Select Jurisdiction</option>
                      {jurisdictions
                    .filter((j) => !editOrder.jurisdictions.some((oj) => oj.jurisdiction.id === j.id))
                    .map((j) => (<option key={j.id} value={j.id}>
                            {j.name}
                          </option>))}
                    </select>
                    <button type="button" onClick={handleAddJurisdiction} disabled={!selectedJurisdictionToAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300">
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="editSubtotal" className="text-sm font-medium text-gray-700">
                    Subtotal
                  </label>
                  <input id="editSubtotal" type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={parseFloat(editOrder.subtotal || "0")} onChange={(e) => updateSubtotal(Number(e.target.value))}/>
                </div>
                <div>
                  <label htmlFor="editTaxAmount" className="text-sm font-medium text-gray-700">
                    Tax Amount
                  </label>
                  <input id="editTaxAmount" readOnly className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" value={parseFloat(editOrder.tax_amount || "0").toFixed(2)}/>
                </div>
                <div>
                  <label htmlFor="editTotalAmount" className="text-sm font-medium text-gray-700">
                    Total
                  </label>
                  <input id="editTotalAmount" readOnly className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-500" value={parseFloat(editOrder.total_amount || "0").toFixed(2)}/>
                </div>
              </div>)}
          </Window>
          <ConfirmDelete isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={async () => {
                if (!confirmDelete)
                    return;
                try {
                    const response = await fetch(`http://localhost:4200/orders/${confirmDelete.id}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    setOrders(orders.filter((o) => o.id !== confirmDelete.id));
                    setConfirmDelete(null);
                }
                catch (e) {
                    setError(e.message);
                }
            }} name={`Order ${confirmDelete?.id}`} type="Order"/>
        </>)}
    </div>);
}
//# sourceMappingURL=Orders.jsx.map