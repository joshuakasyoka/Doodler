import React, { useState, useMemo } from 'react';
import { ImageDisplay } from '../ImageDisplay/ImageDisplay';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus, IconCross, IconExport, IconOverview } from '../../icons';
import doodleImage from '../../assets/img/Doodle.png';
import './GalleryDetail.css';

// Section-specific annotations matching the Prototype component
const STEP_ANNOTATIONS = {
  Krachten: [
    {
      chip: 'Taalvaardig',
      description: 'Sterke verbale vaardigheden en communicatie',
    },
    {
      chip: 'Nieuwsgierig',
      description: 'Actieve vraagstelling en interesse',
    },
    {
      chip: 'Sociaal',
      description: 'Goede sociale vaardigheden en teamwerk',
    },
    {
      chip: 'Gezinsondersteuning',
      description: 'Warme, betrokken gezinsomgeving',
    },
  ],
  Klachten: [
    {
      chip: 'Stress',
      description: 'Hoge stressniveaus en spanning',
    },
    {
      chip: 'Onzekerheid',
      description: 'Gebrek aan zelfvertrouwen',
    },
    {
      chip: 'Communicatie',
      description: 'Moeite met uitdrukken van gevoelens',
    },
    {
      chip: 'Concentratie',
      description: 'Moeite met focus en aandacht',
    },
  ],
  Inzichten: [
    {
      chip: 'Emotioneel bewust',
      description: 'Goed inzicht in eigen emoties',
    },
    {
      chip: 'Behoefte aan structuur',
      description: 'Werkt beter met duidelijke routines',
    },
    {
      chip: 'Creatief denken',
      description: 'Sterke creatieve probleemoplossing',
    },
    {
      chip: 'Zelfreflectie',
      description: 'Goed vermogen tot zelfreflectie',
    },
  ],
  Aanpak: [
    {
      chip: 'Ontspanning',
      description: 'Ontspanningstechnieken en stressmanagement',
    },
    {
      chip: 'Zelfvertrouwen',
      description: 'Bouwen aan zelfvertrouwen en zelfbeeld',
    },
    {
      chip: 'Gezinscommunicatie',
      description: 'Verbeteren van gezinscommunicatie',
    },
    {
      chip: 'Monitoring',
      description: 'Verdere evaluatie en follow-up',
    },
  ],
};

export interface GalleryDetailProps {
  sectionTitle: string;
  onBack: () => void;
  onBackToGallery?: () => void;
}

// Generate mock doodles based on section - in a real app, this would come from props or API
const generateMockDoodles = (sectionTitle: string) => {
  const sectionAnnotations = STEP_ANNOTATIONS[sectionTitle as keyof typeof STEP_ANNOTATIONS] || STEP_ANNOTATIONS.Krachten;
  
  const sessions = [
    { date: '15 Jan 2024', tag: 'Sessie 1', healthcareJourney: 'Intake' },
    { date: '22 Jan 2024', tag: 'Sessie 2', healthcareJourney: 'Behandeling' },
    { date: '29 Jan 2024', tag: 'Sessie 3', healthcareJourney: 'Evaluatie' },
    { date: '5 Feb 2024', tag: 'Sessie 4', healthcareJourney: 'Follow-up' },
    { date: '12 Feb 2024', tag: 'Sessie 5', healthcareJourney: 'Intake' },
    { date: '19 Feb 2024', tag: 'Sessie 6', healthcareJourney: 'Behandeling' },
    { date: '26 Feb 2024', tag: 'Sessie 7', healthcareJourney: 'Evaluatie' },
    { date: '5 Mar 2024', tag: 'Sessie 8', healthcareJourney: 'Follow-up' },
  ];
  
  return sessions.map((session) => ({
    caption: 'Over mij...',
    date: session.date,
    tag: session.tag,
    healthcareJourney: session.healthcareJourney,
    cards: sectionAnnotations.map((ann) => ({
      imageUrl: doodleImage,
      title: ann.chip,
      description: ann.description,
    })),
  }));
};

export const GalleryDetail: React.FC<GalleryDetailProps> = ({ sectionTitle, onBack, onBackToGallery }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  // Generate doodles based on the section title
  const mockDoodles = useMemo(() => generateMockDoodles(sectionTitle), [sectionTitle]);

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleShowToast('Doodle wordt geëxporteerd');
  };

  return (
    <div className="doodler-gallery-detail">
      <div className="doodler-gallery-detail__header">
        <DoodlerLogo className="doodler-gallery-detail__logo" />
        <div className="doodler-gallery-detail__header-actions">
          <Button variant="outline" size="small" startIcon={<IconOverview size={16} />} onClick={onBackToGallery || onBack}>
            Overzicht
          </Button>
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />}>
            Nieuwe doodle
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
            {mockDoodles.map((doodle, index) => (
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
                    onClick={handleExport}
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
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </div>
  );
};
