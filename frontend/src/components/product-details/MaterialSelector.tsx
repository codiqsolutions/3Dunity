import React from 'react';
import { Layers, Info } from 'lucide-react';
import { MaterialOption } from '../../types/product';

export interface MaterialSelectorProps {
  options: MaterialOption[];
  selectedMaterial: string;
  onSelectMaterial: (material: string, priceModifier: number) => void;
}

export const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  options,
  selectedMaterial,
  onSelectMaterial,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="custom-option-group material-option-group">
      <div className="option-group-label-row">
        <label className="option-group-label">
          <Layers size={15} className="text-primary-blue" />
          <span>Printing Material:</span>
          <strong className="selected-val-preview">{selectedMaterial}</strong>
        </label>
      </div>

      <div className="material-options-grid">
        {options.map((opt) => {
          const isSelected =
            selectedMaterial.toLowerCase().includes(opt.material.toLowerCase()) ||
            opt.material.toLowerCase().includes(selectedMaterial.toLowerCase());

          return (
            <button
              key={opt.material}
              type="button"
              onClick={() => onSelectMaterial(opt.material, opt.priceModifier)}
              className={`material-select-card ${isSelected ? 'is-selected' : ''}`}
            >
              <div className="card-top-row">
                <span className="material-name">{opt.material}</span>
                <span className={`material-cost-badge ${opt.priceModifier > 0 ? 'cost-extra' : 'cost-included'}`}>
                  {opt.priceModifier > 0 ? `+₹${opt.priceModifier}` : 'Standard'}
                </span>
              </div>
              {opt.description && (
                <p className="material-sub-desc">{opt.description}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

