import type { Meta, StoryObj } from '@storybook/vue3';

import CircleIcon, { type CircleIconProps } from './CircleIcon.vue';
import { within } from '@storybook/test';

const meta: Meta<typeof CircleIcon> = {
  component: CircleIcon,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof CircleIcon>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Info: Story = {
  render: (args: CircleIconProps) => ({
    components: { CircleIcon },
    setup() {
      return { args };
    },
    template: '<CircleIcon v-bind="args" />',
  }),
  args: {
    icon: { icon: 'info' },
    class: 'text-blue-700',
  },
};

export const Warning: Story = {
  ...Info,
  args: {
    icon: { icon: 'exclamation-triangle' },
    class: 'text-yellow-400',
  },
};

export const Error: Story = {
  ...Info,
  args: {
    icon: { icon: 'exclamation' },
    class: 'text-red-500',
  },
};
