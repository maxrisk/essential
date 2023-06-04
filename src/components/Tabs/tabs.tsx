import React, { Children, useState } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem';

export type TabsProps = {
  defaultIndex?: number;
  onSelect?: (index: number) => void;
  children?: React.ReactNode;
  type?: 'line' | 'card';
};

export const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex, onSelect, children, type,
  } = props;
  const [currentIndex, setIndex] = useState(defaultIndex ?? 0);

  const classes = classNames('tabs', {
    'tabs-navs-line': type === 'line',
    'tabs-navs-card': type === 'card',
  });

  const renderNavLinks = Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<TabItemProps>;
    if (childElement.type.displayName !== 'TabItem') {
      throw new Error("Tabs's children must be TabItem");
    }
    const { label, disabled } = childElement.props;
    const navItemClasses = classNames('navs-item', {
      'navs-item__active': currentIndex === index,
      disabled,
    });

    const handleSelect = () => {
      if (onSelect) {
        onSelect(index);
      }
      setIndex(index);
    };

    return (
      <button
        className={navItemClasses}
        type="button"
        disabled={disabled}
        onClick={handleSelect}
      >
        {label}
      </button>
    );
  });

  const renderPanel = Children.map(
    children,
    (child, index) => currentIndex === index && child,
  );

  return (
    <div className={classes}>
      <div className="tabs-navs">{renderNavLinks}</div>

      {renderPanel}
    </div>
  );
};

export default Tabs;

Tabs.defaultProps = {
  type: 'line',
};
