import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calculator, ShoppingCart, Package, Box, MapPin, Users, Shield, } from "lucide-react";
export default function Sidebar() {
    const getLinkClasses = ({ isActive }) => {
        return `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm ${isActive
            ? "bg-[#27272a] text-white"
            : "text-gray-400 hover:text-white hover:bg-[#27272a]"}`;
    };
    return (<aside className="w-[250px] h-screen bg-[#18181b] text-white flex flex-col border-r border-gray-800">
      <div className="flex items-center gap-3 p-5 mb-2">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold shrink-0">
          IW
        </div>
        <div>
          <h2 className="font-bold text-sm leading-tight">
            Instant Wellness Kits
          </h2>
          <span className="text-xs text-gray-400">Admin panel</span>
        </div>
      </div>

      <nav className="px-3 flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">
            Main
          </h3>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink to="/admin/dashboard" className={getLinkClasses}>
                <LayoutDashboard size={18}/>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/tax-lookup" className={getLinkClasses}>
                <Calculator size={18}/>
                Tax Lookup
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" className={getLinkClasses}>
                <ShoppingCart size={18}/>
                Orders
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">
            Management
          </h3>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink to="/admin/wellness-packages" className={getLinkClasses}>
                <Package size={18}/>
                Wellness Packages
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" className={getLinkClasses}>
                <Box size={18}/>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/jurisdictions" className={getLinkClasses}>
                <MapPin size={18}/>
                Jurisdictions
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">
            Administration
          </h3>
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink to="/admin/users" className={getLinkClasses}>
                <Users size={18}/>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/roles" className={getLinkClasses}>
                <Shield size={18}/>
                Roles
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>);
}
//# sourceMappingURL=Sidebar.jsx.map