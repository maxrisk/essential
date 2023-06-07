import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';

const meta = {
  title: 'Search',
  component: Input.Search,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Input.Search>;

export default meta;
type Story = StoryObj<typeof Input.Search>;

export const DefaultInput: Story = {
  args: {
    placeholder: 'fill email',
  },
};
