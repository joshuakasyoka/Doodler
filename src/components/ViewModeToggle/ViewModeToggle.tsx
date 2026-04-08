import React from 'react';
import { Button } from '../Button/Button';
import { IconOverview, IconGalleryToggle } from '../../icons';
import './ViewModeToggle.css';

export type ClientViewMode = 'overview' | 'timeline';

export interface ViewModeToggleProps {
  mode: ClientViewMode;
  onSelectOverview: () => void;
  onSelectTimeline: () => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  mode,
  onSelectOverview,
  onSelectTimeline,
}) => (
  <div className="doodler-view-toggle" role="tablist" aria-label="Weergave wisselen">
    <Button
      type="button"
      variant={mode === 'overview' ? 'primary' : 'outline'}
      size="small"
      startIcon={<IconOverview size={16} />}
      onClick={onSelectOverview}
      role="tab"
      aria-selected={mode === 'overview'}
    >
      Overzicht
    </Button>
    <Button
      type="button"
      variant={mode === 'timeline' ? 'primary' : 'outline'}
      size="small"
      startIcon={<IconGalleryToggle size={16} />}
      onClick={onSelectTimeline}
      role="tab"
      aria-selected={mode === 'timeline'}
    >
      Tijdlijn
    </Button>
  </div>
);
