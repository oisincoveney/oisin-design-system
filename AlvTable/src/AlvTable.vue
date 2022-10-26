<template>
  <div
    :class="[
      'a-table',
      { 'tw-border tw-border-gray-300': !borderless },
      { 'tw-h-full': loading },
    ]"
    :style="{
      ...gridStyle,
      gridAutoRows: 'min-content',
    }"
  >
    <template v-if="loading">
      <div
        class="tw-grid tw-justify-center tw-items-center tw-w-full tw-h-full"
      >
        <AlvLoader />
      </div>
    </template>
    <template v-else-if="!loading && (!data || data.length === 0 || !rows)">
      <div
        class="tw-grid tw-justify-center tw-items-center tw-w-full tw-h-full"
      >
        <div class="tw-py-8 tw-text-sm tw-font-medium tw-text-gray-500">
          {{ noDataMessage }}
        </div>
      </div>
    </template>
    <template v-else>
      <template v-for="(col, colIndex) in columns" :key="col.key">
        <div
          :class="[
            'a-table--header',
            headerClass ? headerClass : '',
            {
              'tw-justify-start': col.align === 'left',
              'tw-justify-center': col.align === 'center',
              'tw-justify-end': col.align === 'right',
              'hover:tw-bg-gray-200 tw-transition-all tw-cursor-pointer':
                !!col.sort,
            },
          ]"
          @click="onHeaderClick(colIndex, col)"
        >
          {{ col.label }}
          <AlvIcon
            v-if="col.sortOrder && col.sortOrder.order !== null"
            :name="
              col.sortOrder.order === SortOrder.Desc
                ? 'keyboard_arrow_down'
                : 'keyboard_arrow_up'
            "
          />
        </div>
      </template>
      <template v-for="(row, rowIndex) in rows" :key="`${row.key}-${rowIndex}`">
        <template
          v-for="(
            { key, value, slotName, align, data: rowData }, colIndex
          ) in row"
          :key="`${key}-${rowIndex}-${colIndex}`"
        >
          <div
            :class="[
              rowIndex % 2 === 0 &&
                hoveredRow !== rowIndex &&
                'tw-bg-primary-50 tw-bg-opacity-10',
              rowIndex !== 0 && '',
              'tw-flex tw-flex-row tw-items-center tw-px-2 tw-py-1 tw-transition-all tw-cursor-pointer',
              rowClass ? rowClass : '',
              hoveredRow === rowIndex && 'tw-bg-gray-600 tw-bg-opacity-20',
              {
                'tw-justify-start': align === 'left',
                'tw-justify-center': align === 'center',
                'tw-justify-end': align === 'right',
              },
            ]"
            @click="
              $emit('click:cell', {
                row: rowData,
                column: columns[colIndex],
                rowIndex,
                columnIndex: colIndex,
              })
            "
            @mouseenter="hoveredRow = rowIndex"
            @mouseleave="hoveredRow = -1"
          >
            <slot
              :cell="value"
              :data="rowData"
              :name="slotName || key"
              :row="getRowData(row)"
              :rowIndex="rowIndex"
              :columnIndex="colIndex"
            >
              {{ value }}
            </slot>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType, ref } from "vue";
import * as _ from "lodash"
const get = _.get
const set = _.set
const capitalize = _.capitalize
import { SortOrder } from "src/api/gen/openapi-client";
import type { SortInterface } from "@/util/search/sort-interface";

export interface ColumnInterface {
  key: string;
  slotName?: string;
  label: string;
  width?: string;
  capitalize?: string;
  align?: "left" | "center" | "right";
  format?: Function;
  sort?: () => unknown;
  sortOrder?: SortInterface;
}

export default defineComponent({
  name: "AlvTable",
  components: {},
  props: {
    columns: {
      type: Array as PropType<ColumnInterface[]>,
      required: true,
    },
    data: {
      type: [Array, null, undefined] as PropType<unknown[] | null | undefined>,
      default: () => [],
    },
    sortValue: {
      type: Object as PropType<SortInterface | null>,
      default: null,
    },
    headerClass: {
      type: String as PropType<string | null>,
      default: null,
    },
    rowClass: {
      type: String as PropType<string | null>,
      default: null,
    },
    borderless: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    noDataMessage: {
      type: String as PropType<string>,
      default: "No data found",
    },
  },
  emits: ["click:cell", "click:header"],
  setup(props, { emit }) {
    const gridStyle = computed(() => {
      return {
        display: "grid",
        gridTemplateColumns:
          props.loading || props.data?.length === 0
            ? "auto"
            : props.columns
                .map((col) => (col.width ? col.width : "auto"))
                .join(" "),
      };
    });

    const rows = computed(() =>
      props.data?.map((e: unknown) =>
        props.columns.map((c) => {
          const keyData = get(e as Record<string, string>, c.key);
          const capitalized = c.capitalize ? capitalize(keyData) : keyData;

          return {
            key: c.key,
            align: c.align,
            slotName: c.slotName,
            value: c.format ? c.format(capitalized as never) : capitalized,
            data: e,
            sort: c.sort,
          };
        })
      )
    );

    const getRowData = (row: { key: string; value: unknown }[]) => {
      return row.reduce((acc: Record<string, unknown>, curr) => {
        set(acc, curr.key, curr.value);
        return acc;
      }, {});
    };

    const hoveredRow = ref(-1);

    const onHeaderClick = (index: number, col: ColumnInterface) => {
      emit("click:header", {
        index,
        column: col,
      });
    };

    return {
      onHeaderClick,
      rows,
      gridStyle,
      getRowData,
      hoveredRow,
      SortOrder,
    };
  },
});
</script>

<style lang="scss">
.a-table {
  @apply tw-rounded tw-font-normal tw-text-xs tw-box-border;

  &--header {
    @apply tw-text-12px tw-font-semibold tw-whitespace-nowrap;
    @apply tw-flex tw-flex-row tw-items-center;
    @apply tw-sticky tw-top-0 tw-z-auto;
    @apply tw-py-2 tw-px-2;
    @apply tw-box-border tw-border-b tw-border-gray-300 tw-bg-white tw-rounded-t;
  }
}
</style>
