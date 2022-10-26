import type { PropType } from "vue";

export enum StyleType {
  DEFAULT = "default",
  OUTLINE = "outline",
  FLAT = "flat",
  STANDOUT = "standout",
}

export const styleTypeProps = {
  type: {
    type: String as PropType<StyleType>,
    default: StyleType.DEFAULT,
  },
};
