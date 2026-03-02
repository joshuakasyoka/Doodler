import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { IconCross, IconChevronDown, IconCheck, IconPlus, IconDocument } from '../../icons';
import './NewDoodleModal.css';

export interface NewDoodleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedCategory?: 'krachten' | 'klachten' | 'inzichten' | 'aanpak', selectedActivity?: string) => void;
  preselectedCategory?: 'krachten' | 'klachten' | 'inzichten' | 'aanpak';
  preselectedActivity?: string;
  isLoading?: boolean;
}

const DROPDOWN_OPTIONS = ['Krachten', 'Kies onderdeel', 'Inzichten', 'Aanpak'];

const ACTIVITY_OPTIONS = [
  'Intake',
  'Adviesgesprek',
  'Behandelplan',
  'Psycho-educatie',
  'Gesperksverslag',
  'Signaleringsplan',
];

const CATEGORY_MAP: Record<'krachten' | 'klachten' | 'inzichten' | 'aanpak', string> = {
  krachten: 'Krachten',
  klachten: 'Klachten',
  inzichten: 'Inzichten',
  aanpak: 'Aanpak',
};

export const NewDoodleModal: React.FC<NewDoodleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  preselectedCategory,
  preselectedActivity,
  isLoading = false,
}) => {
  const [selectedContact1, setSelectedContact1] = useState<string>('');
  const [selectedContact2, setSelectedContact2] = useState<string>('');
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (preselectedCategory) {
        const categoryName = CATEGORY_MAP[preselectedCategory];
        if (categoryName) {
          setSelectedContact1(categoryName);
        }
      } else {
        // Reset when opening without preselection
        setSelectedContact1('');
      }
      // Set preselected activity if provided
      if (preselectedActivity) {
        setSelectedContact2(preselectedActivity);
      } else {
        // Reset second dropdown when opening
        setSelectedContact2('');
      }
      // Reset file when opening
      setSelectedFile(null);
    }
  }, [isOpen, preselectedCategory, preselectedActivity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setOpenDropdown1(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setOpenDropdown2(false);
      }
    };

    if (openDropdown1 || openDropdown2) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown1, openDropdown2]);

  if (!isOpen) return null;

  const handleSelectOption1 = (option: string) => {
    setSelectedContact1(option);
    setOpenDropdown1(false);
  };

  const handleSelectOption2 = (option: string) => {
    setSelectedContact2(option);
    setOpenDropdown2(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
      // Map selectedContact1 back to category key
      const categoryKeyMap: Record<string, 'krachten' | 'klachten' | 'inzichten' | 'aanpak' | undefined> = {
        'Krachten': 'krachten',
        'Klachten': 'klachten',
        'Inzichten': 'inzichten',
        'Aanpak': 'aanpak',
      };
      const categoryKey = selectedContact1 ? categoryKeyMap[selectedContact1] : undefined;
      // Use selectedContact2 if set, otherwise fall back to preselectedActivity
      const activityToUse = selectedContact2 || preselectedActivity || undefined;
      onConfirm(categoryKey, activityToUse);
    }
  };

  return (
    <div className="doodler-new-doodle-modal__overlay" onClick={onClose}>
      <div className="doodler-new-doodle-modal" onClick={(e) => e.stopPropagation()}>
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
              Selecteer wat je wilt visualiseren
            </label>
            <div className="doodler-new-doodle-modal__dropdown-wrapper" ref={dropdown1Ref}>
              <div 
                className="doodler-new-doodle-modal__dropdown"
                onClick={() => {
                  setOpenDropdown1(!openDropdown1);
                  setOpenDropdown2(false);
                }}
              >
                <span className="doodler-new-doodle-modal__dropdown-text">
                  {selectedContact1 || 'Kies onderdeel'}
                </span>
                <IconChevronDown size={16} />
              </div>
              {openDropdown1 && (
                <div className="doodler-new-doodle-modal__dropdown-menu">
                  {DROPDOWN_OPTIONS.map((option) => (
                    <div
                      key={option}
                      className="doodler-new-doodle-modal__dropdown-item"
                      onClick={() => handleSelectOption1(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="doodler-new-doodle-modal__dropdown-group">
            <label className="doodler-new-doodle-modal__label">
              Selecteer de fase van het zorgtraject
            </label>
            <div className="doodler-new-doodle-modal__dropdown-wrapper" ref={dropdown2Ref}>
              <div 
                className="doodler-new-doodle-modal__dropdown"
                onClick={() => {
                  setOpenDropdown2(!openDropdown2);
                  setOpenDropdown1(false);
                }}
              >
                <span className="doodler-new-doodle-modal__dropdown-text">
                  {selectedContact2 || 'Kies een contactmoment'}
                </span>
                <IconChevronDown size={16} />
              </div>
              {openDropdown2 && (
                <div className="doodler-new-doodle-modal__dropdown-menu">
                  {ACTIVITY_OPTIONS.map((option) => (
                    <div
                      key={option}
                      className="doodler-new-doodle-modal__dropdown-item"
                      onClick={() => handleSelectOption2(option)}
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
          <Button variant="primary" size="small" onClick={handleConfirm} startIcon={<IconCheck size={16} />} disabled={isLoading}>
            {isLoading ? 'Genereren...' : 'Doodles genereren'}
          </Button>
        </div>
      </div>
    </div>
  );
};
