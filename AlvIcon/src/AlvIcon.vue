<script setup lang="ts">
import type { ColorType } from "~/utils/colorTypes";
import { computed, type PropType } from "vue";
import { sizeProps } from "~/utils/sizeProps";
import { props as colorProps } from "~/utils/colorProps";
import { textSize, textColor } from "~/utils/textProps";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  ...sizeProps,
  color: {
    type: colorProps.color.type as PropType<ColorType>,
    default: null,
  },
});

const icon = computed(() => {
  if (props.name.startsWith("img:")) {
    return {
      type: "img",
      name: `${props.name.substring(4)}`,
    };
  } else {
    return {
      type: "material",
      name: props.name,
    };
  }
});

const iconSize = textSize(props.size);
const iconColor = textColor(props.color);
</script>

<template>
  <span
    :style="{
      minWidth: iconSize,
      width: iconSize,
      height: iconSize,
      fontSize: iconSize,
    }"
    v-if="icon.type === 'material'"
    :class="['material-icons', iconColor]"
  >
    {{ props.name }}
  </span>
  <img
    v-else
    :src="icon.name"
    :style="{ minWidth: iconSize, width: iconSize, height: iconSize }"
  />
</template>
