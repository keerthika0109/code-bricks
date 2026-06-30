import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, UserCheck, Inbox, Star, FolderKanban, PenSquare } from 'lucide-react';
import { adminApi } from '../../api/admin';
import { useToast } from '../../components/common/Toast';

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    adminApi
      .dashboard()
      .then((res) => setOverview(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading dashboard…</p>;
  if (!overview) return null;

  const cards = [
    { label: 'Total Users', value: overview.total_users, icon: Users, color: 'bg-blue-500' },
    { label: 'New Users (7 days)', value: overview.new_users_this_week, icon: UserPlus, color: 'bg-green-500' },
    { label: 'Old Users', value: overview.old_users_count, icon: UserCheck, color: 'bg-gray-500' },
    { label: 'Unread Suggestions', value: overview.unread_suggestions_count, icon: Inbox, color: 'bg-amber-500' },
    { label: 'Pending Reviews', value: overview.pending_reviews_count, icon: Star, color: 'bg-pink-500' },
    { label: 'Total Designs', value: overview.total_designs, icon: PenSquare, color: 'bg-purple-500' },
    { label: 'Total Sections', value: overview.total_sections, icon: FolderKanban, color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white ${c.color}`}>
              <c.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{c.value}</p>
            <p className="text-xs text-gray-500">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Newest Users</h2>
          <ul className="space-y-2">
            {overview.new_users.length === 0 && <p className="text-sm text-gray-500">No new users this week.</p>}
            {overview.new_users.map((u) => (
              <li key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-800 dark:text-gray-200">{u.name}</span>
                <span className="text-xs text-gray-400">{u.email}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/users" className="mt-3 inline-block text-sm text-brand-600 hover:underline">View all users →</Link>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Pending Reviews</h2>
          <ul className="space-y-2">
            {overview.recent_pending_reviews.length === 0 && <p className="text-sm text-gray-500">No pending reviews.</p>}
            {overview.recent_pending_reviews.map((r) => (
              <li key={r.id} className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{r.user?.name}:</span> {r.comment?.slice(0, 60)}…
              </li>
            ))}
          </ul>
          <Link to="/admin/reviews" className="mt-3 inline-block text-sm text-brand-600 hover:underline">Moderate reviews →</Link>
        </div>
      </div>
    </div>
  );
}
