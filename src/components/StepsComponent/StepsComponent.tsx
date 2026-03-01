import React from 'react';
import { IconPen, IconCheckCircle } from '../../icons';
import './StepsComponent.css';

export interface StepsComponentProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  activeStepIndex: number;
  isSummary?: boolean;
  onStepClick?: (index: number) => void;
}

export const StepsComponent: React.FC<StepsComponentProps> = ({
  currentStep,
  totalSteps,
  steps,
  activeStepIndex,
  isSummary = false,
  onStepClick,
}) => {
  const progressPercentage = isSummary ? 100 : (currentStep / totalSteps) * 100;

  if (isSummary) {
    return (
      <div className="doodler-steps-component">
        <div className="doodler-steps-component__navigation doodler-steps-component__navigation--summary">
          <div className="doodler-steps-component__step doodler-steps-component__step--summary">
            Reviewen
            <div className="doodler-steps-component__check-icon">
              <IconCheckCircle size={16} />
            </div>
          </div>
        </div>
        <div className="doodler-steps-component__progress-bar">
          <div
            className="doodler-steps-component__progress-fill"
            style={{ width: '100%' }}
          />
        </div>
        <p className="doodler-steps-component__label doodler-steps-component__label--summary">
          Alle stappen zijn doorlopen!
        </p>
      </div>
    );
  }

  return (
    <div className="doodler-steps-component">
      <div className="doodler-steps-component__navigation">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`doodler-steps-component__step ${
              index === activeStepIndex ? 'doodler-steps-component__step--active' : ''
            } ${onStepClick ? 'doodler-steps-component__step--clickable' : ''}`}
            onClick={onStepClick ? () => onStepClick(index) : undefined}
          >
            {step}
            {index === activeStepIndex && (
              <div className="doodler-steps-component__icon">
                <IconPen size={12} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="doodler-steps-component__progress-bar">
        <div
          className="doodler-steps-component__progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="doodler-steps-component__label">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
};
