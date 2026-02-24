import { OrderInfo } from "../ui/OrdersTable";
//mock data for checking, delete later
export const mockOrders: OrderInfo[] = [
  {
    orderID: "10234",
    orderTime: "2026-02-24 14:30",
    customer: "Sarah Jenkins",
    kit: "Premium Wellness",
    jurisdiction: "New York City",
    subtotal: 100.0,
    taxRate: 8.875,
    tax: 8.88,
    total: 108.88,
    status: "Delivered",
  },
  {
    orderID: "10235",
    orderTime: "2026-02-24 15:05",
    customer: "Michael Chen",
    kit: "Basic Kit",
    jurisdiction: "Albany",
    subtotal: 50.0,
    taxRate: 8.0,
    tax: 4.0,
    total: 54.0,
    status: "Pending",
  },
];
