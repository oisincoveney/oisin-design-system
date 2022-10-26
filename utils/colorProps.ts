import { ColorType } from "./colorTypes";
import type { PropType } from "vue";

export const props = {
  color: {
    type: String as PropType<ColorType>,
    default: ColorType.PRIMARY,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
};
