<template>
  <div :class="$style['fab-wrapper']">
    <base-button
      v-bind="$props"
      :class="classes"
      @click="handleClick"
      type="fab"
    >
      <slot />
    </base-button>
    <!-- <div :class="$style['fab-list']">
      <div>
        <base-button
          v-bind="$props"
          :class="classes"
          @click="handleClick"
          type="speed-dial"
        >
          <slot />
        </base-button>
      </div>
      <div>
        <base-button
          v-bind="$props"
          :class="classes"
          @click="handleClick"
          type="speed-dial"
        >
          <slot />
        </base-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'FloatingActionButton',
  components: {
    BaseButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'fa-button': 'fa-button',
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

<style lang="scss" module>
  // .fa-button {
  //   border-radius: 50%;
  //   background-color: red;
  // }
  // .test {
  //   width: 30px;
  //   height: 30px;
  // }
  .fab-wrapper {
    width: 56px;
    right: 16px;
  }

  .fab-list {
    opacity: 1;
    width: inherit;
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 16px 0;
    position: absolute;
    flex-direction: column-reverse;
    bottom: 100%;
  }
</style>
