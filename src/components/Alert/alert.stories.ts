import type { Meta, StoryObj } from '@storybook/react';
import Alert from './alert';

const meta = {
  title: 'Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultAlert: Story = {
  args: {
    title: 'This is a default alert',
  },
};

export const DangerAlert: Story = {
  args: {
    type: 'danger',
    title: 'This is title',
  },
};

export const PrimaryAlert: Story = {
  args: {
    type: 'primary',
    title: 'This is primary title',
  },
};

export const SuccessAlert: Story = {
  args: {
    type: 'success',
    title: 'This is primary title',
  },
};
