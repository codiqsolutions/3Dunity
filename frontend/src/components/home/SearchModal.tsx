import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { Product } from '../../types/product';
import { Modal } from '../common/Modal';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await productApi.getAll({ search: query.trim(), limit: 6 });
        if (res.data) {
          setResults(res.data);
        }
      } catch (err) {
        console.warn('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search 3D Models & Specs" maxWidth="580px">
      <div>
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--color-primary)',
            backgroundColor: '#FFFFFF',
            marginBottom: '1.25rem',
          }}
        >
          <Search size={20} color="var(--color-primary)" />
          <input
            type="text"
            placeholder="Search by model name, robotics, gear, vase, SLA, PETG..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '0.95rem',
              color: 'var(--color-text)',
            }}
          />
          {loading ? (
            <Loader2 size={18} className="animate-spin" color="var(--color-text-secondary)" />
          ) : query ? (
            <button onClick={() => setQuery('')} style={{ color: '#94A3B8' }}>
              <X size={16} />
            </button>
          ) : null}
        </div>

        {/* Results list */}
        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {results.map((p) => (
                <div
                  key={p._id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                    e.currentTarget.style.borderColor = 'rgba(8, 127, 195, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  <img
                    src={p.thumbnail || p.images[0]}
                    alt={p.name}
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      {p.categoryName} • {p.specs.technology} • ${p.price.toFixed(2)}
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </div>
              ))}
            </div>
          ) : query.trim() && !loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-secondary)' }}>
              No matching 3D models found for "{query}". Try searching "gearbox", "vase", "magsafe", or "drone".
            </div>
          ) : (
            <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Popular Searches:</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['Planetary Gearbox', 'MagSafe Stand', 'Fibonacci Vase', 'Cybernetic Mech', 'Scale Villa', 'Drone Arm'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#F1F5F9',
                      fontSize: '0.785rem',
                      color: 'var(--color-navy)',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

