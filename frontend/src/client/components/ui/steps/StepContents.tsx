import { Product } from "../../../data/products";

type Props = {
  product: any;
  onNext: () => void;
};

export default function StepContents({ product, onNext }: Props) {
  // It turns out this is an array of objects, not strings!
  const items = product?.contents || [];
  console.log(items);
  return (
    <div className="field-row">
      <h3 className="font-black text-gray-900 text-base mb-1">Kit Contents</h3>
      <p className="text-xs text-gray-400 mb-4">
        Review what is inside your {product?.package || "kit"}
      </p>

      <ul className="space-y-2 mb-4">
        {items.map((item: any, i: number) => (
          // Using item.id for the key is better practice if it's unique!
          <li
            key={item?.id || i}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span className="w-5 h-5 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-[#1a5c3a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>

            {/* Render the string property, not the object */}
            {item || "Unknown Item"}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 mb-4">
        <svg
          className="w-4 h-4 text-[#2596be]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
          />
        </svg>
        <span className="text-xs text-gray-500">
          Estimated delivery:{" "}
          <strong className="text-gray-800">
            {product?.time || "20-25 min"}
          </strong>
        </span>
      </div>

      <button
        onClick={onNext}
        className="sbtn w-full bg-[#1a5c3a] text-white py-3 rounded-xl text-sm font-semibold outline-none border-0"
      >
        Continue to Location
      </button>
    </div>
  );
}
