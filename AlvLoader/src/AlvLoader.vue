<template>
  <div>
    <div :style="`font-size: ${iconSize}`" :class="iconColor"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AlvLoader",
};
</script>
<script setup lang="ts">
import { props as colorProps } from "../../utils/colorProps";
import { sizeProps } from "../../utils/sizeProps";
import { textSize, textColor } from "../../utils/textProps";

const props = defineProps({
  ...sizeProps,
  ...colorProps,
});

const iconSize = textSize(props.size);
const iconColor = textColor(props.color);
</script>
