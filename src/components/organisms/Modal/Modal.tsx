/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Modal.scss';
import { FocusTrap } from 'focus-trap-react';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { OrderSuccess } from '../../molecules/OrderSuccess/OrderSuccess';
import ukrPostLogo from '../../../assets/icons/UkrPost-logo.svg';
import novaPostLogo from '../../../assets/icons/NovaPost-logo.svg';
import meestExpressLogo from '../../../assets/icons/MeestExpress-logo.svg';

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

interface AddressOption {
  id: string;
  name: 'city' | 'address' | 'zip' | 'phone';
  label: string;
  placeholder: string;
  type?: string;
}

const ADDRESS_FIELDS: AddressOption[] = [
  { id: 'city', name: 'city', label: 'City', placeholder: 'Enter city' },
  {
    id: 'address',
    name: 'address',
    label: 'Delivery Address',
    placeholder: 'Street, building, apt',
  },
  { id: 'zip', name: 'zip', label: 'ZIP / Postal Code', placeholder: '01001' },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone Number',
    placeholder: '+38 (0XX) XXX-XX-XX',
    type: 'tel',
  },
];
interface DeliveryOption {
  id: string;
  label: string;
  price: number;
  icon?: string;
}
const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'UkrPost', label: 'UkrPost', price: 10, icon: ukrPostLogo },
  { id: 'NovaPost', label: 'NovaPost', price: 15, icon: novaPostLogo },
  { id: 'MeestExpress', label: 'Meest Express', price: 25, icon: meestExpressLogo },
];

type FieldName = 'firstName' | 'lastName' | 'city' | 'address' | 'zip' | 'phone';
type FormErrors = Partial<Record<FieldName | 'delivery', string>>;

const FIELD_ORDER: FieldName[] = ['firstName', 'lastName', 'city', 'address', 'zip', 'phone'];

interface Props {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  subtotal: number;
  itemsCount: number;
}

