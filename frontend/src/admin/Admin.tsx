import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import TaxLookup from "./pages/TaxLookup";
import WellnessPackages from "./pages/WellnessPackages";
import Products from "./pages/Products";
import Jurisdictions from "./pages/Jurisdictions";
import Users from "./pages/Users";
import Roles from "./pages/Roles";

export default function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="tax-lookup" element={<TaxLookup />} />
          <Route path="wellness-packages" element={<WellnessPackages />} />
          <Route path="products" element={<Products />} />
          <Route path="jurisdictions" element={<Jurisdictions />} />
          <Route path="users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
