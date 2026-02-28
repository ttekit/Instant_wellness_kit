interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}
export default function SearchBar({ placeholder, value, onChange, }: SearchBarProps): import("react").JSX.Element;
export {};
