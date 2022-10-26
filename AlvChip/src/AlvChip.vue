<script lang="ts" setup>
import { styleTypeProps, StyleType } from "~/utils/styleTypes";
import { props as colorProps } from "../../utils/colorProps";
import { sizeProps } from "../../utils/sizeProps";
import AlvIcon from "~/AlvIcon/src/AlvIcon.vue";

const props = defineProps({
  ...colorProps,
  ...sizeProps,
  ...styleTypeProps,
  label: {
    type: String,
    default: "Chip",
  },
});
</script>

<template>
  <div
    :class="[
      `alv-chip`,
      `alv-chip--${color}`,
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
      v-if="icon"
      :name="icon"
      :size="size"
      :class="{ 'tw-mr-2': !!label }"
    />
    <slot v-if="label">
      {{ label }}
    </slot>
  </div>
</template>
