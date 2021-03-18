<template>
  <div :class="classes">
    <page-body-content-title
      :text="text"
      :subText="subText"
      @click="handleTitleClick"
    />
    <div :class="animationClasses">
      <slot />
    </div>
  </div>
</template>

<script>
import PageBodyContentTitle from './PageBodyContentTitle';

export default {
  name: 'PageBodyContentRollUp',
  components: {
    PageBodyContentTitle,
  },
  data() {
    return {
      isOpen: false,
    };
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
    isAnimated: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [this.$style['body-content']]: true,
        // [this.$style.animation]: true,
      };
    },
    animationClasses() {
      return {
        [this.$style['body-content-animation']]: this.isAnimated,
        [this.$style.animation]: this.isOpen,
      };
    },
  },
  methods: {
    handleTitleClick() {
      console.log('handleTitleClick');
      const temp = this.isOpen;
      this.isOpen = !temp;
    },
  },
};
</script>

<style lang="scss" module>
  .body-content {
    background: $WHITE;
    // backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    // padding: 8px 16px;
    box-sizing: border-box;
    margin-bottom: 16px;
    // height: auto;
  }

  .body-content-animation {
    height: 8px;
    transition-timing-function: linear;
    transition-duration: .2s;
    transition-property: height;
    overflow: hidden;
  }

  .animation {
    height: 145px;
  }
</style>
