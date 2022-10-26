<template>
  <div class="AlvListContainer">
    <div
      class="AlvList"
      v-for="(item, index) in items"
      :key="`${getLabel(item)}-${index}`"
    >
      <AlvButton
        :label="getLabel(item)"
        @click="onSelect(index)"
        :type="StyleType.FLAT"
        :color="color"
        :size="size"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StyleType, styleTypeProps } from '~/utils/styleTypes';
import AlvButton from '~/AlvButton/src/AlvButton.vue';
import { nextTick, type PropType, ref } from 'vue';
import { props as colorProps } from '~/utils/colorProps';
import { sizeProps } from '~/utils/sizeProps';
import * as _ from 'lodash';

const props = defineProps({
  items: {
    type: Array as PropType<unknown[]>,
    required: true,
  },
  objectKey: {
    type: String as PropType<string>,
    required: false,
    default: null,
  },
  modelValue: {
    type: [Object, String, Number, Boolean, Symbol] as PropType<unknown>,
    required: false,
    default: null,
  },
  ...colorProps,
  ...sizeProps,
  ...styleTypeProps,
});
const emit = defineEmits(['update:modelValue']);

const selectedTabIndex = ref(0);
const onSelect = (index: number) => {
  nextTick(() => {
    selectedTabIndex.value = index;
  });
  emit('update:modelValue', props.items[index]);
};

const getLabel = (item: unknown) => {
  return props.objectKey ? _.get(item, props.objectKey) : item;
};
</script>

<style lang="scss">
.AlvListContainer {
  @apply tw-flex tw-flex-row tw-gap-px;
}

.AlvList {
  @apply tw-flex tw-flex-col tw-gap-px;
}
</style>
