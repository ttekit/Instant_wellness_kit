export default function Status({ stat }: { stat: string }) {
  const statusColor = {
    Delivered: "bg-green-600 text-white",
    "In Transit": "bg-gray-200 text-gray-800",
    Pending: "bg-white border border-gray-300 text-gray-700",
    Cancelled: "bg-red-600 text-white",
    Blocked: "bg-red-600 text-white",
    Available: "bg-green-600 text-white",
    Active: "bg-green-600 text-white",
  };

  const style = statusColor[stat];
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${style}`}
    >
      {stat}
    </span>
  );
}
