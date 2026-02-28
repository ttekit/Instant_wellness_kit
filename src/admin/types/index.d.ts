export interface Jurisdiction {
    id: number;
    name: string;
    type: string;
    fipsCode: string;
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
    id: number;
    product: string;
    price: string;
    status: "Available" | "Blocked" | "PENDING";
    jurisdictions: Jurisdiction[];
}
export interface BackendUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    roleId: number;
    role: {
        id: number;
        name: string;
    };
}
export interface WellnessPackage {
    id: string;
    name: string;
    description: string;
    img_link: string;
    price: number;
    taxRate: "auto" | number;
    status: "Available" | "Blocked";
    jurisdictions: Jurisdiction[];
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
export declare const allPermissions: readonly ["Users", "Roles", "Packages", "Products", "Orders", "Settings", "Tax Lookup"];
export interface UIUser {
    id: string;
    name: string;
    email: string;
    role: string;
    roleId: number;
    status: "Active" | "Blocked";
}
export interface CreateOrderPayload {
    userId: number;
    subtotal: number;
    composite_tax_rate: number;
    tax_amount: number;
    total_amount: number;
    jurisdictions?: Jurisdiction[];
}
export interface DBOrder {
    id: number;
    subtotal: string | number;
    composite_tax_rate: string | number;
    tax_amount: string | number;
    total_amount: string | number;
    userId: number;
    user?: {
        name: string;
        email: string;
    };
    jurisdictions: {
        jurisdiction: Jurisdiction;
    }[];
}
export interface NewUserForm extends UIUser {
    password?: string;
}
export interface BackendUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    roleId: number;
    role: {
        id: number;
        name: string;
    };
}
export interface BackendRole {
    id: number;
    name: string;
}
export declare const emptyUser: NewUserForm;
