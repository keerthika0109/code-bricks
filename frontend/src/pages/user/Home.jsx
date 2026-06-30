import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as Icons from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const { sections } = useOutletContext();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hey {user?.name?.split(' ')[0]} 👋</h1>
      <p className="mt-1 text-sm text-gray-500">Pick a category below to browse 50+ ready-to-use designs.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {sections.map((section) => {
          const Icon = Icons[toPascalCase(section.icon)] || Icons.Square;
          return (
            <Link
              key={section.id}
              to={`/app/sections/${section.slug}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-5 text-center transition-colors hover:border-brand-400 hover:bg-brand-50 dark:border-gray-800 dark:hover:bg-gray-900"
            >
              <Icon size={24} className="text-brand-600" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{section.name}</span>
              <span className="text-xs text-gray-400">{section.designs_count ?? 0} designs</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function toPascalCase(slug = '') {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}
