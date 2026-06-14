import type { FC, ReactNode } from 'react';
import { Dialog } from 'radix-ui';
import { Button } from '../../atoms/Button/Button';
import './ConfirmDialog.scss';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export const ConfirmDialog: FC<Props> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="confirm-dialog__overlay" />

        <Dialog.Content className="confirm-dialog">
          <Dialog.Title className="confirm-dialog__title">{title}</Dialog.Title>

          {description && (
            <Dialog.Description className="confirm-dialog__description">
              {description}
            </Dialog.Description>
          )}

          <div className="confirm-dialog__actions">
            <Button className="confirm-dialog__action" variant="primary" onClick={onConfirm}>
              {confirmLabel}
            </Button>

            <Dialog.Close asChild>
              <Button className="confirm-dialog__action" variant="element">
                {cancelLabel}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
