import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import DropdownMenu from "../components/ui/DropdownMenu";
import Window from "../components/ui/Window";
import { Product, Jurisdiction } from "../types";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const emptyProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  status: "Available",
  jurisdictionIds: [],
};

export default function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [jurisdictions] = useState<Jurisdiction[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const saveEdit = () => {
    if (!editProduct) return;
    setProducts(
      products.map((p) => (p.id === editProduct.id ? editProduct : p)),
    );
    setEditProduct(null);
  };

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: `prod-${Date.now()}` }]);
    setNewProduct(emptyProduct);
    setShowAdd(false);
  };

  const changeStatus = (id, newStatus) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, status: newStatus } : p)),
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleJur = (jurId, product, setProduct) => {
    const current =
      product.jurisdictionIds === "all"
        ? jurisdictions.map((j) => j.id)
        : [...product.jurisdictionIds];
    const updated = current.includes(jurId)
      ? current.filter((id) => id !== jurId)
      : [...current, jurId];
    setProduct({ ...product, jurisdictionIds: updated });
  };

  const jurCheckboxes = (product, setProduct) =>
    jurisdictions.map((jur) => (
      <label
        key={jur.id}
        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
      >
        <input
          type="checkbox"
          checked={
            product.jurisdictionIds === "all"
              ? true
              : product.jurisdictionIds.includes(jur.id)
          }
          onChange={() => toggleJur(jur.id, product, setProduct)}
        />
        {jur.name} {jur.type}
      </label>
    ));

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mr-4">
          <SearchBar
            placeholder="Search products..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Jurisdictions</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((product) => {
              const jurNames =
                product.jurisdictionIds === "all"
                  ? ["All"]
                  : product.jurisdictionIds.map(
                      (id) =>
                        jurisdictions.find((j) => j.id === id)?.name ?? id,
                    );
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-400">
                      {product.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Status stat={product.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {jurNames.slice(0, 2).join(", ")}
                    {jurNames.length > 2 && ` +${jurNames.length - 2}`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu
                      order={product}
                      unblockStatus="Available"
                      onEdit={() => setEditProduct(product)}
                      onDelete={() => setConfirmDelete(product)}
                      onChangeStatus={(newStatus) =>
                        changeStatus(product.id, newStatus)
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
        isOpen={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSave={saveEdit}
        title="Edit Product"
      >
        {editProduct && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdictions
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-40 overflow-y-auto">
                {jurCheckboxes(editProduct, setEditProduct)}
              </div>
            </div>
          </div>
        )}
      </Window>

      <Window
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addProduct}
        title="Add Product"
        saveText="Add Product"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Jurisdictions
            </label>
            <div className="mt-1 border border-gray-200 rounded-lg h-40 overflow-y-auto">
              {jurCheckboxes(newProduct, setNewProduct)}
            </div>
          </div>
        </div>
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          deleteProduct(confirmDelete?.id ?? "");
          setConfirmDelete(null);
        }}
        name={confirmDelete?.name ?? ""}
        type="Product"
      />
    </div>
  );
}