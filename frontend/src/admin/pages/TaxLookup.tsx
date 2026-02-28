import { useState } from "react";
import { MapPin, Info } from "lucide-react";
import TaxCalc from "../components/ui/TaxCalc";
import TaxResult from "../components/ui/TaxResult";
import { TaxLookupResponse, TaxRateResult } from "../types/TaxLookup.types";

export default function TaxLookup() {
  const [taxRateResult, setTaxRateResult] = useState<TaxRateResult | null>(
    null,
  );
  const [jurisdictionResult, setJurisdictionResult] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (
    latitude: number | null,
    longitude: number | null,
    kitPrice: number | null,
  ) => {
    if (
      latitude === null ||
      isNaN(latitude) ||
      longitude === null ||
      isNaN(longitude)
    ) {
      setError("Please enter valid latitude and longitude.");
      setTaxRateResult(null);
      setJurisdictionResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setTaxRateResult(null);
    setJurisdictionResult(null);

    try {
      let url = `http://localhost:4200/tax-rates/lookup?latitude=${latitude.toString()}&longitude=${longitude.toString()}`;
      if (kitPrice !== null && !isNaN(kitPrice)) {
        url += `&kitPrice=${kitPrice.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }
      const data: TaxLookupResponse = await response.json();
      setTaxRateResult(data.data);
      setJurisdictionResult(data.data.jurisdiction);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

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
          <TaxCalc onSearch={handleSearch} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} className="text-gray-800" />
            <h2 className="text-lg font-bold text-gray-900">Tax Breakdown</h2>
          </div>
          {loading && (
            <p className="text-sm text-gray-500 mb-6">Loading tax rates...</p>
          )}
          {error && <p className="text-sm text-red-600 mb-6">Error: {error}</p>}
          <p className="text-sm text-gray-500 mb-6">
            {jurisdictionResult && `Jurisdiction: ${jurisdictionResult}`}
          </p>
          <TaxResult hasData={!!taxRateResult} taxResult={taxRateResult} />
        </div>
      </div>
    </div>
  );
}
