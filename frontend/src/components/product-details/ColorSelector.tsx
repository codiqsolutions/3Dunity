import React from 'react';
import { Palette, Check } from 'lucide-react';
import { ProductColor } from '../../types/product';

export interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string;
  onSelectColor: (colorName: string, priceModifier: number, image?: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  if (!colors || colors.length === 0) return null;

  const currentObj = colors.find((c) => c.name.toLowerCase() === selectedColor.toLowerCase()) || colors[0];

  return (
    <div className="custom-option-group color-option-group">
      <div className="option-group-label-row">
        <label className="option-group-label">
          <Palette size={15} className="text-primary-blue" />
          <span>Select Color:</span>
          <strong className="selected-val-preview">{currentObj?.name}</strong>
          {currentObj?.priceModifier && currentObj.priceModifier > 0 ? (
            <span className="color-extra-pill">(+₹{currentObj.priceModifier})</span>
          ) : null}
        </label>
      </div>

      <div className="color-swatches-row" role="radiogroup" aria-label="Product color choices">
        {colors.map((color) => {
          const isSelected = selectedColor.toLowerCase() === color.name.toLowerCase();
          const isLight = ['#FFFFFF', '#FAF9F6', '#F8FAFC', '#F1F5F9'].includes(
            color.hex.toUpperCase()
          );

          return (
            <button
              key={color.name}
              type="button"
              onClick={() => onSelectColor(color.name, color.priceModifier || 0, color.image)}
              className={`color-swatch-circle ${isSelected ? 'is-selected' : ''}`}
              title={`${color.name}${color.priceModifier ? ` (+₹${color.priceModifier})` : ''}`}
              aria-label={color.name}
              aria-checked={isSelected}
              role="radio"
              style={{ backgroundColor: color.hex }}
            >
              {isSelected && (
                <Check
                  size={14}
                  color={isLight ? '#1E293B' : '#FFFFFF'}
                  strokeWidth={3}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

