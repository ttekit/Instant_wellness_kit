import DropdownMenu from "./DropdownMenu";
import Status from "./Status";
import { useState } from "react";

export interface OrderInfo {
  orderID: string;
  customer: string;
  kit: string;
  jurisdiction: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  total: number;
  status: string;
}

interface OrderTable {
  orders: OrderInfo[];
  limit?: number;
  onEdit?: (order: OrderInfo) => void;
  onDelete?: (order: OrderInfo) => void;
}

export default function OrdersTable({
  orders,
  limit,
  onEdit,
  onDelete,
}: OrderTable) {
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [statusMap, setStatusMap] = useState<{ [id: string]: string }>({});

  const handleDelete = (order: OrderInfo) => {
    if (onDelete) {
      onDelete(order);
      return;
    }
    setDeletedIds([...deletedIds, order.orderID]);
  };

  const statusChange = (orderID: string, newStatus: string) => {
    setStatusMap({ ...statusMap, [orderID]: newStatus });
  };

  const displayData = orders
    .filter((order) => !deletedIds.includes(order.orderID))
    .slice(0, limit)
    .map((order) => {
      if (statusMap[order.orderID]) {
        return { ...order, status: statusMap[order.orderID] };
      }
      return order;
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
            <tr key={order.orderID} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">
                {order.orderID}
              </td>
              <td className="px-4 py-3 text-gray-900">{order.customer}</td>
              <td className="px-4 py-3 text-gray-600">{order.kit}</td>
              <td className="px-4 py-3 text-gray-600">{order.jurisdiction}</td>
              <td className="px-4 py-3 text-gray-900">
                ${order.subtotal.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-gray-600">{order.taxRate}%</td>
              <td className="px-4 py-3 text-gray-600">
                ${order.tax.toFixed(2)}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                ${order.total.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                <Status stat={order.status} />
              </td>

              <td>
                <DropdownMenu
                  order={order}
                  onEdit={() => onEdit?.(order)}
                  onDelete={() => handleDelete(order)}
                  onChangeStatus={(newStatus) =>
                    statusChange(order.orderID, newStatus)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
