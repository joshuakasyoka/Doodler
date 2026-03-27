import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { IconCross, IconChevronDown, IconCheck, IconPlus, IconDocument } from '../../icons';
import './NewDoodleModal.css';

export interface NewDoodleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    selectedCategories?: Array<'krachten' | 'klachten' | 'inzichten' | 'aanpak'>,
    selectedActivity?: string
  ) => void;
  preselectedCategory?: 'krachten' | 'klachten' | 'inzichten' | 'aanpak';
  preselectedActivity?: string;
  isLoading?: boolean;
}

const VISUALIZATION_OPTIONS: Array<{ key: 'krachten' | 'klachten' | 'inzichten' | 'aanpak'; label: string }> = [
  { key: 'krachten', label: 'Krachten' },
  { key: 'klachten', label: 'Klachten' },
  { key: 'inzichten', label: 'Inzichten' },
  { key: 'aanpak', label: 'Aanpak' },
];

const ACTIVITY_OPTIONS = [
  'Intake',
  'Adviesgesprek',
  'Behandelplan',
  'Psycho-educatie',
  'Gesperksverslag',
  'Signaleringsplan',
];

const DropdownCheckboxIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5 8C14.5 9.72391 13.8152 11.3772 12.5962 12.5962C11.3772 13.8152 9.72391 14.5 8 14.5C6.27609 14.5 4.62279 13.8152 3.40381 12.5962C2.18482 11.3772 1.5 9.72391 1.5 8C1.5 6.27609 2.18482 4.62279 3.40381 3.40381C4.62279 2.18482 6.27609 1.5 8 1.5C9.72391 1.5 11.3772 2.18482 12.5962 3.40381C13.8152 4.62279 14.5 6.27609 14.5 8ZM16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8Z"
      fill="#171717"
    />
    {checked && (
      <path
        d="M11.53 6.53L12.06 6L11 4.94L10.47 5.47L6.5 9.44L5.53 8.47L5 7.94L3.94 9L4.47 9.53L5.97 11.03C6.11063 11.1705 6.30125 11.2493 6.5 11.2493C6.69875 11.2493 6.88937 11.1705 7.03 11.03L11.53 6.53Z"
        fill="#171717"
      />
    )}
  </svg>
);

export const NewDoodleModal: React.FC<NewDoodleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  preselectedCategory,
  preselectedActivity,
  isLoading = false,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<Array<'krachten' | 'klachten' | 'inzichten' | 'aanpak'>>([]);
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
        setSelectedCategories([preselectedCategory]);
      } else {
        setSelectedCategories([]);
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

  const handleToggleCategory = (category: 'krachten' | 'klachten' | 'inzichten' | 'aanpak') => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
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
    // Add a mock file with Dutch name instead of opening file picker
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
      // Map selectedContact1 back to category key
      // Use selectedContact2 if set, otherwise fall back to preselectedActivity
      const activityToUse = selectedContact2 || preselectedActivity || undefined;
      onConfirm(selectedCategories.length > 0 ? selectedCategories : undefined, activityToUse);
    }
  };

  const selectedCategoriesText =
    selectedCategories.length > 0
      ? VISUALIZATION_OPTIONS
          .filter((option) => selectedCategories.includes(option.key))
          .map((option) => option.label)
          .join(', ')
      : 'Selecteer wat je wilt visualiseren';

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
                  {selectedCategoriesText}
                </span>
                <IconChevronDown size={16} />
              </div>
              {openDropdown1 && (
                <div className="doodler-new-doodle-modal__dropdown-menu">
                  {VISUALIZATION_OPTIONS.map((option) => {
                    const isChecked = selectedCategories.includes(option.key);
                    return (
                      <button
                        key={option.key}
                        type="button"
                        className="doodler-new-doodle-modal__dropdown-item doodler-new-doodle-modal__dropdown-item--checkbox"
                        onClick={() => handleToggleCategory(option.key)}
                      >
                        <span>{option.label}</span>
                        <DropdownCheckboxIcon checked={isChecked} />
                      </button>
                    );
                  })}
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
