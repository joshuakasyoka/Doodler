import React, { useState, useId } from 'react';
import { ActivitiesOverview } from '../components/ActivitiesOverview/ActivitiesOverview';
import { Gallery } from '../components/Gallery/Gallery';
import { GalleryDetail } from '../components/GalleryDetail/GalleryDetail';
import { StepsComponent } from '../components/StepsComponent/StepsComponent';
import { ImageDisplay } from '../components/ImageDisplay/ImageDisplay';
import { Tab } from '../components/Tab/Tab';
import { Content } from '../components/Content/Content';
import { Button } from '../components/Button/Button';
import { Chip } from '../components/Chip/Chip';
import { EditAnnotation } from '../components/EditAnnotation/EditAnnotation';
import { Summary } from '../components/Summary/Summary';
import { DoodlerLogo } from '../assets/logo';
import { IconArrowLeft, IconSend, IconDocument } from '../icons';
import doodleImage from '../assets/img/Doodle.png';
import './Prototype.css';

const STEPS = ['Strengths', "What's going on?", 'Insights', 'Plan'];

const SUMMARY_ITEMS = [
  {
    title: 'Taalvaardig en gevoelig',
    description:
      'Je bent goed in taal en je voelt dingen sterk aan. Dit helpt je vaak om goed te communiceren.',
  },
  {
    title: 'Veel vragen stellen',
    description:
      'Je wilt graag weten waarom dingen gebeuren en je hebt een sterk gevoel voor rechtvaardigheid.',
  },
  {
    title: 'Sociale vaardigheden',
    description:
      'Je bent sociaal vaardig en kunt goed samenwerken met anderen, zelfs als het spannend is.',
  },
  {
    title: 'Betrokken gezin',
    description:
      'Je komt uit een warm gezin waar er vaak humor is en iedereen betrokken is bij elkaar.',
  },
];

const KEY_WORDS_ITEMS = [
  {
    title: 'Communicatie',
    description: 'Sterke verbale vaardigheden en emotionele intelligentie.',
  },
  {
    title: 'Nieuwsgierigheid',
    description: 'Actieve vraagstelling en interesse in rechtvaardigheid.',
  },
  {
    title: 'Samenwerking',
    description: 'Goede sociale vaardigheden en teamwerk.',
  },
  {
    title: 'Gezinsondersteuning',
    description: 'Warme, betrokken gezinsomgeving met humor.',
  },
];

const TREATMENT_PLAN_CARDS = [
  {
    imageUrl: doodleImage,
    title: 'Leren ontspannen',
    description: 'Ontspanningstechnieken en stressmanagement',
  },
  {
    imageUrl: doodleImage,
    title: 'Zelfvertrouwen',
    description: 'Bouwen aan zelfvertrouwen en zelfbeeld',
  },
  {
    imageUrl: doodleImage,
    title: 'Praten met ouders',
    description: 'Gezinscommunicatie en ondersteuning',
  },
  {
    imageUrl: doodleImage,
    title: 'ADHD later bekijken',
    description: 'Verdere evaluatie en monitoring',
  },
];

const KRACHTEN_STEPS = ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'];

