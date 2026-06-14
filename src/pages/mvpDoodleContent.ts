import doodleImage from '../assets/img/Doodle.png';
import krachtenTopLeft from '../assets/img/Krachten_top_left.png';
import krachtenTopRight from '../assets/img/Krachten_top_right.png';
import krachtenBottomLeft from '../assets/img/Krachten_bottom_left.png';
import krachtenBottomRight from '../assets/img/Krachten_bottom right.png';
import klachtenTopLeft from '../assets/img/Klachten_top_left.png';
import klachtenTopRight from '../assets/img/Klachten_top_right.png';
import klachtenBottomLeft from '../assets/img/Klachten_bottom_left.png';
import klachtenBottomRight from '../assets/img/Klachten_bottom_right.png';
import inzichtenTopLeft from '../assets/img/Inzichten_top_left.png';
import inzichtenTopRight from '../assets/img/Inzichten_top_right.png';
import inzichtenBottomLeft from '../assets/img/Inzichten_bottom_left.png';
import inzichtenBottomRight from '../assets/img/Inzichten_bottom_right.png';
import aanpakTopLeft from '../assets/img/Aanpak_top_left.png';
import aanpakTopRight from '../assets/img/Aanpak_top_right.png';
import aanpakBottomLeft from '../assets/img/Aanpak_bottom_left.png';
import aanpakBottomRight from '../assets/img/Aanpak_bottom_right.png';
import type { SummarySection } from '../components/Summary/Summary';

export const MVP_KRACHTEN_STEPS = ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'] as const;
export const MVP_VISIBLE_STEP_INDICES = [0, 1, 2, 3];

export type MVPStepName = (typeof MVP_KRACHTEN_STEPS)[number];

export interface MVPAnnotation {
  chip: string;
  description: string;
  imagePrompt: string;
  imageUrl?: string;
}

export const MVP_STEP_ANNOTATIONS: Record<MVPStepName, MVPAnnotation[]> = {
  Krachten: [
    {
      chip: 'Goed met taal',
      description: 'Je kunt goed praten en denkt graag diep na over dingen.',
      imagePrompt: '',
      imageUrl: krachtenTopLeft,
    },
    {
      chip: 'Blijven proberen',
      description: 'Je wilt je taken graag goed uitvoeren.',
      imagePrompt: '',
      imageUrl: krachtenTopRight,
    },
    {
      chip: 'Makkelijk praten met anderen',
      description: 'Je kunt makkelijk contact maken met nieuwe mensen.',
      imagePrompt: '',
      imageUrl: krachtenBottomLeft,
    },
    {
      chip: 'Goede band met zus',
      description: 'Met je zus deel je vaak hoe het met je gaat.',
      imagePrompt: '',
      imageUrl: krachtenBottomRight,
    },
  ],
  Klachten: [
    {
      chip: 'Druk hoofd',
      description: 'Je hoofd voelt vaak druk en chaotisch, waardoor je moeilijk kunt ontspannen.',
      imagePrompt: '',
      imageUrl: klachtenTopLeft,
    },
    {
      chip: 'Moeizaam slapen',
      description: 'Je hebt moeite met inslapen.',
      imagePrompt: '',
      imageUrl: klachtenTopRight,
    },
    {
      chip: 'Moeilijk overzicht houden',
      description: 'Je werkt snel maar mist dan informatie. Het is lastig overzicht te houden.',
      imagePrompt: '',
      imageUrl: klachtenBottomLeft,
    },
    {
      chip: 'Lastige emoties',
      description: 'Je hebt soms heftige uitbarstingen.',
      imagePrompt: '',
      imageUrl: klachtenBottomRight,
    },
  ],
  Inzichten: [
    {
      chip: 'Anderen niet willen belasten',
      description: 'Je gaat bij gevoelens eerder naar je oudste zus dan naar je ouders.',
      imagePrompt: '',
      imageUrl: inzichtenTopLeft,
    },
    {
      chip: 'Botsing thuis',
      description: 'Mama is meer chaotisch en jij houdt juist sterk vast aan tijden en planning.',
      imagePrompt: '',
      imageUrl: inzichtenTopRight,
    },
    {
      chip: 'Gevoelig door stress',
      description: 'Mama vertelt dat er veel stress was toen je nog in haar buik zat. Dat kan invloed hebben op hoe gevoelig je nu bent.',
      imagePrompt: '',
      imageUrl: inzichtenBottomLeft,
    },
    {
      chip: 'Veel willen zorgen',
      description: 'Je maakt je zorgen om mama en wilt goed op haar letten.',
      imagePrompt: '',
      imageUrl: inzichtenBottomRight,
    },
  ],
  Aanpak: [
    {
      chip: 'Helpen omgaan met gevoelens',
      description: 'Je krijgt uitleg over hoe jouw hoofd werkt en leert hoe je beter met je emoties om kunt gaan.',
      imagePrompt: '',
      imageUrl: aanpakTopLeft,
    },
    {
      chip: 'Steun voor jonge helpers',
      description: 'Je mag meedoen aan activiteiten voor kinderen die thuis extra zorgen hebben.',
      imagePrompt: '',
      imageUrl: aanpakTopRight,
    },
    {
      chip: 'Ondersteuning voor je ouders',
      description: 'Je ouders krijgen uitleg over hoe jouw hoofd werkt en wat jij nodig hebt.',
      imagePrompt: '',
      imageUrl: aanpakBottomLeft,
    },
    {
      chip: 'Afstemming met school',
      description: 'Er komt een gesprek met school om te zorgen dat zij begrijpen wat er bij jou speelt en hoe ze je kunnen helpen.',
      imagePrompt: '',
      imageUrl: aanpakBottomRight,
    },
  ],
};

