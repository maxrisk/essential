import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'tclass',
};

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Goods</Button>);
    const element = wrapper.getByText('Goods');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Goods</Button>);
    const element = wrapper.getByText('Goods');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn btn-primary btn-lg tclass');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Goods</Button>);
    const element = wrapper.getByText('Goods');
    expect(element).toBeInTheDocument();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
