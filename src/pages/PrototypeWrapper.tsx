import React, { useState } from 'react';
import { PrototypeSelector } from '../components/PrototypeSelector/PrototypeSelector';
import { ThirdPartyPage } from '../components/ThirdPartyPage/ThirdPartyPage';
import { DoodlerWidgetOverlay } from '../components/DoodlerWidgetOverlay/DoodlerWidgetOverlay';
import { Prototype } from './Prototype';

export type ViewMode = 'selector' | 'prototype1-widget' | 'prototype1-overview' | 'prototype2' | 'showcase';

export const PrototypeWrapper: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('selector');

  const handleSelectPrototype1 = () => {
    setViewMode('prototype1-widget');
  };

  const handleSelectPrototype2 = () => {
    setViewMode('prototype2');
  };

  const handleSelectShowcase = () => {
    setViewMode('showcase');
  };

  const handleOverviewClick = () => {
    setViewMode('showcase');
  };

  if (viewMode === 'selector') {
    return (
      <PrototypeSelector
        onSelectPrototype1={handleSelectPrototype1}
        onSelectPrototype2={handleSelectPrototype2}
        onSelectShowcase={handleSelectShowcase}
      />
    );
  }

  if (viewMode === 'prototype1-widget') {
    return (
      <ThirdPartyPage>
        <DoodlerWidgetOverlay 
          onOverviewClick={handleOverviewClick}
          onNewDoodleClick={() => {
            // Navigate to showcase prototype
            setViewMode('showcase');
          }}
        />
      </ThirdPartyPage>
    );
  }

  if (viewMode === 'showcase') {
    return <Prototype isShowcase={true} />;
  }

  if (viewMode === 'prototype1-overview' || viewMode === 'prototype2') {
    return <Prototype />;
  }

  return null;
};
