import React, { useState, useMemo } from 'react';
import { ImageDisplay } from '../ImageDisplay/ImageDisplay';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus, IconCross, IconExport } from '../../icons';
import { Activity } from '../ActivitiesOverview/ActivitiesOverview';
import doodleImage from '../../assets/img/Doodle.png';
// Krachten images (2×2 grid: top row, then bottom row)
import krachtenTopLeft from '../../assets/img/Krachten_top_left.png';
import krachtenTopRight from '../../assets/img/Krachten_top_right.png';
import krachtenBottomLeft from '../../assets/img/Krachten_bottom_left.png';
import krachtenBottomRight from '../../assets/img/Krachten_bottom right.png';
// Klachten images
import klachtenTopLeft from '../../assets/img/Klachten_top_left.png';
import klachtenTopRight from '../../assets/img/Klachten_top_right.png';
import klachtenBottomLeft from '../../assets/img/Klachten_bottom_left.png';
import klachtenBottomRight from '../../assets/img/Klachten_bottom_right.png';
// Inzichten images
import inzichtenTopLeft from '../../assets/img/Inzichten_top_left.png';
import inzichtenTopRight from '../../assets/img/Inzichten_top_right.png';
import inzichtenBottomLeft from '../../assets/img/Inzichten_bottom_left.png';
import inzichtenBottomRight from '../../assets/img/Inzichten_bottom_right.png';
// Aanpak images
import aanpakTopLeft from '../../assets/img/Aanpak_top_left.png';
import aanpakTopRight from '../../assets/img/Aanpak_top_right.png';
import aanpakBottomLeft from '../../assets/img/Aanpak_bottom_left.png';
import aanpakBottomRight from '../../assets/img/Aanpak_bottom_right.png';
import { ViewModeToggle } from '../ViewModeToggle/ViewModeToggle';
import './GalleryDetail.css';

// Section-specific annotations matching the Prototype component
const STEP_ANNOTATIONS = {
  Krachten: [
    {
      chip: 'Goed met taal',
      description: 'Je kunt goed praten en denkt graag diep na over dingen.',
      imageUrl: krachtenTopLeft,
    },
    {
      chip: 'Blijven proberen',
      description: 'Je wilt je taken graag goed uitvoeren.',
      imageUrl: krachtenTopRight,
    },
    {
      chip: 'Makkelijk praten met anderen',
      description: 'Je kunt makkelijk contact maken met nieuwe mensen.',
      imageUrl: krachtenBottomLeft,
    },
    {
      chip: 'Goede band met zus',
      description: 'Met je zus deel je vaak hoe het met je gaat.',
      imageUrl: krachtenBottomRight,
    },
  ],
  Klachten: [
    {
      chip: 'Druk hoofd',
      description: 'Je hoofd voelt vaak druk en chaotisch, waardoor je moeilijk kunt ontspannen.',
      imageUrl: klachtenTopLeft,
    },
    {
      chip: 'Moeizaam slapen',
      description: 'Je hebt moeite met inslapen.',
      imageUrl: klachtenTopRight,
    },
    {
      chip: 'Moeilijk overzicht houden',
      description: 'Je werkt snel maar mist dan informatie. Het is lastig overzicht te houden.',
      imageUrl: klachtenBottomLeft,
    },
    {
      chip: 'Lastige emoties',
      description: 'Je hebt soms heftige uitbarstingen.',
      imageUrl: klachtenBottomRight,
    },
  ],
  Inzichten: [
    {
      chip: 'Anderen niet willen belasten',
      description: 'Je gaat bij gevoelens eerder naar je oudste zus dan naar je ouders.',
      imageUrl: inzichtenTopLeft,
    },
    {
      chip: 'Botsing thuis',
      description: 'Mama is meer chaotisch en jij houdt juist sterk vast aan tijden en planning.',
      imageUrl: inzichtenTopRight,
    },
    {
      chip: 'Gevoelig door stress',
      description: 'Mama vertelt dat er veel stress was toen je nog in haar buik zat. Dat kan invloed hebben op hoe gevoelig je nu bent.',
      imageUrl: inzichtenBottomLeft,
    },
    {
      chip: 'Veel willen zorgen',
      description: 'Je maakt je zorgen om mama en wilt goed op haar letten.',
      imageUrl: inzichtenBottomRight,
    },
  ],
  Aanpak: [
    {
      chip: 'Helpen omgaan met gevoelens',
      description: 'Je krijgt uitleg over hoe jouw hoofd werkt en leert hoe je beter met je emoties om kunt gaan.',
      imageUrl: aanpakTopLeft,
    },
    {
      chip: 'Steun voor jonge helpers',
      description: 'Je mag meedoen aan activiteiten voor kinderen die thuis extra zorgen hebben.',
      imageUrl: aanpakTopRight,
    },
    {
      chip: 'Ondersteuning voor je ouders',
      description: 'Je ouders krijgen uitleg over hoe jouw hoofd werkt en wat jij nodig hebt.',
      imageUrl: aanpakBottomLeft,
    },
    {
      chip: 'Afstemming met school',
      description: 'Er komt een gesprek met school om te zorgen dat zij begrijpen wat er bij jou speelt en hoe ze je kunnen helpen.',
      imageUrl: aanpakBottomRight,
    },
  ],
};

