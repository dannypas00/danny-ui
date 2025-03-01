import { type Meta, type StoryObj } from '@storybook/vue3';

import SimpleInput, { type SimpleInputProps } from './SimpleInput.vue';
import { ref } from 'vue';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<typeof SimpleInput> = {
  component: SimpleInput,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof SimpleInput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (args: SimpleInputProps) => ({
    components: { SimpleInput },
    setup() {
      args.modelValue = ref('');
      return { args };
    },
    template:
      '<SimpleInput data-testid="input" v-model="args.modelValue" v-bind="args" />',
  }),
  play: async ({ canvasElement, args }) => {
    const input = canvasElement.querySelector('input');

    await expect(args.modelValue).toEqual('');
    await userEvent.type(input, 'Hello, World!');
    await expect(args.modelValue).toEqual('Hello, World!');
  },
  args: {
    identifier: 'test',
  },
};

export const WithError: Story = {
  ...Primary,
  args: {
    error: 'This is a test error message',
  },
  play: async ({ canvasElement, args, context }) => {
    const input = canvasElement.querySelector('input');

    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await expect(canvasElement.querySelector('span')).toHaveTextContent(
      'This is a test error message',
    );

    await Primary.play?.(context);
  },
};
