import React from 'react';
import { Maximize2, Sliders } from 'lucide-react';
import { SizeOption } from '../../types/product';

export interface SizeSelectorProps {
  sizeOptions?: SizeOption[];
  allowCustomDimensions?: boolean;
  selectedSize: string;
  isCustomSizeActive: boolean;
  onSelectSize: (sizeName: string, priceModifier: number) => void;
  onToggleCustomSize: (active: boolean) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizeOptions = [],
  allowCustomDimensions = false,
  selectedSize,
  isCustomSizeActive,
  onSelectSize,
  onToggleCustomSize,
}) => {
  return (
    <div className="custom-option-group size-option-group">
      <div className="option-group-label-row">
        <label className="option-group-label">
          <Maximize2 size={15} className="text-primary-blue" />
          <span>Select Size / Scale:</span>
          <strong className="selected-val-preview">
            {isCustomSizeActive ? 'Bespoke Custom Scale' : selectedSize}
          </strong>
        </label>
      </div>

      <div className="size-options-grid">
        {sizeOptions.map((opt) => {
          const isSelected = !isCustomSizeActive && selectedSize === opt.name;

          return (
            <button
              key={opt.name}
              type="button"
              onClick={() => {
                onToggleCustomSize(false);
                onSelectSize(opt.name, opt.priceModifier);
              }}
              className={`size-select-pill ${isSelected ? 'is-selected' : ''}`}
            >
              <span className="size-pill-name">{opt.name}</span>
              <span className="size-pill-dims">{opt.dimensions}</span>
              {opt.priceModifier !== 0 && (
                <span className={`size-pill-delta ${opt.priceModifier > 0 ? 'extra' : 'discount'}`}>
                  {opt.priceModifier > 0 ? `+₹${opt.priceModifier}` : `-₹${Math.abs(opt.priceModifier)}`}
                </span>
              )}
            </button>
          );
        })}

        {allowCustomDimensions && (
          <button
            type="button"
            onClick={() => onToggleCustomSize(true)}
            className={`size-select-pill custom-size-pill ${isCustomSizeActive ? 'is-selected' : ''}`}
          >
            <span className="size-pill-name">
              <Sliders size={13} style={{ display: 'inline', marginRight: '4px' }} />
              Custom Dimensions
            </span>
            <span className="size-pill-dims">Enter exact L × W × H</span>
            <span className="size-pill-delta quote-needed">Quote on Review</span>
          </button>
        )}
      </div>
    </div>
  );
};

