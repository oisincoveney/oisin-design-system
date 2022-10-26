<template>
  <div class="AlvButtonGroupContainer">
    <div
      class="AlvButtonGroup"
      v-for="(btn, index) in buttons"
      :key="btn.label"
    >
      <AlvButton
        v-bind="{
          ...btn,
          color: btn.color || color,
          size: btn.size || size,
          type: selectedIndex !== index ? StyleType.OUTLINE : btn.type || type,
        }"
        @click="onClick(index)"
        :class="[
          'tw-rounded-none',
          {
            'tw-border-r-0': index !== buttons.length - 1,
            'tw-rounded-l': index === 0,
            'tw-rounded-r': index === buttons.length - 1,
          },
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AlvButtonGroup",
};
</script>

<script setup lang="ts">
import AlvButton from "~/AlvButton/src/AlvButton.vue";
import { styleTypeProps } from "~/utils/styleTypes";
import { type PropType, ref } from "vue";
import { props as colorProps } from "~/utils/colorProps";
import { sizeProps } from "~/utils/sizeProps";
import { StyleType } from "~/utils/styleTypes";

const props = defineProps({
  buttons: {
    type: Array as PropType<typeof AlvButton.props[]>,
    required: true,
  },
  ...colorProps,
  ...sizeProps,
  ...styleTypeProps,
});

const selectedIndex = ref(0);

const emit = defineEmits(["click"]);
const onClick = (index: number) => {
  selectedIndex.value = index;
  emit("click", props.buttons[index]);
};
</script>

<style lang="scss" scoped>
.AlvButtonGroupContainer {
  @apply tw-flex tw-flex-row tw-my-1;
}
.AlvButtonGroup {
  @apply tw-flex tw-flex-row;
}
</style>
