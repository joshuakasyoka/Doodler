import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import { IconCross, IconChevronDown, IconCheck, IconPlus } from '../../icons';
import './NewDoodleModal.css';

export interface NewDoodleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DROPDOWN_OPTIONS = ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'];

const ACTIVITY_OPTIONS = [
  'Cliënt Intake',
  'Verklarende analyse',
  'Behandel doelen',
  'Psycho educatie',
  'Gesperks verslag',
  'Signalerings plan',
];

export const NewDoodleModal: React.FC<NewDoodleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedContact1, setSelectedContact1] = useState<string>('');
  const [selectedContact2, setSelectedContact2] = useState<string>('');
  const [openDropdown1, setOpenDropdown1] = useState(false);
  const [openDropdown2, setOpenDropdown2] = useState(false);
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);

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

  const handleConfirm = () => {
    onConfirm();
    onClose();
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
              Selecteer wat u wilt visualiseren
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
                  {selectedContact1 || 'Kies een contactmoment'}
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
            <label className="doodler-new-doodle-modal__label">Bron toevoegen</label>
            <div className="doodler-new-doodle-modal__upload">
              <IconPlus size={16} />
              <span className="doodler-new-doodle-modal__upload-text">Databron toevoegen</span>
            </div>
          </div>
        </div>

        <div className="doodler-new-doodle-modal__actions">
          <Button variant="outline" size="small" onClick={onClose}>
            Annuleren
          </Button>
          <Button variant="primary" size="small" onClick={handleConfirm} startIcon={<IconCheck size={16} />}>
            Doodles genereren
          </Button>
        </div>
      </div>
    </div>
  );
};
