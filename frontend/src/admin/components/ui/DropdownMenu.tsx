import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  onDelete: () => void;
  onEdit?: () => void;
}

export default function DropdownMenu({
  onDelete,
  onEdit,
}: DropdownProps) {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setActive(false);
      }
    };

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + window.scrollY + 4,
          left: rect.right - 192 + window.scrollX,
        });
      }
    };

    if (active) {
      updatePosition();
      document.addEventListener("click", handler);
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [active]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setActive(!active)}
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <MoreHorizontal size={16} />
      </button>

      {active && createPortal(
        <div
          ref={dropdownRef}
          style={{ top: coords.top, left: coords.left }}
          className="absolute w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
        >
          <div className="py-2 flex flex-col">
            {onEdit && (
              <button
                onClick={() => {
                  onEdit();
                  setActive(false);
                }}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
              >
                <Pencil size={16} className="text-gray-500" />
                Edit
              </button>
            )}

            {onEdit && <div className="border-t border-gray-100 my-1"></div>}

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