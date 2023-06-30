import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '.';

const meta = {
  title: 'ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const defaultProgressBar: Story = {
  args: {
    percent: 30,
  },
};
