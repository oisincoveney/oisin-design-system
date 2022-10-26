<template>
  <!-- <q-dialog :value="opened" @hide="$emit('cancel')">
    <q-card
      v-if="loading"
      :class="['q-card--alert', loading && 'q-card--alert__loading']"
    >
      <q-card-section
        class="bg-light q-pa-lg text-muted q-px-lg full-height full-width flex flex-column justify-center items-center gap-1"
      >
        <q-spinner color="primary" size="4rem" />
        <div class="text-h6" style="white-space: nowrap">
          {{ loadingLabel }}
        </div>
      </q-card-section>
    </q-card>
    <q-card v-else class="q-card--alert">
      <q-card-section class="q-px-lg">
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ title }}</div>
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
      <q-separator />
      <q-card-section class="bg-light q-pa-lg text-muted">
        <slot />
      </q-card-section>
      <q-card-section align="right" class="bg-light q-pt-none q-pb-lg q-px-lg">
        <q-btn
          :color="confirmButtonColor"
          :loading="processing"
          unelevated
          @click="$emit('confirm')"
        >
          {{ confirmButtonLabel }}
        </q-btn>
        <q-btn
          :color="cancelButtonColor"
          class="q-ml-sm"
          outline
          unelevated
          @click="$emit('cancel')"
        >
          {{ cancelButtonLabel }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog> -->
  hello
</template>

<script lang="ts">
// export default {
//   name: "AlvAlert",
//   props: {
//     title: {
//       type: String,
//       required: true
//     },
//     opened: {
//       type: Boolean,
//       required: true
//     },
//     confirmButtonLabel: {
//       type: String,
//       required: false,
//       default: "Confirm"
//     },
//     confirmButtonColor: {
//       type: String,
//       required: false,
//       default: "negative"
//     },
//     cancelButtonLabel: {
//       type: String,
//       required: false,
//       default: "Cancel"
//     },
//     cancelButtonColor: {
//       type: String,
//       required: false,
//       default: "primary"
//     },
//     processing: {
//       type: Boolean,
//       required: false,
//       default: false
//     },
//     loadingLabel: {
//       type: String,
//       required: false,
//       default: "Loading..."
//     },
//     loading: {
//       type: Boolean,
//       required: false,
//       default: false
//     }
//   }
// }
</script>
