import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function OrderDropdownMenu({ order, onDelete, onEdit, onStatusChange, }) {
    const [active, setActive] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActive(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [dropdownRef]);
    const statusOptions = ["ARRIVED", "DELIVERING", "PENDING", "BLOCKED"];
    return (<div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={() => {
            setActive(!active);
        }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
        <MoreHorizontal size={16}/>
      </button>

      {active && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
          <div className="py-2 flex flex-col">
            {onEdit && (<button onClick={() => {
                    onEdit(order);
                    setActive(false);
                }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                <Pencil size={16} className="text-gray-500"/>
                Edit
              </button>)}

            {onStatusChange && (<>
                {onEdit && <div className="border-t border-gray-100 my-1"></div>}
                <span className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                  Change Status
                </span>
                {statusOptions
                    .filter((s) => s !== order.status)
                    .map((status) => (<button key={status} onClick={() => {
                        onStatusChange(order.id, status);
                        setActive(false);
                    }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                      {status}
                    </button>))}
              </>)}

            <div className="border-t border-gray-100 my-1"></div>
            <button onClick={() => {
                onDelete(order);
                setActive(false);
            }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
              <Trash2 size={16} className="text-red-500"/>
              Delete
            </button>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=OrderDropdownMenu.jsx.map