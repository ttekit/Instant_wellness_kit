import { ReceiptText } from "lucide-react";
import { TaxRateResult } from "../../types/TaxLookup.types";

interface TaxResultProp {
  hasData: boolean;
  taxResult: TaxRateResult | null;
}

export default function TaxResult({ hasData, taxResult }: TaxResultProp) {
  if (!hasData || !taxResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 py-4">
        <ReceiptText size={48} strokeWidth={1} className="mb-4 text-gray-300" />
        <p className="text-sm max-w-[250px]">
          Enter coordinates and click "Look Up Tax Rate" to see the breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-700">
        <p>State Tax Rate:</p>
        <p className="font-medium text-right">{taxResult.stateTaxRate.toFixed(3)}%</p>

        <p>County Tax Rate:</p>
        <p className="font-medium text-right">{taxResult.countyTaxRate.toFixed(3)}%</p>

        <p>City Tax Rate:</p>
        <p className="font-medium text-right">{taxResult.cityTaxRate.toFixed(3)}%</p>

        <p>MCTD Tax Rate:</p>
        <p className="font-medium text-right">{taxResult.mctdTaxRate.toFixed(3)}%</p>

        <p className="font-bold text-gray-900">Total Tax Rate:</p>
        <p className="font-bold text-gray-900 text-right">{taxResult.totalTaxRate.toFixed(3)}%</p>

        {taxResult.taxAmount !== null && (
          <>
            <p>Estimated Tax:</p>
            <p className="font-medium text-right">${taxResult.taxAmount.toFixed(2)}</p>

            <p className="font-bold text-gray-900">Estimated Total:</p>
            <p className="font-bold text-gray-900 text-right">${taxResult.totalAmount?.toFixed(2)}</p>
          </>
        )}
      </div>
    </div>
  );
}
