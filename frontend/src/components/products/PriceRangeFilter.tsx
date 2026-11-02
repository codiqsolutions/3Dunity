import React, { useState, useEffect } from 'react';
import { IndianRupee, RotateCcw } from 'lucide-react';

export interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onApplyPrice: (min?: number, max?: number) => void;
  absoluteMin?: number;
  absoluteMax?: number;
}

const PRESETS = [
  { label: 'All', min: undefined, max: undefined },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 - ₹1,500', min: 1000, max: 1500 },
  { label: 'Above ₹1,500', min: 1500, max: 3000 },
];

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onApplyPrice,
  absoluteMin = 0,
  absoluteMax = 3000,
}) => {
  const [localMin, setLocalMin] = useState<string>(minPrice !== undefined ? String(minPrice) : '');
  const [localMax, setLocalMax] = useState<string>(maxPrice !== undefined ? String(maxPrice) : '');
  const [sliderVal, setSliderVal] = useState<number>(maxPrice || absoluteMax);

  // Sync state if props change from URL or reset
  useEffect(() => {
    setLocalMin(minPrice !== undefined ? String(minPrice) : '');
    setLocalMax(maxPrice !== undefined ? String(maxPrice) : '');
    setSliderVal(maxPrice || absoluteMax);
  }, [minPrice, maxPrice, absoluteMax]);

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsedMin = localMin.trim() !== '' ? Number(localMin) : undefined;
    const parsedMax = localMax.trim() !== '' ? Number(localMax) : undefined;
    onApplyPrice(parsedMin, parsedMax);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderVal(val);
    setLocalMax(String(val));
  };

  const handleSliderCommit = () => {
    const parsedMin = localMin.trim() !== '' ? Number(localMin) : undefined;
    onApplyPrice(parsedMin, sliderVal);
  };

  const handlePresetClick = (presetMin?: number, presetMax?: number) => {
    setLocalMin(presetMin !== undefined ? String(presetMin) : '');
    setLocalMax(presetMax !== undefined ? String(presetMax) : '');
    setSliderVal(presetMax || absoluteMax);
    onApplyPrice(presetMin, presetMax);
  };

  const hasFilterActive = minPrice !== undefined || maxPrice !== undefined;

  return (
    <div className="filter-group price-filter-group">
      <div className="filter-group-header">
        <h3 className="filter-group-title">
          <IndianRupee size={16} className="filter-icon" />
          <span>Price Range</span>
        </h3>
        {hasFilterActive && (
          <button
            type="button"
            onClick={() => handlePresetClick(undefined, undefined)}
            className="filter-clear-sub-btn"
            title="Reset price filter"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Preset Pills */}
      <div className="price-preset-chips">
        {PRESETS.map((p) => {
          const isActive = minPrice === p.min && maxPrice === p.max;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => handlePresetClick(p.min, p.max)}
              className={`preset-chip ${isActive ? 'is-active' : ''}`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Slider */}
      <div className="price-slider-box">
        <div className="slider-indicator-row">
          <span className="slider-label">Max Price:</span>
          <span className="slider-value">₹{sliderVal.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={50}
          value={sliderVal}
          onChange={handleSliderChange}
          onMouseUp={handleSliderCommit}
          onTouchEnd={handleSliderCommit}
          className="price-range-slider"
          aria-label="Filter maximum price"
        />
        <div className="slider-ticks">
          <span>₹{absoluteMin}</span>
          <span>₹{(absoluteMax / 2).toLocaleString('en-IN')}</span>
          <span>₹{absoluteMax.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Dual Inputs Form */}
      <form onSubmit={handleApply} className="price-inputs-form">
        <div className="price-input-row">
          <div className="price-input-field">
            <span className="price-symbol">₹</span>
            <input
              type="number"
              placeholder="Min"
              min={0}
              max={absoluteMax}
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              className="price-text-input"
              aria-label="Minimum price in rupees"
            />
          </div>
          <span className="price-input-divider">-</span>
          <div className="price-input-field">
            <span className="price-symbol">₹</span>
            <input
              type="number"
              placeholder="Max"
              min={0}
              max={5000}
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              className="price-text-input"
              aria-label="Maximum price in rupees"
            />
          </div>
        </div>

        <button type="submit" className="price-apply-btn">
          Apply Filter
        </button>
      </form>
    </div>
  );
};

