/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Modal.scss';
import { SelectField } from '../../molecules/SelectField/SelectField';
import ukrPoshtaLogo from '../../../assets/icons/UkrPoshta-logo.svg';
import novaPoshtaLogo from '../../../assets/icons/NovaPoshta-logo.svg';
import meestPoshtaLogo from '../../../assets/icons/MeestPoshta-logo.svg';

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
          <p className="modal__section--info">You need to log in and enter your delivery address</p>
        </div>

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
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>

        <div className="modal__actions">
          <Button variant="page" className="modal__button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="modal__button" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
