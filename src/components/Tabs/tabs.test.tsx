import React from 'react';
import {
  cleanup,
  fireEvent,
  GetByText,
  render,
  RenderResult,
} from '@testing-library/react';
import Tabs, { TabsProps } from './tabs';
import TabItem from './tabItem';

const defaultProps: TabsProps = {
  onSelect: jest.fn(),
};

const cardTabsProps: TabsProps = {
  type: 'card',
  defaultIndex: 1,
  onSelect: jest.fn(),
};

const genTabs = (props: TabsProps) => (
  <Tabs {...props}>
    <TabItem label="panel1">This is panel 1</TabItem>
    <TabItem label="panel2">This is panel 2</TabItem>
    <TabItem label="panel3" disabled>This is panel 3</TabItem>
  </Tabs>
);

describe('test Tabs component', () => {
  let wrapper: RenderResult;
  let firstContentElement: ReturnType<GetByText>;
  let nav2Element: ReturnType<GetByText>;
  let nav3Element: ReturnType<GetByText>;

  beforeEach(() => {
    wrapper = render(genTabs(defaultProps));
    firstContentElement = wrapper.getByText('This is panel 1');
    nav2Element = wrapper.getByText('panel2');
    nav3Element = wrapper.getByText('panel3');
  });
  it('should render correct default tabs', () => {
    expect(firstContentElement).toBeInTheDocument();
    expect(firstContentElement.parentNode).toHaveClass('tabs-navs-line');
    expect(nav2Element.nextSibling).toHaveClass('disabled');
    fireEvent.click(nav2Element);
    expect(defaultProps.onSelect).toHaveBeenCalled();
    expect(nav2Element).toHaveClass('navs-item__active');
  });

  it('should not change tab when nav is disabled', () => {
    fireEvent.click(nav3Element);
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it('should render the different type Tabs', () => {
    cleanup();
    const cardWrapper = render(genTabs(cardTabsProps));
    const element = cardWrapper.getByText('panel2');
    const content = cardWrapper.getByText('This is panel 2');

    expect(content).toBeInTheDocument();
    expect(element).toHaveClass('navs-item__active');
    expect(content.parentNode).toHaveClass('tabs-navs-card');
  });
});
