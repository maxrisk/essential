import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import { Upload, UploadFile } from './upload';

const fileList: UploadFile[] = [
  {
    uid: '111', name: 'file1.png', status: 'ready', size: 1234, percent: 0.33,
  },
  {
    uid: '333', name: 'file3.png', status: 'uploading', size: 100, percent: 23,
  },
  {
    uid: '222', name: 'file2.png', status: 'success', size: 800,
  },
  {
    uid: '334', name: 'file4.png', status: 'error', size: 2234,
  },
];

const meta = {
  title: 'Upload',
  component: Upload,
  tags: ['autodocs'],
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof Upload>;

export const DefaultUpload: Story = {
  args: {
    action: 'http://localhost:3000/upload',
    defaultFileList: fileList,
    data: { key: 'value' },
    headers: { 'X-Requested-With': 'essential' },
    accept: '.jpg',
    multiple: true,
    drag: true,
    children: (
      <div style={{
        display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column',
      }}
      >
        <Icon icon={faDownload} />
        <p>拖拽上传</p>
      </div>
    ),
  },
};
