/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import './Modal.scss';
import { SelectField } from '../../molecules/SelectField/SelectField';

interface DeliveryOption {
  id: string;
  label: string;
  price: number;
}
const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'standard', label: 'Standard Delivery', price: 5 },
  { id: 'express', label: 'Express Delivery', price: 15 },
  { id: 'overnight', label: 'Overnight Delivery', price: 25 },
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
  const [selectedDeliveryId, setselectedDeliveryId] = useState(DELIVERY_OPTIONS[0].id);

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
  const selectedDelivery =
    DELIVERY_OPTIONS.find((opt) => opt.id === selectedDeliveryId) ?? DELIVERY_OPTIONS[0];
  const total = subtotal + selectedDelivery.price;

  const selectOptions = DELIVERY_OPTIONS.map((opt) => ({
    value: opt.id,
    label: `${opt.label} ($${opt.price})`,
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
          />
        </div>

        <div className="modal__section modal__section-summary">
          <p>Items: {itemsCount}</p>
          <p>Subtotal: ${subtotal}</p>
          <p>Delivery cost: ${selectedDelivery.price}</p>
          <hr />
          <p className="total">Total: ${total} </p>
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
