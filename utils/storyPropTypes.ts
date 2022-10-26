import { ColorType } from "./colorTypes";
import { Sizes } from "./sizeProps";
import { StyleType } from "./styleTypes";

export const storyPropTypes = {
  color: {
    options: Object.values(ColorType),
    control: { type: "select" },
  },
  size: {
    options: Object.values(Sizes),
    control: { type: "select" },
  },
  type: {
    options: Object.values(StyleType),
    control: { type: "select" },
  },
};
