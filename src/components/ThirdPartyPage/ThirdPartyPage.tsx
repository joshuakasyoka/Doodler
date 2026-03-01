import React from 'react';
import './ThirdPartyPage.css';

export const ThirdPartyPage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="doodler-third-party-page">
      <div className="doodler-third-party-page__content">
        {/* This represents the third-party platform interface */}
        <div className="doodler-third-party-page__header">
          <div className="doodler-third-party-page__header-content">
            <div className="doodler-third-party-page__placeholder-logo"></div>
            <nav className="doodler-third-party-page__nav">
              <div className="doodler-third-party-page__nav-item"></div>
              <div className="doodler-third-party-page__nav-item"></div>
              <div className="doodler-third-party-page__nav-item"></div>
            </nav>
          </div>
        </div>
        <div className="doodler-third-party-page__main">
          <div className="doodler-third-party-page__sidebar">
            <div className="doodler-third-party-page__sidebar-item"></div>
            <div className="doodler-third-party-page__sidebar-item"></div>
            <div className="doodler-third-party-page__sidebar-item"></div>
          </div>
          <div className="doodler-third-party-page__workspace">
            <div className="doodler-third-party-page__workspace-content">
              {/* Widget will be overlaid here */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
