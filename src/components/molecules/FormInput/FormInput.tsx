import React from 'react';
import { Button } from '../../atoms/Button/Button';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  showClearBtn: boolean;
  onClear: () => void;
}

export const FormInput = ({
  label,
  id,
  error,
  showClearBtn,
  onClear,
  ...props
}: FormInputProps) => {
  return (
    <div className="modal__input-wrapper">
      <label htmlFor={id} className="modal__label">
        {label}
      </label>
      <div className="modal__input-container">
        <input
          id={id}
          className="modal__input"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {showClearBtn && (
          <Button
            type="button"
            variant="icon"
            className="modal__clear-btn"
            onClick={onClear}
            aria-label={`Clear ${label}`}
          >
            &times;
          </Button>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className="modal__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
