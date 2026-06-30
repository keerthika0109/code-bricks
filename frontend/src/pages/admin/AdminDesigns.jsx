import { useEffect, useState } from 'react';
import { adminApi } from '../../api/admin';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import LivePreviewFrame from '../../components/design/LivePreviewFrame';

const EMPTY_FORM = {
  section_id: '',
  section_slug: '',
  title: '',
  description: '',
  html: '<!-- Paste your HTML here -->',
  css: '/* Paste your CSS here */',
  js: '// Paste your JS here (optional)',
  tags: '',
};

export default function AdminDesigns() {
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    adminApi.listSections().then((res) => setSections(res.data)).catch(() => {});
  }, []);

  const handleSectionChange = (e) => {
    const section = sections.find((s) => String(s.id) === e.target.value);
    setForm({ ...form, section_id: section?.id || '', section_slug: section?.slug || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
      await adminApi.createDesign(payload);
      showToast('Design created and published!');
      setForm(EMPTY_FORM);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Design</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
            <select
              required
              value={form.section_id}
              onChange={handleSectionChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="">Select a section…</option>
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="e.g. Neon Glow Login"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              placeholder="modern, gradient, glassmorphism"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">HTML</label>
            <textarea
              required
              rows={8}
              value={form.html}
              onChange={(e) => setForm({ ...form, html: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">CSS</label>
            <textarea
              rows={8}
              value={form.css}
              onChange={(e) => setForm({ ...form, css: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">JS (optional)</label>
            <textarea
              rows={5}
              value={form.js}
              onChange={(e) => setForm({ ...form, js: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <Button type="submit" loading={saving} className="w-full">Publish Design</Button>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Live Preview</p>
          <div className="h-[600px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <LivePreviewFrame html={form.html} css={form.css} js={form.js} />
          </div>
        </div>
      </form>
    </div>
  );
}
