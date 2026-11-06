import React from 'react';
import { Sliders, AlertCircle, CheckCircle2 } from 'lucide-react';

export interface CustomDimensionsState {
  length: string;
  width: string;
  height: string;
  unit: 'cm' | 'mm';
}

export interface CustomDimensionsFormProps {
  dimensions: CustomDimensionsState;
  onChange: (dims: CustomDimensionsState) => void;
}

export const CustomDimensionsForm: React.FC<CustomDimensionsFormProps> = ({
  dimensions,
  onChange,
}) => {
  const handleChange = (field: keyof CustomDimensionsState, val: string) => {
    onChange({
      ...dimensions,
      [field]: val,
    });
  };

  const len = Number(dimensions.length);
  const wid = Number(dimensions.width);
  const hgt = Number(dimensions.height);

  const isValid = len > 0 && wid > 0 && hgt > 0;
  const isWithinVolume =
    dimensions.unit === 'cm'
      ? len <= 50 && wid <= 50 && hgt <= 60
      : len <= 500 && wid <= 500 && hgt <= 600;

  return (
    <div className="custom-dimensions-subpanel">
      <div className="subpanel-header">
        <Sliders size={14} className="text-primary-blue" />
        <span className="subpanel-title">Specify Exact Custom Dimensions</span>
      </div>

      <div className="dimensions-input-row">
        <div className="dimension-input-group">
          <label className="dim-label">Length</label>
          <input
            type="number"
            min={1}
            max={dimensions.unit === 'cm' ? 50 : 500}
            step="0.5"
            placeholder="L"
            value={dimensions.length}
            onChange={(e) => handleChange('length', e.target.value)}
            className="dim-input"
          />
        </div>

        <span className="dim-cross">×</span>

        <div className="dimension-input-group">
          <label className="dim-label">Width</label>
          <input
            type="number"
            min={1}
            max={dimensions.unit === 'cm' ? 50 : 500}
            step="0.5"
            placeholder="W"
            value={dimensions.width}
            onChange={(e) => handleChange('width', e.target.value)}
            className="dim-input"
          />
        </div>

        <span className="dim-cross">×</span>

        <div className="dimension-input-group">
          <label className="dim-label">Height</label>
          <input
            type="number"
            min={1}
            max={dimensions.unit === 'cm' ? 60 : 600}
            step="0.5"
            placeholder="H"
            value={dimensions.height}
            onChange={(e) => handleChange('height', e.target.value)}
            className="dim-input"
          />
        </div>

        {/* Unit Select */}
        <div className="dimension-unit-group">
          <label className="dim-label">Unit</label>
          <select
            value={dimensions.unit}
            onChange={(e) => handleChange('unit', e.target.value as 'cm' | 'mm')}
            className="dim-unit-select"
          >
            <option value="cm">cm</option>
            <option value="mm">mm</option>
          </select>
        </div>
      </div>

      {/* Validation Message */}
      {isValid && !isWithinVolume && (
        <div className="dimension-warning">
          <AlertCircle size={13} />
          <span>Maximum print bed envelope is 50 × 50 × 60 cm. Please adjust scale.</span>
        </div>
      )}

      {isValid && isWithinVolume && (
        <div className="dimension-valid-note">
          <CheckCircle2 size={13} />
          <span>
            Custom envelope: {len} × {wid} × {hgt} {dimensions.unit} (Fits 3D printing build plate)
          </span>
        </div>
      )}
    </div>
  );
};

