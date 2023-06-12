import React, {
  ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState, useTransition,
} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../input';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounceValue from '../../hooks/useDebounceValue';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps<T = {}> extends Omit<InputProps, 'onSelect'> {
  /** 获取建议选项 */
  fetchSuggestions: (keyword: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
  /** 自定义渲染选项 */
  renderOption?: (item: DataSourceType<T>) => React.ReactElement;
  /** 选择的时候 */
  onSelect?: (item: DataSourceType<T>) => void;
}

export function AutoComplete<T = {}>(props: AutoCompleteProps<T>): React.ReactElement {
  const {
    fetchSuggestions, renderOption, onSelect, value, ...rest
  } = props;

  const [inputValue, setInputValue] = useState(value ?? '');
  const [suggestions, setSuggestions] = useState<DataSourceType<T>[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const triggerSearch = useRef(false);
  const [isPending, startTransition] = useTransition();
  const debounceValue = useDebounceValue(inputValue, 300);

  useEffect(() => {
    setShow(true);
    setSuggestions([]);
    setSuggestionIndex(-1);
    if (debounceValue && fetchSuggestions && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          startTransition(() => {
            setSuggestions(data);
          });
        });
      } else {
        startTransition(() => {
          setSuggestions(results);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useClickOutside(componentRef, () => {
    setShow(false);
  });

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value.trim();
    setInputValue(word);
    triggerSearch.current = true;
  };
  const handleSelect = (data: DataSourceType<T>) => {
    setInputValue(data.value);
    setSuggestions([]);
    onSelect?.(data);
    triggerSearch.current = false;
  };
  const highlight = (index: number) => {
    const len = suggestions.length;
    if (index <= 0) {
      setSuggestionIndex(0);
    } else if (index >= len - 1) {
      setSuggestionIndex(len - 1);
    } else {
      setSuggestionIndex(index);
    }
  };
  const handleKeyDown: KeyboardEventHandler = (e) => {
    switch (e.code) {
      case 'Enter':
        if (suggestions[suggestionIndex]) {
          handleSelect(suggestions[suggestionIndex]);
        }
        break;
      case 'Esc':
        setSuggestions([]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        highlight(suggestionIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        highlight(suggestionIndex + 1);
        break;
      default:
        break;
    }
  };

  const genSuggestions = () => (
    <ul className="es-auto-complete-options">
      {suggestions.map((item, index) => {
        const classes = classNames('es-auto-complete-options-item', {
          'item-highlight': index === suggestionIndex,
        });
        return (
          <li key={item.value} onClick={() => handleSelect(item)} aria-hidden="true" className={classes}>
            {renderOption ? renderOption(item) : item.value}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="es-auto-complete" ref={componentRef}>
      <Input {...rest} value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />

      <div className="es-auto-complete-panel">
        {(isPending || loading) && <h3 className="es-auto-complete-loading">Loading...</h3>}
        {show && suggestions.length > 0 && genSuggestions()}
      </div>
    </div>
  );
}

export default AutoComplete;
