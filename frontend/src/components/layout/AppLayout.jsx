import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, ShieldCheck, ArrowLeftRight } from 'lucide-react';
import Sidebar from './Sidebar';
import { sectionsApi } from '../../api/sections';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const [sections, setSections] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSuperAdmin } = useAuth();

  useEffect(() => {
    sectionsApi
      .list()
      .then((res) => setSections(res.data))
      .catch(() => setSections([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Highlighted banner — only visible to a super admin currently
          browsing the normal user experience. Impossible to miss, and
          always one click away from getting back to the admin panel. */}
      {isSuperAdmin && (
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} />
            You're viewing the <strong>user side</strong> as a super admin.
          </span>
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 font-semibold hover:bg-white/30 transition-colors"
          >
            <ArrowLeftRight size={14} />
            Back to Admin Panel
          </Link>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar sections={sections} />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="relative z-50">
              <Sidebar sections={sections} onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 lg:hidden">
            <button onClick={() => setMobileOpen(true)} className="text-gray-600 dark:text-gray-300">
              <Menu size={22} />
            </button>
            <span className="text-lg font-bold text-brand-600">CodeBricks</span>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading ? (
              <div className="text-sm text-gray-500">Loading sections…</div>
            ) : (
              <Outlet context={{ sections }} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
