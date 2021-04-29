<template>
  <!-- <base-input
    type="tel"
    v-bind="$props"
    @input="onInput"
    @change="onChange"
    :disabled="disabled"
  >
    <template v-slot:maskIcon>
      ₽
    </template>
  </base-input> -->
  <el-input
    placeholder="Please input"
    v-model="input"
  >
    <template v-slot:maskIcon>
      ₽
    </template>
  </el-input>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';
// import BaseInput from '../base-input';

export default {
  name: 'MoneyInputEl',
  inheritAttrs: false,
  // components: {
  //   BaseInput,
  // },
  computed: {
    compMonthlyIncome() {
      return this.monthlyIncome;
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    monthlyIncome: {
      type: Number,
    },
    value: {
      type: [String, Number],
      default: '',
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
    disabled: Boolean,
  },
  methods: {
    onInput(value) {
      const inputValue = value.replace(/[A-Z,a-z]|\s/g, '');
      this.$emit('input', moneyFormat(inputValue));
      this.$emit('onInput', inputValue * 1);
    },
    onChange(value) {
      const inputValue = value.replace(/\s/g, '');
      this.$emit('input', moneyFormat(inputValue));
    },
    // onFocus() {
    //   this.focused = true;
    //   this.$emit('focus');
    // },
    // onBlur() {
    //   this.focused = false;
    //   this.$emit('blur');
    // },
  },
};
</script>
