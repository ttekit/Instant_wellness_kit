import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Jurisdictions from "./pages/Jurisdictions";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Roles from "./pages/Roles";
import TaxLookup from "./pages/TaxLookup";
import Users from "./pages/Users";
import WellnessPackages from "./pages/WellnessPackages";

export default function Admin() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jurisdictions" element={<Jurisdictions />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="roles" element={<Roles />} />
        <Route path="tax-lookup" element={<TaxLookup />} />
        <Route path="users" element={<Users />} />
        <Route path="wellness-packages" element={<WellnessPackages />} />
      </Route>
    </Routes>
  );
}
