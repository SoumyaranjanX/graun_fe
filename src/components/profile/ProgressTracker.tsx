import React from 'react';
import './ProgressTracker.css';

const steps = [
  'Organization Details',
  'Set-up Operating hours',
  'Terms and Conditions',
  'Payment Setup',
  'Integration'
];

const ProgressTracker = ({ step }) => {
  return (
    <div className="progress-tracker">
      {steps.map((label, index) => (
        <div key={index} className="step-container">
          <div className={`circle ${index <= step ? 'active' : ''}`}>
            {index < step ? '✓' : index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`connector ${index < step ? 'active' : ''}`}></div>
          )}
          <div className={`label ${index <= step ? 'active' : ''}`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
