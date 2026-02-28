import { MoreHorizontal, Pencil, CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  order: OrderInfo;
  onDelete: () => void;
  onChangeStatus: (newStatus: string) => void;
  onEdit?: () => void;
  unblockStatus?: string;
}

export default function DropdownMenu({
  order,
  onDelete,
  onChangeStatus,
  onEdit,
  unblockStatus = "Pending",
}: DropdownProps) {
  const [active, setActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [dropdownRef]);



  const statusOptions = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  const isBlocked = order.status === "Blocked";
  const handleToggleBlock = () => {
    if (isBlocked) {
      onChangeStatus(unblockStatus);
    } else {
      onChangeStatus("Blocked");
    }
    setActive(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => {
          setActive(!active);
        }}
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>

      {active && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
          <div className="py-2 flex flex-col">
            <button
              onClick={() => {
                onEdit?.();
                setActive(false);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            >
              <Pencil size={16} className="text-gray-500" />
              Edit
            </button>



            {onStatusChange && (
              <>
                <div className="border-t border-gray-100 my-1"></div>
                <span className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                  Change Status
                </span>
                {statusOptions
                  .filter((s) => s !== order.status)
                  .map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        onStatusChange(status);
                        setActive(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      {status}
                    </button>
                  ))}
              </>
            )}

            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={() => {
                onDelete();
                setActive(false);
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              <Trash2 size={16} className="text-red-500" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
