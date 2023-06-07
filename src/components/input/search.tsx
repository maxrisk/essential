import React, { useState } from 'react';
import { Input, InputProps } from './input';
import Button from '../Button';

export interface SearchProps extends InputProps {
  buttonText?: string;
  onSearch?: (val: string) => void;
}

export const Search: React.FC<SearchProps> = (props) => {
  const { onSearch, buttonText, ...rest } = props;
  const [value, setValue] = useState('');

  const handleOnSearch = () => {
    onSearch?.(value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    handleOnSearch();
  };

  const renderAddon = () => (
    <Button
      className="es-search-button"
      btnType="primary"
      onClick={handleOnSearch}
    >
      {buttonText ?? '搜索'}
    </Button>
  );

  return (
    <Input
      {...rest}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onKeyDown={handleKeyDown}
      addonAfter={renderAddon()}
    />
  );
};

export default Search;
