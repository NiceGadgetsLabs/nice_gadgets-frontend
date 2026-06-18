import type { FC } from 'react';
import { toast } from 'sonner';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './Toast.scss';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Props {
  id: string | number;
  variant: ToastVariant;
  title: string;
  description?: string;
  action?: ToastAction;
}

export const Toast: FC<Props> = ({ id, variant, title, description, action }) => (
  <div className={`toast toast--${variant}`} role="status">
    <div className="toast__main">
      <div className="toast__content">
        <p className="toast__title">{title}</p>
        {description && <p className="toast__description">{description}</p>}
      </div>

      <Button
        className="toast__close"
        variant="ghost"
        aria-label="Dismiss notification"
        onClick={() => toast.dismiss(id)}
      >
        <Icon type="close" width="16px" height="16px" />
      </Button>
    </div>

    {action && (
      <Button
        variant="ghost"
        className="toast__action"
        onClick={() => {
          action.onClick();
          toast.dismiss(id);
        }}
      >
        {action.label}
      </Button>
    )}
  </div>
);