export const Modal = ({ isOpen, message, onClose, onConfirm, subtotal, itemsCount }: Props) => {
  const [shippingInfo, setShippingInfo] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    city: '',
    address: '',
    zip: '',
    phone: '+38',
  });
  const [selectedDeliveryId, setSelectedDeliveryId] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'phone') {
      if (!value.startsWith('+38')) {
        setShippingInfo((prev) => ({ ...prev, phone: '+38' }));
        return;
      }

      const digitsAfterPrefix = value.slice(3);
      if (isNaN(Number(digitsAfterPrefix))) return;
      if (value.length > 13) return;
      setShippingInfo((prev) => ({ ...prev, [name]: value }));
      return;
    }

    if (name === 'zip') {
      if (/^\d*$/.test(value) && value.length <= 5) {
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }

    if (name === 'firstName' || name === 'lastName') {
      if (value === '') {
        setShippingInfo((prev) => ({ ...prev, [name]: '' }));
        return;
      }
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setShippingInfo((prev) => ({ ...prev, [name]: capitalizedValue }));
      return;
    }

    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: FieldName, info = shippingInfo): string | undefined => {
    switch (name) {
      case 'firstName':
        return info.firstName.trim() ? undefined : 'First name is required';
      case 'lastName':
        return info.lastName.trim() ? undefined : 'Last name is required';
      case 'city':
        return info.city.trim() ? undefined : 'City is required';
      case 'address':
        return info.address.trim() ? undefined : 'Delivery address is required';
      case 'zip':
        return /^\d{5}$/.test(info.zip) ? undefined : 'ZIP must be 5 digits';
      case 'phone':
        return /^\+38\d{10}$/.test(info.phone) ? undefined : 'Enter +38 and 10 digits';
    }
  };

  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {};

    FIELD_ORDER.forEach((name) => {
      const message = validateField(name);
      if (message) newErrors[name] = message;
    });

    if (!selectedDeliveryId) newErrors.delivery = 'Please choose a delivery method';

    return newErrors;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as FieldName;
    setErrors((prev) => ({ ...prev, [name]: validateField(name) }));
  };

  const handlePlaceOrder = () => {
    const newErrors = validateAll();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((name) => newErrors[name]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    onConfirm();
    setIsSuccess(true);
  };

  const handleClearField = (fieldName: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [fieldName]: fieldName === 'phone' ? '+38' : '',
    }));
  };

  const combinedName =
    `${shippingInfo.firstName} ${shippingInfo.lastName} ${shippingInfo.middleName}`.trim();
  const combinedAddress = [shippingInfo.city, shippingInfo.address, shippingInfo.zip]
    .filter((part) => part.trim() !== '')
    .join(', ');

  const hasFullName = shippingInfo.firstName !== '' && shippingInfo.lastName !== '';

  const selectedDelivery = DELIVERY_OPTIONS.find((opt) => opt.id === selectedDeliveryId);
  const deliveryPrice = selectedDelivery ? selectedDelivery.price : 0;
  const total = subtotal + deliveryPrice;

  const selectOptions = DELIVERY_OPTIONS.map((opt) => ({
    value: opt.id,
    label: `${opt.label} ($${opt.price})`,
    icon: opt.icon,
  }));

  return (
    <div
      className="modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
          allowOutsideClick: true,
        }}
      >
        <div className="modal__content" role="dialog" aria-modal="true">
          {isSuccess ? (
            <OrderSuccess onClose={onClose} />
          ) : (
            <>
              <h2>Checkout</h2>
              <p className="modal__message">{message}</p>

              <div className="modal__section">
                <h3>Ship to</h3>
                <div className="modal__inputs-row">
                  {NAME_FIELDS.map((field) => (
                    <div className="modal__input-wrapper" key={field.id}>
                      <label htmlFor={field.id} className="modal__label">
                        {field.label}
                      </label>
                      <div className="modal__input-container">
                        <input
                          id={field.id}
                          type="text"
                          name={field.name}
                          value={shippingInfo[field.name]}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder={field.placeholder}
                          className="modal__input"
                          aria-invalid={Boolean(errors[field.name as FieldName])}
                          aria-describedby={
                            errors[field.name as FieldName] ? `${field.id}-error` : undefined
                          }
                        />
                        {shippingInfo[field.name] && (
                          <Button
                            type="button"
                            variant="icon"
                            className="modal__clear-btn"
                            onClick={() => handleClearField(field.name)}
                            aria-label={`Clear ${field.label}`}
                          >
                            &times;
                          </Button>
                        )}
                      </div>
                      {errors[field.name as FieldName] && (
                        <span id={`${field.id}-error`} className="modal__error" role="alert">
                          {errors[field.name as FieldName]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {combinedName && (
                  <p className="modal__section--result modal__section--result-recipient">
                    <span className="modal__recipient-prefix">Order recipient: </span>
                    <strong>{combinedName}</strong>
                  </p>
                )}
              </div>

              {hasFullName && (
                <div className="modal__address-section">
                  <hr className="modal__divider" />
                  <h3 className="modal__subsection-title">Delivery Address:</h3>

                  <div className="modal__address-grid">
                    {ADDRESS_FIELDS.map((field) => (
                      <div className="modal__input-wrapper" key={field.id}>
                        <label htmlFor={field.id} className="modal__label">
                          {field.label}
                        </label>

                        <div className="modal__input-container">
                          <input
                            id={field.id}
                            type={field.type || 'text'}
                            name={field.name}
                            value={shippingInfo[field.name]}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder={field.placeholder}
                            className="modal__input"
                            required={field.name === 'phone' || field.name === 'zip'}
                            minLength={
                              field.name === 'phone' ? 13 : field.name === 'zip' ? 5 : undefined
                            }
                            maxLength={field.name === 'zip' ? 5 : undefined}
                            pattern={
                              field.name === 'phone'
                                ? '\\+38\\d{10}'
                                : field.name === 'zip'
                                  ? '\\d{5}'
                                  : undefined
                            }
                            aria-invalid={Boolean(errors[field.name as FieldName])}
                            aria-describedby={
                              errors[field.name as FieldName] ? `${field.id}-error` : undefined
                            }
                          />
                          {((field.name !== 'phone' && shippingInfo[field.name]) ||
                            (field.name === 'phone' && shippingInfo.phone.length > 3)) && (
                            <Button
                              type="button"
                              variant="icon"
                              className="modal__clear-btn"
                              onClick={() => handleClearField(field.name)}
                              aria-label={`Clear ${field.label}`}
                            >
                              &times;
                            </Button>
                          )}
                        </div>
                        {errors[field.name as FieldName] && (
                          <span id={`${field.id}-error`} className="modal__error" role="alert">
                            {errors[field.name as FieldName]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {shippingInfo.city || shippingInfo.address ? (
                    <p className="modal__section--result modal__section--result-address">
                      <strong>Ship to:</strong> {combinedAddress} <br />
                      {shippingInfo.phone.length > 3 && <>Phone: {shippingInfo.phone}</>}
                    </p>
                  ) : null}
                </div>
              )}

              <div className="modal__section">
                <h3>Delivery options</h3>
                <SelectField
                  options={selectOptions}
                  value={selectedDeliveryId}
                  onValueChange={(value) => {
                    setSelectedDeliveryId(value);
                    setErrors((prev) => ({ ...prev, delivery: undefined }));
                  }}
                  placeholder="Choose delivery method"
                />
                {errors.delivery && (
                  <span className="modal__error" role="alert">
                    {errors.delivery}
                  </span>
                )}
              </div>

              <div className="modal__section modal__section-summary">
                <p className="total">Order Summary</p>
                <p>
                  You choose {itemsCount} items with worth ${Number(subtotal).toFixed(2)}
                </p>
                <p>Delivery cost: ${deliveryPrice}</p>
                <hr />
                <p className="total">Order total: ${Number(total).toFixed(2)} </p>
              </div>

              <div className="modal__actions">
                <Button variant="page" className="modal__button" onClick={onClose}>
                  Return to the Cart
                </Button>

                <Button variant="primary" className="modal__button" onClick={handlePlaceOrder}>
                  Place the order
                </Button>
              </div>
            </>
          )}
        </div>
      </FocusTrap>
    </div>
  );
};
