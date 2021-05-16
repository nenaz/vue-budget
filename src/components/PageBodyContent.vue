<template>
  <div :class="classes">
    <page-body-content-title
      :text="text"
      :subText="subText"
    />
    <slot />
  </div>
</template>

<script>
import PageBodyContentTitle from './PageBodyContentTitle';

export default {
  name: 'PageBodyContent',
  components: {
    PageBodyContentTitle,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    subText: {
      type: String,
      default: '',
    },
    isHeight100: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classes() {
      return {
        [this.$style['body-content']]: true,
        [this.$style.height100]: this.isHeight100,
      };
    },
  },
};
</script>

<style lang="scss" module>
  .body-content {
    background: $WHITE;
    border-radius: 8px;
    width: 100%;
    padding: 23px 16px 15px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .height100 {
    height: 100%;
  }
</style>
