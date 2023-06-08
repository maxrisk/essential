import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Alert from './alert';

describe('test Alert button', () => {
  it('should render default Alert', async () => {
    const wrapper = render(<Alert title="This is default alert" />);
    const element = wrapper.getByText('This is default alert');
    expect(element).toBeInTheDocument();
    expect(element.parentElement).toHaveClass('alert alert-primary');

    const closeBtnElement = wrapper.getByTestId('close-btn');
    fireEvent.click(closeBtnElement);
    await waitFor(() => {
      expect(element.parentElement).not.toBeInTheDocument();
    });
  });

  it('should render different type alert', () => {
    const wrapper = render(<Alert title="danger" type="danger" />);
    const element = wrapper.getByText('danger');
    expect(element).toBeInTheDocument();
    expect(element.parentElement).toHaveClass('alert-danger');
  });
});
