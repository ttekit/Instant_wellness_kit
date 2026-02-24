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
  orderTime: string;
}

interface OrderTable {
  orders: OrderInfo[];
  limit?: number;
}

export default function OrdersTable({ orders, limit }: OrderTable) {
  const [tableData, setTableData] = useState(orders.slice(0, limit));

  const handleDelete = (orderID: string) => {
    setTableData(tableData.filter((order) => order.orderID !== orderID));
  };

  const statusChange = (orderID: string, newStatus: string) => {
    setTableData(
      tableData.map((order) =>
        order.orderID === orderID ? { ...order, status: newStatus } : order,
      ),
    );
  };

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
            <th className="px-4 py-3 font-medium">Time of Order</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableData.map((order) => (
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
              <td className="px-4 py-3 text-gray-600">{order.orderTime}</td>

              <td>
                <DropdownMenu
                  order={order}
                  onDelete={() => handleDelete(order.orderID)}
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
