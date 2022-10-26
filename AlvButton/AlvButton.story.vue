<script lang="ts" setup>
import { ColorType } from "../utils/colorTypes";
import { Sizes } from "../utils/sizeProps";
import AlvButton from "./src/AlvButton.vue";
import {styleTypeProps, StyleType} from "~/utils/styleTypes";
</script>

<template>
  <Story title="AlvButton" :layout="{ type: 'grid', width: 300 }">
    <template v-for="btn in ColorType">
      <template v-for="size in Sizes">
        <Variant :title="`${btn}-${size}`">
          <AlvButton :size="size" :type="btn"> Click me </AlvButton>
        </Variant>
      </template>
      <template v-for="size in Sizes">
        <Variant :title="`${btn}-outline`">
          <AlvButton :color="btn" :type="StyleType.OUTLINE" :size="size"> Click me </AlvButton>
        </Variant>
      </template>
    </template>
  </Story>
</template>
