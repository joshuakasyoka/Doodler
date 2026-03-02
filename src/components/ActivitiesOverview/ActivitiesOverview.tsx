import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { IconCheck, IconPlus, IconGalleryToggle } from '../../icons';
import { DoodlerLogo } from '../../assets/logo';
import { NewDoodleModal } from '../NewDoodleModal/NewDoodleModal';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
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
  onNavigateToDoodle?: (stepIndex?: number, isNewDoodle?: boolean) => void;
  onNavigateToGallery?: () => void;
  isShowcase?: boolean;
  onActivityAdded?: (activityName: string, columnKey: 'krachten' | 'klachten' | 'inzichten' | 'aanpak') => void;
  activities?: Activity[];
  onActivitiesChange?: (activities: Activity[]) => void;
}

const ACTIVITIES: Activity[] = [
  { name: 'Intake', krachten: 'added', klachten: 'empty', inzichten: 'added', aanpak: 'added' },
  { name: 'Adviesgesprek', krachten: 'added', klachten: 'added', inzichten: 'added', aanpak: 'added' },
  { name: 'Behandelplan', krachten: 'added', klachten: 'empty', inzichten: 'empty', aanpak: 'added' },
  { name: 'Psycho-educatie', krachten: 'empty', klachten: 'added', inzichten: 'empty', aanpak: 'added' },
  { name: 'Gesperksverslag', krachten: 'added', klachten: 'added', inzichten: 'added', aanpak: 'added' },
  { name: 'Signaleringsplan', krachten: 'added', klachten: 'empty', inzichten: 'added', aanpak: 'added' },
];

const SHOWCASE_ACTIVITIES: Activity[] = [
  { name: 'Intake', krachten: 'added', klachten: 'added', inzichten: 'added', aanpak: 'added' },
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
  onOpenModal?: (columnKey?: keyof Activity, activityName?: string) => void;
  columnKey?: keyof Activity;
  activityName?: string;
}

