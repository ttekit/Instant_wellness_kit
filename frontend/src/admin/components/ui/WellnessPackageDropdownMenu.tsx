import { MoreHorizontal, Pencil, CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface WellnessPackageDropdownProps {
  packageStatus: string;
  onDelete: () => void;
  onEdit?: () => void;
  onBlock: () => void;
  onUnblock: () => void;
}

export default function WellnessPackageDropdownMenu({
  packageStatus,
  onDelete,
  onEdit,
  onBlock,
  onUnblock,
}: WellnessPackageDropdownProps) {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX - 144,
      });
    }
  };

  useEffect(() => {
    if (active) {
      updateCoords();
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
    }
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
    };
  }, [active]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isBlocked = packageStatus === "BLOCKED";
  const handleToggleBlock = () => {
    if (isBlocked) {
      onUnblock();
    } else {
      onBlock();
    }
    setActive(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setActive(!active)}
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>

      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${coords.top + 8}px`,
              left: `${coords.left}px`,
            }}
            className="w-36 bg-white rounded-lg shadow-lg border border-gray-100 z-[9999]"
          >
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

              <button
                onClick={handleToggleBlock}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <CheckCircle size={16} className="text-gray-500" />
                {isBlocked ? "Unblock" : "Block"}
              </button>

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
          </div>,
          document.body
        )}
    </>
  );
}
