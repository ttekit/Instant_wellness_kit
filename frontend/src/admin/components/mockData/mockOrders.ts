import { OrderInfo } from "../ui/OrdersTable";

export const mockOrders: OrderInfo[] = [
  {
    orderID: "10234",
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
