import React, { useState, useEffect } from 'react';
import { PrototypeSelector } from '../components/PrototypeSelector/PrototypeSelector';
import { ThirdPartyPage } from '../components/ThirdPartyPage/ThirdPartyPage';
import { DoodlerWidgetOverlay } from '../components/DoodlerWidgetOverlay/DoodlerWidgetOverlay';
import { Prototype } from './Prototype';
import { MVP } from './MVP';

export type ViewMode = 'selector' | 'prototype1-widget' | 'prototype1-overview' | 'prototype2' | 'showcase' | 'mvp';

export const PrototypeWrapper: React.FC = () => {
  // Initialize from URL hash if present
  const getInitialViewMode = (): ViewMode => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'clientoverzicht' || hash === 'cliëntoverzicht') {
      return 'showcase';
    }
    if (hash === 'mvp') {
      return 'mvp';
    }
    return 'selector';
  };

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode());

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'clientoverzicht' || hash === 'cliëntoverzicht') {
        setViewMode('showcase');
      } else if (hash === 'mvp') {
        setViewMode('mvp');
      } else if (hash === '') {
        setViewMode('selector');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPrototype1 = () => {
    setViewMode('prototype1-widget');
  };

  const handleSelectShowcase = () => {
    setViewMode('showcase');
  };

  const handleSelectMVP = () => {
    window.location.hash = 'mvp';
    setViewMode('mvp');
  };

  const handleBackFromMVP = () => {
    window.location.hash = '';
    setViewMode('selector');
  };

  const handleOverviewClick = () => {
    setViewMode('showcase');
  };

  if (viewMode === 'selector') {
    return (
      <PrototypeSelector
        onSelectPrototype1={handleSelectPrototype1}
        onSelectShowcase={handleSelectShowcase}
        onSelectMVP={handleSelectMVP}
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

  if (viewMode === 'mvp') {
    return <MVP onBack={handleBackFromMVP} />;
  }

  if (viewMode === 'prototype1-overview') {
    return <Prototype />;
  }

  return null;
};
