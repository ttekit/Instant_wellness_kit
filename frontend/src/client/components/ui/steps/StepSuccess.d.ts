import type { Product } from '../ProductModal';
type Props = {
    product: Product;
    coords: {
        lat: number;
        lng: number;
    };
    orderId: string;
    onClose: () => void;
};
export default function StepSuccess({ product, coords, orderId, onClose }: Props): import("react").JSX.Element;
export {};
