<script lang="ts" setup>
import AlvIcon from "~/AlvIcon/src/AlvIcon.vue";
import { type PropType, ref, type Ref } from "vue";
import { props as colorProps } from "~/utils/colorProps";
import { sizeProps } from "~/utils/sizeProps";
import { styleTypeProps, StyleType } from "~/utils/styleTypes";

defineProps({
  ...colorProps,
  ...sizeProps,
  ...styleTypeProps,
  label: {
    type: String,
    default: "Button",
  },
  iconPlacement: {
    type: String as PropType<"left" | "right">,
    default: "left",
  },
});

const btn: Ref<HTMLButtonElement | null> = ref(null);

defineExpose({
  button: btn,
});
</script>

<template>
  <button
    ref="btn"
    :class="[
      `alv-btn`,
      `alv-btn--${color}`,
      {
        '-outline': type === StyleType.OUTLINE,
        '-standout': type === StyleType.STANDOUT,
        '-flat': type === StyleType.FLAT,
      },
      {
        [`-${size}`]: size,
      },
    ]"
  >
    <AlvIcon
      v-if="icon && iconPlacement === 'left'"
      :name="icon"
      :size="size"
      :class="{ 'tw-mr-2': !!label }"
    />
    <slot v-if="label">
      {{ label }}
    </slot>
    <AlvIcon
      v-if="icon && iconPlacement === 'right'"
      :name="icon"
      :size="size"
    />
  </button>
</template>
