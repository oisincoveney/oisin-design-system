<template>
  <q-dialog
    :value="opened"
    @hide="$emit('hide')"
    @before-hide="$emit('before-hide')"
    @before-show="$emit('before-show')"
  >
    <q-card :style="{ width: dialogWidth, maxWidth: 'unset' }">
      <q-card-section class="q-px-lg">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ title }}</div>
            <div class="text-subtitle1 text-muted text-italic">
              {{ subtitle }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn
              v-close-popup
              dense
              flat
              icon="close"
              round
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="hasSubHeader" class="q-px-lg q-pt-none">
        <slot name="subHeader" />
      </q-card-section>
      <q-separator />
      <q-card-section
        :class="[noPadding ? 'q-pa-none' : 'q-pa-lg']"
        class="bg-light text-muted"
      >
        <slot name="body" />
      </q-card-section>
      <q-separator v-if="hasFooter" />
      <q-card-section
        v-if="hasFooter"
        class="text-muted q-px-lg q-py-md"
      >
        <slot name="footer" />
      </q-card-section>
      <q-card-section
        v-if="hasButtons"
        :class="{ 'q-pt-lg': noPadding }"
        align="right"
        class="bg-light q-pt-none q-pb-lg q-px-lg"
      >
        <slot name="buttons" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">

import { computed, useSlots } from "vue";

const props = defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "sm",
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
});

const slots = useSlots()

const hasSubHeader = computed(() => !!slots.subHeader);
const hasFooter = computed(() => !!slots.footer);
const hasButtons = computed(() => !!slots.buttons);

const dialogWidth = computed(() => {
  let size = ""
  switch (props.size) {
    case "sm":
      size = "400px";
      break;
    case "md":
      size = "600px";
      break;
    case "lg":
      size = "750px";
      break;
    case "xl":
      size = "80%";
      break;
    default:
      size = "unset";
      break;
  }
  return size
});
</script>