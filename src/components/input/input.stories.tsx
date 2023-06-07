import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';
import Button from '../Button';

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'check' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  args: {
    size: 'lg',
    label: 'string',
    placeholder: '邮箱',
  },
};

export const AddonAfterInput: Story = {
  args: {
    label: '请输入邮箱',
    placeholder: '邮箱',
    addonAfter: <Button btnType="primary">是</Button>,
  },
};
