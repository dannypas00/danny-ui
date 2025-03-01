import type { Meta, StoryObj } from '@storybook/vue3';

import { expect, userEvent, within } from '@storybook/test';
import { ref } from 'vue';
import SimpleInput, { type SimpleInputProps } from './SimpleInput.vue';

const meta: Meta<typeof SimpleInput> = {
  component: SimpleInput,
  decorators: [() => ({ template: '<div class="w-1/4"><story /></div>' })],
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
    template: '<SimpleInput data-testid="input" v-model="args.modelValue" v-bind="args" />',
  }),
  args: {
    identifier: 'test',
    placeholder: 'Enter your text here',
  },
  play: async ({ canvasElement, args }) => {
    const input = canvasElement.querySelector('input');

    await expect(input.placeholder).toEqual(args.placeholder);
    await expect(args.modelValue).toEqual('');
    await userEvent.type(input, 'Hello, World!');
    await expect(args.modelValue).toEqual('Hello, World!');
  },
};

export const Error: Story = {
  ...Primary,
  args: {
    error: 'This is a test error message',
  },
  play: async ({ canvasElement, context }) => {
    const input = canvasElement.querySelector('input');

    await expect(input).toHaveAttribute('aria-invalid', 'true');

    await expect(canvasElement.querySelector('span')).toHaveTextContent(
      'This is a test error message',
    );

    await Primary.play?.(context);
  },
};

export const Explanation: Story = {
  ...Primary,
  args: {
    explanation: 'This is a test explanation message',
  },
  play: async ({ canvasElement, args, context }) => {
    await expect(within(canvasElement).getByTitle(args.explanation)).toBeInTheDOM();

    await Primary.play?.(context);
  },
};

export const Warning: Story = {
  ...Primary,
  args: {
    warning: 'This is a test warning message',
  },
  play: async ({ canvasElement, args, context }) => {
    await expect(within(canvasElement).getByTitle(args.warning)).toBeInTheDOM();

    await Primary.play?.(context);
  },
};

export const InfoError: Story = {
  ...Error,
  args: {
    ...Error.args,
    ...Explanation.args,
  },
  play: async ({ context }) => {
    await Explanation.play?.(context);
    await Error.play?.(context);
  },
};
