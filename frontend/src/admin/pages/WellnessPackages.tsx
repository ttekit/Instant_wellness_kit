import { useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import WellnessPackageDropdownMenu from "../components/ui/WellnessPackageDropdownMenu";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";
import {
  ProductPackage,
  ProductDetail,
  JurisdictionDetail,
} from "../types/WellnessPackages.types";

interface WellnessPackageWithId extends ProductPackage {
  id: number;
}

const emptyPackage: WellnessPackageWithId = {
  id: 0,
  package: "",
  price: 0.0,
  status: "PENDING",
  tax_rate: 0.0,
  jurisdictions: [],
  products: [],
  description: "",
  img_link: "",
};

export default function WellnessPackages() {
  const [search, setSearch] = useState("");
  const [packages, setPackages] = useState<WellnessPackageWithId[]>([]);
  const [allJurisdictions, setAllJurisdictions] = useState<
    JurisdictionDetail[]
  >([]);
  const [allProducts, setAllProducts] = useState<ProductDetail[]>([]);
  const [editPkg, setEditPkg] = useState<WellnessPackageWithId | null>(null);
  const [newPkg, setNewPkg] = useState<WellnessPackageWithId>(emptyPackage);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] =
    useState<WellnessPackageWithId | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pkgResponse = await fetch(
          "http://localhost:4200/product-packeges/with-details",
        );
        if (!pkgResponse.ok) {
          throw new Error(`HTTP error! status: ${pkgResponse.status}`);
        }
        const pkgData: WellnessPackageWithId[] = await pkgResponse.json();
        const parsedPkgData = pkgData.map((pkg) => ({
          id: pkg.id,
          package: pkg.package,
          description: pkg.description,
          img_link: pkg.link,
          status: pkg.status,
          tax_rate: pkg.tax_rate,
          jurisdictions: pkg.jurisdictions,
          products: pkg.products,
          price: pkg.price,
          taxRate: pkg.tax_rate,
        }));
        setPackages(parsedPkgData);

        const jurResponse = await fetch("http://localhost:4200/jurisdictions");
        if (!jurResponse.ok) {
          throw new Error(`HTTP error! status: ${jurResponse.status}`);
        }
        const jurData: JurisdictionDetail[] = await jurResponse.json();
        setAllJurisdictions(jurData);

        const prodResponse = await fetch("http://localhost:4200/products");
        if (!prodResponse.ok) {
          throw new Error(`HTTP error! status: ${prodResponse.status}`);
        }
        const prodData: ProductDetail[] = await prodResponse.json();
        setAllProducts(prodData);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = packages.filter((pkg) =>
    pkg.package.toLowerCase().includes(search.toLowerCase()),
  );

  const saveEdit = async () => {
    if (!editPkg) return;
    try {
      const response = await fetch(
        `http://localhost:4200/product-packeges/${editPkg.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            package: editPkg.package,
            description: editPkg.description,
            img_link: editPkg.img_link,
            price: editPkg.price,
            status: editPkg.status,
            taxRate: editPkg.tax_rate,
            productIds: editPkg.products.map((product) => product.id),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const updatedPkg: WellnessPackageWithId = await response.json();
      console.log(updatedPkg);

      setPackages(
        packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
      );
      setEditPkg(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const addPackage = async () => {
    try {
      console.log(newPkg);
      const response = await fetch("http://localhost:4200/product-packeges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          package: newPkg.package,
          description: newPkg.description,
          img_link: newPkg.img_link,
          price: newPkg.price,
          status: newPkg.status,
          taxRate: newPkg.tax_rate,
          productIds: newPkg.products.map((product) => product.id),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }
      const createdPkg: WellnessPackageWithId = await response.json();

      setPackages([...packages, createdPkg]);
      setNewPkg(emptyPackage);
      setShowAdd(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const blockPackage = async (id: number) => {
    console.log(`Attempting to block package with ID: ${id}`);
    try {
      const response = await fetch(
        `http://localhost:4200/product-packeges/${id}/block`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }
      const updatedPkg: WellnessPackageWithId = await response.json();
      setPackages(
        packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
      );
      console.log("Blocked package updated status:", updatedPkg.status);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const unblockPackage = async (id: number) => {
    console.log(`Attempting to unblock package with ID: ${id}`);
    try {
      const response = await fetch(
        `http://localhost:4200/product-packeges/${id}/unblock`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const updatedPkg: WellnessPackageWithId = await response.json();
      setPackages(
        packages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)),
      );
      console.log("Unblocked package updated status:", updatedPkg.status);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const deletePkg = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:4200/product-packeges/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      setPackages(packages.filter((p) => p.id !== id));
      setConfirmDelete(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const toggleJur = (
    jurId: number,
    pkg: WellnessPackageWithId,
    setPkg: (pkg: WellnessPackageWithId) => void,
  ) => {
    const isCurrentlySelected = pkg.jurisdictions.some((j) => j.id === jurId);
    let updatedJurisdictions: JurisdictionDetail[];

    if (isCurrentlySelected) {
      updatedJurisdictions = pkg.jurisdictions.filter((j) => j.id !== jurId);
    } else {
      const selectedJur = allJurisdictions.find((j) => j.id === jurId);
      if (selectedJur) {
        updatedJurisdictions = [...pkg.jurisdictions, selectedJur];
      } else {
        updatedJurisdictions = pkg.jurisdictions;
      }
    }
    setPkg({ ...pkg, jurisdictions: updatedJurisdictions });
  };

  const toggleProd = (
    prodId: number,
    pkg: WellnessPackageWithId,
    setPkg: (pkg: WellnessPackageWithId) => void,
  ) => {
    const isCurrentlySelected = pkg.products.some((p) => p.id === prodId);
    let updatedProducts: ProductDetail[];

    if (isCurrentlySelected) {
      updatedProducts = pkg.products.filter((p) => p.id !== prodId);
    } else {
      const selectedProd = allProducts.find((p) => p.id === prodId);
      if (selectedProd) {
        updatedProducts = [...pkg.products, selectedProd];
      } else {
        updatedProducts = pkg.products;
      }
    }
    setPkg({ ...pkg, products: updatedProducts });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading wellness packages...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }

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

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Package Name</th>
              <th className="px-6 py-3 font-medium">Description</th>
              <th className="px-6 py-3 font-medium">Image Link</th>
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
              const jurNames = pkg.jurisdictions.map((j) => j.name);
              const prodNames = pkg.products.map((p) => p.product);

              return (
                <tr key={pkg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {pkg.package}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 line-clamp-2 w-48 max-w-sm">
                    {pkg.description}
                  </td>
                  <td className="px-6 py-4">
                    {pkg.img_link && (
                      <a
                        href={pkg.img_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate w-32 block"
                      >
                        {pkg.img_link.split("/").pop()}
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900">${pkg.price}</td>
                  <td className="px-6 py-4">
                    <Status stat={pkg.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {`${(pkg.tax_rate * 100).toFixed(2)}%`}
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
                    <WellnessPackageDropdownMenu
                      packageStatus={pkg.status}
                      onEdit={() => setEditPkg(pkg)}
                      onDelete={() => setConfirmDelete(pkg)}
                      onBlock={() => blockPackage(pkg.id)}
                      onUnblock={() => unblockPackage(pkg.id)}
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
        title={`Edit Package #${editPkg?.id}`}
      >
        {editPkg && (
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="editPackageName"
                className="text-sm font-medium text-gray-700"
              >
                Package Name
              </label>
              <input
                id="editPackageName"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.package}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, package: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="editPackageDescription"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="editPackageDescription"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                rows={3}
                value={editPkg.description}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, description: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="editPackageImgLink"
                className="text-sm font-medium text-gray-700"
              >
                Image Link (URL)
              </label>
              <input
                id="editPackageImgLink"
                type="text"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.img_link}
                onChange={(e) =>
                  setEditPkg({ ...editPkg, img_link: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="editPackagePrice"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="editPackagePrice"
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.price}
                onChange={(e) =>
                  setEditPkg({
                    ...editPkg,
                    price:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="editPackageTaxRate"
                className="text-sm font-medium text-gray-700"
              >
                Tax Rate (%)
              </label>
              <input
                id="editPackageTaxRate"
                type="number"
                step="0.01"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editPkg.tax_rate * 100}
                onChange={(e) =>
                  setEditPkg({
                    ...editPkg,
                    tax_rate:
                      e.target.value === ""
                        ? 0
                        : parseFloat(e.target.value) / 100,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdictions
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {allJurisdictions.map((jur) => (
                  <label
                    key={jur.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={editPkg.jurisdictions.some(
                        (j) => j.id === jur.id,
                      )}
                      onChange={() =>
                        toggleJur(jur.id, editPkg, (val) => setEditPkg(val))
                      }
                    />
                    {jur.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Products
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {allProducts.map((prod) => (
                  <label
                    key={prod.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={editPkg.products.some((p) => p.id === prod.id)}
                      onChange={() =>
                        toggleProd(prod.id, editPkg, (val) => setEditPkg(val))
                      }
                    />
                    {prod.product}
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
        {newPkg && (
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="addPackageName"
                className="text-sm font-medium text-gray-700"
              >
                Package Name
              </label>
              <input
                id="addPackageName"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newPkg.package}
                onChange={(e) =>
                  setNewPkg({ ...newPkg, package: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="addPackageDescription"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="addPackageDescription"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                rows={3}
                value={newPkg.description}
                onChange={(e) =>
                  setNewPkg({ ...newPkg, description: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="addPackageImgLink"
                className="text-sm font-medium text-gray-700"
              >
                Image Link (URL)
              </label>
              <input
                id="addPackageImgLink"
                type="text"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newPkg.img_link}
                onChange={(e) =>
                  setNewPkg({ ...newPkg, img_link: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="addPackagePrice"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="addPackagePrice"
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newPkg.price}
                onChange={(e) =>
                  setNewPkg({
                    ...newPkg,
                    price:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor="addPackageTaxRate"
                className="text-sm font-medium text-gray-700"
              >
                Tax Rate (%)
              </label>
              <input
                id="addPackageTaxRate"
                type="number"
                step="0.01"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={newPkg.tax_rate * 100}
                onChange={(e) =>
                  setNewPkg({
                    ...newPkg,
                    tax_rate:
                      e.target.value === ""
                        ? 0
                        : parseFloat(e.target.value) / 100,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdictions
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {allJurisdictions.map((jur) => (
                  <label
                    key={jur.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={newPkg.jurisdictions.some(
                        (j) => j.id === jur.id,
                      )}
                      onChange={() => toggleJur(jur.id, newPkg, setNewPkg)}
                    />
                    {jur.name}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Products
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-36 overflow-y-auto">
                {allProducts.map((prod) => (
                  <label
                    key={prod.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={newPkg.products.some((p) => p.id === prod.id)}
                      onChange={() => toggleProd(prod.id, newPkg, setNewPkg)}
                    />
                    {prod.product}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={async () => {
          if (confirmDelete) {
            await deletePkg(confirmDelete.id);
            setConfirmDelete(null);
          }
        }}
        name={confirmDelete?.package ?? ""}
        type="Package"
      />
    </div>
  );
}
