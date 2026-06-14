import React, { useEffect, useState } from 'react';
import { StepsComponent } from '../components/StepsComponent/StepsComponent';
import { ImageDisplay } from '../components/ImageDisplay/ImageDisplay';
import { Button } from '../components/Button/Button';
import { Chip } from '../components/Chip/Chip';
import { EditAnnotation } from '../components/EditAnnotation/EditAnnotation';
import { Summary } from '../components/Summary/Summary';
import { IconLibrary, IconPen } from '../icons';
import { MVPHeader } from './MVPHeader';
import {
  MVP_KRACHTEN_STEPS,
  MVP_VISIBLE_STEP_INDICES,
  annotationsToCards,
  cardsToMVPAnnotations,
  createInitialMVPSectionData,
  getMVPStepAnnotations,
  getMVPStepSubtitle,
  type MVPAnnotation,
} from './mvpDoodleContent';
import type { SummarySection } from '../components/Summary/Summary';
import type { MVPSavedDoodleSession } from './mvpLibraryTypes';
import './Prototype.css';
import './MVP.css';

import type { ImageDisplayCardHoverIcon, TreatmentPlanCard } from '../components/ImageDisplay/ImageDisplay';

type MVPCardIconMode = ImageDisplayCardHoverIcon;

interface AnnotationItemProps {
  annotation: MVPAnnotation;
  onClick: () => void;
}

const AnnotationItem: React.FC<AnnotationItemProps> = ({ annotation, onClick }) => {
  return (
    <div className="doodler-prototype__annotation" onClick={onClick}>
      <div className="doodler-prototype__annotation-icon">
        <IconPen size={20} />
      </div>
      <div className="doodler-prototype__annotation-chip">
        <Chip variant="secondary">{annotation.chip}</Chip>
      </div>
      <p className="doodler-prototype__annotation-description">{annotation.description}</p>
    </div>
  );
};

export interface MVPDoodleFlowProps {
  onBack: () => void;
  onOpenNewDoodle: () => void;
  onOpenLibrary: () => void;
  onSaveSession?: (sections: SummarySection[]) => void;
  initialSession?: MVPSavedDoodleSession;
}

