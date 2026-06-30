import { Link } from 'react-router-dom';
import { Heart, Eye, Download } from 'lucide-react';

export default function DesignCard({ design, wishlisted, onToggleWishlist }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Link to={`/app/designs/${design.id}`}>
        <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          {design.thumbnail ? (
            <img src={design.thumbnail} alt={design.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              Preview unavailable
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={() => onToggleWishlist?.(design.id)}
        className={`absolute right-2 top-2 rounded-full p-2 shadow ${
          wishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'
        }`}
        title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      <div className="p-3">
        <Link to={`/app/designs/${design.id}`} className="block truncate font-semibold text-gray-900 hover:text-brand-600 dark:text-gray-100">
          {design.title}
        </Link>
        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">{design.description}</p>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1"><Eye size={12} /> {design.views_count ?? 0}</span>
          <span className="flex items-center gap-1"><Download size={12} /> {design.downloads_count ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
