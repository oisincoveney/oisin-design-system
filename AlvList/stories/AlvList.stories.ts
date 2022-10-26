import AlvList from '~/AlvList/src/AlvList.vue';
import '~/theme/src/main.scss';

export const Primary = (args) => {
  return {
    components: { AlvList },
    setup() {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

      return { args, items };
    },
    template: '<AlvList :items="items" v-bind="args">Hello there</AlvList>',
  };
};
