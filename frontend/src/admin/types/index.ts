export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  fipCode: string;
  description: string;
  status: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: "Available" | "Blocked";
  jurisdictionIds: string[] | "all";
}

export interface WellnessPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  taxRate: "auto" | number;
  status: "Available" | "Blocked";
  jurisdictionIds: string[] | "all";
  productIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  status: "Active" | "Blocked";
}

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
] as const;
