import React from 'react';
import './Content.css';

export interface ContentItem {
  title: string;
  description: string;
}

export interface ContentProps {
  items: ContentItem[];
}

export const Content: React.FC<ContentProps> = ({ items }) => {
  return (
    <div className="doodler-content">
      {items.map((item, index) => (
        <div key={index} className="doodler-content__item">
          <p className="doodler-content__paragraph">
            <span className="doodler-content__title">{item.title}</span>
            <span className="doodler-content__description">
              {' '}
              — {item.description}
            </span>
          </p>
          {index < items.length - 1 && <div className="doodler-content__spacer" />}
        </div>
      ))}
    </div>
  );
};
