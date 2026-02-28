import { Product } from "../../types";
type ProductDropdownMenuProps = {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onChangeStatus: (id: number, newStatus: Product["status"]) => void;
};
export default function ProductDropdownMenu({ product, onEdit, onDelete, onChangeStatus, }: ProductDropdownMenuProps): import("react").JSX.Element;
export {};
