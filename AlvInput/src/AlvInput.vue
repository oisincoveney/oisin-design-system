<script lang="ts" setup>
import { ref, type Ref } from "vue";
import type { PropType } from "vue";
import AlvIcon from "~/AlvIcon/src/AlvIcon.vue";
import type {
  AlvFormComponentType,
  AlvFormSectionType,
} from "../../AlvForm/types";
import { Sizes } from "../../utils/sizeProps";

const inputElement: Ref<HTMLInputElement | null> = ref(null);
defineExpose({
  inputElement,
});

defineProps({
  label: { type: String, required: false, default: null },
  type: { type: String as PropType<AlvFormComponentType>, required: true },
  children: {
    type: Array as PropType<AlvFormSectionType[]>,
    default: () => [],
  },
  size: { type: String as PropType<Sizes>, default: Sizes.MD },
  placeholder: { type: String, default: null },
  options: { type: Array, default: () => [] },
  value: { type: Object as PropType<unknown>, default: null },
  width: {
    type: String as PropType<string>,
    default: "100%",
  },
  icon: {
    type: String as PropType<string>,
    default: null,
  },
});
</script>

<template>
  <div class="tw-w-full">
    <label for="alvInput" class="tw-text-xs tw-font-medium tw-text-gray-700">
      {{ label }}
    </label>
    <div class="tw-relative tw-flex tw-flex-col tw-justify-center">
      <AlvIcon
        v-if="icon"
        class="tw-absolute tw-left-2.5 tw--mt-2 tw-text-base tw-text-gray-800"
        :size="size"
        :name="icon"
      ></AlvIcon>
      <template v-if="type === 'checkbox'"> </template>
      <template v-else>
        <input
          id="alvInput"
          v-bind="$attrs"
          autocomplete="off"
          ref="inputElement"
          :class="[
            `alv-input`,
            { [`-${size}`]: !!size },
            {
              [`-icon`]: !!icon,
            },
          ]"
          :style="{ width }"
          placeholder="Enter some text..."
        />
      </template>
    </div>
  </div>
</template>
