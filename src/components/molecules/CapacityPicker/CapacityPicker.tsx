import type { FC } from 'react';
import { Button } from '../../atoms/Button/Button';
import './CapacityPicker.scss';

interface Props {
  capacities: string[];
  selected: string;
  onSelect: (capacity: string) => void;
}

export const CapacityPicker: FC<Props> = ({ capacities, selected, onSelect }) => {
  const isWatch = capacities.every((capacity) => capacity.includes('mm'));

  return (
    <div className="capacity">
      <h3 className="capacity__title">Select {isWatch ? 'case size' : 'capacity'}</h3>

      <div className="capacity__buttons">
        {capacities.map((capacity) => (
          <Button
            key={capacity}
            className="capacity__button"
            variant="page"
            selected={capacity === selected}
            onClick={() => onSelect(capacity)}
          >
            {capacity}
          </Button>
        ))}
      </div>
    </div>
  );
};
