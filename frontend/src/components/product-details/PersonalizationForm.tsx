import React from 'react';
import { Type, MessageSquare, Sparkles } from 'lucide-react';

export interface PersonalizationFormProps {
  customText: string;
  specialInstructions: string;
  maxTextLength?: number;
  onTextChange: (text: string) => void;
  onInstructionsChange: (instructions: string) => void;
}

export const PersonalizationForm: React.FC<PersonalizationFormProps> = ({
  customText,
  specialInstructions,
  maxTextLength = 35,
  onTextChange,
  onInstructionsChange,
}) => {
  return (
    <div className="custom-option-group personalization-group">
      <div className="option-group-label-row">
        <label className="option-group-label" htmlFor="custom-engrave-text">
          <Type size={15} className="text-primary-blue" />
          <span>Custom Text / Name Engraving:</span>
          <span className="personalization-badge">+₹50 Custom Engraving</span>
        </label>
      </div>

      <div className="personalization-input-wrapper">
        <input
          id="custom-engrave-text"
          type="text"
          maxLength={maxTextLength}
          placeholder="e.g. 'VAIBHAV • 2026' or initials"
          value={customText}
          onChange={(e) => onTextChange(e.target.value)}
          className="personalization-input"
        />
        <span className="char-count-pill">
          {customText.length} / {maxTextLength}
        </span>
      </div>

      <div className="instructions-input-wrapper">
        <label className="instructions-label" htmlFor="custom-instructions">
          <MessageSquare size={13} />
          <span>Special Printing Instructions or Notes (Optional):</span>
        </label>
        <textarea
          id="custom-instructions"
          rows={2}
          placeholder="Mention specific tolerances, font preferences, or mounting hole requests..."
          value={specialInstructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          className="instructions-textarea"
        />
      </div>
    </div>
  );
};

