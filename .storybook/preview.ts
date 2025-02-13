import { type Preview, setup } from '@storybook/vue3';
import '../src/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup((app) => {
  app.config.globalProperties.$page = {
    route_parameters: {}, props: {
      errors: {
        'testerror': 'This is a test error message',
      },
    },
  };
});

export default preview;