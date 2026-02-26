import { Calculator, Search } from "lucide-react";

interface CalcProp {
  onSearch: () => void;
  compact?: boolean;
}

export default function TaxCalc({ onSearch, compact = false }: CalcProp) {
  return (
    <div className="flex flex-col h-full">
      {!compact && (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Calculator size={20} className="text-gray-800" />
            <h2 className="text-lg font-bold text-gray-900">
              Tax Rate Calculator
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Enter delivery coordinates to find the applicable composite sales
            tax rate
          </p>
        </>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Latitude
          </label>
          <input
            type="number"
            placeholder="e.g. 42.0124"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Longitude
          </label>
          <input
            type="number"
            placeholder="e.g. -78.8672"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </div>
      {!compact && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-1">
            Kit Price ($){" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 34.99"
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        <button
          onClick={onSearch}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <Search size={16} />
          Look Up Tax Rate
        </button>
      </div>
    </div>
  );
}
