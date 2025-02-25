import type { Meta, StoryObj } from '@storybook/vue3';

import IconButton from './IconButton.vue';
import { expect, within } from '@storybook/test';
import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof IconButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { IconButton },
    setup() {
      const text = 'Click me';
      return { args, text };
    },
    template: '<IconButton v-bind="args">{{ text }}</IconButton>',
  }),
  args: {
    icon: { icon: 'fa-plus' } as FontAwesomeIconProps,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent('Click me');
  },
};

export const NoText: Story = {
  ...Primary,
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args" />',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent('');
  },
};

export const CustomColours: Story = {
  ...Primary,
  args: {
    icon: { icon: 'fa-plus' } as FontAwesomeIconProps,
    class: 'bg-[#ff0000] text-white',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveClass('bg-[#ff0000] text-white');
    await expect(button).toHaveStyle('background-color: rgb(255, 0, 0);');
  },
};