const CellButton: React.FC<CellButtonProps> = ({ state, onToggle, onNavigate, onOpenModal, columnKey, activityName }) => {
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
          onClick={() => onOpenModal?.(columnKey, activityName)}
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

export const ActivitiesOverview: React.FC<ActivitiesOverviewProps> = ({ 
  onNavigateToDoodle, 
  onNavigateToGallery, 
  isShowcase = false, 
  onActivityAdded,
  activities: controlledActivities,
  onActivitiesChange,
}) => {
  const [internalActivities, setInternalActivities] = useState<Activity[]>(isShowcase ? SHOWCASE_ACTIVITIES : ACTIVITIES);
  const activities = controlledActivities !== undefined ? controlledActivities : internalActivities;
  
  const setActivities = (updater: Activity[] | ((prev: Activity[]) => Activity[])) => {
    const newActivities = typeof updater === 'function' ? updater(activities) : updater;
    if (onActivitiesChange) {
      onActivitiesChange(newActivities);
    } else {
      setInternalActivities(newActivities);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [selectedColumnKey, setSelectedColumnKey] = useState<keyof Activity | null>(null);
  const [selectedActivityName, setSelectedActivityName] = useState<string | null>(null);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleOpenModal = (columnKey?: keyof Activity, activityName?: string) => {
    setSelectedColumnKey(columnKey || null);
    setSelectedActivityName(activityName || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedColumnKey(null);
    setSelectedActivityName(null);
    setIsAddingActivity(false);
    setIsLoading(false);
  };

  const handleConfirmModal = (selectedCategory?: 'krachten' | 'klachten' | 'inzichten' | 'aanpak', selectedActivity?: string) => {
    setIsLoading(true);
    setIsModalOpen(false);
    
    // Store values before clearing state
    const activityToAdd = selectedActivity || selectedActivityName;
    const isAddingActivityFlag = isAddingActivity;
    const categoryToUse = selectedCategory || (isAddingActivityFlag && isShowcase ? 'krachten' : (selectedColumnKey && selectedColumnKey !== 'name' ? selectedColumnKey : 'krachten'));
    
    // Simulate loading time (1.5 seconds)
    setTimeout(() => {
      if (isAddingActivityFlag) {
        // Use the activity from modal (which should be the preselected one if user didn't change it)
        const activityName = activityToAdd || 'Adviesgesprek';
        
        // Add new activity to the list with the selected category checked
        setActivities((prev) => {
          const newActivity: Activity = {
            name: activityName,
            krachten: categoryToUse === 'krachten' ? 'added' : 'empty',
            klachten: categoryToUse === 'klachten' ? 'added' : 'empty',
            inzichten: categoryToUse === 'inzichten' ? 'added' : 'empty',
            aanpak: categoryToUse === 'aanpak' ? 'added' : 'empty',
          };
          return [...prev, newActivity];
        });
        
        setIsAddingActivity(false);
        setSelectedActivityName(null);
        
        // Notify parent that activity was added (only in showcase mode)
        if (isShowcase && onActivityAdded && activityName === 'Adviesgesprek') {
          onActivityAdded(activityName, categoryToUse);
        }
        
        // Navigate to create the first doodle
        if (onNavigateToDoodle) {
          const stepIndexMap: Record<'krachten' | 'klachten' | 'inzichten' | 'aanpak', number> = {
            krachten: 0,
            klachten: 1,
            inzichten: 2,
            aanpak: 3,
          };
          const stepIndex = stepIndexMap[categoryToUse] || 0;
          setIsLoading(false);
          onNavigateToDoodle(stepIndex, true);
        }
      } else if (onNavigateToDoodle) {
        // Map column keys to step indices
        const stepIndexMap: Record<'krachten' | 'klachten' | 'inzichten' | 'aanpak', number> = {
          krachten: 0,
          klachten: 1,
          inzichten: 2,
          aanpak: 3,
        };
        const stepIndex = stepIndexMap[categoryToUse] || 0;
        setIsLoading(false);
        onNavigateToDoodle(stepIndex, true);
      }
    }, 1500);
  };

  const handleAddNewActivity = () => {
    // Find the next activity that doesn't exist yet
    const existingActivityNames = activities.map(a => a.name);
    const ACTIVITY_OPTIONS = [
      'Intake',
      'Adviesgesprek',
      'Behandelplan',
      'Psycho-educatie',
      'Gesperksverslag',
      'Signaleringsplan',
    ];
    
    const nextActivity = ACTIVITY_OPTIONS.find(activity => !existingActivityNames.includes(activity));
    
    if (nextActivity) {
      setSelectedActivityName(nextActivity);
      setIsAddingActivity(true);
      setIsModalOpen(true);
    } else {
      // If all activities exist, just open modal without preselection
      setIsAddingActivity(true);
      setIsModalOpen(true);
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
          <Button variant="primary" size="small" startIcon={<IconPlus size={16} />} onClick={() => handleOpenModal()}>
            Nieuwe doodle
          </Button>
        </div>
      </div>
      <div className="doodler-activities-overview__screen">
        <div className="doodler-activities-overview__content">
          <div className="doodler-activities-overview__title-section">
            <h1 className="doodler-activities-overview__title">Cliëntoverzicht</h1>
            <p className="doodler-activities-overview__description">
              Een overzicht van de doodles die zijn gemaakt tijdens het zorgtraject van je cliënt.
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
                      <div className="doodler-activities-overview__activity-cell-content">
                        <span className="doodler-activities-overview__activity-name">{activity.name}</span>
                        {hoveredRowIndex === index && (
                          <Button 
                            variant="primary" 
                            size="small"
                            onClick={() => onNavigateToDoodle?.(0)}
                          >
                            Open
                          </Button>
                        )}
                      </div>
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.krachten}
                        onToggle={() => handleCellToggle(index, 'krachten')}
                        onNavigate={() => onNavigateToDoodle?.(0)}
                        onOpenModal={handleOpenModal}
                        columnKey="krachten"
                        activityName={activity.name}
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.klachten}
                        onToggle={() => handleCellToggle(index, 'klachten')}
                        onNavigate={() => onNavigateToDoodle?.(1)}
                        onOpenModal={handleOpenModal}
                        columnKey="klachten"
                        activityName={activity.name}
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.inzichten}
                        onToggle={() => handleCellToggle(index, 'inzichten')}
                        onNavigate={() => onNavigateToDoodle?.(2)}
                        onOpenModal={handleOpenModal}
                        columnKey="inzichten"
                        activityName={activity.name}
                      />
                    </td>
                    <td className="doodler-activities-overview__cell">
                      <CellButton
                        state={activity.aanpak}
                        onToggle={() => handleCellToggle(index, 'aanpak')}
                        onNavigate={() => onNavigateToDoodle?.(3)}
                        onOpenModal={handleOpenModal}
                        columnKey="aanpak"
                        activityName={activity.name}
                      />
                    </td>
                  </tr>
                ))}
                <tr 
                  className="doodler-activities-overview__row doodler-activities-overview__row--new"
                  onClick={handleAddNewActivity}
                  style={{ cursor: 'pointer' }}
                >
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
        preselectedCategory={
          isAddingActivity 
            ? (isShowcase ? 'krachten' : (selectedColumnKey && selectedColumnKey !== 'name' ? selectedColumnKey : 'krachten'))
            : selectedColumnKey && selectedColumnKey !== 'name' 
              ? selectedColumnKey 
              : undefined
        }
        preselectedActivity={isAddingActivity ? (selectedActivityName || 'Adviesgesprek') : selectedActivityName || undefined}
        isLoading={isLoading}
      />
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
};
