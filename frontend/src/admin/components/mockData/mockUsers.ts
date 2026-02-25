export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  status: "Active" | "Blocked";
}

export const mockUsers: User[] = [
  {
    id: "usr-001",
    name: "Alex Morgan",
    email: "alex@betterme.io",
    role: "admin",
    status: "Active",
  },
  {
    id: "usr-002",
    name: "Jordan Lee",
    email: "jordan@betterme.io",
    role: "editor",
    status: "Active",
  },
  {
    id: "usr-003",
    name: "Casey Kim",
    email: "casey@betterme.io",
    role: "editor",
    status: "Blocked",
  },
  {
    id: "usr-004",
    name: "Taylor Chen",
    email: "taylor@betterme.io",
    role: "admin",
    status: "Active",
  },
  {
    id: "usr-005",
    name: "Riley Patel",
    email: "riley@betterme.io",
    role: "editor",
    status: "Active",
  },
];
