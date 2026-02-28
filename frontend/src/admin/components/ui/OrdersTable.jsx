import OrderDropdownMenu from "./OrderDropdownMenu";
import Status from "./Status";
import { useState } from "react";
export default function OrdersTable({ orders, limit, onEdit, onDelete, onStatusChange, sortBy, sortOrder, onSort, }) {
    const [deletedIds, setDeletedIds] = useState([]);
    const handleDelete = (order) => {
        if (onDelete) {
            onDelete(order);
            return;
        }
        setDeletedIds([...deletedIds, order.id]);
    };
    const displayData = orders
        .filter((order) => !deletedIds.includes(order.id))
        .slice(0, limit)
        .map((order) => {
        const subtotal = parseFloat(order.subtotal || "0");
        const taxRate = parseFloat(order.composite_tax_rate || "0") * 100;
        const taxAmount = parseFloat(order.tax_amount || "0");
        const totalAmount = parseFloat(order.total_amount || "0");
        const customer = order.customerName || "N/A";
        const kit = order.orderPackage?.package || "N/A";
        const jurisdiction = order.jurisdictions?.[0]?.jurisdiction?.name || "N/A";
        const status = order.status;
        return {
            ...order,
            displaySubtotal: subtotal,
            displayTaxRate: taxRate,
            displayTaxAmount: taxAmount,
            displayTotalAmount: totalAmount,
            displayCustomer: customer,
            displayKit: kit,
            displayJurisdiction: jurisdiction,
            displayStatus: status,
        };
    });
    return (<div className="bg-white rounded-xl border border-gray-200 overflow-auto h-[300px]">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
          <tr>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("id")} className="flex items-center gap-1">
                Order ID
                {sortBy === "id" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("customerName")} className="flex items-center gap-1">
                Customer
                {sortBy === "customerName" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("package.package")} className="flex items-center gap-1">
                Kit
                {sortBy === "package.package" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("jurisdictions.name")} className="flex items-center gap-1">
                Jurisdiction
                {sortBy === "jurisdictions.name" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("subtotal")} className="flex items-center gap-1">
                Subtotal
                {sortBy === "subtotal" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">Tax Rate</th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("tax_amount")} className="flex items-center gap-1">
                Tax
                {sortBy === "tax_amount" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("total_amount")} className="flex items-center gap-1">
                Total
                {sortBy === "total_amount" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium">
              <button onClick={() => onSort("status")} className="flex items-center gap-1">
                Status
                {sortBy === "status" && (<span>{sortOrder === "ASC" ? "↑" : "↓"}</span>)}
              </button>
            </th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayData.map((order) => (<tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">
                {order.id}
              </td>
              <td className="px-4 py-3 text-gray-900">
                {order.displayCustomer}
              </td>
              <td className="px-4 py-3 text-gray-600">{order.displayKit}</td>
              <td className="px-4 py-3 text-gray-600">
                {order.displayJurisdiction}
              </td>
              <td className="px-4 py-3 text-gray-900">
                ${order.displaySubtotal.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {order.displayTaxRate.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-gray-600">
                ${order.displayTaxAmount.toFixed(2)}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                ${order.displayTotalAmount.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                <Status stat={order.displayStatus}/>
              </td>

              <td>
                <OrderDropdownMenu order={order} onEdit={onEdit} onDelete={handleDelete} onStatusChange={onStatusChange}/>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>);
}
//# sourceMappingURL=OrdersTable.jsx.map