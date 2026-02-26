export interface Jurisdiction {
  id: string;
  name: string;
  type: string;
  fips: string;
  stateRate: number;
  localRate: number;
  mctd: number | null;
  composite: number;
}



export interface BackendTaxRate {
  rate: string | number;
  local_rate: string | number;
  mctd: string | number | null;
  composite: string | number;
}

export interface BackendJurisdiction {
  id: number;
  name: string;
  type: string;
  fipsCode: string;
  tax_rates: BackendTaxRate[];
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
  permissions: Record<string, boolean>;
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
