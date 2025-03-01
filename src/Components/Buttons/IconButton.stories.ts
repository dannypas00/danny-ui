import type { Meta, StoryObj } from '@storybook/vue3';

import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
import { expect, within } from '@storybook/test';
import IconButton, { IconButtonProps } from './IconButton.vue';

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
  render: (args: IconButtonProps) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args">{{ args.slot }}</IconButton>',
  }),
  args: {
    slot: 'Click me!',
    icon: { icon: 'fa-plus' } as FontAwesomeIconProps,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent(args.slot);
  },
};

export const NoText: Story = {
  ...Primary,
  render: (args: IconButtonProps) => ({
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
    slot: 'Click me too!',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveClass('bg-[#ff0000] text-white');
    await expect(button).toHaveStyle('background-color: rgb(255, 0, 0);');

    Primary?.play({ canvasElement });
  },
};
