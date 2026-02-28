import { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import DropdownMenu from "../components/ui/DropdownMenu";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";

const emptyUser: any = {
  id: "",
  name: "",
  email: "",
  role: "",
  roleId: "",
  status: "Active",
};

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [newUser, setNewUser] = useState<any>(emptyUser);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<any | null>(null);

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';
      const res = await fetch(`${baseUrl}/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setRoles(data);
        setNewUser({ ...emptyUser, roleId: data[0]?.id || "" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';
      const res = await fetch(`${baseUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const normalizedData = data.map((u: any) => ({
          ...u,
          name: u.surname ? `${u.name} ${u.surname}` : u.name,
          role: typeof u.role === 'object' && u.role !== null ? u.role.name : String(u.role || ''),
          roleId: typeof u.role === 'object' && u.role !== null ? u.role.id : u.roleId
        }));
        setUsers(normalizedData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || (u.role && u.role.toLowerCase() === roleFilter.toLowerCase());
    return matchSearch && matchRole;
  });

  const saveEdit = async () => {
    if (!editUser) return;
    try {
      const token = localStorage.getItem("access_token");
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';

      const nameParts = editUser.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const surname = nameParts.slice(1).join(" ") || " ";

      const res = await fetch(`${baseUrl}/users/${editUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: firstName,
          surname: surname,
          email: editUser.email,
          roleId: editUser.roleId
        })
      });

      if (res.ok) {
        fetchUsers();
        setEditUser(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';

      const nameParts = newUser.name.trim().split(" ");
      const firstName = nameParts[0] || "New";
      const surname = nameParts.slice(1).join(" ") || "User";

      const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: firstName,
          surname: surname,
          email: newUser.email,
          password: "password123",
          roleId: newUser.roleId
        })
      });

      if (res.ok) {
        fetchUsers();
        setNewUser({ ...emptyUser, roleId: roles[0]?.id || "" });
        setShowAdd(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeStatus = async (id: string | number, newStatus: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';
      const res = await fetch(`${baseUrl}/users/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      const token = localStorage.getItem("access_token");
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200';
      const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

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
            {roles.map((r) => (
              <option key={r.id} value={r.name.toLowerCase()}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block text-white ${user.role?.toLowerCase() === "admin" ? "bg-green-600" : "bg-gray-700"}`}
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
                value={editUser.roleId || ""}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    roleId: Number(e.target.value),
                  })
                }
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
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
              value={newUser.roleId || ""}
              onChange={(e) =>
                setNewUser({ ...newUser, roleId: Number(e.target.value) })
              }
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
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