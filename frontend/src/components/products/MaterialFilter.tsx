import React from 'react';
import { Box } from 'lucide-react';

export interface MaterialFilterProps {
  selectedMaterial: string;
  onSelectMaterial: (material: string) => void;
}

const MATERIALS = [
  { id: 'all', label: 'All Materials', desc: 'Any filament or resin' },
  { id: 'PLA', label: 'PLA', desc: 'Eco-friendly & detailed' },
  { id: 'ABS', label: 'ABS', desc: 'Impact resistant & rigid' },
  { id: 'PETG', label: 'PETG', desc: 'Durable & functional' },
  { id: 'Resin', label: 'Resin', desc: '8K Ultra-fine precision' },
  { id: 'Other', label: 'Other', desc: 'Nylon, TPU & composites' },
];

export const MaterialFilter: React.FC<MaterialFilterProps> = ({
  selectedMaterial,
  onSelectMaterial,
}) => {
  return (
    <div className="filter-group material-filter-group">
      <h3 className="filter-group-title">
        <Box size={16} className="filter-icon" />
        <span>Material</span>
      </h3>

      <div className="filter-radio-grid">
        {MATERIALS.map((mat) => {
          const isSelected =
            (mat.id === 'all' && (!selectedMaterial || selectedMaterial === 'all')) ||
            selectedMaterial.toLowerCase() === mat.id.toLowerCase();

          return (
            <label
              key={mat.id}
              className={`filter-radio-pill ${isSelected ? 'is-selected' : ''}`}
            >
              <input
                type="radio"
                name="material_filter"
                value={mat.id}
                checked={isSelected}
                onChange={() => onSelectMaterial(mat.id)}
                className="sr-only"
              />
              <span className="material-pill-content">
                <span className="material-name">{mat.label}</span>
                <span className="material-desc">{mat.desc}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

