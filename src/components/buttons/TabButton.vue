<template>
  <base-button
    v-bind="$props"
    :class="classes"
    @click="handleClick"
    :index="index"
  >
    <slot />
  </base-button>
</template>

<script>
import BaseButton from '../BaseButton';

export default {
  name: 'TabButton',
  components: {
    BaseButton,
  },
  props: {
    type: {
      type: String,
      default: 'default',
    },
    index: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [this.$style['tab-button']]: true,
        [this.$style.disabled]: this.isDisabled,
      };
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style module lang="scss">
  .tab-button {
    border-radius: 5px;
    height: 30px;
    margin: 0;
  }
</style>
