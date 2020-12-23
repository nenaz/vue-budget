<template>
  <button
    :class="classes"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
const ALLOWED_TYPES = [
  'calc-button',
  'cancel',
  'default',
  'primary',
  'secondary',
  'transparent',
  'transparent-border-color',
];

export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (value) => ALLOWED_TYPES.includes(value),
    },
    disabled: {
      type: Boolean,
    },
    // borderColor: {
    //   default: '',
    //   type: String,
    //   // required: this.type === 'transparent-border',
    // },
    // color: {
    //   default: '',
    //   type: String,
    // },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    },
  },
  computed: {
    classes() {
      return {
        [this.$style['base-button']]: true,
        [this.$style[`${this.type}`]]: this.type,
        [this.$style.disabled]: this.disabled,
      };
    },
    // styles() {
    //   const styles = {};
    //   if (this.borderColor && this.color) {
    //     styles.color = this.color;
    //     styles.border = `1px solid ${this.borderColor}`;
    //   }
    //   return {
    //     ...styles,
    //   };
    // },
  },
};
</script>

<style lang="scss" module>
  .base-button {
    font-family: Source Sans Pro;
    margin: 10px auto;
    border: 1px solid transparent;
    border-radius: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: $APPLE;
    width: 100%;
    height: 40px;
    outline: none;

    &.primary {
      background: $APPLE;
      color: $WHITE;
    }

    &.transparent, &.transparent-border {
      background: transparent;
      color: $APPLE;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      font-family: Squad;
    }

    &.transparent-border {
      color: $WHITE;
      border: 1px solid $WHITE;
    }

    &.transparent-border-color {
      background: $WHITE;
      color: $APPLE;
      border: 1px solid $APPLE;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
    }

    &.default {
      background: $WHITE;
      color: $APPLE;
    }

    &.calc-button {
      background-color: $APPLE;
      border-radius: 0px 0px 8px 8px;
      margin-bottom: 0;
      height: 72px;
      color: white;
    }

    &.disabled {
      background-color: rgba(128,128,128,.35);
    }

    &.transparent {
      &.disabled {
        background-color: rgba(128, 128, 128, 0.05);
        color: rgba(128, 128, 128, 0.35);
      }
    }

    &.cancel {
      background-color: $RADICAL_RED;
      color: white;
    }
  }
</style>
