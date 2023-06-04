import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './tabs';
import { TabItem } from './tabItem';

const meta = {
  title: 'Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabsTemplate: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabItem label="Tab 1" />
      <TabItem label="Tab 2" />
    </Tabs>
  ),
};

export const DefaultTabs = {
  ...TabsTemplate,
  args: {
    defaultIndex: 1,
  },
};
