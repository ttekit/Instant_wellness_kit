interface DropdownProps {
    order: OrderInfo;
    onDelete: () => void;
    onChangeStatus: (newStatus: string) => void;
    onEdit?: () => void;
    unblockStatus?: string;
}
export default function DropdownMenu({ order, onDelete, onChangeStatus, onEdit, unblockStatus, }: DropdownProps): import("react").JSX.Element;
export {};
