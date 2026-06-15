import { useId, type FC } from 'react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon/Icon';
import './SelectField.scss';

export type SelectOption = {
  value: string;
  label: string;
  icon?: string;
};

interface Props {
  options: SelectOption[];
  value: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onValueChange: (value: string) => void;
}

export const SelectField: FC<Props> = ({
  options,
  value,
  onValueChange,
  label,
  placeholder = 'Select an option',
  className,
}) => {
  const selectedOption = options.find((option) => option.value === value);
  const id = useId();
  const triggerId = `select-trigger-${id}`;

  return (
    <div className={clsx('select-field-wrapper', className)}>
      {label && (
        <label className="select-field-wrapper__label" htmlFor={triggerId}>
          {label}
        </label>
      )}
      <div className="select">
        <Select.Root value={value} onValueChange={onValueChange}>
          <Select.Trigger id={triggerId} className="select__trigger">
            <Select.Value placeholder={placeholder} aria-label={value}>
              <div className="select__value-container">
                {selectedOption?.icon && (
                  <img src={selectedOption?.icon} alt="logo" className="select__img" />
                )}
                <span>{selectedOption?.label ?? placeholder}</span>
              </div>
            </Select.Value>
            <Select.Icon className="select__icon">
              <span className="select__arrow">
                <Icon width={16} height={16} type="arrow-down" />
              </span>
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="select__content"
              position="popper"
              sideOffset={4}
              align="start"
              avoidCollisions={true}
              collisionPadding={10}
            >
              <Select.Viewport className="select__viewport">
                {options.map(({ value: optionValue, label: optionLabel, icon }) => (
                  <Select.Item className="select__item" value={optionValue} key={optionValue}>
                    {icon && <img src={icon} alt="logo" className="select__img" />}
                    <Select.ItemText>{optionLabel}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};
