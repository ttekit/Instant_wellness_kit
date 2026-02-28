import { Calculator, Search } from "lucide-react";
import { useState } from "react";

interface CalcProp {
  onSearch: (latitude: number | null, longitude: number | null, kitPrice: number | null) => void;
  compact?: boolean;
}

export default function TaxCalc({ onSearch, compact = false }: CalcProp) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [kitPrice, setKitPrice] = useState<number | null>(null);

  const handleSearch = () => {
    onSearch(latitude, longitude, kitPrice);
  };

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
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-900 mb-1">
            Latitude
          </label>
          <input
            id="latitude"
            type="number"
            placeholder="e.g. 42.0124"
            value={latitude === null ? '' : latitude}
            onChange={(e) => setLatitude(e.target.value === '' ? null : parseFloat(e.target.value))}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-900 mb-1">
            Longitude
          </label>
          <input
            id="longitude"
            type="number"
            placeholder="e.g. -78.8672"
            value={longitude === null ? '' : longitude}
            onChange={(e) => setLongitude(e.target.value === '' ? null : parseFloat(e.target.value))}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </div>
      {!compact && (
        <div className="mb-6">
          <label htmlFor="kitPrice" className="block text-sm font-medium text-gray-900 mb-1">
            Kit Price ($){" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="kitPrice"
            type="number"
            placeholder="e.g. 34.99"
            value={kitPrice === null ? '' : kitPrice}
            onChange={(e) => setKitPrice(e.target.value === '' ? null : parseFloat(e.target.value))}
            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        <button
          onClick={handleSearch}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
        >
          <Search size={16} />
          Look Up Tax Rate
        </button>
      </div>
    </div>
  );
}
