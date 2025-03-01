import type { Meta, StoryObj } from '@storybook/vue3';

import DefaultButton from './DefaultButton.vue';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof DefaultButton> = {
  component: DefaultButton,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof DefaultButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { DefaultButton },
    setup() {
      return { args };
    },
    template: '<DefaultButton v-bind="args">{{ args.slot }}</DefaultButton>',
  }),
  args: {
    slot: 'Testbutton',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent(args.slot);
  },
};

export const Secondary: Story = {
  ...Primary,
  args: {
    class: 'bg-gray-200',
    slot: 'Testlink',
  },
};

export const LinkRole: Story = {
  ...Primary,
  args: {
    role: 'link',
    slot: 'Testlink',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('link');
    await expect(button).toHaveTextContent(args.slot);
  },
};
