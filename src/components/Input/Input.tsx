import type { ChangeEvent } from 'react';
import { BookStoreIcon, IconName } from '../BookStoreIcon';
import './Input.scss';
import classNames from 'classnames';

type InputProps = {
  isOpen?: boolean;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ isOpen, placeholder, value, onChange }: InputProps) => {
  return (
    <div className={classNames('input-container', { 'is-open': isOpen })}>
      <div className="input-icon">
        <BookStoreIcon iconName={IconName.Search} />
      </div>
      <input
        className="input"
        type="text"
        name="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
