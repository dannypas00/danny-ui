import type { Meta, StoryObj } from '@storybook/vue3';

import ${Component} from './${Component}.vue';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof ${Component}> = {
  component: ${Component},
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof ${Component}>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args) => ({
    components: { ${Component} },
    setup() {
      return { args };
    },
    template: '<${Component} v-bind="args" />',
  }),
  args: {
    //👇 The args you need here will depend on your component
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};