export const MVPDoodleFlow: React.FC<MVPDoodleFlowProps> = ({
  onBack,
  onOpenNewDoodle,
  onOpenLibrary,
  onSaveSession,
  initialSession,
}) => {
  const initialSections = initialSession?.sections ?? createInitialMVPSectionData();
  const initialStepCards = initialSections[0]?.cards ?? annotationsToCards(getMVPStepAnnotations(0));

  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [annotations, setAnnotations] = useState<MVPAnnotation[]>(() =>
    cardsToMVPAnnotations(initialStepCards)
  );
  const [cards, setCards] = useState<TreatmentPlanCard[]>(() => initialStepCards);
  const [sectionData, setSectionData] = useState<SummarySection[]>(() => initialSections);
  const [stepCaptions, setStepCaptions] = useState<string[]>(() =>
    initialSections.map((section) => section.caption)
  );
  const [cardIconModes, setCardIconModes] = useState<MVPCardIconMode[]>([
    'refresh',
    'refresh',
    'refresh',
    'refresh',
  ]);
  const [cardIconClickCounts, setCardIconClickCounts] = useState<Record<number, number>>({});
  const [cardRefreshVersions, setCardRefreshVersions] = useState<Record<number, number>>({});

  const resetCardIconState = () => {
    setCardIconModes(['refresh', 'refresh', 'refresh', 'refresh']);
    setCardIconClickCounts({});
    setCardRefreshVersions({});
  };

  const handleCardIconClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const currentMode = cardIconModes[index] ?? 'refresh';

    if (currentMode === 'pen') {
      setEditingIndex(index);
      return;
    }

    if (currentMode === 'refresh') {
      setCardRefreshVersions((prev) => ({
        ...prev,
        [index]: (prev[index] ?? 0) + 1,
      }));
      setAnnotations((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          imageUrl: undefined,
          imagePrompt: '',
        };
        return updated;
      });
      setCards((prev) => {
        const updated = [...prev];
        const { imageUrl: _removed, generatedPrompt: _prompt, ...cardWithoutImage } = updated[index];
        updated[index] = cardWithoutImage;
        return updated;
      });
      setSectionData((prev) => {
        const updated = [...prev];
        const section = updated[currentStep];
        if (!section) return prev;
        const updatedCards = [...section.cards];
        updatedCards[index] = { ...updatedCards[index], imageUrl: undefined, generatedPrompt: undefined };
        updated[currentStep] = { ...section, cards: updatedCards };
        return updated;
      });
    }

    const nextCount = (cardIconClickCounts[index] ?? 0) + 1;

    if (nextCount >= 2) {
      setCardIconModes((prev) => {
        const updated = [...prev];
        updated[index] = 'pen';
        return updated;
      });
      setCardIconClickCounts((prev) => ({ ...prev, [index]: 0 }));
      return;
    }

    setCardIconClickCounts((prev) => ({ ...prev, [index]: nextCount }));
  };

  const getCardHoverIcon = (index: number): MVPCardIconMode => cardIconModes[index] ?? 'refresh';

  const getCardRefreshVersion = (index: number) => cardRefreshVersions[index];

  const getCardPlaceholderText = (index: number) => {
    const prompt =
      annotations[index]?.imagePrompt?.trim() || cards[index]?.generatedPrompt?.trim();
    return prompt || undefined;
  };

  const currentVisibleStepPosition = Math.max(MVP_VISIBLE_STEP_INDICES.indexOf(currentStep), 0);
  const visibleStepLabels = MVP_VISIBLE_STEP_INDICES.map((index) => MVP_KRACHTEN_STEPS[index]);
  const visibleSectionData = MVP_VISIBLE_STEP_INDICES.map((index) => sectionData[index]);

  useEffect(() => {
    if (showSummary && onSaveSession) {
      onSaveSession(MVP_VISIBLE_STEP_INDICES.map((index) => sectionData[index]));
    }
  }, [showSummary, sectionData, onSaveSession]);

  const buildSectionSnapshot = (stepIndex: number): SummarySection[] =>
    sectionData.map((section, index) => {
      if (index !== stepIndex) return section;
      return {
        title: MVP_KRACHTEN_STEPS[index],
        chip: MVP_KRACHTEN_STEPS[index],
        caption: stepCaptions[index],
        cards: cards.map((card, cardIndex) => ({
          ...card,
          title: annotations[cardIndex]?.chip || card.title,
          description: annotations[cardIndex]?.description || card.description,
          imageUrl: annotations[cardIndex]?.imageUrl ?? card.imageUrl,
          generatedPrompt: card.generatedPrompt ?? annotations[cardIndex]?.imagePrompt,
        })),
      };
    });

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setEditingIndex(null);
    resetCardIconState();
    const section = sectionData[stepIndex];
    if (section?.cards?.length) {
      setCards(section.cards);
      setAnnotations(cardsToMVPAnnotations(section.cards));
      return;
    }
    const stepAnnotations = getMVPStepAnnotations(stepIndex);
    setAnnotations(stepAnnotations);
    setCards(annotationsToCards(stepAnnotations));
  };

  const handleCaptionChange = (value: string) => {
    setStepCaptions((prev) => {
      const updated = [...prev];
      updated[currentStep] = value;
      return updated;
    });
    setSectionData((prev) => {
      const updated = [...prev];
      updated[currentStep] = {
        ...updated[currentStep],
        caption: value,
      };
      return updated;
    });
  };

  const updateSectionData = (stepIndex: number) => {
    setSectionData((prev) => {
      const updated = [...prev];
      updated[stepIndex] = {
        title: MVP_KRACHTEN_STEPS[stepIndex],
        chip: MVP_KRACHTEN_STEPS[stepIndex],
        caption: stepCaptions[stepIndex],
        cards: cards.map((card, cardIndex) => ({
          ...card,
          title: annotations[cardIndex]?.chip || card.title,
          description: annotations[cardIndex]?.description || card.description,
        })),
      };
      return updated;
    });
  };

  const handleNextStep = () => {
    if (currentVisibleStepPosition < MVP_VISIBLE_STEP_INDICES.length - 1) {
      updateSectionData(currentStep);
      goToStep(MVP_VISIBLE_STEP_INDICES[currentVisibleStepPosition + 1]);
      return;
    }

    const snapshot = buildSectionSnapshot(currentStep);
    setSectionData(snapshot);
    setShowSummary(true);
  };

  const handlePreviousStep = () => {
    if (currentVisibleStepPosition > 0) {
      goToStep(MVP_VISIBLE_STEP_INDICES[currentVisibleStepPosition - 1]);
    }
  };

  const handleSummarySectionClick = (visibleIndex: number) => {
    setShowSummary(false);
    goToStep(MVP_VISIBLE_STEP_INDICES[visibleIndex] ?? 0);
  };

  const handleSaveAnnotation = (
    index: number,
    chip: string,
    description: string,
    imagePrompt: string
  ) => {
    setAnnotations((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], chip, description, imagePrompt };
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

  const handleImageGenerated = (index: number, _imageUrl: string, prompt: string) => {
    setCardRefreshVersions((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setAnnotations((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        imageUrl: undefined,
        imagePrompt: prompt,
      };
      return updated;
    });
    setCards((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        const { imageUrl: _removed, ...cardWithoutImage } = updated[index];
        updated[index] = {
          ...cardWithoutImage,
          generatedPrompt: prompt,
        };
      }
      return updated;
    });
    setSectionData((prev) => {
      const updated = [...prev];
      const section = updated[currentStep];
      if (!section) return prev;
      const updatedCards = [...section.cards];
      if (updatedCards[index]) {
        const { imageUrl: _removed, ...cardWithoutImage } = updatedCards[index];
        updatedCards[index] = {
          ...cardWithoutImage,
          generatedPrompt: prompt,
        };
      }
      updated[currentStep] = { ...section, cards: updatedCards };
      return updated;
    });
  };

  if (showSummary) {
    return (
      <div className="doodler-prototype">
        <MVPHeader
          onBack={onBack}
          onOpenNewDoodle={onOpenNewDoodle}
          onOpenLibrary={onOpenLibrary}
        />
        <div className="doodler-prototype__screen">
          <div className="doodler-prototype__steps">
            <StepsComponent
              currentStep={MVP_KRACHTEN_STEPS.length}
              totalSteps={MVP_KRACHTEN_STEPS.length}
              steps={[...MVP_KRACHTEN_STEPS]}
              activeStepIndex={MVP_KRACHTEN_STEPS.length - 1}
              isSummary
              onStepClick={handleSummarySectionClick}
            />
          </div>
          <div className="doodler-prototype__step-section">
            <div className="doodler-prototype__step-title">
              <h2 className="doodler-prototype__heading">Bekijk de doodles</h2>
              <p className="doodler-prototype__description">
                Alle Doodle-onderdelen zijn compleet. Klik op een Doodle om die te bekijken of bewerken.
              </p>
            </div>
            <div className="doodler-prototype__summary-content">
              <Summary
                sections={visibleSectionData}
                onSectionClick={handleSummarySectionClick}
              />
              <div className="doodler-prototype__summary-actions">
                <Button variant="outline" size="small" onClick={onBack}>
                  Terug naar start
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  startIcon={<IconLibrary size={16} />}
                  onClick={onOpenLibrary}
                >
                  Bekijk in bibliotheek
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
      <MVPHeader
        onBack={onBack}
        onOpenNewDoodle={onOpenNewDoodle}
        onOpenLibrary={onOpenLibrary}
      />
      <div className="doodler-prototype__screen">
        <div className="doodler-prototype__steps">
          <StepsComponent
            currentStep={currentVisibleStepPosition + 1}
            totalSteps={MVP_VISIBLE_STEP_INDICES.length}
            steps={visibleStepLabels}
            activeStepIndex={currentVisibleStepPosition}
            onStepClick={(index) => goToStep(MVP_VISIBLE_STEP_INDICES[index] ?? 0)}
          />
        </div>
        <div className="doodler-prototype__step-section">
          <div className="doodler-prototype__step-title">
            <h2 className="doodler-prototype__heading">{MVP_KRACHTEN_STEPS[currentStep]}</h2>
            <p className="doodler-prototype__subtitle">{getMVPStepSubtitle(currentStep)}</p>
          </div>
          <div className="doodler-prototype__step-content">
            <ImageDisplay
              key={currentStep}
              caption={stepCaptions[currentStep]}
              cards={cards}
              captionEditable
              emptyImagePlaceholder="grey"
              getCardRefreshVersion={getCardRefreshVersion}
              getCardPlaceholderText={getCardPlaceholderText}
              onCaptionChange={handleCaptionChange}
              onCardClick={(index) => setEditingIndex(index)}
              getCardHoverIcon={getCardHoverIcon}
              onCardHoverIconClick={handleCardIconClick}
            />
            <div className="doodler-prototype__right-content">
              <div className="doodler-prototype__top-content">
                <div className="doodler-prototype__annotations">
                  {editingIndex !== null ? (
                    <EditAnnotation
                      chip={annotations[editingIndex].chip}
                      description={annotations[editingIndex].description}
                      imagePrompt={annotations[editingIndex].imagePrompt}
                      onChange={(_chip, _description, imagePrompt) => {
                        setAnnotations((prev) => {
                          const updated = [...prev];
                          updated[editingIndex] = { ...updated[editingIndex], imagePrompt };
                          return updated;
                        });
                      }}
                      onSave={(chip, description, imagePrompt) =>
                        handleSaveAnnotation(editingIndex, chip, description, imagePrompt)
                      }
                      onCancel={() => setEditingIndex(null)}
                      onImageGenerated={(imageUrl, prompt) =>
                        handleImageGenerated(editingIndex, imageUrl, prompt)
                      }
                    />
                  ) : (
                    annotations.map((annotation, index) => (
                      <AnnotationItem
                        key={index}
                        annotation={annotation}
                        onClick={() => setEditingIndex(index)}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="doodler-prototype__actions">
                <Button
                  variant="outline"
                  size="small"
                  onClick={handlePreviousStep}
                  disabled={currentVisibleStepPosition === 0}
                >
                  Vorige sectie
                </Button>
                <Button variant="primary" size="small" onClick={handleNextStep}>
                  {MVP_KRACHTEN_STEPS[currentStep] === 'Aanpak'
                    ? 'Ga naar samenvatting'
                    : 'Volgende sectie'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
