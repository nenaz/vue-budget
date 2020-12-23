<template>
  <div class="pos-sign-input">
    <label class="pos-sign-input__before-title">
      <slot>{{ title }}</slot>
    </label>
    <base-input
      :value="value"
      v-model="creditAmount"
      type="tel"
    />
    <label class="pos-sign-input__after-title">
      <slot>{{ title }}</slot>
    </label>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';
import BaseInput from '../base-input';

export default {
  name: 'SignInput',
  inheritAttrs: false,
  components: {
    BaseInput,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    mask: {
      type: [String, Object],
      default: '',
    },
    type: {
      type: String,
      default: 'tel',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isFormat: {
      type: Boolean,
      default: true,
    },
    maxlength: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    onInput(e) {
      // console.log('onInput');
      const inputValue = (e.target.value).replace(/\s/g, '');
      if (this.isFormat) {
        this.$emit('input', moneyFormat(inputValue));
      } else {
        this.$emit('input', inputValue);
      }
    },
    onChange(e) {
      // console.log('onChange');
      const inputValue = (e.target.value).replace(/\s/g, '');
      if (this.isFormat) {
        this.$emit('input', moneyFormat(inputValue));
      } else {
        this.$emit('input', inputValue);
      }
    },
    onFocus() {
      this.focused = true;
      this.$emit('focus');
    },
    onBlur() {
      this.focused = false;
      this.$emit('blur');
    },
  },
  computed: {
    test() {
      this.$emit('input', this.value);
      return '';
    },
  },
};
</script>

<style scoped lang="scss">
  .pos-base-input {
    position: relative;

    .title {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.15px;
      color: #4A4A4A;
      padding-bottom: 7px;
      display: flex;
    }

    .maskIcon {
      position: absolute;
      top: 37px;
      left: calc(100% - 25px);
    }

    .pos-input {
      display: inline-flex;
      align-items: center;
      position: relative;
      text-align: left;
      // border: 1px solid $input-border-color;
      box-sizing: border-box;
      // transition: all $transition-duration $transition-timing-function;
      width: 100%;
      font-style: normal;
      font-weight: normal;
      font-size: 17px;
      line-height: 20px;
      display: flex;
      align-items: center;
      letter-spacing: -0.41px;
      color: #000000;
      background: #FFFFFF;
      border-radius: 30px;
      height: 40px;
      padding: 10px 16px;
      border: 0;
      position: relative;

      &:focus {
        outline: none;
      }
    }
  }
</style>
