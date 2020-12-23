<template>
  <div :class="$style['body-content']">
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
  },
};
</script>

<style lang="scss" module>
  .body-content {
    background: $WHITE;
    backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    padding: 23px 16px 15px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }
</style>
