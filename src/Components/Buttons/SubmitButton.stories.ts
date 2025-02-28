import type { Meta, StoryObj } from '@storybook/vue3';

import SubmitButton from './SubmitButton.vue';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof SubmitButton> = {
  component: SubmitButton,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof SubmitButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { SubmitButton },
    setup() {
      return { args };
    },
    template: '<SubmitButton v-bind="args">{{ args.slot }}</SubmitButton>',
  }),
  args: {
    slot: 'Submit me',
  },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toHaveTextContent(args.slot);
    await expect(button).toHaveAttribute('type', 'submit');
  },
};

export const Coloured: Story = {
  ...Primary,
  args: {
    class: 'bg-[#ff0000] text-white',
    slot: 'Submit me',
  },
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveClass('bg-[#ff0000] text-white');
    await expect(button).toHaveStyle('background-color: rgb(255, 0, 0);');

    await Primary?.play(context);
  },
};
