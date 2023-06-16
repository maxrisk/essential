import React from 'react';
import { render } from '@testing-library/react';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './icon';

describe('test Icon component', () => {
  it('should render correct Icon ', () => {
    const wrapper = render(<Icon icon={faBan} data-testid="test-icon" />);
    const element = wrapper.getByTestId('test-icon');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('fa-ban');
  });

  it('should render correct danger Icon ', () => {
    const wrapper = render(
      <Icon icon={faBan} theme="danger" data-testid="test-icon2" size="xl" />,
    );
    const element = wrapper.getByTestId('test-icon2');
    expect(element).toHaveClass('fa-ban fa-xl icon-danger');
  });

  it('style shoule work fine when pass custom className', () => {
    const { getByTestId } = render(
      <Icon icon={faBan} theme="danger" className="custom-icon" data-testid="test-icon3" />,
    );

    expect(getByTestId('test-icon3')).toHaveClass('icon-danger custom-icon');
  });
});
