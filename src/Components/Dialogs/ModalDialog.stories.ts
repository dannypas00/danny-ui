import type { Meta, StoryObj } from '@storybook/vue3';

import ModalDialog from './ModalDialog.vue';
import { expect, userEvent, within } from '@storybook/test';
import DefaultButton from '../Buttons/DefaultButton.vue';

const meta: Meta<typeof ModalDialog> = {
  components: { DefaultButton },
  component: ModalDialog,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof ModalDialog>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { ModalDialog, DefaultButton },
    setup() {
      return { args };
    },
    template: '<ModalDialog v-bind="args" /><br><DefaultButton @click="args.open = !args.open">Open</DefaultButton>'
  }),
  args: {
    open: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  }
};
