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
  'fab',
  'speed-dial',
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

    &.fab {
      background-color: #f5f5f5;
      border-radius: 50%;
      height: 56px;
      width: 56px;
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14),
       0 1px 18px 0 rgba(0,0,0,.12);
      transition-duration: .28s;
      transition-property: box-shadow,transform,opacity;
      transition-timing-function: cubic-bezier(.4,0,.2,1);
      position: relative;
      justify-content: center;
      align-items: center;
    }
    &.fab::before {
      background-color: currentColor;
      border-radius: inherit;
      bottom: 0;
      color: inherit;
      content: "";
      left: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      transition: opacity .2s cubic-bezier(.4,0,.6,1);
    }

    &.speed-dial {
      background-color: #f5f5f5;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14),
       0 1px 18px 0 rgba(0,0,0,.12);
    }
  }
</style>
