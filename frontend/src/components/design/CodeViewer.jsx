import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const TABS = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JS' },
];

export default function CodeViewer({ code }) {
  const [active, setActive] = useState('html');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code[active] || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between bg-gray-100 px-3 py-2 dark:bg-gray-800">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                active === tab.key
                  ? 'bg-white text-brand-600 shadow dark:bg-gray-900'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded bg-brand-600 px-3 py-1 text-xs font-medium text-white hover:bg-brand-700"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre className="max-h-[420px] overflow-auto bg-gray-900 p-4 text-xs text-gray-100">
        <code>{code[active] || '/* empty */'}</code>
      </pre>
    </div>
  );
}
