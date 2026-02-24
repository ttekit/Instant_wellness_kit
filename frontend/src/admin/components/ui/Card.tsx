import { ReactNode } from "react";

interface CardProp {
  title: string;
  dollarSign?: string;
  value: number;
  descr: string;
  icon: ReactNode;
}

export default function Card({
  title,
  dollarSign,
  value,
  descr,
  icon,
}: CardProp) {
  return (
    <div className="bg-white p-5 rounded-xl border-2  flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="text-gray-400">{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">
          {dollarSign}
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-1">{descr}</p>
      </div>
    </div>
  );
}
