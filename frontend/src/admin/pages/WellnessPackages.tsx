import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import DropdownMenu from "../components/ui/DropdownMenu";
import Window from "../components/ui/Window";
import { WellnessPackage, Jurisdiction, Product } from "../types";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const emptyPackage: WellnessPackage = {
  id: "",
  name: "",
  description: "",
  price: 0,
  taxRate: "auto",
  status: "Available",
  jurisdictionIds: [],
  productIds: [],
};

export default function WellnessPackages() {
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState<WellnessPackage[]>([]);
  const [jurisdictions] = useState<Jurisdiction[]>([]);
  const [products] = useState<Product[]>([]);
  const [editPkg, setEditPkg] = useState<WellnessPackage | null>(null);
  const [newPkg, setNewPkg] = useState<WellnessPackage>(emptyPackage);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<WellnessPackage | null>(
    null,
  );

  const filtered = packages.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const saveEdit = () => {
    if (!editPkg) return;
    setPackages(packages.map((p) => (p.id === editPkg.id ? editPkg : p)));
    setEditPkg(null);
  };

  const addPackage = () => {
    setPackages([...packages, { ...newPkg, id: `pkg-${Date.now()}` }]);
    setNewPkg(emptyPackage);
    setShowAdd(false);
  };

  const changeStatus = (id, newStatus) => {
    setPackages(
      packages.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  const deletePkg = (id) => setPackages(packages.filter((p) => p.id !== id));

  const toggleJur = (jurId, pkg, setPkg) => {
    const ids =
      pkg.jurisdictionIds === "all"
        ? jurisdictions.map((j) => j.id)
        : [...pkg.jurisdictionIds];
    const updated = ids.includes(jurId)
      ? ids.filter((id) => id !== jurId)
      : [...ids, jurId];
    setPkg({ ...pkg, jurisdictionIds: updated });
  };

  const toggleProd = (prodId, pkg, setPkg) => {
    const ids = [...pkg.productIds];
    const updated = ids.includes(prodId)
      ? ids.filter((id) => id !== prodId)
      : [...ids, prodId];
    setPkg({ ...pkg, productIds: updated });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mr-4">
          <SearchBar
            placeholder="Search packages..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
        >
          + Add Package
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Package</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Tax Rate</th>
              <th className="px-6 py-3 font-medium">Jurisdictions</th>
              <th className="px-6 py-3 font-medium">Products</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((pkg) => {
              const jurNames =
                pkg.jurisdictionIds === "all"
                  ? ["All"]
                  : pkg.jurisdictionIds.map(
                      (id) =>
                        jurisdictions.find((j) => j.id === id)?.name ?? id,
                    );
              const prodNames = pkg.productIds.map(
                (id) => products.find((p) => p.id === id)?.name ?? id,
              );
              return (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{pkg.name}</p>
                        <p className="text-xs text-gray-400">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${pkg.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Status stat={pkg.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {pkg.taxRate === "auto" ? "Auto" : `${pkg.taxRate}%`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {jurNames.slice(0, 2).map((name) => (
                        <span
                          key={name}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {name}
                        </span>
                      ))}
                      {jurNames.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{jurNames.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 flex-wrap">
                      {prodNames.slice(0, 2).map((name) => (
                        <span
                          key={name}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {name}
                        </span>
                      ))}
                      {prodNames.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{prodNames.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu
                      order={pkg}
                      unblockStatus="Available"
                      onEdit={() => setEditPkg(pkg)}
                      onDelete={() => setConfirmDelete(pkg)}
                      onChangeStatus={(newStatus) =>
                        changeStatus(pkg.id, newStatus)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Window
        isOpen={!!editPkg}
        onClose={() => setEditPkg(null)}
        onSave={saveEdit}
        title="Edit Package"
      >
        {editPkg && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.name}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.description}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.price}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, price: Number(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdictions
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {jurisdictions.map((jur) => (
                  <label
                    key={jur.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={
                        editPkg.jurisdictionIds === "all"
                          ? true
                          : editPkg.jurisdictionIds.includes(jur.id)
                      }
                      onChange={() => toggleJur(jur.id, editPkg, setEditPkg)}
                    />
                    {jur.name} {jur.type}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Products
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {products.map((prod) => (
                  <label
                    key={prod.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={editPkg.productIds.includes(prod.id)}
                      onChange={() => toggleProd(prod.id, editPkg, setEditPkg)}
                    />
                    {prod.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Window>

      <Window
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addPackage}
        title="Add Package"
        saveText="Add Package"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newPkg.name}
              onChange={(e) => setNewPkg({ ...newPkg, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newPkg.description}
              onChange={(e) =>
                setNewPkg({ ...newPkg, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newPkg.price}
              onChange={(e) =>
                setNewPkg({ ...newPkg, price: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Jurisdictions
            </label>
            <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
              {jurisdictions.map((jur) => (
                <label
                  key={jur.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      newPkg.jurisdictionIds === "all"
                        ? true
                        : newPkg.jurisdictionIds.includes(jur.id)
                    }
                    onChange={() => toggleJur(jur.id, newPkg, setNewPkg)}
                  />
                  {jur.name} {jur.type}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Products
            </label>
            <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
              {products.map((prod) => (
                <label
                  key={prod.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={newPkg.productIds.includes(prod.id)}
                    onChange={() => toggleProd(prod.id, newPkg, setNewPkg)}
                  />
                  {prod.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          deletePkg(confirmDelete?.id ?? "");
          setConfirmDelete(null);
        }}
        name={confirmDelete?.name ?? ""}
        type="Package"
      />
    </div>
  );
}
