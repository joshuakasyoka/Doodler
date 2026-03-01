import React, { useState } from 'react';
import { PrototypeSelector } from '../components/PrototypeSelector/PrototypeSelector';
import { ThirdPartyPage } from '../components/ThirdPartyPage/ThirdPartyPage';
import { DoodlerWidgetOverlay } from '../components/DoodlerWidgetOverlay/DoodlerWidgetOverlay';
import { EHRPage } from '../components/EHRPage/EHRPage';
import { Prototype } from './Prototype';

export type ViewMode = 'selector' | 'prototype1-widget' | 'prototype1-overview' | 'prototype2' | 'prototype3';

export const PrototypeWrapper: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('selector');

  const handleSelectPrototype1 = () => {
    setViewMode('prototype1-widget');
  };

  const handleSelectPrototype2 = () => {
    setViewMode('prototype2');
  };

  const handleSelectPrototype3 = () => {
    setViewMode('prototype3');
  };

  const handleOverviewClick = () => {
    setViewMode('prototype1-overview');
  };

  if (viewMode === 'selector') {
    return (
      <PrototypeSelector
        onSelectPrototype1={handleSelectPrototype1}
        onSelectPrototype2={handleSelectPrototype2}
        onSelectPrototype3={handleSelectPrototype3}
      />
    );
  }

  if (viewMode === 'prototype1-widget') {
    return (
      <ThirdPartyPage>
        <DoodlerWidgetOverlay 
          onOverviewClick={handleOverviewClick}
          onNewDoodleClick={() => {
            // Navigate to overview and open new doodle modal
            setViewMode('prototype1-overview');
          }}
        />
      </ThirdPartyPage>
    );
  }

  if (viewMode === 'prototype3') {
    return (
      <EHRPage
        onOverviewClick={() => {
          // This will trigger the Doodler panel to slide in
        }}
        onNewDoodleClick={() => {
          // This will be handled within the Prototype component in the panel
        }}
      />
    );
  }

  if (viewMode === 'prototype1-overview' || viewMode === 'prototype2') {
    return <Prototype />;
  }

  return null;
};
