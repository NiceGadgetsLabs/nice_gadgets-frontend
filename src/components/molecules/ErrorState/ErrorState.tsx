import type { FC } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import './ErrorState.scss';

interface Props {
  title?: string;
  description?: string;
  reloadLabel?: string;
  onReload?: () => void;
}

export const ErrorState: FC<Props> = ({
  title = 'Something went wrong',
  description = "We couldn't load the data. Please check your connection and try again.",
  reloadLabel = 'Reload',
  onReload = () => window.location.reload(),
}) => {
  return (
    <div className="error-state">
      <div className="error-state__text">
        <h2 className="error-state__title">{title}</h2>
        <p className="error-state__description">{description}</p>
      </div>

      <Button variant="ghost" className="error-state__button" onClick={onReload}>
        <Icon type="refresh" width="16px" height="16px" />
        {reloadLabel}
      </Button>
    </div>
  );
};
