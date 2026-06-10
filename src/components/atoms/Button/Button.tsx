import clsx from 'clsx';
import { Slot } from 'radix-ui';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import './Button.scss';

type ButtonType = 'primary' | 'ghost' | 'page' | 'element' | 'color' | 'icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonType;
  disabled?: boolean;
  selected?: boolean;
  color?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      asChild = false,
      variant = 'primary',
      disabled = false,
      selected = false,
      color,
      style,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot.Root : 'button';

    return (
      <Component
        ref={ref}
        className={clsx(
          'button',
          `button-${variant}`,
          {
            [`button-${variant}--selected`]: selected,
            [`button-${variant}--disabled`]: disabled,
          },
          className,
        )}
        disabled={disabled}
        style={variant === 'color' && color ? { ...style, backgroundColor: color } : style}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
