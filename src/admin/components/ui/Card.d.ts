import { ReactNode } from "react";
interface CardProp {
    title: string;
    dollarSign?: string;
    value: number;
    descr: string;
    icon: ReactNode;
}
export default function Card({ title, dollarSign, value, descr, icon, }: CardProp): import("react").JSX.Element;
export {};
