import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    btnType: 'primary',
    children: 'CButton',
  },
};

export const Danger: Story = {
  args: {
    btnType: 'danger',
    children: 'Danger',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Big',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Disable: Story = {
  args: {
    children: 'Disable',
    disabled: true,
  },
};

export const Round: Story = {
  args: {
    btnType: 'primary',
    round: true,
    children: 'Button',
  },
};
