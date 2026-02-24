import React from 'react';
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
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  caption,
  cards,
}) => {
  return (
    <div className="doodler-image-display">
      <div className="doodler-image-display__caption">
        <p>{caption}</p>
      </div>
      <div className="doodler-image-display__container">
        <div className="doodler-image-display__row">
          <div className="doodler-image-display__card">
            <div className="doodler-image-display__card-image">
              {cards[0]?.imageUrl ? (
                <img src={cards[0].imageUrl} alt={cards[0].imageAlt || cards[0].title} />
              ) : (
                <div className="doodler-image-display__card-placeholder" />
              )}
            </div>
            <h3 className="doodler-image-display__card-title">{cards[0]?.title}</h3>
            <p className="doodler-image-display__card-description">
              {cards[0]?.description}
            </p>
          </div>
          <div className="doodler-image-display__card">
            <div className="doodler-image-display__card-image">
              {cards[1]?.imageUrl ? (
                <img src={cards[1].imageUrl} alt={cards[1].imageAlt || cards[1].title} />
              ) : (
                <div className="doodler-image-display__card-placeholder" />
              )}
            </div>
            <h3 className="doodler-image-display__card-title">{cards[1]?.title}</h3>
            <p className="doodler-image-display__card-description">
              {cards[1]?.description}
            </p>
          </div>
        </div>
        <div className="doodler-image-display__row">
          <div className="doodler-image-display__card">
            <div className="doodler-image-display__card-image">
              {cards[2]?.imageUrl ? (
                <img src={cards[2].imageUrl} alt={cards[2].imageAlt || cards[2].title} />
              ) : (
                <div className="doodler-image-display__card-placeholder" />
              )}
            </div>
            <h3 className="doodler-image-display__card-title">{cards[2]?.title}</h3>
            <p className="doodler-image-display__card-description">
              {cards[2]?.description}
            </p>
          </div>
          <div className="doodler-image-display__card">
            <div className="doodler-image-display__card-image">
              {cards[3]?.imageUrl ? (
                <img src={cards[3].imageUrl} alt={cards[3].imageAlt || cards[3].title} />
              ) : (
                <div className="doodler-image-display__card-placeholder" />
              )}
            </div>
            <h3 className="doodler-image-display__card-title">{cards[3]?.title}</h3>
            <p className="doodler-image-display__card-description">
              {cards[3]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
