export interface TaxRateResult {
  jurisdiction: string;
  stateTaxRate: number;
  countyTaxRate: number;
  cityTaxRate: number;
  mctdTaxRate: number;
  totalTaxRate: number;
  taxAmount: number | null; // Null if kitPrice is not provided
  totalAmount: number | null; // Null if kitPrice is not provided
}

export interface TaxLookupResponse {
  message: string;
  data: TaxRateResult;
}