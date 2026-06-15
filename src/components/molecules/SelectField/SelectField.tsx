import { useId, useState, useRef, type FC } from 'react';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon/Icon';
import './SelectField.scss';

export type SelectOption = {
  value: string;
  label: string;
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
  const selectedLabel = options.find((option) => option.value === value)?.label ?? placeholder;
  const id = useId();
  const triggerId = `select-trigger-${id}`;
  const labelId = `select-label-${id}`;

  const [isOpen, setIsOpen] = useState(false);

  const isClosingRef = useRef(false);

  const handleLabelMouseDown = () => {
    if (isOpen) {
      isClosingRef.current = true;
    }
  };

  const handleLabelClick = () => {
    if (isClosingRef.current) {
      isClosingRef.current = false;
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className={clsx('select-field-wrapper', className)}>
      {label && (
        <Label.Root
          id={labelId}
          className="select-field-wrapper__label"
          onMouseDown={handleLabelMouseDown}
          onClick={handleLabelClick}
        >
          {label}
        </Label.Root>
      )}
      <div className="select">
        <Select.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          value={value}
          onValueChange={onValueChange}
        >
          <Select.Trigger
            id={triggerId}
            aria-labelledby={label ? labelId : undefined}
            className="select__trigger"
          >
            <Select.Value placeholder={placeholder} aria-label={value}>
              {selectedLabel}
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
                {options.map(({ value: optionValue, label: optionLabel }) => (
                  <Select.Item className="select__item" value={optionValue} key={optionValue}>
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
