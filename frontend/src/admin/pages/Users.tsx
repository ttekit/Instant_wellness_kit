import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import DropdownMenu from "../components/ui/DropdownMenu";
import Window from "../components/ui/Window";
import { User } from "../types";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const emptyUser: User = {
  id: "",
  name: "",
  email: "",
  role: "editor",
  status: "Active",
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>(emptyUser);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<User | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const saveEdit = () => {
    if (!editUser) return;
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  const addUser = () => {
    setUsers([...users, { ...newUser, id: `usr-${Date.now()}` }]);
    setNewUser(emptyUser);
    setShowAdd(false);
  };

  const changeStatus = (id, newStatus) =>
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-4 mr-4 flex items-center gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search users by name or email..."
              value={search}
              onChange={setSearch}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block text-white ${user.role === "admin" ? "bg-green-600" : "bg-gray-700"}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Status stat={user.status} />
                </td>

                <td className="px-6 py-4 text-right">
                  <DropdownMenu
                    order={user}
                    unblockStatus="Active"
                    onEdit={() => setEditUser(user)}
                    onDelete={() => setConfirmDelete(user)}
                    onChangeStatus={(s) => changeStatus(user.id, s)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Window
        isOpen={!!editUser}
        onClose={() => setEditUser(null)}
        onSave={saveEdit}
        title="Edit User"
      >
        {editUser && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    role: e.target.value as User["role"],
                  })
                }
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
          </div>
        )}
      </Window>

      <Window
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={addUser}
        title="Add User"
        saveText="Add User"
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value as User["role"] })
              }
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
        </div>
      </Window>
      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          deleteUser(confirmDelete?.id ?? "");
          setConfirmDelete(null);
        }}
        name={confirmDelete?.name ?? ""}
        type="User"
      />
    </div>
  );
}
