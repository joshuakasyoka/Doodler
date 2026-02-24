import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { IconCheck, IconPlus, IconGalleryToggle } from '../../icons';
import { DoodlerLogo } from '../../assets/logo';
import { NewDoodleModal } from '../NewDoodleModal/NewDoodleModal';
import './ActivitiesOverview.css';

export type CellState = 'empty' | 'add' | 'added' | 'number' | 'open';

export interface Activity {
  name: string;
  krachten: CellState;
  klachten: CellState;
  inzichten: CellState;
  aanpak: CellState;
}

export interface ActivitiesOverviewProps {
  onNavigateToDoodle?: (stepIndex?: number) => void;
  onNavigateToGallery?: () => void;
}

const ACTIVITIES: Activity[] = [
  { name: 'Cliënt Intake', krachten: 'added', klachten: 'empty', inzichten: 'added', aanpak: 'added' },
  { name: 'Verklarende analyse', krachten: 'empty', klachten: 'empty', inzichten: 'empty', aanpak: 'empty' },
  { name: 'Behandel doelen', krachten: 'added', klachten: 'empty', inzichten: 'empty', aanpak: 'added' },
  { name: 'Psycho educatie', krachten: 'empty', klachten: 'added', inzichten: 'empty', aanpak: 'added' },
  { name: 'Gesperks verslag', krachten: 'added', klachten: 'added', inzichten: 'added', aanpak: 'added' },
  { name: 'Signalerings plan', krachten: 'added', klachten: 'empty', inzichten: 'added', aanpak: 'added' },
];

const COLUMNS = [
  { key: 'krachten', label: 'Krachten' },
  { key: 'klachten', label: 'Klachten' },
  { key: 'inzichten', label: 'Inzichten' },
  { key: 'aanpak', label: 'Aanpak' },
];

interface CellButtonProps {
  state: CellState;
  onToggle?: () => void;
  onNavigate?: () => void;
  onOpenModal?: (columnKey?: keyof Activity) => void;
  columnKey?: keyof Activity;
}

