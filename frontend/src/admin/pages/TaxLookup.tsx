import { useState } from "react";
import { MapPin, Info } from "lucide-react";
import TaxCalc from "../components/ui/TaxCalc";
import TaxResult from "../components/ui/TaxResult";

export default function TaxLookup() {
  const [hasData, setHasData] = useState(false);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-green-50/50 border border-green-100 rounded-xl p-4 flex gap-3 mb-6">
        <Info className="text-green-600 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-gray-800 leading-relaxed">
          <strong>How it works:</strong> Enter the GPS coordinates (latitude &
          longitude) of the delivery location. The system will reverse-geocode
          the coordinates to determine the county/city within New York State,
          then apply the correct composite sales tax rate (state + local + MCTD
          surcharge if applicable).
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <TaxCalc onSearch={() => setHasData(true)} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} className="text-gray-800" />
            <h2 className="text-lg font-bold text-gray-900">Tax Breakdown</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6"></p>
          <TaxResult hasData={hasData} />
        </div>
      </div>
    </div>
  );
}
