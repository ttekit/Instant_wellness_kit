import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className="w-64 shrink-0 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <Topbar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
