<template>
  <div
    v-show="mouseInContainer"
    ref="tooltipElement"
    class="tw-absolute tw-rounded tw-border tw-border-gray-500 tw-bg-white tw-p-2 tw-transition-opacity"
  >
    <slot>
      <div>
        {{ text }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { computePosition, offset, shift } from "@floating-ui/dom";
import {
  defineComponent,
  ref,
  type Ref,
  type PropType,
  onMounted,
  onBeforeUnmount,
} from "vue";

export enum TooltipPositionX {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum TooltipPositionY {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center",
}

export type TooltipPosition = `(${TooltipPositionX}, ${TooltipPositionY})`;

export default defineComponent({
  name: "AlvTooltip",
  props: {
    target: {
      type: String as PropType<string | null>,
      default: null,
    },
    position: {
      type: String as PropType<TooltipPosition>,
      default: "(center, bottom)",
    },
    text: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  emits: [],
  setup(props) {
    const mouseInContainer = ref(false);

    const tooltipStyles = ref({});

    const parentElement: Ref<HTMLDivElement | null> = ref(null);
    const tooltipElement: Ref<HTMLDivElement | null> = ref(null);
    onMounted(() => {
      parentElement.value = tooltipElement.value
        ?.parentElement as HTMLDivElement;
      parentElement.value?.addEventListener("mouseenter", onButtonMouseEnter);
      parentElement.value?.addEventListener("mouseleave", onButtonMouseLeave);
    });

    function onButtonMouseEnter() {
      mouseInContainer.value = true;
      if (parentElement.value && tooltipElement.value) {
        if (tooltipElement.value) {
          Object.assign(tooltipElement.value.style, {
            position: "absolute",
            left: "0",
            top: "0",
            visibility: "hidden",
            opacity: "0",
          });
        }

        document.querySelector("#app")?.appendChild(tooltipElement.value);

        computePosition(parentElement.value, tooltipElement.value, {
          // placement: "bottom", // if we want to add different positions this is where we would handle that
          // middleware: [offset(10), shift({ padding: 5 })],
        }).then(({ x, y }) => {
          if (tooltipElement.value) {
            Object.assign(tooltipElement.value.style, {
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              visibility: "visible",
              opacity: "1",
            });
          }
        });
      }
    }
    function onButtonMouseLeave() {
      if (tooltipElement.value) {
        document.querySelector("#app")?.removeChild(tooltipElement.value);
      }
      mouseInContainer.value = false;
    }

    onBeforeUnmount(() => {
      parentElement.value?.removeEventListener(
        "mouseenter",
        onButtonMouseEnter
      );
      parentElement.value?.removeEventListener(
        "mouseleave",
        onButtonMouseLeave
      );

      if (tooltipElement.value) {
        try {
          document.querySelector("#app")?.removeChild(tooltipElement.value);
        } catch (e) {
          // do nothing
        }
      }

      mouseInContainer.value = false;
    });

    return { mouseInContainer, parentElement, tooltipElement, tooltipStyles };
  },
});
</script>
