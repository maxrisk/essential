import React from 'react';

export type TabItemProps = {
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { children } = props;

  return <div className="tabs-item">{children}</div>;
};

export default TabItem;

TabItem.displayName = 'TabItem';
