import React from 'react';
import {
  RenderResult, render, fireEvent, waitFor,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import Upload, { UploadProps } from '.';

jest.mock('../Icon', () => function Icon(props: any) {
  const { onClick, icon } = props;
  return <span onClick={onClick} aria-hidden>{icon}</span>;
});

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    ...jest.requireActual('axios'),
    post: jest.fn(),
  },
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onProgress: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

const testFile = new File(['abc'], 'test.png', { type: 'image/png' });

describe('test Upload component', () => {
  let wrapper: RenderResult;
  let inputElement: HTMLInputElement;
  let uploadArea: HTMLElement;
  beforeEach(async () => {
    wrapper = await act(() => render(<Upload {...testProps}>click to upload</Upload>));
    inputElement = wrapper.getByTestId('es-upload-input') as HTMLInputElement;
    uploadArea = wrapper.getByText('click to upload');
  });

  it('upload file should work fine', async () => {
    const { queryByText, getByText } = wrapper;

    const resp = { data: 'cool' };
    mockedAxios.post.mockResolvedValueOnce(resp);

    await waitFor(() => {
      expect(uploadArea).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, { target: { files: [testFile] } });
    });
    expect(getByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('test.png')).toBeInTheDocument();
      expect(getByText('circle-check')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(resp, testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    fireEvent.click(getByText('circle-xmark'));
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png',
    }));
  });

  it('drag and drop files should works fine', async () => {
    const resp = { data: 'cool' };
    mockedAxios.post.mockResolvedValueOnce(resp);
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-drag-over');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-drag-over');
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    await waitFor(() => {
      expect(wrapper.getByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(resp, testFile);
  });
});
