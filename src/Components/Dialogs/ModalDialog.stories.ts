import type { Meta, StoryObj } from '@storybook/vue3';

import ModalDialog, { type ModalDialogProps } from './ModalDialog.vue';
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
  render: (args: ModalDialogProps) => ({
    components: { ModalDialog, DefaultButton },
    setup() {
      return { args };
    },
    template: '<ModalDialog data-testid="component" v-model:open="args.open" v-bind="args">' +
      '<span data-testid="content">{{ args.content }}</span>' +
      '<template #footer><DefaultButton data-testid="footer" @click="() => args.open = false">Close</DefaultButton></template>' +
      '</ModalDialog>' +
      '<DefaultButton data-testid="open-button" @click="() => args.open = !args.open">Open</DefaultButton>'
  }),
  args: {
    title: 'Modal title',
    open: false,
    content: 'This is modal content',
    icon: { icon: ['fas', 'check'] },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-button');

    // Check that the modal component doesn't take up any DOM space
    await expect(canvasElement.clientHeight).toEqual(openButton.clientHeight);

    // Happy flow
    await userEvent.click(openButton);
    await expect(args.open).toBe(true);

    await new Promise(resolve => setTimeout(resolve, 300));
    let modal = within(document.querySelector('[data-testid="component"]'));

    await expect(await modal.findByText(args.title)).toBeInTheDocument();

    let content = modal.getByTestId('content');
    await expect(content).toBeVisible();

    const closeButton = modal.getByTestId('footer');
    await expect(closeButton).toBeVisible();
    await userEvent.click(closeButton);

    await new Promise(resolve => setTimeout(resolve, 300));
    await expect(content).not.toBeVisible();
    await expect(args.open).toBe(false);

    // Clickoff
    await userEvent.click(canvas.getByTestId('open-button'));
    await expect(args.open).toBe(true);

    await new Promise(resolve => setTimeout(resolve, 300));
    modal = within(document.querySelector('[data-testid="component"]'));
    content = modal.getByTestId('content');
    await expect(content).toBeVisible();

    await userEvent.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    await expect(content).not.toBeVisible();
    await expect(args.open).toBe(false);

    await userEvent.click(openButton);
  }
};
