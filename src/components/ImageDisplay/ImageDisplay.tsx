import React, { useState } from 'react';
import { IconPen } from '../../icons';
import './ImageDisplay.css';

export interface TreatmentPlanCard {
  imageUrl?: string;
  title: string;
  description: string;
  imageAlt?: string;
}

export interface ImageDisplayProps {
  caption: string;
  cards: TreatmentPlanCard[];
  onCardClick?: (index: number) => void;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  caption,
  cards,
  onCardClick,
}) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  const renderCard = (index: number) => {
    const card = cards[index];
    if (!card) return null;

    return (
      <div
        className="doodler-image-display__card"
        onMouseEnter={() => setHoveredCardIndex(index)}
        onMouseLeave={() => setHoveredCardIndex(null)}
        onClick={() => onCardClick?.(index)}
      >
        <div className="doodler-image-display__card-image">
          {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.imageAlt || card.title} />
          ) : (
            <div className="doodler-image-display__card-placeholder" />
          )}
          {hoveredCardIndex === index && (
            <div className="doodler-image-display__card-edit-icon">
              <IconPen size={18} />
            </div>
          )}
        </div>
        <h3 className="doodler-image-display__card-title">{card.title}</h3>
        <p className="doodler-image-display__card-description">
          {card.description}
        </p>
      </div>
    );
  };

  return (
    <div className="doodler-image-display">
      <div className="doodler-image-display__caption">
        <p>{caption}</p>
      </div>
      <div className="doodler-image-display__container">
        <div className="doodler-image-display__row">
          {renderCard(0)}
          {renderCard(1)}
        </div>
        <div className="doodler-image-display__row">
          {renderCard(2)}
          {renderCard(3)}
        </div>
      </div>
    </div>
  );
};
