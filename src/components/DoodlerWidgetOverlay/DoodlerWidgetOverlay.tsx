import React from 'react';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import { IconOverview, IconPlus, IconCross } from '../../icons';
import './DoodlerWidgetOverlay.css';

export interface DoodlerWidgetOverlayProps {
  onOverviewClick: () => void;
  onNewDoodleClick?: () => void;
  onClose?: () => void;
}

export const DoodlerWidgetOverlay: React.FC<DoodlerWidgetOverlayProps> = ({ 
  onOverviewClick,
  onNewDoodleClick,
  onClose
}) => {
  return (
    <div className="doodler-widget-overlay">
      <div className="doodler-widget-overlay__container">
        <div className="doodler-widget-overlay__header">
          <DoodlerLogo className="doodler-widget-overlay__logo" />
          {onClose && (
            <button 
              className="doodler-widget-overlay__close"
              onClick={onClose}
              type="button"
              aria-label="Close"
            >
              <IconCross size={16} />
            </button>
          )}
        </div>
        <p className="doodler-widget-overlay__text">
          Begin met het visualiseren van het zorgtraject van uw cliënt. Klik om Doodler te openen.
        </p>
        <div className="doodler-widget-overlay__buttons">
          <Button 
            variant="outline" 
            size="small" 
            startIcon={<IconOverview size={16} />}
            onClick={onOverviewClick}
            className="doodler-widget-overlay__button"
          >
            Overzicht
          </Button>
          <Button 
            variant="primary" 
            size="small" 
            startIcon={<IconPlus size={16} />}
            onClick={onNewDoodleClick}
            className="doodler-widget-overlay__button"
          >
            Doodle toevoegen
          </Button>
        </div>
      </div>
    </div>
  );
};
