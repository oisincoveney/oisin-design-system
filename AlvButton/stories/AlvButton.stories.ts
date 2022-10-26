import AlvButton from "../src/AlvButton.vue";
import { storyPropTypes } from "~/utils/storyPropTypes";
import {ColorType} from "~/utils/colorTypes";
import '~/theme/src/main.scss';

export const primary = () => ({
  components: { AlvButton },
  setup() {
    return {ColorType}
  },
  template: `<AlvButton :color="ColorType.PRIMARY">Primary</AlvButton>`,
});

export const secondary = () => ({
  components: { AlvButton },
  setup() {
    return {ColorType}
  },
  template: `<AlvButton :color="ColorType.SECONDARY">Secondary</AlvButton>`,
});