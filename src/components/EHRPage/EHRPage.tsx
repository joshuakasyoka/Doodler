import React, { useState } from 'react';
import { DoodlerWidgetOverlay } from '../DoodlerWidgetOverlay/DoodlerWidgetOverlay';
import { Prototype } from '../../pages/Prototype';
import { IconCross } from '../../icons';
import mayraImage from '../../assets/img/Mayra.png';
import './EHRPage.css';

export interface EHRPageProps {
  onOverviewClick?: () => void;
  onNewDoodleClick?: () => void;
}

export const EHRPage: React.FC<EHRPageProps> = ({
  onOverviewClick,
  onNewDoodleClick,
}) => {
  const [showDoodler, setShowDoodler] = useState(false);

  const handleOpenDoodler = () => {
    setShowDoodler(true);
    if (onOverviewClick) {
      onOverviewClick();
    }
  };

  const handleCloseDoodler = () => {
    setShowDoodler(false);
  };

  return (
    <div className="doodler-ehr-page">
      <div className="doodler-ehr-page__background">
        {/* EHR System Image Background */}
        <div className="doodler-ehr-page__image-container">
          <img 
            src={mayraImage} 
            alt="EHR System" 
            className="doodler-ehr-page__image"
          />
        </div>
      </div>
      
      {/* Widget Overlay */}
      <DoodlerWidgetOverlay 
        onOverviewClick={handleOpenDoodler}
        onNewDoodleClick={onNewDoodleClick}
      />

      {/* Close button - positioned outside the panel */}
      {showDoodler && (
        <button
          className="doodler-ehr-page__close-button"
          onClick={handleCloseDoodler}
          type="button"
          aria-label="Close Doodler"
        >
          <IconCross size={16} />
        </button>
      )}

      {/* Doodler Prototype Panel that slides in from the left */}
      {showDoodler && (
        <div className="doodler-ehr-page__doodler-panel">
          <div className="doodler-ehr-page__doodler-content">
            <Prototype />
          </div>
        </div>
      )}
    </div>
  );
};
