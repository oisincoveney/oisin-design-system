<template>
  <img
    v-if="attrs && !name"
    :src="img"
    :alt="attrs.alt as string"
    class="tw-h-8 tw-w-8 tw-overflow-hidden tw-rounded-full"
  />
  <div v-else class="AlvAvatar">
    {{ name.substring(0, 2).toUpperCase() }}
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";

const attrs = useAttrs();
defineProps({
  name: {
    type: String,
    required: false,
    default: null,
  },
});

const img = computed(() => {
  console.log(attrs.src);

  return attrs.src as string;
});
</script>

<style lang="scss">
.AlvAvatar {
  @apply tw-h-8 tw-w-8 tw-overflow-hidden tw-border tw-border-gray-300 tw-rounded-full tw-grid tw-place-items-center tw-bg-alvin-purple-400 tw-text-white tw-text-sm tw-font-medium;
}
</style>
