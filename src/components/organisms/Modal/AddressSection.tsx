import React from 'react';
import { FormInput } from '../../molecules/FormInput/FormInput';

interface AddressOption {
  id: string;
  name: 'city' | 'address' | 'zip' | 'phone';
  label: string;
  placeholder: string;
  type?: string;
  autoComplete: string;
}

const ADDRESS_FIELDS: AddressOption[] = [
  {
    id: 'city',
    name: 'city',
    label: 'City',
    placeholder: 'Enter city',
    autoComplete: 'address-level2',
  },
  {
    id: 'address',
    name: 'address',
    label: 'Delivery Address',
    placeholder: 'Street, building, apt',
    autoComplete: 'street-address',
  },
  {
    id: 'zip',
    name: 'zip',
    label: 'ZIP / Postal Code',
    placeholder: '01001',
    autoComplete: 'postal-code',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    placeholder: '+38 (0XX) XXX-XX-XX',
    type: 'tel',
    autoComplete: 'tel',
  },
];

interface AddressSectionProps {
  shippingInfo: Record<string, string>;
  errors: Partial<Record<string, string>>;
  combinedAddress: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClearField: (name: string) => void;
}

export const AddressSection = ({
  shippingInfo,
  errors,
  combinedAddress,
  onChange,
  onBlur,
  onClearField,
}: AddressSectionProps) => {
  return (
    <div className="modal__address-section">
      <hr className="modal__divider" />
      <h3 className="modal__subsection-title">Delivery Address:</h3>

      <div className="modal__address-grid">
        {ADDRESS_FIELDS.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            type={field.type || 'text'}
            name={field.name}
            label={field.label}
            value={shippingInfo[field.name]}
            placeholder={field.placeholder}
            onChange={onChange}
            onBlur={onBlur}
            error={errors[field.name]}
            required={field.name === 'phone' || field.name === 'zip'}
            minLength={field.name === 'phone' ? 13 : field.name === 'zip' ? 5 : undefined}
            maxLength={field.name === 'zip' ? 5 : undefined}
            pattern={
              field.name === 'phone' ? '\\+38\\d{10}' : field.name === 'zip' ? '\\d{5}' : undefined
            }
            showClearBtn={
              (field.name !== 'phone' && !!shippingInfo[field.name]) ||
              (field.name === 'phone' && shippingInfo.phone.length > 3)
            }
            onClear={() => onClearField(field.name)}
            autoComplete={field.autoComplete}
          />
        ))}
      </div>

      {(shippingInfo.city || shippingInfo.address) && (
        <p className="modal__section--result modal__section--result-address">
          <strong>Ship to:</strong> {combinedAddress} <br />
          {shippingInfo.phone.length > 3 && <>Phone: {shippingInfo.phone}</>}
        </p>
      )}
    </div>
  );
};
