import type { FC } from 'react';
import { Button } from '../../atoms/Button/Button';
import { getColorHex } from '../../../utils/getColorHex';
import './ColorPicker.scss';

interface Props {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

export const ColorPicker: FC<Props> = ({ colors, selected, onSelect }) => {
  return (
    <div className="colors">
      <h3 className="colors__title">Available colors</h3>

      <div className="colors__buttons">
        {colors.sort().map((color) => (
          <Button
            key={color}
            type="button"
            className="colors__button"
            variant="color"
            color={getColorHex(color)}
            selected={color === selected}
            aria-label={color}
            title={color}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
};
