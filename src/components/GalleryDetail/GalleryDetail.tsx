import React from 'react';
import { ImageDisplay } from '../ImageDisplay/ImageDisplay';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus, IconCross, IconExport } from '../../icons';
import doodleImage from '../../assets/img/Doodle.png';
import './GalleryDetail.css';

export interface GalleryDetailProps {
  sectionTitle: string;
  onBack: () => void;
  onBackToGallery?: () => void;
}

// Mock data for doodles - in a real app, this would come from props or API
const MOCK_DOODLES = [
  {
    caption: 'Over mij...',
    date: '15 Jan 2024',
    tag: 'Sessie 1',
    healthcareJourney: 'Intake',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '22 Jan 2024',
    tag: 'Sessie 2',
    healthcareJourney: 'Behandeling',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '29 Jan 2024',
    tag: 'Sessie 3',
    healthcareJourney: 'Evaluatie',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '5 Feb 2024',
    tag: 'Sessie 4',
    healthcareJourney: 'Follow-up',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '12 Feb 2024',
    tag: 'Sessie 5',
    healthcareJourney: 'Intake',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '19 Feb 2024',
    tag: 'Sessie 6',
    healthcareJourney: 'Behandeling',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '26 Feb 2024',
    tag: 'Sessie 7',
    healthcareJourney: 'Evaluatie',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
  {
    caption: 'Over mij...',
    date: '5 Mar 2024',
    tag: 'Sessie 8',
    healthcareJourney: 'Follow-up',
    cards: [
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
      {
        imageUrl: doodleImage,
        title: 'eigen wil',
        description: 'Ik wil regie kunnen voeren, mezelf uiten voordat mogelijkheden teruggekoppeld worden',
      },
    ],
  },
];

export const GalleryDetail: React.FC<GalleryDetailProps> = ({ sectionTitle, onBack, onBackToGallery }) => {
  return (
    <div className="doodler-gallery-detail">
      <div className="doodler-gallery-detail__header">
        <DoodlerLogo className="doodler-gallery-detail__logo" />
        <div className="doodler-gallery-detail__header-actions">
          <Button variant="outline" size="small" onClick={onBackToGallery || onBack}>
            Overzicht
          </Button>
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />}>
            Doodle toevoegen
          </Button>
        </div>
      </div>
      <div className="doodler-gallery-detail__screen">
        <div className="doodler-gallery-detail__content">
          <div className="doodler-gallery-detail__title-section">
            <h1 className="doodler-gallery-detail__title">Doodle Galerij</h1>
          </div>
          <div className="doodler-gallery-detail__filter">
            <div className="doodler-gallery-detail__filter-chip">
              <span className="doodler-gallery-detail__filter-text">{sectionTitle}</span>
              <button
                className="doodler-gallery-detail__filter-close"
                onClick={onBack}
                aria-label="Clear filter"
              >
                <IconCross size={16} />
              </button>
            </div>
          </div>
          <div className="doodler-gallery-detail__doodles">
            {MOCK_DOODLES.map((doodle, index) => (
              <div key={index} className="doodler-gallery-detail__doodle-card">
                <div className="doodler-gallery-detail__doodle-meta">
                  <div className="doodler-gallery-detail__doodle-meta-content">
                    <span className="doodler-gallery-detail__doodle-date">{doodle.date}</span>
                    <span className="doodler-gallery-detail__doodle-journey">{doodle.healthcareJourney}</span>
                  </div>
                  <Chip variant="secondary" className="doodler-gallery-detail__doodle-tag">
                    {doodle.tag}
                  </Chip>
                  <Button
                    variant="outline"
                    size="small"
                    startIcon={<IconExport size={16} />}
                    className="doodler-gallery-detail__doodle-export"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle export functionality
                    }}
                  >
                    Exporteren
                  </Button>
                </div>
                <ImageDisplay
                  caption={doodle.caption}
                  cards={doodle.cards}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
