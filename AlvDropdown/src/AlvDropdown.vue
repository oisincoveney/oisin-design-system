<template>
  <div class="tw-block">
    <div
      ref="buttonRef"
      class="tw-z-50"
      @click.stop="
        () => {
          if (!useInput) {
            toggle();
          } else {
            openDropdown = true;
          }
        }
      "
    >
      <slot :close="close" :open="open" name="button">
        <AlvButton
          :size="size"
          :color="color"
          :icon="icon"
          :label="label"
          :type="type"
        />
      </slot>
    </div>
    <Transition name="fade-in">
      <div v-show="openDropdown" ref="dropdownRef" class="tw-fixed tw-z-50">
        <slot :close="close" :open="open" name="default" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { styleTypeProps } from "~/utils/styleTypes";
import { props as colorProps } from "~/utils/colorProps";
import { sizeProps } from "~/utils/sizeProps";
import AlvButtonVue from "~/AlvButton/src/AlvButton.vue";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  type PropType,
  type Ref,
  ref,
} from "vue";
import {
  autoUpdate,
  computePosition,
  offset,
  flip,
  hide,
  shift,
  type Placement,
  type ReferenceElement,
} from "@floating-ui/dom";

export default defineComponent({
  name: "AlvDropdown",
  components: {
    AlvButton: AlvButtonVue,
  },
  props: {
    label: {
      type: String as PropType<string | null>,
      default: null,
    },
    position: {
      type: String as PropType<Placement>,
      default: "bottom-start",
    },
    useInput: {
      type: Boolean,
      default: false,
    },
    dropdownWidth: {
      type: String as PropType<"match button" | "auto">,
      default: "match button",
    },
    ...sizeProps,
    ...colorProps,
    ...styleTypeProps,
  },
  emits: ["open", "close"],
  setup(props) {
    const dropdownRef = ref<HTMLDivElement | null>(null);
    const buttonRef = ref<HTMLDivElement | null>(null);
    const openDropdown = ref(false);
    const topLevelRef: Ref<HTMLDivElement | null> = ref(null);

    const open = () => {
      openDropdown.value = true;
      if (dropdownRef.value) {
        (
          topLevelRef.value as unknown as { replaceChildren: Function }
        )?.replaceChildren(dropdownRef.value);
      }
    };

    const close = () => {
      openDropdown.value = false;
      (
        topLevelRef.value as unknown as { replaceChildren: Function }
      )?.replaceChildren();
    };

    const toggle = () => {
      if (openDropdown.value) {
        close();
      } else {
        open();
      }
    };

    let cleanup: (() => void) | null = null;

    onMounted(() => {
      topLevelRef.value = document.querySelector("#app > #alvDropdownElements");

      if (topLevelRef.value === null) {
        topLevelRef.value = document.createElement("div");
        topLevelRef.value.classList.add("tw-absolute", "tw-top-0", "tw-left-0");
        topLevelRef.value.style.zIndex = "10000";
        topLevelRef.value.id = "alvDropdownElements";
        document.querySelector("#app")?.appendChild(topLevelRef.value);
      }

      cleanup = autoUpdate(
        buttonRef.value as ReferenceElement,
        dropdownRef.value as HTMLDivElement,
        () => {
          if (openDropdown.value && buttonRef.value && dropdownRef.value) {
            void computePosition(buttonRef.value, dropdownRef.value, {
              placement: props.position,
              middleware: [offset(5), shift({ padding: 5 }), flip(), hide()],
            }).then(({ x, y, middlewareData }) => {
              let height = dropdownRef.value?.clientHeight ?? 0;

              if (height + y > window.innerHeight) {
                height = window.innerHeight - y;
              }
              Object.assign(
                dropdownRef.value?.style as unknown as Record<string, string>,
                {
                  display: "block",
                  position: "fixed",
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  top: `${y}px`,
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  left: `${x}px`,
                  width:
                    buttonRef.value && props.dropdownWidth === "match button"
                      ? `${buttonRef.value?.offsetWidth}px`
                      : "auto",
                  height: `${height}px`,
                }
              );

              if (
                middlewareData.hide?.referenceHidden ||
                middlewareData.hide?.escaped
              ) {
                close();
              }
            });
          }
        }
      );
    });

    onUnmounted(() => {
      if (cleanup) {
        cleanup();
      }
    });

    return {
      dropdownRef,
      buttonRef,
      openDropdown,
      open,
      close,
      toggle,
    };
  },
});
</script>
