import { ReceiptText } from "lucide-react";

interface TaxResultProp {
  hasData: boolean;
  taxResult: any;
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

  const stateRate = taxResult.stateTaxRate ?? taxResult.breakdown?.state ?? 0;
  const countyRate = taxResult.countyTaxRate ?? taxResult.breakdown?.local ?? 0;
  const cityRate = taxResult.cityTaxRate ?? 0;
  const mctdRate = taxResult.mctdTaxRate ?? taxResult.breakdown?.mctd ?? 0;
  const totalRate = taxResult.totalTaxRate ?? taxResult.rate ?? taxResult.breakdown?.composite ?? 0;

  const taxAmt = taxResult.taxAmount ?? taxResult.estimatedTax;
  const totalAmt = taxResult.totalAmount;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-700">
        <p>State Tax Rate:</p>
        <p className="font-medium text-right">{Number(stateRate).toFixed(3)}%</p>

        <p>County Tax Rate:</p>
        <p className="font-medium text-right">{Number(countyRate).toFixed(3)}%</p>

        <p>City Tax Rate:</p>
        <p className="font-medium text-right">{Number(cityRate).toFixed(3)}%</p>

        <p>MCTD Tax Rate:</p>
        <p className="font-medium text-right">{Number(mctdRate).toFixed(3)}%</p>

        <p className="font-bold text-gray-900">Total Tax Rate:</p>
        <p className="font-bold text-gray-900 text-right">{Number(totalRate).toFixed(3)}%</p>

        {taxAmt !== null && taxAmt !== undefined && (
          <>
            <p>Estimated Tax:</p>
            <p className="font-medium text-right">${Number(taxAmt).toFixed(2)}</p>

            <p className="font-bold text-gray-900">Estimated Total:</p>
            <p className="font-bold text-gray-900 text-right">${Number(totalAmt).toFixed(2)}</p>
          </>
        )}
      </div>
    </div>
  );
}
