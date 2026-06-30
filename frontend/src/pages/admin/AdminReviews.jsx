import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .listReviews({ status: statusFilter || undefined })
      .then((res) => setReviews(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [statusFilter]);

  const handleApprove = async (id) => {
    try {
      await adminApi.approveReview(id);
      showToast('Review approved.');
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminApi.rejectReview(id);
      showToast('Review rejected.');
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reviews</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="">All</option>
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews here.</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {r.user?.name} {r.rating && <span className="text-amber-500">· {'★'.repeat(r.rating)}</span>}
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{r.comment}</p>
                  {r.design && <p className="mt-1 text-xs text-gray-400">On design: {r.design.title}</p>}
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                  r.status === 'approved' ? 'bg-green-100 text-green-700' :
                  r.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {r.status}
                </span>
              </div>
              {r.status === 'pending' && (
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(r.id)}>Approve</Button>
                  <Button size="sm" variant="danger" onClick={() => handleReject(r.id)}>Reject</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
