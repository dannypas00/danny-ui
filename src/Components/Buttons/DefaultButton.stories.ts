import type { Meta, StoryObj } from '@storybook/vue3';

import DefaultButton from './DefaultButton.vue';
import { expect, userEvent, within } from '@storybook/test';

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
    template: '<DefaultButton v-bind="args" />',
  }),
  args: {
    //👇 The args you need here will depend on your component
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button');
    await expect(button).toHaveTextContent('Clicked 0 times');
    await userEvent.click(button);
    await expect(button).toHaveTextContent('Clicked 1 times');
  },
};