export default function ConfirmDelete({ isOpen, onClose, onConfirm, name, type, }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name: string;
    type: string;
}): import("react").JSX.Element | null;
