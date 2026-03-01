import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { Toast } from '../Toast/Toast';
import { IconArrowUp } from '../../icons';
import './EditAnnotation.css';

export interface EditAnnotationProps {
  chip: string;
  description: string;
  imagePrompt?: string;
  onSave: (chip: string, description: string, imagePrompt: string) => void;
  onCancel: () => void;
  onChange?: (chip: string, description: string, imagePrompt: string) => void;
}

export const EditAnnotation: React.FC<EditAnnotationProps> = ({
  chip: initialChip,
  description: initialDescription,
  imagePrompt: initialImagePrompt = '',
  onSave,
  onCancel,
  onChange,
}) => {
  const [chip, setChip] = useState(initialChip);
  const [description, setDescription] = useState(initialDescription);
  const [imagePrompt, setImagePrompt] = useState(initialImagePrompt);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState(false);

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

  const handleIconClick = () => {
    handleShowToast('Doodle bijgewerkt');
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
          placeholder="Werk de prompt bij om de doodle te wijzigen"
        />
        <div className="doodler-edit-annotation__input-icon" onClick={handleIconClick}>
          <IconArrowUp size={12} />
        </div>
      </div>
      <div className="doodler-edit-annotation__actions">
        <Button variant="outline" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="small" onClick={handleSave}>
          Save Annotation
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
