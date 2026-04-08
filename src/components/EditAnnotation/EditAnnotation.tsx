import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { IconArrowUp } from '../../icons';
import { generateImage } from '../../services/imageGeneration';
import './EditAnnotation.css';

export interface EditAnnotationProps {
  chip: string;
  description: string;
  imagePrompt?: string;
  onSave: (chip: string, description: string, imagePrompt: string) => void;
  onCancel: () => void;
  onChange?: (chip: string, description: string, imagePrompt: string) => void;
  onImageGenerated?: (imageUrl: string) => void;
}

export const EditAnnotation: React.FC<EditAnnotationProps> = ({
  chip: initialChip,
  description: initialDescription,
  imagePrompt: initialImagePrompt = '',
  onSave,
  onCancel,
  onChange,
  onImageGenerated,
}) => {
  const [chip, setChip] = useState(initialChip);
  const [description, setDescription] = useState(initialDescription);
  const [imagePrompt, setImagePrompt] = useState(initialImagePrompt);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setChip(initialChip);
    setDescription(initialDescription);
    setImagePrompt(initialImagePrompt);
  }, [initialChip, initialDescription, initialImagePrompt]);

  const handleChipChange = (value: string) => {
    setChip(value);
    if (onChange) {
      onChange(value, description, imagePrompt);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (onChange) {
      onChange(chip, value, imagePrompt);
    }
  };

  const handleImagePromptChange = (value: string) => {
    setImagePrompt(value);
    if (onChange) {
      onChange(chip, description, value);
    }
  };

  const handleSave = () => {
    onSave(chip, description, imagePrompt);
  };

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleGenerateImage = async () => {
    // Combine chip and description to create a comprehensive prompt
    const fullPrompt = imagePrompt.trim() || `${chip}. ${description}`;
    
    if (!fullPrompt.trim()) {
      handleShowToast('Voer een prompt in om een afbeelding te genereren');
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await generateImage(fullPrompt, {
        size: '512x512',
      });

      if (result.error && !result.imageUrl) {
        // Only show error if we don't have a fallback image
        handleShowToast(`Fout bij genereren: ${result.error}`);
      } else if (result.imageUrl) {
        // Show success message (even if it's a mock image)
        if (result.error) {
          handleShowToast('Afbeelding gegenereerd (mock)');
        } else {
          handleShowToast('Afbeelding gegenereerd');
        }
        if (onImageGenerated) {
          onImageGenerated(result.imageUrl);
        }
      } else {
        handleShowToast('Kon geen afbeelding genereren');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      handleShowToast('Fout bij het genereren van de afbeelding');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleIconClick = () => {
    handleGenerateImage();
  };

  return (
    <div className="doodler-edit-annotation">
      <div className="doodler-edit-annotation__input-group">
        <input
          type="text"
          className="doodler-edit-annotation__input doodler-edit-annotation__input--header"
          value={chip}
          onChange={(e) => handleChipChange(e.target.value)}
          placeholder="Koptekst"
          autoFocus
        />
      </div>
      <div className="doodler-edit-annotation__input-group">
        <textarea
          className="doodler-edit-annotation__input doodler-edit-annotation__input--description"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Hier is mijn beschrijving"
          rows={3}
        />
      </div>
      <div className="doodler-edit-annotation__input-group doodler-edit-annotation__input-group--image-prompt">
        <input
          type="text"
          className="doodler-edit-annotation__input doodler-edit-annotation__input--image-prompt"
          value={imagePrompt}
          onChange={(e) => handleImagePromptChange(e.target.value)}
          placeholder="Typ elke wijziging die je in de afbeelding wilt"
        />
        <div 
          className={`doodler-edit-annotation__input-icon ${isGenerating ? 'doodler-edit-annotation__input-icon--loading' : ''}`}
          onClick={handleIconClick}
          title={isGenerating ? 'Afbeelding wordt gegenereerd...' : 'Genereer afbeelding'}
        >
          {isGenerating ? (
            <div className="doodler-edit-annotation__spinner" />
          ) : (
            <IconArrowUp size={12} />
          )}
        </div>
      </div>
      <div className="doodler-edit-annotation__actions">
        <Button variant="outline" size="small" onClick={onCancel}>
          Annuleren
        </Button>
        <Button variant="primary" size="small" onClick={handleSave}>
          Opslaan
        </Button>
      </div>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </div>
  );
};
