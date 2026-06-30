import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, PenSquare, Star, Inbox, LogOut, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { logout, user } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="px-4 py-4">
          <span className="text-lg font-bold text-brand-600">CodeBricks Admin</span>
          <p className="mt-0.5 text-xs text-gray-500">{user?.name}</p>
        </div>

        {/* Highlighted so it's unmistakably different from regular nav —
            this is a context switch (admin -> user), not just another page. */}
        <div className="px-3 pb-2">
          <NavLink
            to="/app"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-400 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-100 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
          >
            <Eye size={16} /> View User Side
          </NavLink>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <Users size={18} /> Users
          </NavLink>
          <NavLink to="/admin/sections" className={linkClass}>
            <FolderKanban size={18} /> Sections
          </NavLink>
          <NavLink to="/admin/designs" className={linkClass}>
            <PenSquare size={18} /> Designs
          </NavLink>
          <NavLink to="/admin/reviews" className={linkClass}>
            <Star size={18} /> Reviews
          </NavLink>
          <NavLink to="/admin/suggestions" className={linkClass}>
            <Inbox size={18} /> Suggestions
          </NavLink>

          <div className="my-3 border-t border-gray-100 dark:border-gray-800" />

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
