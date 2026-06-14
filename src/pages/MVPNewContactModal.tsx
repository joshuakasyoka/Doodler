import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button/Button';
import { IconCross, IconChevronDown, IconCheck, IconPlus, IconDocument } from '../icons';
import '../components/NewDoodleModal/NewDoodleModal.css';

export interface MVPNewContactModalProps {
  onClose: () => void;
  onConfirm: (selectedActivity?: string) => void;
  preselectedActivity?: string;
  isLoading?: boolean;
}

const ACTIVITY_OPTIONS = [
  'Intake',
  'Adviesgesprek',
  'Behandelplan',
  'Psycho-educatie',
  'Gespreksverslag',
];

export const MVPNewContactModal: React.FC<MVPNewContactModalProps> = ({
  onClose,
  onConfirm,
  preselectedActivity = 'Adviesgesprek',
  isLoading = false,
}) => {
  const [selectedActivity, setSelectedActivity] = useState(preselectedActivity);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedActivity(preselectedActivity);
    setSelectedFile(null);
  }, [preselectedActivity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleSelectActivity = (option: string) => {
    setSelectedActivity(option);
    setOpenDropdown(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    const mockFile = new File([''], 'bestand_voorbeeld', { type: 'application/pdf' });
    setSelectedFile(mockFile);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm(selectedActivity || preselectedActivity);
    }
  };

  return (
    <div
      className="doodler-new-doodle-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="doodler-new-doodle-modal__header">
        <h2 className="doodler-new-doodle-modal__title">Nieuw contactmoment toevoegen</h2>
        <button
          className="doodler-new-doodle-modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <IconCross size={16} />
        </button>
      </div>

      <div className="doodler-new-doodle-modal__content">
        <div className="doodler-new-doodle-modal__dropdown-group">
          <label className="doodler-new-doodle-modal__label">
            Selecteer de fase van het zorgtraject
          </label>
          <div className="doodler-new-doodle-modal__dropdown-wrapper" ref={dropdownRef}>
            <div
              className="doodler-new-doodle-modal__dropdown"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <span className="doodler-new-doodle-modal__dropdown-text">
                {selectedActivity || 'Kies een contactmoment'}
              </span>
              <IconChevronDown size={16} />
            </div>
            {openDropdown && (
              <div className="doodler-new-doodle-modal__dropdown-menu">
                {ACTIVITY_OPTIONS.map((option) => (
                  <div
                    key={option}
                    className="doodler-new-doodle-modal__dropdown-item"
                    onClick={() => handleSelectActivity(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="doodler-new-doodle-modal__upload-group">
          <label className="doodler-new-doodle-modal__label">Bestand toevoegen</label>
          <input
            ref={fileInputRef}
            type="file"
            className="doodler-new-doodle-modal__file-input"
            onChange={handleFileSelect}
            accept="*/*"
          />
          {selectedFile ? (
            <div className="doodler-new-doodle-modal__file-selected">
              <div className="doodler-new-doodle-modal__file-info">
                <IconDocument size={16} />
                <span className="doodler-new-doodle-modal__file-name">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                className="doodler-new-doodle-modal__file-remove"
                onClick={handleRemoveFile}
                aria-label="Remove file"
              >
                <IconCross size={16} />
              </button>
            </div>
          ) : (
            <div className="doodler-new-doodle-modal__upload" onClick={handleUploadClick}>
              <IconPlus size={16} />
              <span className="doodler-new-doodle-modal__upload-text">Bestand toevoegen</span>
            </div>
          )}
        </div>
      </div>

      <div className="doodler-new-doodle-modal__actions">
        <Button variant="outline" size="small" onClick={onClose} disabled={isLoading}>
          Annuleren
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={handleConfirm}
          startIcon={<IconCheck size={16} />}
          disabled={isLoading}
        >
          {isLoading ? 'Genereren...' : 'Doodles genereren'}
        </Button>
      </div>
    </div>
  );
};
