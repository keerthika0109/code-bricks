import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { profileApi } from '../../api/feedback';
import { reviewsApi } from '../../api/feedback';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function Profile() {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: user?.name || '', password: '', password_confirmation: '' });
  const [savingProfile, setSavingProfile] = useState(false);

  const [review, setReview] = useState({ comment: '', rating: 5 });
  const [sendingReview, setSendingReview] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const payload = { name: form.name };
      if (form.password) {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
      }
      const res = await profileApi.update(payload);
      setUser(res.data);
      localStorage.setItem('codebricks_user', JSON.stringify(res.data));
      showToast('Profile updated successfully.');
      setForm((f) => ({ ...f, password: '', password_confirmation: '' }));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSendingReview(true);
    try {
      await reviewsApi.submit({ comment: review.comment, rating: review.rating });
      showToast('Thanks! Your review was submitted for approval.');
      setReview({ comment: '', rating: 5 });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSendingReview(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <form onSubmit={handleProfileSave} className="space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Edit Profile</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password (optional)</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Leave blank to keep current password"
          />
        </div>
        {form.password && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        )}
        <Button type="submit" loading={savingProfile}>Save Changes</Button>
      </form>

      <form onSubmit={handleReviewSubmit} className="space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Send a Review / Feedback</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <select
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Your feedback</label>
          <textarea
            required
            rows={3}
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="What do you think of CodeBricks?"
          />
        </div>
        <Button type="submit" loading={sendingReview}>Submit Review</Button>
      </form>
    </div>
  );
}
