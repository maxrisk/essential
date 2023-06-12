import type { Meta, StoryObj } from '@storybook/react';
import AutoComplete from '.';

const meta = {
  title: 'AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof AutoComplete<{ label: string }>>;

export const DefaultAutoComplete: Story = {
  args: {
    fetchSuggestions(keyword: string) {
      const suggestions = [
        {
          value: '33',
          label: 'Hei11',
        },
        {
          value: '123',
          label: 'Hei',
        },
        {
          value: '33311',
          label: 'Iei',
        },
        {
          value: '5511',
          label: 'LiLei',
        },
        {
          value: '233',
          label: 'XX',
        },
        {
          value: '9999',
          label: 'Mei',
        },
      ];
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            suggestions
              .filter((item) => item.value.includes(keyword)),
          );
        }, 1000);
      });
    },
    // renderOption(data) {
    //   return (
    //     <>
    //       <h1>
    //         {data.label}
    //       </h1>
    //       <div>{data.value}</div>
    //     </>
    //   );
    // },
  },
};
