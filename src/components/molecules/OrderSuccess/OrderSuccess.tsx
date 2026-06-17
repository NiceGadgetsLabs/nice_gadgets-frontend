import type { FC } from 'react';
import { Button } from '../../atoms/Button/Button';
import './OrderSuccess.scss';

interface Props {
  onClose: () => void;
}

export const OrderSuccess: FC<Props> = ({ onClose }) => {
  return (
    <div className="order-success">
      <svg
        className="order-success__icon"
        viewBox="0 0 52 52"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Order placed successfully"
      >
        <path className="order-success__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg>

      <h2 className="order-success__title">Order placed!</h2>
      <p className="order-success__message">
        Thank you for your purchase. A confirmation will be sent to you shortly.
      </p>

      <Button variant="primary" className="order-success__button" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};
