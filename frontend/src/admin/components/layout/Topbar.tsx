import { useLocation } from "react-router-dom";

const headers = {
  "/dashboard": {
    title: "Dashboard",
    descr: "Overview of your wellness kit delivery operations",
  },
  "/tax-lookup": {
    title: "Tax Lookup",
    descr: "Determine sales tax for delivery coordinates in New York State",
  },
  "/orders": {
    title: "Orders",
    descr: "View all wellness kit orders with tax calculations",
  },
  "/wellness-packages": {
    title: "Wellness Packages",
    descr: "Manage delivery wellness kits",
  },
  "/products": {
    title: "Products",
    descr: "Manage individual products included in wellness packages",
  },
  "/jurisdictions": {
    title: "Jurisdictions",
    descr: "All New York State sales tax jurisdictions",
  },
  "/users": { title: "Users", descr: "Manage admin and editor accounts" },
  "/roles": {
    title: "Roles",
    descr: "Manage user roles and their permissions",
  },
};

export default function Topbar() {
  const location = useLocation();
  const curr = headers[location.pathname as keyof typeof headers] || {
    title: "",
    descr: "",
  };

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center px-8 shrink-0 w-full">
      <div className="flex flex-col justify-center">
        <h1 className="text-base font-bold text-gray-900 leading-tight">
          {curr.title}
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">{curr.descr}</p>
      </div>
    </header>
  );
}
