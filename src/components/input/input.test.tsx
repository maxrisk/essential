import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Input from '.';

library.add(fas);

const { Search } = Input;

describe('test Input component', () => {
  it('should render the correct default input', () => {
    const mockChange = jest.fn();
    const wrapper = render(<Input placeholder="email" data-testid="test-input" onChange={mockChange} />);
    const element = wrapper.getByTestId('test-input') as HTMLInputElement;

    expect(element).toBeInTheDocument();
    expect(element.placeholder).toBe('email');
    fireEvent.change(element, { target: { value: '123123' } });
    expect(element.value).toBe('123123');
    expect(mockChange).toHaveBeenCalled();
  });

  it('should render the input with icon', () => {
    const { getByTestId } = render(<Input prefix="0" />);
    const prefix = getByTestId('test-input-prefix');
    expect(prefix.childElementCount).toBe(2);
  });

  it('should render the correct Search component or addon after', () => {
    const mockOnSearch = jest.fn();
    const { getByText } = render(<Search onSearch={mockOnSearch} />);
    const element = getByText('搜索');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary es-search-button');
    fireEvent.click(element);
    expect(mockOnSearch).toHaveBeenCalled();
    fireEvent.keyDown(element, { key: 'Enter', code: 13, charCode: 13 });
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
