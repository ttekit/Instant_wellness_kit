interface WindowProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    description?: string;
    saveText?: string;
    children: React.ReactNode;
}
export default function Window({ isOpen, onClose, onSave, title, description, saveText, children, }: WindowProps): import("react").JSX.Element | null;
export {};
