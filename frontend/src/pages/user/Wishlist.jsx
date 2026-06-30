import { useEffect, useState } from 'react';
import { wishlistApi } from '../../api/wishlist';
import { useToast } from '../../components/common/Toast';
import DesignCard from '../../components/design/DesignCard';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const load = () => {
    setLoading(true);
    wishlistApi
      .list()
      .then((res) => setItems(res.data))
      .catch((err) => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (designId) => {
    try {
      await wishlistApi.remove(designId);
      setItems((prev) => prev.filter((i) => i.design_id !== designId));
      showToast('Removed from wishlist.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h1>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">You haven't saved any designs yet. Browse a section and tap the heart icon!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <DesignCard
              key={item.id}
              design={item.design}
              wishlisted
              onToggleWishlist={() => handleRemove(item.design_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
