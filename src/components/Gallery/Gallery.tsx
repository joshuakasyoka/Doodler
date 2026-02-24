import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus, IconOverview } from '../../icons';
import { NewDoodleModal } from '../NewDoodleModal/NewDoodleModal';
import image3 from '../../assets/img/image 3.png';
import image13 from '../../assets/img/image 13.png';
import image14 from '../../assets/img/image 14.png';
import image15 from '../../assets/img/image 15.png';
import './Gallery.css';

export interface GalleryProps {
  onBack: () => void;
  onSectionClick?: (sectionTitle: string) => void;
  onNavigateToDoodle?: () => void;
}

const GALLERY_SECTIONS = [
  {
    title: 'Krachten',
    description: 'Alle doodles die betrekking hebben op dit deel van het project.',
    image: image15,
  },
  {
    title: 'Klachten',
    description: 'Alle doodles die betrekking hebben op dit deel van het project.',
    image: image13,
  },
  {
    title: 'Inzichten',
    description: 'Alle doodles die betrekking hebben op dit deel van het project.',
    image: image14,
  },
  {
    title: 'Aanpak',
    description: 'Alle doodles die betrekking hebben op dit deel van het project.',
    image: image3,
  },
];

export const Gallery: React.FC<GalleryProps> = ({ onBack, onSectionClick, onNavigateToDoodle }) => {
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
        <DoodlerLogo className="doodler-gallery__logo" />
        <div className="doodler-gallery__header-actions">
          <Button variant="outline" size="small" startIcon={<IconOverview size={16} />} onClick={onBack}>
            Overzicht
          </Button>
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />} onClick={handleOpenModal}>
            Nieuwe doodle
          </Button>
        </div>
      </div>
      <div className="doodler-gallery__screen">
        <div className="doodler-gallery__content">
          <div className="doodler-gallery__title-section">
            <h1 className="doodler-gallery__title">Doodle Galerij</h1>
            <p className="doodler-gallery__subtitle">
              Bekijk alle doodles van de cliënt per categorie
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
