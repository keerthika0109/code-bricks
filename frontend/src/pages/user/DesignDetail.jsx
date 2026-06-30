import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, ArrowLeft } from 'lucide-react';
import { designsApi } from '../../api/designs';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';
import LivePreviewFrame from '../../components/design/LivePreviewFrame';
import Customizer from '../../components/design/Customizer';
import CodeViewer from '../../components/design/CodeViewer';

export default function DesignDetail() {
  const { id } = useParams();
  const { showToast } = useToast();

  const [design, setDesign] = useState(null);
  const [code, setCode] = useState({ html: '', css: '', js: '' });
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    designsApi
      .get(id)
      .then((res) => {
        setDesign(res.data.design);
        setCode(res.data.code);
        setPreviewCode(res.data.code);
      })
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  const previewRequestId = useRef(0);

  const handleCustomizerChange = useCallback(
    async (newOverrides) => {
      setOverrides(newOverrides);
      const requestId = ++previewRequestId.current;
      try {
        const res = await designsApi.preview(id, newOverrides);
        // Ignore this response if a newer customizer change has already
        // fired since this request started — prevents an older, slower
        // request from overwriting the preview with stale colors.
        if (requestId === previewRequestId.current) {
          setPreviewCode(res.data);
        }
      } catch (err) {
        showToast(err.message, 'error');
      }
    },
    [id]
  );

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await designsApi.download(id, overrides, `${design.slug}.zip`);
      showToast('Download started!');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading design…</p>;
  if (!design) return <p className="text-sm text-gray-500">Design not found.</p>;

  return (
    <div>
      <Link to={`/app/sections/${design.section.slug}`} className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-600">
        <ArrowLeft size={16} /> Back to {design.section.name}
      </Link>

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{design.title}</h1>
          <p className="text-sm text-gray-500">{design.description}</p>
        </div>
        <Button onClick={handleDownload} loading={downloading}>
          <Download size={16} /> Download ZIP
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-[420px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <LivePreviewFrame {...previewCode} title={design.title} />
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Get the Code</h2>
            <CodeViewer code={previewCode} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Customize</h2>
            <Customizer customizableVars={design.customizable_vars} onChange={handleCustomizerChange} />
          </div>

          {design.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {design.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
