import React from 'react';
import './Tab.css';

export interface TabProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="doodler-tab">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`doodler-tab__item ${
            index === activeTab ? 'doodler-tab__item--active' : ''
          }`}
          onClick={() => onTabChange(index)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
