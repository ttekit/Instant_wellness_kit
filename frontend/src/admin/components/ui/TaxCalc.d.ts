interface CalcProp {
    onSearch: (latitude: number | null, longitude: number | null, kitPrice: number | null) => void;
    compact?: boolean;
}
export default function TaxCalc({ onSearch, compact }: CalcProp): import("react").JSX.Element;
export {};
