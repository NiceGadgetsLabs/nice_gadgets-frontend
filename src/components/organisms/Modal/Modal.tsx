/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Modal.scss';
import { SelectField } from '../../molecules/SelectField/SelectField';
import ukrPoshtaLogo from '../../../assets/icons/UkrPoshta-logo.svg';
import novaPoshtaLogo from '../../../assets/icons/NovaPoshta-logo.svg';
import meestPoshtaLogo from '../../../assets/icons/MeestPoshta-logo.svg';

interface FieldOption {
  id: string;
  name: 'lastName' | 'firstName' | 'middleName';
  label: string;
  placeholder: string;
}

const NAME_FIELDS: FieldOption[] = [
  { id: 'firstName', name: 'firstName', label: 'First Name', placeholder: 'Enter first name' },
  { id: 'lastName', name: 'lastName', label: 'Last Name', placeholder: 'Enter last name' },
  // { id: 'middleName', name: 'middleName', label: 'Middle Name', placeholder: 'Enter middle name' },
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
  { id: 'UkrPoshta', label: 'UkrPoshta', price: 10, icon: ukrPoshtaLogo },
  { id: 'NovaPoshta', label: 'Nova Poshta', price: 15, icon: novaPoshtaLogo },
  { id: 'MeestPoshta', label: 'Meest Poshta', price: 25, icon: meestPoshtaLogo },
];

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
  const [selectedDeliveryId, setselectedDeliveryId] = useState('');

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

  if (!isOpen) return null;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // 1. Валідація для ТЕЛЕФОНУ
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
    // 2. Валідація для ПОШТОВОГО ІНДЕКСУ
    if (name === 'zip') {
      if (/^\d*$/.test(value) && value.length <= 5) {
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
      }
      return;
    }
    // 3. АВТО-КАПІТАЛІЗАЦІЯ для Ім'я та Прізвища
    if (name === 'firstName' || name === 'lastName') {
      if (value === '') {
        setShippingInfo((prev) => ({ ...prev, [name]: '' }));
        return;
      }
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setShippingInfo((prev) => ({ ...prev, [name]: capitalizedValue }));
      return;
    }
    // 3. Логіка для всіх інших полів (місто, адреса)
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearField = (fieldName: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [fieldName]: fieldName === 'phone' ? '+38' : '',
    }));
  };

  const combinedName =
    `${shippingInfo.firstName} ${shippingInfo.lastName} ${shippingInfo.middleName}`.trim();
  const combinedAddress =
    `${shippingInfo.city}, ${shippingInfo.address}, ${shippingInfo.zip}`.trim();

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
      <div className="modal__content" role="dialog" aria-modal="true">
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
                    placeholder={field.placeholder}
                    className="modal__input"
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
              </div>
            ))}
          </div>

          {combinedName ? (
            <p className="modal__section--result modal__section--result-recipient">
              <span className="modal__recipient-prefix">Order recipient: </span>
              <strong>{combinedName}</strong>
            </p>
          ) : (
            <p className="modal__section--info">
              You need to enter recipient&apos;s details and address field will been shown
            </p>
          )}
        </div>

        {combinedName && (
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
                      placeholder={field.placeholder}
                      className="modal__input"
                      required={field.name === 'phone' || field.name === 'zip'}
                      minLength={field.name === 'phone' ? 13 : field.name === 'zip' ? 5 : undefined}
                      maxLength={field.name === 'zip' ? 5 : undefined}
                      pattern={
                        field.name === 'phone'
                          ? '\\+38\\d{10}'
                          : field.name === 'zip'
                            ? '\\d{5}'
                            : undefined
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
            onValueChange={setselectedDeliveryId}
            placeholder="Choose delivery method"
          />
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

        <p className="modal__section--info">
          Whole checkout is not implemented yet. Do you want to return or clear the Cart?
        </p>

        <div className="modal__actions">
          <Button variant="page" className="modal__button" onClick={onClose}>
            Return to the Cart
          </Button>
          <Button variant="primary" className="modal__button" onClick={onConfirm}>
            Clear the Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