export interface GalleryDetailProps {
  sectionTitle: string;
  onBack: () => void;
  onBackToGallery?: () => void;
  onNavigateToOverview?: () => void;
  isShowcase?: boolean;
  activities?: Activity[];
}

// Get caption based on section title
const getCaptionForSection = (sectionTitle: string): string => {
  const captionMap: Record<string, string> = {
    'Krachten': 'Dit gaat er goed...',
    'Klachten': 'Waarom we hier zijn...',
    'Inzichten': 'Waardoor dat kan komen…',
    'Aanpak': 'Deze aanpak stel ik voor, wat denk jij?',
  };
  return captionMap[sectionTitle] || 'Over mij...';
};

// Generate mock doodles based on section - in a real app, this would come from props or API
const generateMockDoodles = (sectionTitle: string, isShowcase: boolean = false, activities?: Activity[]) => {
  const sectionAnnotations = STEP_ANNOTATIONS[sectionTitle as keyof typeof STEP_ANNOTATIONS] || STEP_ANNOTATIONS.Krachten;
  const caption = getCaptionForSection(sectionTitle);
  
  // Map section title to activity property key
  const sectionKeyMap: Record<string, keyof Activity> = {
    'Krachten': 'krachten',
    'Klachten': 'klachten',
    'Inzichten': 'inzichten',
    'Aanpak': 'aanpak',
  };
  
  const sectionKey = sectionKeyMap[sectionTitle];
  
  // In showcase mode, filter activities to only those with this section completed
  if (isShowcase && activities && sectionKey) {
    const completedActivities = activities.filter(activity => activity[sectionKey] === 'added');
    
    if (completedActivities.length === 0) {
      return []; // No cards to show
    }
    
    // Generate dates for each activity (simple incrementing dates)
    const baseDate = new Date('2024-01-15');
    return completedActivities.map((activity, index) => {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + (index * 7)); // Add 7 days for each activity
      const dateStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
      
      return {
        caption: caption,
        date: dateStr,
        tag: `Sessie ${index + 1}`,
        healthcareJourney: activity.name,
        cards: sectionAnnotations.map((ann) => ({
          imageUrl: ann.imageUrl || doodleImage,
          title: ann.chip,
          description: ann.description,
        })),
      };
    });
  }
  
  // Default behavior for non-showcase mode
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
    caption: caption,
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

export const GalleryDetail: React.FC<GalleryDetailProps> = ({ sectionTitle, onBack, onBackToGallery, onNavigateToOverview, isShowcase = false, activities = [] }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

  // Generate doodles based on the section title
  const mockDoodles = useMemo(() => generateMockDoodles(sectionTitle, isShowcase, activities), [sectionTitle, isShowcase, activities]);

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
        <button
          type="button"
          onClick={onNavigateToOverview || onBackToGallery || onBack}
          className="doodler-gallery-detail__logo-button"
          aria-label="Ga naar cliëntoverzicht"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <DoodlerLogo className="doodler-gallery-detail__logo" />
        </button>
        <div className="doodler-gallery-detail__header-actions">
          <ViewModeToggle
            mode="timeline"
            onSelectOverview={() => onNavigateToOverview?.()}
            onSelectTimeline={() => onBackToGallery?.()}
          />
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />}>
            Nieuwe doodle
          </Button>
        </div>
      </div>
      <div className="doodler-gallery-detail__screen">
        <div className="doodler-gallery-detail__content">
          <div className="doodler-gallery-detail__title-section">
            <h1 className="doodler-gallery-detail__title">Tijdlijn</h1>
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
