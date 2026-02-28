import { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
export default function Jurisdictions() {
    const [search, setSearch] = useState("");
    const [jurisdictions, setJurisdictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchJurisdictions = async () => {
            try {
                const response = await fetch('http://localhost:4200/jurisdictions');
                if (!response.ok)
                    throw new Error('Network error');
                const data = await response.json();
                const formattedData = data.map((jur) => {
                    const rates = jur.tax_rates?.[0] || {};
                    return {
                        id: jur.id,
                        name: jur.name,
                        type: jur.type,
                        fips: jur.fipsCode,
                        stateRate: Number(rates.rate || 0),
                        localRate: Number(rates.local_rate || 0),
                        mctd: rates.mctd !== null && rates.mctd !== undefined ? Number(rates.mctd) : null,
                        composite: Number(rates.composite || 0),
                    };
                });
                setJurisdictions(formattedData);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchJurisdictions();
    }, []);
    const filtered = jurisdictions.filter((jur) => jur.name.toLowerCase().includes(search.toLowerCase()));
    const mctdCount = jurisdictions.filter((j) => j.mctd !== null).length;
    const total = jurisdictions.reduce((sum, j) => sum + j.composite, 0);
    const avg = jurisdictions.length > 0 ? total / jurisdictions.length : 0;
    const ratesList = jurisdictions.map((j) => j.composite);
    const min = ratesList.length > 0 ? Math.min(...ratesList) : 0;
    const max = ratesList.length > 0 ? Math.max(...ratesList) : 0;
    return (<div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Total Jurisdictions</h3>
          <p className="text-3xl font-bold text-gray-900">{jurisdictions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Average Composite Rate</h3>
          <p className="text-3xl font-bold text-gray-900">{avg.toFixed(3)}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Rate Range</h3>
          <p className="text-3xl font-bold text-gray-900">
            {min.toFixed(3)}% - {max.toFixed(3)}%
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center h-28">
          <h3 className="text-sm text-gray-500 font-medium mb-2">MCTD Jurisdictions</h3>
          <p className="text-3xl font-bold text-gray-900">{mctdCount}</p>
        </div>
      </div>

      <SearchBar placeholder="Search jurisdictions..." value={search} onChange={setSearch}/>

      <div className="mt-4 bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          {isLoading ? (<div className="flex justify-center items-center h-32 text-gray-500">
              Loading...
            </div>) : (<table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-white border-b border-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-4 font-medium">Jurisdiction</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">FIPS Code</th>
                  <th className="px-6 py-4 font-medium">State Rate</th>
                  <th className="px-6 py-4 font-medium">Local Rate</th>
                  <th className="px-6 py-4 font-medium">MCTD</th>
                  <th className="px-6 py-4 font-medium">Composite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((jur) => (<tr key={jur.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{jur.name}</td>
                    <td className="px-6 py-4">{jur.type}</td>
                    <td className="px-6 py-4">{jur.fips}</td>
                    <td className="px-6 py-4">{jur.stateRate.toFixed(3)}%</td>
                    <td className="px-6 py-4">{jur.localRate.toFixed(3)}%</td>
                    <td className="px-6 py-4">
                      {jur.mctd !== null ? jur.mctd.toFixed(3) + "%" : "-"}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-bold">
                      {jur.composite.toFixed(3)}%
                    </td>
                  </tr>))}
              </tbody>
            </table>)}
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=Jurisdictions.jsx.map