import { X } from "lucide-react";

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  description?: string;
  saveText?: string;
  children: React.ReactNode;
}

export default function Window({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  saveText = "Save Changes",
  children,
}: WindowProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-125 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-start p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">{children}</div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            {saveText}
          </button>
        </div>
      </div>
    </div>
  );
}
