import React from 'react';
import { Button } from '../components/Button/Button';
import { DoodlerLogo } from '../assets/logo';
import { IconArrowLeft, IconLibrary, IconPlus } from '../icons';
import './MVP.css';

export interface MVPHeaderProps {
  onBack: () => void;
  onOpenNewDoodle: () => void;
  onOpenLibrary: () => void;
  logoClassName?: string;
  showBackButton?: boolean;
}

export const MVPHeader: React.FC<MVPHeaderProps> = ({
  onBack,
  onOpenNewDoodle,
  onOpenLibrary,
  logoClassName = 'doodler-prototype__logo',
  showBackButton = false,
}) => (
  <div className="doodler-mvp-flow__header">
    <div className="doodler-mvp-flow__header-left">
      {showBackButton && (
        <button
          className="doodler-prototype__back-button"
          onClick={onBack}
          type="button"
          aria-label="Terug"
        >
          <IconArrowLeft size={20} />
        </button>
      )}
      <button
        type="button"
        onClick={onBack}
        className="doodler-prototype__logo-button"
        aria-label="Terug naar start"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        <DoodlerLogo className={logoClassName} />
      </button>
    </div>
    <div className="doodler-mvp__header-actions">
      <Button
        variant="outline"
        size="small"
        startIcon={<IconLibrary size={16} />}
        onClick={onOpenLibrary}
      >
        Bibliotheek
      </Button>
      <Button
        variant="primary"
        size="small"
        startIcon={<IconPlus size={16} />}
        onClick={onOpenNewDoodle}
      >
        Nieuwe doodle
      </Button>
    </div>
  </div>
);
