import React, { useEffect, useRef, useState } from 'react';
import { IconPen, IconRefresh, IconImage } from '../../icons';
import './ImageDisplay.css';

export interface TreatmentPlanCard {
  imageUrl?: string;
  title: string;
  description: string;
  imageAlt?: string;
  generatedPrompt?: string;
}

export type ImageDisplayCardHoverIcon = 'pen' | 'refresh';

export interface ImageDisplayProps {
  caption: string;
  cards: TreatmentPlanCard[];
  onCardClick?: (index: number) => void;
  getCardHoverIcon?: (index: number) => ImageDisplayCardHoverIcon;
  onCardHoverIconClick?: (index: number, event: React.MouseEvent) => void;
  captionEditable?: boolean;
  onCaptionChange?: (caption: string) => void;
  emptyImagePlaceholder?: 'white' | 'grey';
  getCardRefreshVersion?: (index: number) => number | undefined;
  getCardPlaceholderText?: (index: number) => string | undefined;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  caption,
  cards,
  onCardClick,
  getCardHoverIcon,
  onCardHoverIconClick,
  captionEditable = false,
  onCaptionChange,
  emptyImagePlaceholder = 'white',
  getCardRefreshVersion,
  getCardPlaceholderText,
}) => {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [isCaptionEditing, setIsCaptionEditing] = useState(false);
  const captionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCaptionEditing) {
      captionInputRef.current?.focus();
      captionInputRef.current?.select();
    }
  }, [isCaptionEditing]);

  const handleStartCaptionEdit = () => {
    if (captionEditable) {
      setIsCaptionEditing(true);
    }
  };

  const handleFinishCaptionEdit = () => {
    setIsCaptionEditing(false);
  };

  useEffect(() => {
    setFailedImages((prev) => {
      const next = new Set(prev);
      cards.forEach((card, index) => {
        if (card.imageUrl) {
          next.delete(index);
        }
      });
      return next;
    });
  }, [cards]);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set(prev).add(index));
  };

  const renderCard = (index: number) => {
    const card = cards[index];
    if (!card) return null;

    const imageFailed = failedImages.has(index);
    const storedPrompt = card.generatedPrompt?.trim();
    const placeholderText =
      getCardPlaceholderText?.(index) ?? storedPrompt ?? undefined;
    const preferPlaceholder = Boolean(placeholderText);
    const shouldShowImage = card.imageUrl && !imageFailed && !preferPlaceholder;

    const hoverIcon = getCardHoverIcon?.(index) ?? 'pen';
    const isIconInteractive = Boolean(onCardHoverIconClick);

    const refreshVersion = getCardRefreshVersion?.(index);
    const showPlaceholderContent = Boolean(refreshVersion || placeholderText);

    return (
      <div
        className="doodler-image-display__card"
        onMouseEnter={() => setHoveredCardIndex(index)}
        onMouseLeave={() => setHoveredCardIndex(null)}
        onClick={() => onCardClick?.(index)}
      >
        <div className="doodler-image-display__card-image">
          {shouldShowImage ? (
            <img 
              src={card.imageUrl} 
              alt={card.imageAlt || card.title}
              onError={() => handleImageError(index)}
              loading="lazy"
            />
          ) : (
            <div
              className={`doodler-image-display__card-placeholder${
                emptyImagePlaceholder === 'grey'
                  ? ' doodler-image-display__card-placeholder--grey'
                  : ''
              }${
                showPlaceholderContent
                  ? ' doodler-image-display__card-placeholder--refreshing'
                  : ''
              }`}
            >
              {showPlaceholderContent ? (
                <>
                  <IconImage size={16} />
                  <span className="doodler-image-display__card-version">
                    {placeholderText ?? `Version ${refreshVersion}`}
                  </span>
                </>
              ) : null}
            </div>
          )}
          {hoveredCardIndex === index && (
            <div
              className={`doodler-image-display__card-edit-icon${
                isIconInteractive ? ' doodler-image-display__card-edit-icon--interactive' : ''
              }`}
              onClick={(event) => {
                event.stopPropagation();
                onCardHoverIconClick?.(index, event);
              }}
              role={isIconInteractive ? 'button' : undefined}
              aria-label={
                hoverIcon === 'refresh' ? 'Doodle verversen' : 'Doodle bewerken'
              }
            >
              {hoverIcon === 'refresh' ? <IconRefresh size={18} /> : <IconPen size={18} />}
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
      <div
        className={`doodler-image-display__caption${
          captionEditable ? ' doodler-image-display__caption--editable' : ''
        }${captionEditable && isCaptionEditing ? ' doodler-image-display__caption--editing' : ''}`}
        onClick={captionEditable && !isCaptionEditing ? handleStartCaptionEdit : undefined}
        onKeyDown={
          captionEditable && !isCaptionEditing
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleStartCaptionEdit();
                }
              }
            : undefined
        }
        role={captionEditable && !isCaptionEditing ? 'button' : undefined}
        tabIndex={captionEditable && !isCaptionEditing ? 0 : undefined}
      >
        {captionEditable ? (
          isCaptionEditing ? (
            <>
              <input
                ref={captionInputRef}
                type="text"
                className="doodler-image-display__caption-input doodler-image-display__caption-text"
                value={caption}
                onChange={(event) => onCaptionChange?.(event.target.value)}
                onBlur={handleFinishCaptionEdit}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleFinishCaptionEdit();
                  }
                }}
                aria-label="Sectietitel bewerken"
              />
              <span
                className="doodler-image-display__caption-edit-icon doodler-image-display__caption-edit-icon--spacer"
                aria-hidden="true"
              >
                <IconPen size={16} />
              </span>
            </>
          ) : (
            <>
              <p className="doodler-image-display__caption-label doodler-image-display__caption-text">
                {caption}
              </p>
              <span className="doodler-image-display__caption-edit-icon" aria-hidden="true">
                <IconPen size={16} />
              </span>
            </>
          )
        ) : (
          <p>{caption}</p>
        )}
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
