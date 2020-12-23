<template>
  <base-input
    type="tel"
    v-bind="$props"
    @input="onInput"
    @change="onChange"
    :mask="'+7(###)-###-##-##'"
  />
</template>

<script>
import { BaseInput } from '@/components/inputs';

export default {
  name: 'PhoneInput',
  components: {
    BaseInput,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', value);
    },
    onChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style scopped lang="scss">

</style>
