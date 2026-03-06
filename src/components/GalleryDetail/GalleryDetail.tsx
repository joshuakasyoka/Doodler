import React, { useState, useMemo } from 'react';
import { ImageDisplay } from '../ImageDisplay/ImageDisplay';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { DoodlerLogo } from '../../assets/logo';
import { IconPlus, IconCross, IconExport, IconOverview } from '../../icons';
import { Activity } from '../ActivitiesOverview/ActivitiesOverview';
import doodleImage from '../../assets/img/Doodle.png';
// Krachten images
import krachtenGoedMetTaal from '../../assets/img/Krachten_goed met taal 1.png';
import krachtenBlijvenProberen from '../../assets/img/Krachten blijven proberen 1.png';
import krachtenMakkelijkPraten from '../../assets/img/Krachten - makkelijk praten met anderen 1.png';
import krachtenBandMetZus from '../../assets/img/Krachten_band met zus 1.png';
// Klachten images
import klachtenDrukHoofd from '../../assets/img/Klachten druk hoofd 1.png';
import klachtenMoeizaamSlapen from '../../assets/img/Klachten moeizaam slapen 1.png';
import klachtenMoeilijkOverzicht from '../../assets/img/Klachten moeilijk overzicht houden 1.png';
import klachtenLastigeEmoties from '../../assets/img/Klachten_lastige emoties 1.png';
// Inzichten images
import inzichtenAnderenNietBelasten from '../../assets/img/Inzichten - anderen niet willen belasten 1.png';
import inzichtenBotsingThuis from '../../assets/img/Inzichten botsing thuis.png';
import inzichtenGevoeligDoorStress from '../../assets/img/Inzichten _ mama buik 1.png';
import inzichtenVeelWillenZorgen from '../../assets/img/Inzichten veel willen.png';
// Aanpak images
import aanpakHelpenOmgaan from '../../assets/img/Aanpak helpen omgaan.png';
import aanpakJongeHelpers from '../../assets/img/Aanpak_jonge helpers 1.png';
import aanpakOndersteuning from '../../assets/img/Aan pak Ondersteuning.png';
import aanpakMetSchool from '../../assets/img/Aanpak met school.png';
import './GalleryDetail.css';

// Section-specific annotations matching the Prototype component
const STEP_ANNOTATIONS = {
  Krachten: [
    {
      chip: 'Goed met taal',
      description: 'Je kunt goed praten, hebt een sterke woordenschat en denkt graag diep na over dingen.',
      imageUrl: krachtenGoedMetTaal,
    },
    {
      chip: 'Blijven proberen',
      description: 'Je hebt een sterke werkhouding en wilt je taken graag goed uitvoeren. Je probeert zo min mogelijk fouten te maken.',
      imageUrl: krachtenBlijvenProberen,
    },
    {
      chip: 'Makkelijk praten met anderen',
      description: 'Je kunt makkelijk contact maken met nieuwe mensen en toont interesse en medeleven.',
      imageUrl: krachtenMakkelijkPraten,
    },
    {
      chip: 'Goede band met zus',
      description: 'Je hebt een goede band met je zus. Met haar deel je vaak hoe het met je gaat en wat er in je omgaat.',
      imageUrl: krachtenBandMetZus,
    },
  ],
  Klachten: [
    {
      chip: 'Druk hoofd',
      description: 'Je hoofd voelt vaak druk en chaotisch, waardoor je moeilijk kunt ontspannen en soms niet weet wat je voelt.',
      imageUrl: klachtenDrukHoofd,
    },
    {
      chip: 'Moeizaam slapen',
      description: 'Je hebt moeite met inslapen en slaapt vaak maar 4 tot 6 uur per nacht doordat je hoofd zo druk is.',
      imageUrl: klachtenMoeizaamSlapen,
    },
    {
      chip: 'Moeilijk overzicht houden',
      description: 'Je werkt snel maar mist dan informatie. Het is lastig om instructies te volgen, overzicht te houden of op tijd te stoppen om na te denken.',
      imageUrl: klachtenMoeilijkOverzicht,
    },
    {
      chip: 'Lastige emoties',
      description: 'Je hebt soms heftige uitbarstingen, zoals een \'tornado van gevoelens\', en weet niet altijd wat je voelt.',
      imageUrl: klachtenLastigeEmoties,
    },
  ],
  Inzichten: [
    {
      chip: 'Anderen niet willen belasten',
      description: 'Je gaat bij gevoelens eerder naar je oudste zus dan naar je ouders, omdat je hen niet lastig wil vallen.',
      imageUrl: inzichtenAnderenNietBelasten,
    },
    {
      chip: 'Botsing thuis',
      description: 'Mama is meer chaotisch en jij houdt juist sterk vast aan tijden en planning. Dit botst soms en kan spanning geven.',
      imageUrl: inzichtenBotsingThuis,
    },
    {
      chip: 'Gevoelig door stress',
      description: 'Mama vertelt dat er veel stress was toen je nog in haar buik zat. Dat kan invloed hebben op hoe gevoelig je nu bent.',
      imageUrl: inzichtenGevoeligDoorStress,
    },
    {
      chip: 'Veel willen zorgen',
      description: 'Je maakt je zorgen om mama en wilt goed op haar letten, terwijl dit voor een kind best zwaar kan zijn.',
      imageUrl: inzichtenVeelWillenZorgen,
    },
  ],
  Aanpak: [
    {
      chip: 'Helpen omgaan met gevoelens',
      description: 'Je krijgt uitleg over hoe jouw hoofd werkt en je gaat leren hoe je beter met je emoties en piekergedachten om kunt gaan.',
      imageUrl: aanpakHelpenOmgaan,
    },
    {
      chip: 'Steun voor jonge helpers',
      description: 'Je mag meedoen aan activiteiten of groepen voor kinderen die thuis extra zorgen hebben, zodat jij je gesteund voelt.',
      imageUrl: aanpakJongeHelpers,
    },
    {
      chip: 'Ondersteuning voor je ouders',
      description: 'Je ouders krijgen uitleg over hoe jouw hoofd werkt en wat jij nodig hebt, zodat ze je beter kunnen helpen als je je overweldigd voelt.',
      imageUrl: aanpakOndersteuning,
    },
    {
      chip: 'Afstemming met school',
      description: 'Er komt een gesprek met school om te zorgen dat zij begrijpen wat er bij jou speelt en hoe ze je kunnen helpen zodat school fijn voelt.',
      imageUrl: aanpakMetSchool,
    },
  ],
};

export interface GalleryDetailProps {
  sectionTitle: string;
  onBack: () => void;
  onBackToGallery?: () => void;
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

export const GalleryDetail: React.FC<GalleryDetailProps> = ({ sectionTitle, onBack, onBackToGallery, isShowcase = false, activities = [] }) => {
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
