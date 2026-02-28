import { Product } from '../../../data/products';
type Props = {
    product: Product;
    coords: {
        lat: number;
        lng: number;
    };
    onNext: (serverOrderId: number) => void;
};
export default function StepConfirm({ product, coords, onNext }: Props): import("react").JSX.Element;
export {};
