import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button/Button';
import './SearchInput.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={clsx('search-input', className)}>
      <Icon type="search" className="search-input__icon" />

      <input
        ref={inputRef}
        type="text"
        className="search-input__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          className="search-input__clear"
          aria-label="Clear search"
          onClick={handleClear}
        >
          <Icon type="close" width={16} height={16} />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
