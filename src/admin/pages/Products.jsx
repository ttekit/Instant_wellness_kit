import { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import Window from "../components/ui/Window";
import ProductDropdownMenu from "../components/ui/ProductDropdownMenu";
import ConfirmDelete from "../components/ui/ConfirmDelete";
const emptyProduct = {
    id: 0,
    product: "",
    price: "0.00",
    status: "PENDING",
    jurisdictions: [],
};
export default function Products() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [jurisdictions, setJurisdictions] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(emptyProduct);
    const [showAdd, setShowAdd] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:4200/products/with-details");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setProducts(data);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);
    const fetchJurisdictions = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:4200/jurisdictions");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setJurisdictions(data);
        }
        catch (error) {
            console.error("Error fetching jurisdictions:", error);
        }
    }, []);
    useEffect(() => {
        fetchProducts();
        fetchJurisdictions();
    }, [fetchProducts, fetchJurisdictions]);
    const filtered = products.filter((p) => p.product.toLowerCase().includes(search.toLowerCase()));
    const saveEdit = async () => {
        if (!editProduct)
            return;
        try {
            const productToSend = {
                product: editProduct.product,
                price: editProduct.price,
                status: editProduct.status,
                jurisdictionIds: editProduct.jurisdictions.map((j) => j.id),
            };
            const response = await fetch(`http://localhost:4200/products/${editProduct.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToSend),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await fetchProducts();
            setEditProduct(null);
        }
        catch (error) {
            console.error("Error saving product:", error);
        }
    };
    const addProduct = async () => {
        try {
            const productToSend = {
                product: newProduct.product,
                price: newProduct.price,
                status: newProduct.status,
                jurisdictionIds: newProduct.jurisdictions.map((j) => j.id),
            };
            const response = await fetch("http://localhost:4200/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToSend),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await fetchProducts();
            setNewProduct(emptyProduct);
            setShowAdd(false);
        }
        catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const changeStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4200/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await fetchProducts();
        }
        catch (error) {
            console.error("Error changing product status:", error);
        }
    };
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:4200/products/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await fetchProducts();
        }
        catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const toggleJur = (jur, product, setProduct) => {
        const isCurrentlySelected = product.jurisdictions.some((j) => j.id === jur.id);
        const updatedJurisdictions = isCurrentlySelected
            ? product.jurisdictions.filter((j) => j.id !== jur.id)
            : [...product.jurisdictions, jur];
        setProduct({ ...product, jurisdictions: updatedJurisdictions });
    };
    const jurCheckboxes = (product, setProduct) => jurisdictions.map((jur) => (<label key={jur.id} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700">
        <input type="checkbox" checked={product.jurisdictions.some((j) => j.id === jur.id)} onChange={() => toggleJur(jur, product, setProduct)}/>
        {jur.name} {jur.type}
      </label>));
    return (<div className="p-8 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mr-4">
          <SearchBar placeholder="Search products..." value={search} onChange={setSearch}/>
        </div>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
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
            const jurNames = (product.jurisdictions || []).map((j) => j.name);
            return (<tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {product.product}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-900">${product.price}</td>
                  <td className="px-6 py-4">
                    <Status stat={product.status}/>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {jurNames.slice(0, 2).join(", ")}
                    {jurNames.length > 2 && ` +${jurNames.length - 2}`}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ProductDropdownMenu product={product} onEdit={setEditProduct} onDelete={setConfirmDelete} onChangeStatus={changeStatus}/>
                  </td>
                </tr>);
        })}
          </tbody>
        </table>
      </div>

      <Window isOpen={!!editProduct} onClose={() => setEditProduct(null)} onSave={saveEdit} title="Edit Product">
        {editProduct && (<div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Product
              </label>
              <input className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={editProduct.product} onChange={(e) => setEditProduct({ ...editProduct, product: e.target.value })}/>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={parseFloat(editProduct.price).toFixed(2)} onChange={(e) => setEditProduct({
                ...editProduct,
                price: e.target.value,
            })}/>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Jurisdictions
              </label>
              <div className="mt-1 border border-gray-200 rounded-lg h-40 overflow-y-auto">
                {jurCheckboxes(editProduct, setEditProduct)}
              </div>
            </div>
          </div>)}
      </Window>

      <Window isOpen={showAdd} onClose={() => setShowAdd(false)} onSave={addProduct} title="Add Product" saveText="Add Product">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Product</label>
            <input className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={newProduct.product} onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input type="number" className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={parseFloat(newProduct.price).toFixed(2)} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>
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

      <ConfirmDelete isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={() => {
            deleteProduct(confirmDelete.id);
            setConfirmDelete(null);
        }} name={confirmDelete?.product ?? ""} type="Product"/>
    </div>);
}
//# sourceMappingURL=Products.jsx.map