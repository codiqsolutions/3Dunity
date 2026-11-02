import React, { useState } from 'react';
import { Layers, Rotate3d, Box, Cpu, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCart } from '../../context/CartContext';

interface MaterialOption {
  id: string;
  name: string;
  type: string;
  colorName: string;
  hex: string;
  weightGrams: number;
  printTime: string;
  layerHeight: string;
  price: number;
  image: string;
}

const materials: MaterialOption[] = [
  {
    id: 'pla-tough',
    name: 'PLA Tough Pro',
    type: 'High Precision FDM',
    colorName: 'Signal Blue',
    hex: '#087FC3',
    weightGrams: 210,
    printTime: '7h 45m',
    layerHeight: '0.12mm',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'carbon-nylon',
    name: 'Carbon-Fiber PA12',
    type: 'Industrial Aerospace',
    colorName: 'Carbon Matte',
    hex: '#1E293B',
    weightGrams: 185,
    printTime: '8h 20m',
    layerHeight: '0.10mm',
    price: 68.0,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sla-resin',
    name: 'Engineering Tough Resin',
    type: '8K SLA Photopolymer',
    colorName: 'Amber Tech',
    hex: '#F59A16',
    weightGrams: 195,
    printTime: '6h 30m',
    layerHeight: '0.05mm (50μm)',
    price: 74.5,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'petg-pro',
    name: 'PETG Impact Grade',
    type: 'Chemical & UV Resistant',
    colorName: 'Emerald Matrix',
    hex: '#55B832',
    weightGrams: 220,
    printTime: '7h 15m',
    layerHeight: '0.16mm',
    price: 52.0,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
];

export const Interactive3DShowcase: React.FC = () => {
  const [selectedMat, setSelectedMat] = useState<MaterialOption>(materials[0]);
  const [viewMode, setViewMode] = useState<'solid' | 'layers' | 'wireframe'>('solid');
  const [rotationAngle, setRotationAngle] = useState(0);
  const { addItem } = useCart();

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  const handleAddToCart = () => {
    addItem(
      {
        _id: 'planetary-gearbox-speed-reducer',
        name: 'Planetary Gearbox Speed Reducer (3:1)',
        slug: 'planetary-gearbox-speed-reducer',
        shortDescription: 'Industrial-grade functional herringbone planetary gear set.',
        description: 'Precision engineered 3:1 ratio planetary gearbox with self-aligning herringbone teeth.',
        category: 'mechanical-engineering',
        categoryName: 'Mechanical & Engineering',
        price: selectedMat.price,
        rating: 4.9,
        reviewCount: 42,
        images: [selectedMat.image],
        thumbnail: selectedMat.image,
        specs: {
          technology: selectedMat.type.includes('SLA') ? 'SLA Resin' : 'FDM',
          layerResolution: selectedMat.layerHeight,
          printTime: selectedMat.printTime,
          weightGrams: selectedMat.weightGrams,
          dimensionsMm: { length: 110, width: 110, height: 65 },
          infill: '40% Gyroid Structural',
          availableMaterials: [selectedMat.name],
          colors: [{ name: selectedMat.colorName, hex: selectedMat.hex }],
        },
        stock: 15,
        isFeatured: true,
        isBestSeller: true,
        isNewArrival: false,
        tags: ['gearbox', 'robotics'],
        cadFileAvailable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      1,
      selectedMat.name,
      selectedMat.colorName
    );
  };

  return (
    <div className="showcase-card">
      {/* Top Header Bar */}
      <div className="showcase-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-green)',
            }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-navy)' }}>
            CAD Simulator • Live Spec Engine
          </span>
        </div>

        {/* View mode toggle pills */}
        <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#F1F5F9', padding: '2px', borderRadius: 'var(--radius-sm)' }}>
          <button
            onClick={() => setViewMode('solid')}
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.725rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: viewMode === 'solid' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'solid' ? 'var(--color-navy)' : 'var(--color-text-secondary)',
              boxShadow: viewMode === 'solid' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Solid
          </button>
          <button
            onClick={() => setViewMode('layers')}
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.725rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: viewMode === 'layers' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'layers' ? 'var(--color-navy)' : 'var(--color-text-secondary)',
              boxShadow: viewMode === 'layers' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Sliced
          </button>
          <button
            onClick={() => setViewMode('wireframe')}
            style={{
              padding: '0.25rem 0.55rem',
              fontSize: '0.725rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: viewMode === 'wireframe' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'wireframe' ? 'var(--color-navy)' : 'var(--color-text-secondary)',
              boxShadow: viewMode === 'wireframe' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Wireframe
          </button>
        </div>
      </div>

      {/* 3D Model Viewport Area */}
      <div className="showcase-viewport">
        {/* Active badges overlay */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', zIndex: 2 }}>
          <Badge variant="blue" size="sm" icon={<Cpu size={12} />}>
            Herringbone 3:1 Reducer
          </Badge>
          <Badge variant="neutral" size="sm">
            {selectedMat.layerHeight} Layer Pitch
          </Badge>
        </div>

        {/* Rotate Button */}
        <button
          onClick={handleRotate}
          title="Rotate 90 degrees"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            zIndex: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-navy)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition-fast)',
          }}
        >
          <Rotate3d size={18} />
        </button>

        {/* Dynamic Image with View Mode Filter and Transform */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `rotate(${rotationAngle}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={selectedMat.image}
            alt={selectedMat.name}
            className="showcase-model-img"
            style={{
              filter:
                viewMode === 'wireframe'
                  ? 'contrast(180%) invert(30%) hue-rotate(180deg)'
                  : viewMode === 'layers'
                  ? 'contrast(140%) brightness(1.1) saturate(1.3)'
                  : 'none',
            }}
          />
        </div>

        {/* Layer lines graphical effect when in sliced mode */}
        {viewMode === 'layers' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'repeating-linear-gradient(0deg, rgba(8, 127, 195, 0.15) 0px, rgba(8, 127, 195, 0.15) 2px, transparent 2px, transparent 6px)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>

      {/* Material & Spec Configuration Footer */}
      <div className="showcase-controls">
        {/* Material Selection Pills */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-navy)' }}>
              Select Build Material:
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              {selectedMat.name}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
            {materials.map((mat) => {
              const isSelected = selectedMat.id === mat.id;
              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMat(mat)}
                  style={{
                    padding: '0.5rem 0.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: mat.hex,
                      border: '1px solid rgba(0,0,0,0.1)',
                      boxShadow: isSelected ? `0 0 0 2px ${mat.hex}` : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.675rem',
                      fontWeight: 600,
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {mat.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Fabrication Metrics */}
        <div className="showcase-spec-pills">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Box size={14} color="var(--color-primary)" />
            <span>Mass: <strong>{selectedMat.weightGrams}g</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Layers size={14} color="var(--color-primary)" />
            <span>Print: <strong>{selectedMat.printTime}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} color="var(--color-orange)" />
            <span>Price: <strong style={{ color: 'var(--color-navy)', fontSize: '0.9rem' }}>${selectedMat.price.toFixed(2)}</strong></span>
          </div>
        </div>

        {/* Quick Add To Cart from Showcase */}
        <Button
          variant="primary"
          size="md"
          fullWidth
          leftIcon={<ShoppingBag size={16} />}
          onClick={handleAddToCart}
        >
          Add This Spec to Cart • ${selectedMat.price.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

