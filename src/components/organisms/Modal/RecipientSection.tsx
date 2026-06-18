import React from 'react';
import { FormInput } from '../../molecules/FormInput/FormInput';

interface FieldOption {
  id: string;
  name: 'lastName' | 'firstName' | 'middleName';
  label: string;
  placeholder: string;
}

const NAME_FIELDS: FieldOption[] = [
  { id: 'firstName', name: 'firstName', label: 'First Name', placeholder: 'Enter first name' },
  { id: 'lastName', name: 'lastName', label: 'Last Name', placeholder: 'Enter last name' },
];

interface RecipientSectionProps {
  shippingInfo: Record<string, string>;
  errors: Partial<Record<string, string>>;
  combinedName: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClearField: (name: string) => void;
}

export const RecipientSection = ({
  shippingInfo,
  errors,
  combinedName,
  onChange,
  onBlur,
  onClearField,
}: RecipientSectionProps) => {
  return (
    <div className="modal__section">
      <h3>Ship to</h3>
      <div className="modal__inputs-row">
        {NAME_FIELDS.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            name={field.name}
            type="text"
            value={shippingInfo[field.name]}
            placeholder={field.placeholder}
            onChange={onChange}
            onBlur={onBlur}
            error={errors[field.name]}
            showClearBtn={!!shippingInfo[field.name]}
            onClear={() => onClearField(field.name)}
          />
        ))}
      </div>

      {combinedName && (
        <p className="modal__section--result modal__section--result-recipient">
          <span className="modal__recipient-prefix">Order recipient: </span>
          <strong>{combinedName}</strong>
        </p>
      )}
    </div>
  );
};
