import React from 'react';
import { Button } from '../Button/Button';
import { DoodlerLogo } from '../../assets/logo';
import './PrototypeSelector.css';

export interface PrototypeSelectorProps {
  onSelectPrototype1: () => void;
  onSelectPrototype2: () => void;
  onSelectShowcase: () => void;
}

export const PrototypeSelector: React.FC<PrototypeSelectorProps> = ({
  onSelectPrototype1,
  onSelectPrototype2,
  onSelectShowcase,
}) => {
  return (
    <div className="doodler-prototype-selector">
      <div className="doodler-prototype-selector__container">
        <DoodlerLogo className="doodler-prototype-selector__logo" />
        <h1 className="doodler-prototype-selector__title">Selecteer een prototype</h1>
        <div className="doodler-prototype-selector__buttons">
          <Button variant="outline" size="small" onClick={onSelectPrototype1}>
            Prototype
          </Button>
          <Button variant="outline" size="small" onClick={onSelectPrototype2}>
            Prototype 2
          </Button>
          <Button variant="outline" size="small" onClick={onSelectShowcase}>
            Showcase
          </Button>
        </div>
      </div>
    </div>
  );
};
