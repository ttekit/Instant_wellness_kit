import OrderDropdownMenu from "./OrderDropdownMenu";
import Status from "./Status";
import { useState } from "react";
import { Order } from "../../types/Orders.types";

interface OrdersTableProps {
  orders: Order[];
  limit?: number;
  onEdit?: (order: Order) => void;
  onDelete?: (order: Order) => void;
  onStatusChange?: (orderId: number, newStatus: string) => void;
}

export default function OrdersTable({
  orders,
  limit,
  onEdit,
  onDelete,
  onStatusChange,
}: OrdersTableProps) {
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  const handleDelete = (order: Order) => {
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

      const jurisdiction =
        order.jurisdictions?.[0]?.jurisdiction?.name || "N/A";
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-auto h-[300px]">
      <table className="w-full text-sm text-left whitespace-nowrap">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
          <tr>
            <th className="px-4 py-3 font-medium">Order ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Kit</th>
            <th className="px-4 py-3 font-medium">Jurisdiction</th>
            <th className="px-4 py-3 font-medium">Subtotal</th>
            <th className="px-4 py-3 font-medium">Tax Rate</th>
            <th className="px-4 py-3 font-medium">Tax</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayData.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
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
                <Status stat={order.displayStatus} />
              </td>

              <td>
                <OrderDropdownMenu
                  order={order}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                  onStatusChange={onStatusChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
