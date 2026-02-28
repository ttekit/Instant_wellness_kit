import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import Window from "../components/ui/Window";
import { Role, allPermissions } from "../types";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const API_URL = "http://localhost:4200/roles";

const getToken = (): string => localStorage.getItem("access_token") || "";

interface BackendRole {
  id: number;
  name: string;
  description: string | null;
  permissions: Record<string, boolean>;
}

// ИСПРАВЛЕНИЕ: permissions теперь пустой объект {}, а не массив []
const emptyRole: Role = { id: "", name: "", description: "", permissions: {} };

export default function Roles() {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Role>(emptyRole);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Role | null>(null);

  const fetchRoles = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Failed to fetch roles");

      const data: BackendRole[] = await response.json();

      // ИСПРАВЛЕНИЕ: Оставляем permissions как объект, как и просит TS
      const mappedRoles: Role[] = data.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        description: r.description || "",
        permissions: r.permissions || {},
      }));

      setRoles(mappedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const saveEdit = async () => {
    if (!editRole) return;
    try {
      const response = await fetch(`${API_URL}/${editRole.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: editRole.name,
          description: editRole.description,
          permissions: editRole.permissions, // Отправляем объект напрямую
        }),
      });

      if (!response.ok) throw new Error("Failed to update role");

      await fetchRoles();
      setEditRole(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const addRole = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name: newRole.name,
          description: newRole.description,
          permissions: newRole.permissions, // Отправляем объект напрямую
        }),
      });

      if (!response.ok) throw new Error("Failed to create role");

      await fetchRoles();
      setNewRole(emptyRole);
      setShowAdd(false);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const deleteRole = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!response.ok) throw new Error("Failed to delete role");

      await fetchRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // ИСПРАВЛЕНИЕ: Функция переключения для объекта (Record), а не массива
  const togglePerm = (
    perm: string,
    setRoleFunc: React.Dispatch<React.SetStateAction<Role>>,
  ) => {
    setRoleFunc((prev) => {
      const currentPerms = prev.permissions || {};
      return {
        ...prev,
        permissions: {
          ...currentPerms,
          [perm]: !currentPerms[perm], // Инвертируем true/false
        },
      };
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mr-4">
          <SearchBar
            placeholder="Search roles..."
            value={search}
            onChange={setSearch}
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
        >
          + Add Role
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                  {role.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{role.name}</p>
                  <p className="text-xs text-gray-400">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditRole(role)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setConfirmDelete(role)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
              Permissions
            </p>
            <div className="flex flex-wrap gap-1">
              {Object.entries(role.permissions || {})
                .filter(([, isGranted]) => isGranted)
                .map(([perm]) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {perm}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <Window
        isOpen={!!editRole}
        onClose={() => setEditRole(null)}
        onSave={saveEdit}
        title="Edit Role"
      >
        {editRole && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editRole.name}
                onChange={(e) =>
                  setEditRole({ ...editRole, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editRole.description}
                onChange={(e) =>
                  setEditRole({ ...editRole, description: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Permissions
              </label>
              <div className="flex flex-col gap-2">
                {allPermissions.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      // ИСПРАВЛЕНИЕ: Проверяем значение в объекте (true/false)
                      checked={!!editRole.permissions[perm]}
                      onChange={() =>
                        togglePerm(
                          perm,
                          setEditRole as React.Dispatch<
                            React.SetStateAction<Role>
                          >,
                        )
                      }
                      className="accent-green-600"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Window>

      <Window
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addRole}
        title="Create New Role"
        saveText="Create Role"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newRole.description}
              onChange={(e) =>
                setNewRole({ ...newRole, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Permissions
            </label>
            <div className="flex flex-col gap-2">
              {allPermissions.map((perm) => (
                <label
                  key={perm}
                  className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    // ИСПРАВЛЕНИЕ: Проверяем значение в объекте
                    checked={!!newRole.permissions[perm]}
                    onChange={() => togglePerm(perm, setNewRole)}
                    className="accent-green-600"
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete) {
            deleteRole(confirmDelete.id);
            setConfirmDelete(null);
          }
        }}
        name={confirmDelete?.name ?? ""}
        type="Role"
      />
    </div>
  );
}
