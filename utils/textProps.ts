import { ColorType } from "./colorTypes";
import { Sizes } from "./sizeProps";

export const textSize = (size: Sizes) => {
  switch (size) {
    case Sizes.XS:
      return "9px";
    case Sizes.SM:
      return "12px";
    case Sizes.MD:
      return "16px";
    case Sizes.LG:
      return "20px";
    case Sizes.XL:
      return "28px";
    default:
      return "24px";
  }
};

export const textColor = (color: ColorType) => {
  const colorDict: Record<ColorType, string> = {
    [ColorType.PRIMARY]: "tw-text-primary-500",
    [ColorType.SECONDARY]: "tw-text-alvin-purple-500",
    [ColorType.SUCCESS]: "tw-text-alvin-green-500",
    [ColorType.DANGER]: "tw-text-red-500",
    [ColorType.WARNING]: "tw-text-alvin-orange-500",
    [ColorType.INFO]: "tw-text-yellow-500",
    [ColorType.LIGHT]: "tw-text-gray-200",
    [ColorType.TRANSPARENT]: "tw-text-gray-200",
    [ColorType.DARK]: "tw-text-gray-700",
  };

  return colorDict[color as ColorType] ?? "tw-text-[unset]";
};
