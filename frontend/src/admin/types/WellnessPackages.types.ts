export interface ProductDetail {
  id: number;
  product: string;
}

export interface JurisdictionDetail {
  id: number;
  name: string;
}

export interface ProductPackage {
  id: number;
  package: string;
  price: number;
  status: string;
  tax_rate: number;
  jurisdictions: JurisdictionDetail[];
  products: ProductDetail[];
}
