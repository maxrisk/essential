import React from 'react';
import {
  cleanup, render, fireEvent, waitFor, RenderResult,
} from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from '.';

type SortType = {
  sort: number
};

const testData: DataSourceType<SortType>[] = [
  {
    value: '334',
    sort: 1231,
  },
  {
    value: '112233',
    sort: 33,
  },
  {
    value: '22',
    sort: 44,
  },
  {
    value: '312',
    sort: 66,
  },
];

const renderOption = (item: DataSourceType<SortType>) => (
  <div>
    {`name: ${item.value}`}
  </div>
);

const defaultProps: AutoCompleteProps<SortType> = {
  fetchSuggestions(keyword) {
    return testData
      .filter((item) => item.value.includes(keyword));
  },
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

const testPropsWithCustomRender: AutoCompleteProps<SortType> = {
  ...defaultProps,
  placeholder: 'auto-complete2',
  renderOption,
};

const testPropsWithAsyncSuggestion: AutoCompleteProps<SortType> = {
  ...defaultProps,
  placeholder: 'auto-complete3',
  fetchSuggestions: (query) => Promise.resolve(
    testData.filter((item) => item.value.includes(query)),
  ),
};

describe('test AutoComplete component', () => {
  let wrapper: RenderResult;
  let inputNode: HTMLInputElement;
  beforeEach(() => {
    wrapper = render(<AutoComplete data-testid="test-autocomplete" {...defaultProps} />);
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement;
  });

  it('test basic AutoComplete behavior', async () => {
    const {
      getByText, getByTestId, queryByText,
    } = wrapper;
    const element = getByTestId('test-autocomplete') as HTMLInputElement;
    fireEvent.change(element, { target: { value: '33' } });

    await waitFor(() => {
      expect(wrapper.queryByText('334')).toBeInTheDocument();
    });

    expect(wrapper.container.querySelectorAll('.es-auto-complete-options-item').length).toEqual(2);

    fireEvent.click(getByText('334'));
    expect(defaultProps.onSelect).toHaveBeenCalledWith({ value: '334', sort: 1231 });
    expect(queryByText('334')).not.toBeInTheDocument();
    expect(inputNode.value).toBe('334');
  });

  it('should provide keyboard event support', async () => {
    const { getByText, getByTestId } = wrapper;
    const element = getByTestId('test-autocomplete') as HTMLInputElement;
    fireEvent.change(element, { target: { value: '22' } });
    await waitFor(() => {
      expect(getByText('112233')).toBeInTheDocument();
    });

    const firstResult = getByText('112233');
    const secondResult = getByText('22');
    fireEvent.keyDown(element, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(firstResult).toHaveClass('item-highlight');
    fireEvent.keyDown(element, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(firstResult).not.toHaveClass('item-highlight');
    expect(secondResult).toHaveClass('item-highlight');
    fireEvent.keyDown(element, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(firstResult).toHaveClass('item-highlight');
    fireEvent.keyDown(element, { key: 'Enter', code: 'Enter' });
    expect(firstResult).not.toBeInTheDocument();
    expect(inputNode.value).toEqual('112233');
  });

  it('should click outside to hide the drop', async () => {
    fireEvent.change(inputNode, { target: { value: '33' } });
    await waitFor(() => {
      expect(wrapper.getByText('334')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('334')).not.toBeInTheDocument();
  });

  it('should support custom render option', async () => {
    cleanup();
    const wrapper2 = render(<AutoComplete {...testPropsWithCustomRender} />);
    const inputNode2 = wrapper2.getByPlaceholderText('auto-complete2');
    fireEvent.change(inputNode2, { target: { value: '3' } });

    await waitFor(() => {
      expect(wrapper2.getByText('name: 334')).toBeInTheDocument();
    });
  });

  it('async fetchSuggestions should works fine', async () => {
    cleanup();
    const wrapper3 = render(<AutoComplete {...testPropsWithAsyncSuggestion} />);
    const inputNode3 = wrapper3.getByPlaceholderText('auto-complete3');
    fireEvent.change(inputNode3, { target: { value: '22' } });

    await waitFor(() => {
      expect(wrapper3.getByText('112233')).toBeInTheDocument();
    });
  });
});
