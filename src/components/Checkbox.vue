<template>
  <div :class="$style.checkbox">
    <input
      type="checkbox"
      :class="$style.input"
      :id="name"
      :name="name"
      :checked="value"
      @input="handleInput"
    >
    <label
      :class="{
        [$style.label]: true,
        [$style[`${this.position}`]]: this.position,
      }"
      :for="name"
    >
      <span :class="$style.text">
        <slot />
      </span>
    </label>
  </div>
</template>

<script>
const ALLOWED_POSITIONS = ['left', 'right'];

export default {
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    position: {
      type: String,
      default: ALLOWED_POSITIONS[0],
      validator: (value) => ALLOWED_POSITIONS.includes(value),
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.checked);
    },
  },
};
</script>

<style lang="scss" module>
  .checkbox {
    position: relative;

    .label {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    .text {
      text-align: left;
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 15px;
      letter-spacing: -0.0008em;
      padding: 6px 20px 0 10px;

      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      /* identical to box height, or 125% */

      letter-spacing: -0.0008em;

      color: rgba(0, 0, 0, 0.54);
    }

    .input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }

    .input+.checkbox {
      display: inline-flex;
      align-items: center;
      user-select: none;
      display: grid;
      grid-template-columns: 40px 1fr;
      align-items: flex-start;
    }

    .input+.right::after,
    .input+.left::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid $SILVER;
      border-radius: 0.25em;
      background-repeat: no-repeat;
      background-position: center center;
      // background-size: 50% 50%;
      border-radius: 4px;
      outline: none;
      background-color: $WHITE;
    }

    .input:checked+.right::after,
    .input:checked+.left::before {
      border-color: $SILVER;
      background-color: $WHITE;
      background-image: url('../assets/icon-checked.svg');
    }

    .input:disabled+.right::after,
    .input:disabled+.left::before {
      background-color: $ATHENS_GRAY;
      background-color: $WHITE;
    }
  }
</style>
