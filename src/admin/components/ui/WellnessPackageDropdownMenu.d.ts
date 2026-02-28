interface WellnessPackageDropdownProps {
    packageStatus: string;
    onDelete: () => void;
    onEdit?: () => void;
    onBlock: () => void;
    onUnblock: () => void;
}
export default function WellnessPackageDropdownMenu({ packageStatus, onDelete, onEdit, onBlock, onUnblock, }: WellnessPackageDropdownProps): import("react").JSX.Element;
export {};
