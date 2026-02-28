import { MoreHorizontal, Pencil, CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function WellnessPackageDropdownMenu({ packageStatus, onDelete, onEdit, onBlock, onUnblock, }) {
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
    const isBlocked = packageStatus === "BLOCKED";
    const handleToggleBlock = () => {
        if (isBlocked) {
            onUnblock();
        }
        else {
            onBlock();
        }
        setActive(false);
    };
    return (<div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={() => {
            setActive(!active);
        }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
        <MoreHorizontal size={16}/>
      </button>

      {active && (<div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
          <div className="py-2 flex flex-col">
            <button onClick={() => {
                onEdit?.();
                setActive(false);
            }} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
              <Pencil size={16} className="text-gray-500"/>
              Edit
            </button>

            <button onClick={handleToggleBlock} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
              <CheckCircle size={16} className="text-gray-500"/>
              {isBlocked ? "Unblock" : "Block"}
            </button>

            <button onClick={() => {
                onDelete();
                setActive(false);
            }} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
              <Trash2 size={16} className="text-red-500"/>
              Delete
            </button>
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=WellnessPackageDropdownMenu.jsx.map