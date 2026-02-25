import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import Window from "../components/ui/Window";
import {
  mockRoles,
  Role,
  allPermissions,
} from "../components/mockData/mockRoles";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const emptyRole: Role = { id: "", name: "", description: "", permissions: [] };

export default function Roles() {
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState(mockRoles);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Role>(emptyRole);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Role | null>(null);

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const saveEdit = () => {
    if (!editRole) return;
    setRoles(roles.map((r) => (r.id === editRole.id ? editRole : r)));
    setEditRole(null);
  };

  const addRole = () => {
    setRoles([...roles, { ...newRole, id: `role-${Date.now()}` }]);
    setNewRole(emptyRole);
    setShowAdd(false);
  };

  const deleteRole = (id) => setRoles(roles.filter((r) => r.id !== id));

  const togglePerm = (perm, role, setRole) => {
    const updated = role.permissions.includes(perm)
      ? role.permissions.filter((p) => p !== perm)
      : [...role.permissions, perm];
    setRole({ ...role, permissions: updated });
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
                  {role.name[0]}
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
              {role.permissions.map((perm) => (
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
                      checked={editRole.permissions.includes(perm)}
                      onChange={() => togglePerm(perm, editRole, setEditRole)}
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
                    checked={newRole.permissions.includes(perm)}
                    onChange={() => togglePerm(perm, newRole, setNewRole)}
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
          deleteRole(confirmDelete?.id ?? "");
          setConfirmDelete(null);
        }}
        name={confirmDelete?.name ?? ""}
        type="Role"
      />
    </div>
  );
}