const CellButton: React.FC<CellButtonProps> = ({ state, onToggle, onNavigate, onOpenModal, columnKey }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (state === 'empty') {
    return (
      <div
        className="doodler-activities-overview__cell-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          className={`doodler-activities-overview__icon-button doodler-activities-overview__icon-button--empty-hover ${
            !isHovered ? 'doodler-activities-overview__icon-button--hidden' : ''
          }`}
          type="button"
          onClick={() => onOpenModal?.(columnKey)}
          aria-label="Navigate to Doodle"
        >
          <IconPlus size={12} />
        </button>
      </div>
    );
  }

  if (state === 'open') {
    return (
      <Button variant="primary" size="small" startIcon={<IconPlus size={16} />}>
        Openen
      </Button>
    );
  }

  if (state === 'number') {
    return (
      <button
        className="doodler-activities-overview__icon-button doodler-activities-overview__icon-button--number"
        type="button"
        aria-label="Number"
      >
        <span className="doodler-activities-overview__icon-button-number">4</span>
      </button>
    );
  }

  const isChecked = state === 'added';
  const showHover = isHovered && !isChecked;

  if (isChecked) {
    return (
      <button
        className={`doodler-activities-overview__icon-button doodler-activities-overview__icon-button--checked ${
          isHovered ? 'doodler-activities-overview__icon-button--checked-hover' : ''
        }`}
        type="button"
        onClick={onNavigate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open doodle"
      >
        <IconCheck size={12} />
      </button>
    );
  }

  return (
    <button
      className={`doodler-activities-overview__icon-button ${
        showHover ? 'doodler-activities-overview__icon-button--hover' : ''
      }`}
      type="button"
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Add"
    >
      <IconPlus size={12} />
    </button>
  );
};

export const ActivitiesOverview: React.FC<ActivitiesOverviewProps> = ({ onNavigateToDoodle, onNavigateToGallery }) => {
  const [activities, setActivities] = useState<Activity[]>(ACTIVITIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState<keyof Activity | null>(null);

  const handleCellToggle = (activityIndex: number, columnKey: keyof Activity) => {
    setActivities((prev) => {
      const updated = [...prev];
      const currentState = updated[activityIndex][columnKey];
      
      if (currentState === 'add' || currentState === 'empty') {
        updated[activityIndex] = {
          ...updated[activityIndex],
          [columnKey]: 'added',
        };
      } else if (currentState === 'added') {
        updated[activityIndex] = {
          ...updated[activityIndex],
          [columnKey]: 'add',
        };
      }
      
      return updated;
    });
  };

  const handleOpenModal = (columnKey?: keyof Activity) => {
    setSelectedColumnKey(columnKey || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedColumnKey(null);
  };

  const handleConfirmModal = () => {
    if (onNavigateToDoodle) {
      // Map column keys to step indices
      const stepIndexMap: Record<keyof Activity, number> = {
        krachten: 0,
        klachten: 1,
        inzichten: 2,
        aanpak: 3,
      };
      const stepIndex = selectedColumnKey ? stepIndexMap[selectedColumnKey] : 0;
      onNavigateToDoodle(stepIndex);
    }
  };

  return (
    <div className="doodler-activities-overview">
      <div className="doodler-activities-overview__header">
        <DoodlerLogo className="doodler-activities-overview__logo" />
        <div className="doodler-activities-overview__header-actions">
          <Button variant="outline" size="small" startIcon={<IconGalleryToggle size={16} />} onClick={onNavigateToGallery}>
            Galerij
          </Button>
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />} onClick={handleOpenModal}>
            Nieuwe doodle
          </Button>
        </div>
      </div>
      <div className="doodler-activities-overview__screen">
        <div className="doodler-activities-overview__content">
          <div className="doodler-activities-overview__title-section">
            <h1 className="doodler-activities-overview__title">Patiëntoverzicht</h1>
            <p className="doodler-activities-overview__description">
              Een overzicht van de doodles die zijn gemaakt tijdens het zorgtraject van uw cliënt.
            </p>
          </div>
          <div className="doodler-activities-overview__table-container">
            <table className="doodler-activities-overview__table">
              <thead>
                <tr>
                  <th className="doodler-activities-overview__header-cell doodler-activities-overview__header-cell--activity">
                    Activiteit
                  </th>
                  {COLUMNS.map((column) => (
                    <th key={column.key} className="doodler-activities-overview__header-cell">
                      <div className="doodler-activities-overview__header-chip">{column.label}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr 
                    key={index} 
                    className="doodler-activities-overview__row"
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    <td className="doodler-activities-overview__cell doodler-activities-overview__cell--activity">
                      {hoveredRowIndex === index ? (
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => onNavigateToDoodle?.(0)}
                        >
                          Open
                        </Button>
                      ) : (
                        activity.name
                      )}
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.krachten}
                        onToggle={() => handleCellToggle(index, 'krachten')}
                        onNavigate={() => onNavigateToDoodle?.(0)}
                        onOpenModal={handleOpenModal}
                        columnKey="krachten"
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.klachten}
                        onToggle={() => handleCellToggle(index, 'klachten')}
                        onNavigate={() => onNavigateToDoodle?.(1)}
                        onOpenModal={handleOpenModal}
                        columnKey="klachten"
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.inzichten}
                        onToggle={() => handleCellToggle(index, 'inzichten')}
                        onNavigate={() => onNavigateToDoodle?.(2)}
                        onOpenModal={handleOpenModal}
                        columnKey="inzichten"
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.aanpak}
                        onToggle={() => handleCellToggle(index, 'aanpak')}
                        onNavigate={() => onNavigateToDoodle?.(3)}
                        onOpenModal={handleOpenModal}
                        columnKey="aanpak"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="doodler-activities-overview__row doodler-activities-overview__row--new">
                  <td className="doodler-activities-overview__cell doodler-activities-overview__cell--activity doodler-activities-overview__cell--new">
                    <div className="doodler-activities-overview__new-activity">
                      <div className="doodler-activities-overview__new-icon">
                        <IconPlus size={12} />
                      </div>
                      <span>Nieuwe activiteit</span>
                    </div>
                  </td>
                  <td className="doodler-activities-overview__cell" />
                  <td className="doodler-activities-overview__cell" />
                  <td className="doodler-activities-overview__cell" />
                  <td className="doodler-activities-overview__cell" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <NewDoodleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};
