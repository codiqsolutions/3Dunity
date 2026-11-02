import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export interface CustomizationFilterProps {
  selectedCustomizable?: boolean;
  onSelectCustomizable: (customizable?: boolean) => void;
}

export const CustomizationFilter: React.FC<CustomizationFilterProps> = ({
  selectedCustomizable,
  onSelectCustomizable,
}) => {
  const options = [
    { value: undefined, label: 'All Products' },
    { value: true, label: 'Customizable Models', badge: 'Personalized' },
    { value: false, label: 'Standard Catalog', badge: 'Ready Made' },
  ];

  return (
    <div className="filter-group customization-filter-group">
      <h3 className="filter-group-title">
        <Sliders size={16} className="filter-icon" />
        <span>Customization</span>
      </h3>

      <div className="filter-checkbox-list">
        {options.map((opt, idx) => {
          const isChecked = selectedCustomizable === opt.value;

          return (
            <label
              key={idx}
              className={`filter-checkbox-row ${isChecked ? 'is-checked' : ''}`}
            >
              <input
                type="radio"
                name="customization_filter"
                checked={isChecked}
                onChange={() => onSelectCustomizable(opt.value)}
                className="filter-checkbox-input"
              />
              <span className="checkbox-custom" />
              <div className="customization-opt-meta">
                <span className="checkbox-label">{opt.label}</span>
                {opt.badge && (
                  <span className={`sub-tag ${opt.value ? 'tag-orange' : 'tag-gray'}`}>
                    {opt.badge}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

