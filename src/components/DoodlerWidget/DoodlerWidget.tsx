import React from 'react';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import { IconOverview } from '../../icons';
import './DoodlerWidget.css';

export interface DoodlerWidgetProps {
  onOverviewClick: () => void;
}

export const DoodlerWidget: React.FC<DoodlerWidgetProps> = ({ onOverviewClick }) => {
  return (
    <div className="doodler-widget">
      <div className="doodler-widget__header">
        <DoodlerLogo className="doodler-widget__logo" />
      </div>
      <div className="doodler-widget__content">
        <div className="doodler-widget__overlay">
          <Button 
            variant="primary" 
            size="small" 
            startIcon={<IconOverview size={16} />}
            onClick={onOverviewClick}
          >
            Overview
          </Button>
        </div>
      </div>
    </div>
  );
};
