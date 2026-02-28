export interface Jurisdiction {
    id: number;
    name: string;
}
export interface OrderJurisdiction {
    order_id: number;
    jurisdiction_id: number;
    jurisdiction: Jurisdiction;
}
export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password?: string;
    createdAt: string;
    roleId: number;
}
export interface Package {
    id: number;
    package: string;
    price: string;
    status: string;
    taxRate: string;
}
export interface Order {
    id: number;
    subtotal: string;
    composite_tax_rate: string;
    tax_amount: string;
    total_amount: string;
    timestamp: string;
    created_at: string;
    updated_at: string;
    userId: number;
    packageId: number;
    user: User;
    package: Package;
    jurisdictions: OrderJurisdiction[];
    customerName: string;
    orderPackage: Package;
    status: string;
}