interface AnnotationItemProps {
  annotation: { chip: string; description: string; imagePrompt: string };
  onClick: () => void;
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({ annotation, onClick }) => {
  const clipPathId = useId();
  return (
    <div
      className="doodler-prototype__annotation"
      onClick={onClick}
    >
      <div className="doodler-prototype__annotation-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath={`url(#${clipPathId})`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M10.75 2.18994L11.28 2.71994L17.28 8.71994L17.81 9.24994L17.28 9.77994L15.737 11.3229C15.4775 11.5826 15.1429 11.7541 14.7806 11.8132C14.4182 11.8722 14.0465 11.8158 13.718 11.6519L11.548 15.5569C11.1367 16.2972 10.535 16.9141 9.80511 17.3436C9.07527 17.7731 8.24386 17.9997 7.397 17.9999H2V12.6039C1.99967 11.7566 2.22602 10.9245 2.65558 10.1941C3.08515 9.4637 3.70229 8.8615 4.443 8.44994L8.348 6.28094C8.1839 5.95231 8.12738 5.58038 8.18642 5.21783C8.24547 4.85529 8.4171 4.52051 8.677 4.26094L10.22 2.71994L10.75 2.18994ZM9.37 7.42994L12.57 10.6299L10.237 14.8279C9.95565 15.3345 9.54399 15.7566 9.04465 16.0506C8.54531 16.3446 7.97645 16.4997 7.397 16.4999H4.56L7.53 13.5299L6.469 12.4699L3.499 15.4399V12.6039C3.499 11.4239 4.139 10.3359 5.171 9.76294L9.37 7.42994ZM14.677 10.2629C14.6538 10.2862 14.6262 10.3047 14.5958 10.3173C14.5654 10.3299 14.5329 10.3364 14.5 10.3364C14.4671 10.3364 14.4346 10.3299 14.4042 10.3173C14.3738 10.3047 14.3462 10.2862 14.323 10.2629L14.03 9.96994L10.03 5.96994L9.737 5.67694C9.71372 5.65372 9.69525 5.62613 9.68264 5.59576C9.67004 5.56539 9.66355 5.53282 9.66355 5.49994C9.66355 5.46706 9.67004 5.4345 9.68264 5.40412C9.69525 5.37375 9.71372 5.34616 9.737 5.32294L10.75 4.31094L15.69 9.24994L14.677 10.2629Z" fill="#171717"/>
          </g>
          <defs>
            <clipPath id={clipPathId}>
              <rect width="16" height="16" fill="white" transform="translate(2 2)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="doodler-prototype__annotation-chip">
        <Chip variant="secondary">{annotation.chip}</Chip>
      </div>
      <p className="doodler-prototype__annotation-description">
        {annotation.description}
      </p>
    </div>
  );
};

const KRACHTEN_ANNOTATIONS = [
  {
    chip: 'Chip',
    description: 'Here is my annotation description',
    imagePrompt: 'A detailed illustration showing the client\'s strengths and positive qualities',
  },
  {
    chip: 'Chip',
    description: 'Here is my annotation description',
    imagePrompt: 'A visual representation of the client\'s challenges and areas of concern',
  },
  {
    chip: 'Chip',
    description: 'Here is my annotation description',
    imagePrompt: 'An artistic depiction of insights and understanding about the client',
  },
  {
    chip: 'Chip',
    description: 'Here is my annotation description',
    imagePrompt: 'A comprehensive visualization of the treatment approach and plan',
  },
];

export const Prototype: React.FC = () => {
  const [showActivitiesOverview, setShowActivitiesOverview] = useState(true);
  const [showKrachtenPage, setShowKrachtenPage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [annotations, setAnnotations] = useState(KRACHTEN_ANNOTATIONS);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [cards, setCards] = useState(TREATMENT_PLAN_CARDS);
  const [currentKrachtenStep, setCurrentKrachtenStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showGalleryDetail, setShowGalleryDetail] = useState(false);
  const [selectedGallerySection, setSelectedGallerySection] = useState<string>('');
  
  // Store data for each section - initialize with default data
  const [sectionData, setSectionData] = useState(() => {
    return KRACHTEN_STEPS.map((step) => ({
      title: step,
      chip: step,
      caption: 'Over mij...',
      cards: TREATMENT_PLAN_CARDS,
    }));
  });

  const handleNavigateToDoodle = () => {
    setShowActivitiesOverview(false);
    setShowKrachtenPage(true);
    setCurrentKrachtenStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };


  const handleBackToOverview = () => {
    setShowActivitiesOverview(true);
    setShowKrachtenPage(false);
    setEditingIndex(null);
    setCurrentKrachtenStep(0);
  };

  const handleNextKrachtenStep = () => {
    // Save current section data before moving forward
    updateSectionData(currentKrachtenStep);
    
    if (currentKrachtenStep < KRACHTEN_STEPS.length - 1) {
      setCurrentKrachtenStep(currentKrachtenStep + 1);
      setEditingIndex(null);
    } else {
      // We're on the last step (Aanpak), show summary
      setShowSummary(true);
    }
  };

  const updateSectionData = (stepIndex: number) => {
    setSectionData((prev) => {
      const updated = [...prev];
      updated[stepIndex] = {
        title: KRACHTEN_STEPS[stepIndex],
        chip: KRACHTEN_STEPS[stepIndex],
        caption: 'Over mij...',
        cards: cards.map((card, cardIndex) => ({
          ...card,
          title: annotations[cardIndex]?.chip || card.title,
          description: annotations[cardIndex]?.description || card.description,
        })),
      };
      return updated;
    });
  };

  const handleSummarySectionClick = (index: number) => {
    setShowSummary(false);
    setCurrentKrachtenStep(index);
  };

  const handlePreviousKrachtenStep = () => {
    if (currentKrachtenStep > 0) {
      setCurrentKrachtenStep(currentKrachtenStep - 1);
      setEditingIndex(null);
    }
  };

  const handleAnnotationClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveAnnotation = (index: number, chip: string, description: string, imagePrompt: string) => {
    setAnnotations((prev) => {
      const updated = [...prev];
      updated[index] = { chip, description, imagePrompt };
      return updated;
    });
    setCards((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        title: chip || updated[index].title,
        description: description || updated[index].description,
      };
      return updated;
    });
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const contentItems = activeTab === 0 ? SUMMARY_ITEMS : KEY_WORDS_ITEMS;

  const handleGallerySectionClick = (sectionTitle: string) => {
    setSelectedGallerySection(sectionTitle);
    setShowGalleryDetail(true);
  };

  const handleBackFromGalleryDetail = () => {
    setShowGalleryDetail(false);
    setSelectedGallerySection('');
  };

  if (showGalleryDetail) {
    return (
      <GalleryDetail
        sectionTitle={selectedGallerySection}
        onBack={handleBackFromGalleryDetail}
        onBackToGallery={() => {
          setShowGalleryDetail(false);
          setShowGallery(true);
        }}
      />
    );
  }

  if (showGallery) {
    return (
      <Gallery
        onBack={() => setShowGallery(false)}
        onSectionClick={handleGallerySectionClick}
      />
    );
  }

  if (showActivitiesOverview) {
    return (
      <ActivitiesOverview
        onNavigateToDoodle={handleNavigateToDoodle}
        onNavigateToGallery={() => setShowGallery(true)}
      />
    );
  }

  if (showKrachtenPage) {
    if (showSummary) {
      return (
        <div className="doodler-prototype">
          <div className="doodler-prototype__header">
            <button
              className="doodler-prototype__back-button"
              onClick={handleBackToOverview}
              type="button"
              aria-label="Back to activities overview"
            >
              <IconArrowLeft size={20} />
            </button>
            <DoodlerLogo className="doodler-prototype__logo" />
          </div>
          <div className="doodler-prototype__screen">
            <div className="doodler-prototype__steps">
              <StepsComponent
                currentStep={KRACHTEN_STEPS.length}
                totalSteps={KRACHTEN_STEPS.length}
                steps={KRACHTEN_STEPS}
                activeStepIndex={KRACHTEN_STEPS.length - 1}
                isSummary={true}
                onStepClick={handleSummarySectionClick}
              />
            </div>
            <div className="doodler-prototype__step-section">
              <div className="doodler-prototype__step-title">
                <h2 className="doodler-prototype__heading">Overzicht Secties</h2>
                <p className="doodler-prototype__subtitle">
                  We hebben alle vier secties voltooid. Klik op een sectie om te bekijken.
                </p>
              </div>
              <div className="doodler-prototype__summary-content">
                <Summary
                  sections={sectionData}
                  onSectionClick={handleSummarySectionClick}
                />
                <div className="doodler-prototype__summary-actions">
                  <Button variant="outline" size="small" startIcon={<IconSend size={16} />}>
                    E-mail doodles
                  </Button>
                  <Button variant="primary" size="small" startIcon={<IconDocument size={16} />}>
                    Print doodles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="doodler-prototype">
        <div className="doodler-prototype__header">
          <button
            className="doodler-prototype__back-button"
            onClick={handleBackToOverview}
            type="button"
            aria-label="Back to activities overview"
          >
            <IconArrowLeft size={20} />
          </button>
          <DoodlerLogo className="doodler-prototype__logo" />
        </div>
        <div className="doodler-prototype__screen">
          <div className="doodler-prototype__steps">
            <StepsComponent
              currentStep={currentKrachtenStep + 1}
              totalSteps={KRACHTEN_STEPS.length}
              steps={KRACHTEN_STEPS}
              activeStepIndex={currentKrachtenStep}
              onStepClick={(index) => {
                setCurrentKrachtenStep(index);
                setEditingIndex(null);
              }}
            />
          </div>
          <div className="doodler-prototype__step-section">
            <div className="doodler-prototype__step-title">
              <h2 className="doodler-prototype__heading">{KRACHTEN_STEPS[currentKrachtenStep]}</h2>
              <p className="doodler-prototype__subtitle">
                {currentKrachtenStep === 0 && 'Dit zijn de krachten die je bij je cliënt ziet.'}
                {currentKrachtenStep === 1 && 'Dit zijn de klachten die je bij je cliënt ziet.'}
                {currentKrachtenStep === 2 && 'Dit zijn de inzichten die je bij je cliënt ziet.'}
                {currentKrachtenStep === 3 && 'Dit is de aanpak die je bij je cliënt ziet.'}
              </p>
            </div>
            <div className="doodler-prototype__step-content">
              <ImageDisplay
                caption="Over mij..."
                cards={cards}
              />
              <div className="doodler-prototype__right-content">
                <div className="doodler-prototype__top-content">
                  <div className="doodler-prototype__annotations">
                    {editingIndex !== null ? (
                      <EditAnnotation
                        chip={annotations[editingIndex].chip}
                        description={annotations[editingIndex].description}
                        imagePrompt={annotations[editingIndex].imagePrompt}
                        onSave={(chip, description, imagePrompt) => handleSaveAnnotation(editingIndex, chip, description, imagePrompt)}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      annotations.map((annotation, index) => (
                        <AnnotationItem
                          key={index}
                          annotation={annotation}
                          onClick={() => handleAnnotationClick(index)}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className="doodler-prototype__actions">
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={handlePreviousKrachtenStep}
                    disabled={currentKrachtenStep === 0}
                  >
                    Vorige sectie
                  </Button>
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={handleNextKrachtenStep}
                  >
                    Volgende sectie
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="doodler-prototype">
      <div className="doodler-prototype__header">
        <button
          className="doodler-prototype__back-button"
          onClick={handleBackToOverview}
          type="button"
          aria-label="Back to activities overview"
        >
          <IconArrowLeft size={20} />
        </button>
        <DoodlerLogo className="doodler-prototype__logo" />
      </div>
      <div className="doodler-prototype__screen">
        <div className="doodler-prototype__steps">
          <StepsComponent
            currentStep={currentStep}
            totalSteps={STEPS.length}
            steps={STEPS}
            activeStepIndex={currentStep - 1}
          />
        </div>
        <div className="doodler-prototype__step-section">
          <div className="doodler-prototype__step-title">
            <h2 className="doodler-prototype__heading">Strengths</h2>
            <p className="doodler-prototype__subtitle">
              These are the strengths you see in your client
            </p>
          </div>
          <div className="doodler-prototype__step-content">
            <ImageDisplay
              caption="Dit behandelplan stel ik voor, wat denk jij?"
              cards={TREATMENT_PLAN_CARDS}
            />
            <div className="doodler-prototype__right-content">
              <div className="doodler-prototype__top-content">
                <Tab
                  tabs={['Summary', 'Key Words']}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <Content items={contentItems} />
              </div>
              <Button
                variant="primary"
                size="small"
                onClick={handleNextStep}
                disabled={currentStep >= STEPS.length}
              >
                Nieuwe doodle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
