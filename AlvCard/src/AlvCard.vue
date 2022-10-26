<template>
  <div
    :class="[
      'tw-flex tw-rounded',
      cardTypeClass,
      attrs.class,
      paddingClass,
      'tw-flex',
      orientation === 'vertical' ? 'tw-flex-col' : 'tw-flex-row',
    ]"
  >
    <slot name="default" />
  </div>
</template>

<script lang="ts">
export default {
  name: "AlvCard",
};
</script>

<script setup lang="ts">
import { props as colorProps } from "~/utils/colorProps";
import { sizeProps, Sizes } from "~/utils/sizeProps";
import { computed, useAttrs, type PropType } from "vue";
import { styleTypeProps, StyleType } from "../../utils/styleTypes";

const attrs = useAttrs();

const props = defineProps({
  ...colorProps,
  ...styleTypeProps,
  orientation: {
    type: String as PropType<"horizontal" | "vertical">,
    default: "vertical",
  },
  padding: sizeProps.size,
});

const paddingClass = computed(() => {
  const padding = props.padding ?? Sizes.MD;
  return {
    [Sizes.NONE]: "tw-p-0",
    [Sizes.XS]: "tw-p-2",
    [Sizes.SM]: "tw-p-4",
    [Sizes.MD]: "tw-p-6",
    [Sizes.LG]: "tw-p-8",
    [Sizes.XL]: "tw-p-10",
    [Sizes.XXL]: "tw-p-12",
    [Sizes.XXXL]: "tw-p-16",
    [Sizes.XXXXL]: "tw-p-20",
  }[padding];
});

const cardTypeClass = computed(() => {
  // export enum StyleType {
  //   DEFAULT = "default",
  //   OUTLINE = "outline",
  //   FLAT = "flat",
  //   STANDOUT = "standout",
  // }

  const type = props.type;

  if (type === StyleType.FLAT) {
    return "tw-border-transparent tw-bg-gray-50";
  }

  if (type === StyleType.OUTLINE) {
    return "tw-border-transparent tw-bg-transparent";
  }

  return "tw-border tw-border-gray-300 tw-bg-gray-50 tw-border-opacity-40";
});
</script>
