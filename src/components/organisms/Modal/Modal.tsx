/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Modal.scss';
import { FocusTrap } from 'focus-trap-react';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { OrderSuccess } from '../../molecules/OrderSuccess/OrderSuccess';
import { RecipientSection } from './RecipientSection';
import { AddressSection } from './AddressSection';
import { OrderSummary } from './OrderSummary';
import ukrPostLogo from '../../../assets/icons/UkrPost-logo.svg';
import novaPostLogo from '../../../assets/icons/NovaPost-logo.svg';
import meestExpressLogo from '../../../assets/icons/MeestExpress-logo.svg';

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

interface ModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  subtotal: number;
  itemsCount: number;
}

export const Modal = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  subtotal,
  itemsCount,
}: ModalProps) => {
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
  const [step, setStep] = useState<1 | 2 | 3>(1);

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

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};
    const step1Fields: FieldName[] = ['firstName', 'lastName'];

    step1Fields.forEach((name) => {
      const fieldMessage = validateField(name);
      if (fieldMessage) newErrors[name] = fieldMessage;
    });

    if (!selectedDeliveryId) newErrors.delivery = 'Please choose a delivery method';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalid = step1Fields.find((name) => newErrors[name]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return false;
    }

    return true;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};
    const step2Fields: FieldName[] = ['city', 'address', 'zip', 'phone'];

    step2Fields.forEach((name) => {
      const fieldMessage = validateField(name);
      if (fieldMessage) newErrors[name] = fieldMessage;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstInvalid = step2Fields.find((name) => newErrors[name]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return false;
    }

    return true;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as FieldName;
    setErrors((prev) => ({ ...prev, [name]: validateField(name) }));
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setStep(1);
  };

  const handlePlaceOrder = () => {
    if (validateStep2()) {
      onConfirm();
      setStep(3);
    }
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
          <h2>Checkout</h2>
          <p className="modal__message">{message}</p>

          <div className="modal__stepper">
            <div
              className={`modal__step ${step === 1 ? 'modal__step--active' : ''} ${step > 1 ? 'modal__step--completed' : ''}`}
            >
              <div className="modal__step-circle">{step > 1 ? '✓' : '1'}</div>
              <span className="modal__step-label">Information</span>
            </div>
            <div className={`modal__step-line ${step > 1 ? 'modal__step-line--active' : ''}`}></div>

            <div
              className={`modal__step ${step === 2 ? 'modal__step--active' : ''} ${step > 2 ? 'modal__step--completed' : ''}`}
            >
              <div className="modal__step-circle">{step > 2 ? '✓' : '2'}</div>
              <span className="modal__step-label">Delivery</span>
            </div>

            <div className={`modal__step-line ${step > 2 ? 'modal__step-line--active' : ''}`}></div>

            <div className={`modal__step ${step === 3 ? 'modal__step--completed' : ''}`}>
              <div className="modal__step-circle">{step === 3 ? '✓' : '3'}</div>
              <span className="modal__step-label">Confirmation</span>
            </div>
          </div>

          {step === 1 && (
            <>
              <RecipientSection
                shippingInfo={shippingInfo}
                errors={errors}
                combinedName={combinedName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onClearField={handleClearField}
              />

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

              <OrderSummary
                itemsCount={itemsCount}
                subtotal={subtotal}
                deliveryPrice={deliveryPrice}
                total={total}
              />

              <div className="modal__actions">
                <Button variant="page" className="modal__button" onClick={onClose}>
                  Return to the Cart
                </Button>

                <Button variant="primary" className="modal__button" onClick={handleNextStep}>
                  Continue to Delivery
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <AddressSection
                shippingInfo={shippingInfo}
                errors={errors}
                combinedAddress={combinedAddress}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onClearField={handleClearField}
              />

              <div className="modal__actions">
                <Button variant="page" className="modal__button" onClick={handlePrevStep}>
                  Back to Personal Info
                </Button>

                <Button variant="primary" className="modal__button" onClick={handlePlaceOrder}>
                  Place the order
                </Button>
              </div>
            </>
          )}

          {step === 3 && <OrderSuccess onClose={onClose} />}
        </div>
      </FocusTrap>
    </div>
  );
};
