import type { Product } from '../ProductModal';
type Props = {
    product: Product;
    onNext: () => void;
};
export default function StepContents({ product, onNext }: Props): import("react").JSX.Element;
export {};
