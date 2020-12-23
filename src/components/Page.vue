<template>
  <div :class="pageClasses" :style="pageStyle">
    <slot name="header" />
    <div :class="bodyClasses">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

const ALLOWED_COLORS = [
  'default',
  'white',
];

export default {
  name: 'Page',
  computed: {
    ...mapFields({
      isModalVisible: 'modal.isModalVisible',
    }),
    pageClasses() {
      return {
        [this.$style.page]: true,
        [this.$style['small-page']]: this.smallPage,
      };
    },
    pageStyle() {
      if (this.isGridPage) {
        const { rowsCount, flexibleRow } = this.gridConfig;
        let str = '';
        for (let i = 0; i < rowsCount; i += 1) {
          str = (i + 1) === flexibleRow
            ? `${str} 1fr `
            : `${str} auto `;
        }
        return {
          display: 'grid',
          'grid-template-rows': str,
        };
      }
      return {};
    },
    bodyClasses() {
      return {
        [this.$style.body]: true,
        [this.$style[`color-${this.bodyColor}`]]: this.bodyColor,
        [this.$style['no-top-bottom-padding']]: this.noTopBottomPadding,
      };
    },
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    smallPage: {
      type: Boolean,
      default: false,
    },
    bodyColor: {
      type: String,
      default: 'default',
      validator: (value) => ALLOWED_COLORS.includes(value),
    },
    isGridPage: {
      type: Boolean,
      default: false,
    },
    gridConfig: {
      type: Object,
      default: () => ({}),
      validator: (prop) => (
        (prop && prop.rowsCount && prop.flexibleRow) || true
      ),
    },
    noTopBottomPadding: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleSelectItem(value) {
      this.$emit('select', value);
    },
  },
};
</script>

<style lang="scss" module>
  .page {
    background: $WILD_SAND;
    height: 100%;
    overflow: hidden;
  }

  .small-page {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .body {
    padding: 16px 16px;
    position: relative;
    height: 100%;
    box-sizing: border-box;

    &.no-top-bottom-padding {
      padding: 0 16px;
    }

    &.color-default {
      background-color: $WILD_SAND;
    }

    &.color-white {
      background-color: $WHITE;
    }
  }
</style>
