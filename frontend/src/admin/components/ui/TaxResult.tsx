import { ReceiptText } from "lucide-react";

interface TaxResultProp {
  hasData: boolean;
}

export default function TaxResult({ hasData }: TaxResultProp) {
  if (!hasData) {
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
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 w-full mt-6 flex items-center justify-center">
      <p className="text-sm text-gray-500"></p>
    </div>
  );
}
