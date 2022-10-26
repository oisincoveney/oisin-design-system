<template>
  <div class="AlvTabsContainer">
    <div class="AlvTabs" v-for="(tab, index) in tabs" :key="tab.name">
      <AlvButton
        :label="tab.name"
        @click="onTabSelect(index)"
        :type="type"
        :color="color"
        :size="size"
      />
      <div v-if="index === selectedTabIndex" class="AlvTabsLineIndicator" />
    </div>
  </div>
</template>

<script lang="ts">
export interface TabInterface {
  name: string;
  icon?: string;
}

export default {
  name: "AlvTabs",
};
</script>

<script setup lang="ts">
import { StyleType, styleTypeProps } from "~/utils/styleTypes";
import AlvButton from "~/AlvButton/src/AlvButton.vue";
import { nextTick, type PropType, ref } from "vue";
import { props as colorProps } from "~/utils/colorProps";
import { sizeProps } from "~/utils/sizeProps";

const props = defineProps({
  tabs: {
    type: Array as PropType<TabInterface[]>,
    required: true,
  },
  tab: {
    type: Object as PropType<TabInterface>,
    required: true,
  },
  ...colorProps,
  ...sizeProps,
  ...styleTypeProps,
});

const emit = defineEmits(["update:tab"]);

const selectedTabIndex = ref(0);
const onTabSelect = (index: number) => {
  nextTick(() => {
    selectedTabIndex.value = index;
  });
  emit("update:tab", props.tabs[index]);
};
</script>

<style lang="scss" scoped>
.AlvTabs {
  @apply tw-flex tw-flex-col tw-gap-px;
}

.AlvTabsContainer {
  @apply tw-flex tw-flex-row tw-gap-px;
}

.AlvTabsLineIndicator {
  @apply tw-w-full tw-border-t-2 tw-border-gray-300;
}
</style>
