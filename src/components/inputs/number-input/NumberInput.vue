<template>
  <base-input
    type="number"
    v-bind="$props"
    @input="onInput"
    @change="onChange"
    :error="error"
    :errorMessage="errorMessage"
  />
</template>

<script>
import BaseInput from '../base-input';

export default {
  name: 'NumberInput',
  inheritAttrs: false,
  components: {
    BaseInput,
  },
  computed: {
    compMonthlyIncome() {
      return this.monthlyIncome;
    },
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    monthlyIncome: {
      type: Number,
    },
    value: {
      type: [String, Number],
      default: '0',
    },
    mask: {
      type: [String, Object],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    isFormat: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 20,
    },
    isReturnNumber: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  // mounted() {
  //   console.log('props.error', this.$props);
  // },
  methods: {
    onInput(value) {
      const inputValue = value.toString().replace(/[A-z]/g, '');
      // console.log('value', value);
      // console.log('inputValue', inputValue);
      this.$emit('input', Number(inputValue || 0));
    },
    onChange(value) {
      this.$emit('change', value);
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
