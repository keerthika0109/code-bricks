import { useEffect, useState, useCallback } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Search } from 'lucide-react';
import { designsApi } from '../../api/designs';
import { wishlistApi } from '../../api/wishlist';
import { useToast } from '../../components/common/Toast';
import DesignCard from '../../components/design/DesignCard';

export default function SectionDesigns() {
  const { slug } = useParams();
  const { sections } = useOutletContext();
  const { showToast } = useToast();

  const [designs, setDesigns] = useState([]);
  const [search, setSearch] = useState('');
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const section = sections.find((s) => s.slug === slug);

  const loadDesigns = useCallback(async () => {
    setLoading(true);
    try {
      const res = await designsApi.list({ section_slug: slug, search: search || undefined });
      setDesigns(res.data);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [slug, search]);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  useEffect(() => {
    wishlistApi
      .list()
      .then((res) => setWishlistIds(new Set(res.data.map((w) => w.design_id))))
      .catch(() => {});
  }, []);

  const handleToggleWishlist = async (designId) => {
    try {
      const res = await wishlistApi.toggle(designId);
      setWishlistIds((prev) => {
        const next = new Set(prev);
        if (res.data.wishlisted) next.add(designId);
        else next.delete(designId);
        return next;
      });
      showToast(res.message);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{section?.name || slug}</h1>
          <p className="text-sm text-gray-500">{section?.description}</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search designs…"
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading designs…</p>
      ) : designs.length === 0 ? (
        <p className="text-sm text-gray-500">No designs found yet in this section.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {designs.map((design) => (
            <DesignCard
              key={design.id}
              design={design}
              wishlisted={wishlistIds.has(design.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
