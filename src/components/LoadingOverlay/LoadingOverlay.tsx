import React from 'react';
import image3 from '../../assets/img/image 3.png';
import './LoadingOverlay.css';

export interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = 'Doodles worden gegenereerd...' }) => {
  if (!isVisible) return null;

  return (
    <div className="doodler-loading-overlay">
      <div className="doodler-loading-overlay__content">
        <img src={image3} alt="Loading" className="doodler-loading-overlay__image" />
        <div className="doodler-loading-overlay__spinner">
          <div className="doodler-loading-overlay__spinner-circle"></div>
        </div>
        <p className="doodler-loading-overlay__message">{message}</p>
      </div>
    </div>
  );
};
