import { Order } from "../../types/Orders.types";
interface OrdersTableProps {
    orders: Order[];
    limit?: number;
    onEdit?: (order: Order) => void;
    onDelete?: (order: Order) => void;
    onStatusChange?: (orderId: number, newStatus: string) => void;
    sortBy: string;
    sortOrder: "ASC" | "DESC";
    onSort: (column: string) => void;
}
export default function OrdersTable({ orders, limit, onEdit, onDelete, onStatusChange, sortBy, sortOrder, onSort, }: OrdersTableProps): import("react").JSX.Element;
export {};