export const getMVPCaptionForStep = (stepIndex: number) => {
  if (stepIndex === 0) return 'Dit gaat er goed...';
  if (stepIndex === 1) return 'Waarom we hier zijn...';
  if (stepIndex === 2) return 'Waardoor dat kan komen…';
  if (stepIndex === 3) return 'Deze aanpak stel ik voor, wat denk jij?';
  return 'Dit gaat er goed...';
};

export const getMVPStepSubtitle = (stepIndex: number) => {
  if (stepIndex === 0) return 'Dit zijn de krachten die je bij je cliënt ziet.';
  if (stepIndex === 1) return 'Dit zijn de klachten die je bij je cliënt ziet.';
  if (stepIndex === 2) return 'Dit zijn de inzichten over je cliënt.';
  if (stepIndex === 3) return 'Dit is de aanpak die je voorstelt aan je cliënt.';
  return '';
};

export const annotationsToCards = (annotations: MVPAnnotation[]) =>
  annotations.map((ann) => ({
    imageUrl: ann.imageUrl || doodleImage,
    title: ann.chip,
    description: ann.description,
  }));

export const createInitialMVPSectionData = (): SummarySection[] =>
  MVP_KRACHTEN_STEPS.map((step, index) => {
    const stepAnnotations = MVP_STEP_ANNOTATIONS[step];
    return {
      title: step,
      chip: step,
      caption: getMVPCaptionForStep(index),
      cards: annotationsToCards(stepAnnotations),
    };
  });

export const getMVPStepAnnotations = (stepIndex: number) => {
  const stepName = MVP_KRACHTEN_STEPS[stepIndex];
  return MVP_STEP_ANNOTATIONS[stepName];
};

export const cardsToMVPAnnotations = (cards: {
  title: string;
  description: string;
  imageUrl?: string;
  generatedPrompt?: string;
}[]) =>
  cards.map((card) => ({
    chip: card.title,
    description: card.description,
    imagePrompt: card.generatedPrompt ?? '',
    imageUrl: card.imageUrl,
  }));
