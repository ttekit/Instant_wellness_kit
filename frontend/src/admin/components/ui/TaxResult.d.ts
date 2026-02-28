import { TaxRateResult } from "../../types/TaxLookup.types";
interface TaxResultProp {
    hasData: boolean;
    taxResult: TaxRateResult | null;
}
export default function TaxResult({ hasData, taxResult }: TaxResultProp): import("react").JSX.Element;
export {};
