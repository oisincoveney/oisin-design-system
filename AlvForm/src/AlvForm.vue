<template>
  <AlvCard
    :type="StyleType.OUTLINE"
    :padding="Sizes.NONE"
    class="tw-bg-transparent tw-border-0"
  >
    <h1 class="tw-px-2 tw-pt-2 tw-text-xl tw-font-semibold" v-if="title">
      {{ title }}
    </h1>
    <div class="tw-p-2 tw-w-full">
      <div
        v-for="section in sections"
        :key="section.title"
        class="tw-gap-1 tw-flex tw-flex-col tw-w-full"
      >
        <h2 class="tw-text-sm tw-font-medium">{{ section.title }}</h2>
        <!-- don't remove the first 'is', for some reason it only works this way -->
        <!-- eslint-disable vue/require-component-is -->
        <component
          :is="getComponent(field).is"
          v-for="field in section.fields"
          :key="field.label"
          v-bind="getComponent(field)"
          class="tw-w-full"
        />
      </div>
    </div>
  </AlvCard>
</template>

<script lang="ts" setup>
import { AlvFormProps, type AlvFormInputType } from "~/AlvForm/types";
import { Sizes } from "~/utils/sizeProps";
import { StyleType } from "~/utils/styleTypes";

defineProps({
  ...AlvFormProps,
});

const getComponent = (componentType: AlvFormInputType) => {
  console.log(componentType);
  return { is: "AlvInput", ...componentType };
};
</script>

<style lang="scss" scoped></style>
