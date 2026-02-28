export type Product = {
    id: number;
    name: string;
    tagline: string;
    description: string;
    price: number;
    time: string;
    items: number;
    popular: boolean;
    image: string;
    contents: string[];
};
export declare const products: Product[];
