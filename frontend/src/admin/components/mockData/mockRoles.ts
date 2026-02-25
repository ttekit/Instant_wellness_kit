export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export const allPermissions = [
  "Users",
  "Roles",
  "Packages",
  "Products",
  "Orders",
  "Settings",
  "Tax Lookup",
];

export const mockRoles: Role[] = [
  {
    id: "role-001",
    name: "Admin",
    description: "Full access to all features",
    permissions: [
      "Users",
      "Roles",
      "Packages",
      "Products",
      "Orders",
      "Settings",
      "Tax Lookup",
    ],
  },
  {
    id: "role-002",
    name: "Editor",
    description: "Can manage packages, products, and orders",
    permissions: ["Packages", "Products", "Orders", "Tax Lookup"],
  },
];
