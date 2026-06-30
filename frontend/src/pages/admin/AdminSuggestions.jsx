import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .listSuggestions({ status: statusFilter || undefined })
      .then((res) => setSuggestions(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const handleMarkRead = async (id) => {
    try {
      await adminApi.markSuggestionRead(id);
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleResolve = async (id) => {
    try {
      await adminApi.markSuggestionResolved(id);
      showToast('Marked as resolved.');
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this suggestion?')) return;
    try {
      await adminApi.deleteSuggestion(id);
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Suggestions / Contact Inbox</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : suggestions.length === 0 ? (
        <p className="text-sm text-gray-500">No messages here.</p>
      ) : (
        <div className="space-y-3">
          {suggestions.map((s) => (
            <div
              key={s.id}
              onClick={() => s.status === 'unread' && handleMarkRead(s.id)}
              className="cursor-pointer rounded-xl border border-gray-200 p-4 dark:border-gray-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {s.subject} {s.is_from_registered_user && <span className="text-xs text-brand-600">(registered user)</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{s.name} · {s.email}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{s.message}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                  s.status === 'unread' ? 'bg-amber-100 text-amber-700' :
                  s.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {s.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
                {s.status !== 'resolved' && (
                  <Button size="sm" onClick={() => handleResolve(s.id)}>Mark Resolved</Button>
                )}
                <Button size="sm" variant="danger" onClick={() => handleDelete(s.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
