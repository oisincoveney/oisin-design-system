import type { PropType } from "vue";

export enum Sizes {
  NONE = "none",
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "xxl",
  XXXL = "xxxl",
  XXXXL = "xxxxl",
}

export const sizeProps = {
  size: {
    type: String as PropType<Sizes>,
    default: Sizes.MD,
  },
};
