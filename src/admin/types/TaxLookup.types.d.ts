export interface TaxRateResult {
    jurisdiction: string;
    stateTaxRate: number;
    countyTaxRate: number;
    cityTaxRate: number;
    mctdTaxRate: number;
    totalTaxRate: number;
    taxAmount: number | null;
    totalAmount: number | null;
}
export interface TaxLookupResponse {
    message: string;
    data: TaxRateResult;
}
