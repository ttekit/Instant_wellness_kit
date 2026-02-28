type Coords = {
    lat: number;
    lng: number;
};
type Props = {
    onNext: (coords: Coords) => void;
};
export default function StepLocation({ onNext }: Props): import("react").JSX.Element;
export {};
