import React from 'react';
import { ImageDisplay, TreatmentPlanCard } from '../ImageDisplay/ImageDisplay';
import { Chip } from '../Chip/Chip';
import './Summary.css';

export interface SummarySection {
  title: string;
  chip: string;
  caption: string;
  cards: TreatmentPlanCard[];
}

export interface SummaryProps {
  sections: SummarySection[];
  onSectionClick: (index: number) => void;
}

export const Summary: React.FC<SummaryProps> = ({ sections, onSectionClick }) => {
  return (
    <div className="doodler-summary">
      {sections.map((section, index) => (
        <div
          key={index}
          className="doodler-summary__section"
          onClick={() => onSectionClick(index)}
        >
          <div className="doodler-summary__chip">
            <Chip variant="secondary">{section.chip}</Chip>
          </div>
          <div className="doodler-summary__image-display">
            <ImageDisplay caption={section.caption} cards={section.cards} />
          </div>
        </div>
      ))}
    </div>
  );
};
