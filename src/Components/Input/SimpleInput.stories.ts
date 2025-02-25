import { type Meta, type StoryObj } from '@storybook/vue3';

import SimpleInput from './SimpleInput.vue';
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
  render: (args) => ({
    components: { SimpleInput },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template:
      '<SimpleInput :identifier="args.identifier" v-model="value" v-bind="args" />' +
      '<span data-testid="test">{{ value }}</span>',
  }),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    const output = within(canvasElement).getByTestId('test');

    await expect(output).toBeEmptyDOMElement();
    await userEvent.type(input, 'Hello, World!');
    await expect(output).toHaveTextContent('Hello, World!');
  },
  args: {
    identifier: 'test',
  },
};

export const WithError: Story = {
  ...Primary,
  args: {
    identifier: 'testerror',
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
