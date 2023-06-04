import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './icon';

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

const IconsTemplate: Story = {
  render: (args) => (
    <Icon {...args} />
  ),
};

export const ChainIcon: Story = {
  ...IconsTemplate,
  args: {
    theme: 'danger',
    icon: 'chain',
  },
};

export const BanIcon: Story = {
  ...IconsTemplate,
  args: {
    theme: 'primary',
    icon: faBan,
  },
};
