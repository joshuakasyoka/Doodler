import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus } from '../../icons';
import { NewDoodleModal } from '../NewDoodleModal/NewDoodleModal';
import image3 from '../../assets/img/image 3.png';
import image13 from '../../assets/img/image 13.png';
import image14 from '../../assets/img/image 14.png';
import image15 from '../../assets/img/image 15.png';
import { ViewModeToggle } from '../ViewModeToggle/ViewModeToggle';
import './Gallery.css';

export interface GalleryProps {
  onBack: () => void;
  onSectionClick?: (sectionTitle: string) => void;
  onNavigateToDoodle?: () => void;
  onNavigateToOverview?: () => void;
}

const GALLERY_SECTIONS = [
  {
    title: 'Krachten',
    description: 'Dit zijn de krachten die je bij je cliënt ziet.',
    image: image15,
  },
  {
    title: 'Klachten',
    description: 'Dit zijn de klachten die je bij je cliënt ziet.',
    image: image13,
  },
  {
    title: 'Inzichten',
    description: 'Dit zijn de inzichten over je cliënt.',
    image: image14,
  },
  {
    title: 'Aanpak',
    description: 'Dit is de aanpak die je voorstelt aan je cliënt.',
    image: image3,
  },
];

export const Gallery: React.FC<GalleryProps> = ({ onBack, onSectionClick, onNavigateToDoodle, onNavigateToOverview }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (sectionTitle: string) => {
    if (onSectionClick) {
      onSectionClick(sectionTitle);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmModal = () => {
    if (onNavigateToDoodle) {
      onNavigateToDoodle();
    }
  };

  return (
    <div className="doodler-gallery">
      <div className="doodler-gallery__header">
        <button
          type="button"
          onClick={() => {
            if (onNavigateToOverview) {
              onNavigateToOverview();
            } else {
              onBack();
            }
          }}
          className="doodler-gallery__logo-button"
          aria-label="Ga naar cliëntoverzicht"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <DoodlerLogo className="doodler-gallery__logo" />
        </button>
        <div className="doodler-gallery__header-actions">
          <ViewModeToggle
            mode="timeline"
            onSelectOverview={() => {
              if (onNavigateToOverview) {
                onNavigateToOverview();
              } else {
                onBack();
              }
            }}
            onSelectTimeline={() => {}}
          />
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />} onClick={handleOpenModal}>
            Nieuwe doodle
          </Button>
        </div>
      </div>
      <div className="doodler-gallery__screen">
        <div className="doodler-gallery__content">
          <div className="doodler-gallery__title-section">
            <h1 className="doodler-gallery__title">Tijdlijn</h1>
            <p className="doodler-gallery__subtitle">
              Bekijk alle doodles van de cliënt per categorie op de tijdlijn
            </p>
          </div>
          <div className="doodler-gallery__sections">
            {GALLERY_SECTIONS.map((section, index) => (
              <div
                key={index}
                className="doodler-gallery__section-card"
                onClick={() => handleCardClick(section.title)}
              >
                <div className="doodler-gallery__section-icon">
                  <img src={section.image} alt={section.title} className="doodler-gallery__section-image" />
                </div>
                <h3 className="doodler-gallery__section-title">{section.title}</h3>
                <p className="doodler-gallery__section-description">{section.description}</p>
                <div className="doodler-gallery__section-button">
                  <Button variant="outline" size="small">
                    Sectie openen
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NewDoodleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};
