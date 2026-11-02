import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export interface AvailabilityFilterProps {
  selectedAvailability: string;
  onSelectAvailability: (status: string) => void;
}

export const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  selectedAvailability,
  onSelectAvailability,
}) => {
  const options = [
    { id: 'all', label: 'All Items' },
    { id: 'in-stock', label: 'In Stock (Ready to Ship)', icon: CheckCircle2, color: 'text-green' },
    { id: 'made-to-order', label: 'Made to Order', icon: Clock, color: 'text-blue' },
  ];

  return (
    <div className="filter-group availability-filter-group">
      <h3 className="filter-group-title">
        <CheckCircle2 size={16} className="filter-icon" />
        <span>Availability</span>
      </h3>

      <div className="filter-checkbox-list">
        {options.map((opt) => {
          const isChecked =
            (opt.id === 'all' && (!selectedAvailability || selectedAvailability === 'all')) ||
            selectedAvailability === opt.id;

          const IconComponent = opt.icon;

          return (
            <label
              key={opt.id}
              className={`filter-checkbox-row ${isChecked ? 'is-checked' : ''}`}
            >
              <input
                type="radio"
                name="availability_filter"
                value={opt.id}
                checked={isChecked}
                onChange={() => onSelectAvailability(opt.id)}
                className="filter-checkbox-input"
              />
              <span className="checkbox-custom" />
              <span className="checkbox-label">
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

