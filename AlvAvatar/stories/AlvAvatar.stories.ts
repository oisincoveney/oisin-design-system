import { AlvAvatar } from '../../index';

export const Basic = (args) => {
  return {
    components: { AlvAvatar },
    setup() {
      return { args };
    },
    template: '<AlvAvatar v-bind="args">Hello there</AlvAvatar>',
  };
};
