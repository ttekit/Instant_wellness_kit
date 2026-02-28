import { Product } from '../../data/products';
export type Coords = {
    lat: number;
    lng: number;
};
export default function ProductModal({ product, onClose }: {
    product: Product;
    onClose: () => void;
}): import("react").JSX.Element;
