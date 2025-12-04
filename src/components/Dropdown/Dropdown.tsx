import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import './Dropdown.scss';
import { useState } from 'react';
import { BookStoreIcon, IconName } from '../BookStoreIcon';

interface DropdownProps {
  variant: string;
  label?: string;
  options: {
    label: string;
    value: string | number;
  }[];
  dropdownText: string | number;
  onSelect: (value: string | number) => void;
}

export const Dropdown = ({
  variant,
  label,
  options,
  dropdownText,
  onSelect,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown dropdown--${variant}`}>
      {label && <span className="dropdown__label">{label}</span>}
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger className="dropdown__trigger">
          {dropdownText}
          <span className="dropdown__arrow">
            <BookStoreIcon
              iconName={open ? IconName.ArrowUp : IconName.ArrowDown}
            />
          </span>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="dropdown__content">
          {options.map(opt => (
            <DropdownMenu.Item
              key={opt.value}
              className="dropdown__item"
              onSelect={() => onSelect(opt.value)}
            >
              {opt.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
