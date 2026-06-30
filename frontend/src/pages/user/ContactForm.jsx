import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { suggestionsApi } from '../../api/feedback';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function ContactForm() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await suggestionsApi.submit(form);
      showToast('Thanks for reaching out! We will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrors(err.errors || {});
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">Contact / Suggestions</h1>
      <p className="mb-6 text-sm text-gray-500">Found a bug? Want a new design added? Let us know.</p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
        {!user && (
          <>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject[0]}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message[0]}</p>}
        </div>

        <Button type="submit" loading={loading} className="w-full">Send</Button>
      </form>
    </div>
  );
}
