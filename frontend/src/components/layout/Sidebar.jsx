import { NavLink } from 'react-router-dom';
import {
  LogIn, LogOut, Sparkles, CreditCard, MousePointerClick, FileText,
  Loader, Square, Search, Moon, LayoutGrid, Smartphone, Calendar,
  CalendarDays, LayoutDashboard, Bell, MessageSquare, Mail, PanelTop,
  PanelBottom, Heart, User, Sun, ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const ICONS = {
  'log-in': LogIn,
  'log-out': LogOut,
  sparkles: Sparkles,
  'credit-card': CreditCard,
  'mouse-pointer-click': MousePointerClick,
  'file-text': FileText,
  loader: Loader,
  square: Square,
  search: Search,
  moon: Moon,
  'layout-grid': LayoutGrid,
  smartphone: Smartphone,
  calendar: Calendar,
  'calendar-days': CalendarDays,
  'layout-dashboard': LayoutDashboard,
  bell: Bell,
  'message-square': MessageSquare,
  mail: Mail,
  'panel-top': PanelTop,
  'panel-bottom': PanelBottom,
};

export default function Sidebar({ sections, onClose }) {
  const { isDark, toggleTheme } = useTheme();
  const { logout, isSuperAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-lg font-bold text-brand-600">CodeBricks</span>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-500">✕</button>
        )}
      </div>

      {/* Super admins browsing the user side get a clearly highlighted
          way back — without this, the only way back was manually typing
          /admin in the URL bar. */}
      {isSuperAdmin && (
        <div className="px-3 pb-2">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-amber-400 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 shadow-sm transition-colors hover:bg-amber-100 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900"
          >
            <ShieldCheck size={16} /> Back to Admin Side
          </NavLink>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        <NavLink to="/app/wishlist" className={linkClass}>
          <Heart size={18} /> Wishlist
        </NavLink>
        <NavLink to="/app/profile" className={linkClass}>
          <User size={18} /> Profile
        </NavLink>

        <div className="my-3 border-t border-gray-100 dark:border-gray-800" />

        {sections.map((section) => {
          const Icon = ICONS[section.icon] || Square;
          return (
            <NavLink key={section.id} to={`/app/sections/${section.slug}`} className={linkClass}>
              <Icon size={18} />
              {section.name}
            </NavLink>
          );
        })}

        <div className="my-3 border-t border-gray-100 dark:border-gray-800" />

        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}
