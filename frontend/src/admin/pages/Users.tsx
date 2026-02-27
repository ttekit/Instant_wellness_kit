import { useState, useEffect } from "react";
import React from "react";
import SearchBar from "../components/ui/SearchBar";
import Status from "../components/ui/Status";
import DropdownMenu from "../components/ui/DropdownMenu";
import Window from "../components/ui/Window";
import ConfirmDelete from "../components/ui/ConfirmDelete";
import { UIUser, BackendRole, BackendUser, NewUserForm, emptyUser } from "../types";
const getToken = (): string => localStorage.getItem("access_token") || "";


export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [users, setUsers] = useState<UIUser[]>([]);
  const [rolesList, setRolesList] = useState<BackendRole[]>([]);
  const [editUser, setEditUser] = useState<UIUser | null>(null);
  const [newUser, setNewUser] = useState<NewUserForm>(emptyUser);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<UIUser | null>(null);

  const fetchRoles = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Failed to fetch roles");
      const data: BackendRole[] = await response.json();
      setRolesList(data);


      if (data.length > 0) {
        setNewUser((prev) => ({ ...prev, roleId: data[0].id }));
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: BackendUser[] = await response.json();

      const mappedUsers: UIUser[] = data.map((u) => ({
        id: u.id.toString(),
        name: `${u.name} ${u.surname}`.trim(),
        email: u.email,
        role: u.role?.name || "Unknown",
        roleId: u.roleId,
        status: "Active",
      }));
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchRoles().then(() => fetchUsers());
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const saveEdit = async () => {
    if (!editUser) return;
    const [name, ...surnameParts] = editUser.name.split(" ");
    const surname = surnameParts.join(" ") || "Unknown";

    try {
      const response = await fetch(`${import.meta.env.VITE_API_USERS_URL}/${editUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name,
          surname,
          email: editUser.email,
          roleId: Number(editUser.roleId),
        }),
      });

      if (!response.ok) throw new Error("Failed to update user");
      await fetchUsers();
      setEditUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const addUser = async () => {
    const [name, ...surnameParts] = newUser.name.split(" ");
    const surname = surnameParts.join(" ") || "Unknown";

    try {
      const response = await fetch(import.meta.env.VITE_API_USERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name,
          surname,
          email: newUser.email,
          password: newUser.password,
          roleId: Number(newUser.roleId),
        }),
      });

      if (!response.ok) throw new Error("Failed to create user");

      await fetchUsers();

      setNewUser({ ...emptyUser, roleId: rolesList[0]?.id || 0 });
      setShowAdd(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_USERS_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!response.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const changeStatus = (id: string, newStatus: "Active" | "Blocked") => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: newStatus } : u)));
  };


  const uniqueRoles = Array.from(new Set(users.map((u) => u.role)));

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
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 capitalize"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
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
                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 capitalize">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium inline-block text-white">
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
                    onChangeStatus={(s) => changeStatus(user.id, s as "Active" | "Blocked")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Window isOpen={!!editUser} onClose={() => setEditUser(null)} onSave={saveEdit} title="Edit User">
        {editUser && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm capitalize"
                value={editUser.roleId}
                onChange={(e) => setEditUser({ ...editUser, roleId: Number(e.target.value) })}
              >
                {rolesList.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Window>

      <Window isOpen={showAdd} onClose={() => setShowAdd(false)} onSave={addUser} title="Add User" saveText="Add User">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name (First and Last)</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={newUser.name}
              placeholder="e.g. John Doe"
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              type="password"
              placeholder="Minimum 6 characters"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm capitalize"
              value={newUser.roleId}
              onChange={(e) => setNewUser({ ...newUser, roleId: Number(e.target.value) })}
            >
              {rolesList.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Window>

      <ConfirmDelete
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={() => {
          if (confirmDelete) {
            deleteUser(confirmDelete.id);
            setConfirmDelete(null);
          }
        }}
        name={confirmDelete?.name ?? ""}
        type="User"
      />
    </div>
  );
}