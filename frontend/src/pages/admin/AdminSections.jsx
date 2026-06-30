import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function AdminSections() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', icon: '', description: '' });
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .listSections()
      .then((res) => setSections(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.createSection(form);
      showToast('Section created.');
      setForm({ name: '', icon: '', description: '' });
      setShowForm(false);
      load();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (section) => {
    if (!confirm(`Delete section "${section.name}"? All its designs will be removed too.`)) return;
    try {
      await adminApi.deleteSection(section.id);
      showToast('Section deleted.');
      load();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sections</h1>
        <Button onClick={() => setShowForm((s) => !s)}>{showForm ? 'Cancel' : '+ New Section'}</Button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-6 space-y-3 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
          <input
            required
            placeholder="Section name (e.g. Sliders)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <input
            placeholder="lucide-react icon name (e.g. sliders-horizontal)"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <Button type="submit" loading={saving}>Create Section</Button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{s.name}</h3>
                <Button size="sm" variant="danger" onClick={() => handleDelete(s)}>Delete</Button>
              </div>
              <p className="mt-1 text-xs text-gray-500">{s.description}</p>
              <p className="mt-2 text-xs text-gray-400">{s.designs_count ?? 0} designs · slug: {s.slug}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
