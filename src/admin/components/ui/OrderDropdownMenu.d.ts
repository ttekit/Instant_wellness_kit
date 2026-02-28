import { Order } from "../../types/Orders.types";
interface OrderDropdownProps {
    order: Order;
    onDelete: (order: Order) => void;
    onEdit?: (order: Order) => void;
    onStatusChange?: (orderId: number, newStatus: string) => void;
}
export default function OrderDropdownMenu({ order, onDelete, onEdit, onStatusChange, }: OrderDropdownProps): import("react").JSX.Element;
export {};
