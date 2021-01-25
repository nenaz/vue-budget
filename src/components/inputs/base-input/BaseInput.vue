<template>
  <div :class="$style['base-input']">
    <label
      :class="classes"
    >
      {{ title }}
    </label>
    <input
      ref="input"
      :class="inputClasses"
      :value="value"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="handleBlurCompose"
      :maxlength="maxlength"
      v-mask="mask"
      :type="type"
      :disabled="disabled"
    />
    <div :class="$style.maskIcon">
      <slot name="maskIcon" />
    </div>
    <div
      v-if="error"
      :class="$style.error"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    mask: {
      type: [String, Object],
      default: '',
    },
    maxlength: {
      type: Number,
      default: 40,
    },
    error: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    disabled: Boolean,
  },
  data() {
    return {
      focused: false,
      hasValue: !!this.value || this.value === 0,
    };
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
    onChange(e) {
      this.$emit('change', e.target.value);
    },
    onFocus(e) {
      this.focused = true;
      this.$emit('focus', e.target.value);
    },
    handleBlurCompose(event) {
      this.onBlur(event);
      this.changeHasValue(event);
    },
    onBlur(e) {
      this.focused = false;
      this.$emit('blur', e.target.value);
    },
    changeHasValue(e) {
      this.hasValue = !!e.target.value || e.target.value === 0;
    },
    focus() {
      this.$refs.input.focus();
    },
  },
  computed: {
    classes() {
      return {
        [this.$style.title]: this.title,
        [this.$style.focus]: this.focused,
        [this.$style.hasValue]: this.hasValue,
      };
    },
    inputClasses() {
      return {
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled,
      };
    },
  },
  updated() {
    this.hasValue = !!this.value || this.value === 0;
  },
};
</script>

<style lang="scss" module>
  .base-input {
    position: relative;
    margin-top: 22px;
    height: 64px;

    .title {
      pointer-events: none;
      position: absolute;
      top: 8px;
      left: 16px;
      z-index: 99999;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: $GRAY;
      transition: all .2s cubic-bezier(.4, 0, .2, 1);

    }

    .focus, .hasValue {
      transform: translateY(-30px);
      font-size: 12px;
      line-height: 20px;
      left: 2px;
    }

    .maskIcon {
      position: absolute;
      top: 12px;
      left: calc(100% - 25px);
    }

    .input {
      text-align: left;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      letter-spacing: -0.41px;
      height: 40px;
      padding: 10px 16px;
      position: relative;
      background: $WHITE;
      border: 1px solid $SILVER;
      border-radius: 8px;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: $BLACK;
      // &::-webkit-outer-spin-button,
      // &::-webkit-inner-spin-button {
      //   -webkit-appearance: none;
      //   margin: 0;
      // }

      &:focus {
        outline: none;
        border-color: $APPLE;
      }
    }

    .error {
      font-size: 12px;
      line-height: 20px;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      color: $GRAY;
      text-align: left;
      color: $RED;
    }

    .disabled {
      background-color: rgba(128, 128, 128, 0.05);
    }
  }
</style>
