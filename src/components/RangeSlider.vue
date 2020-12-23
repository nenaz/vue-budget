<template>
  <div :class="classes">
    <input
      type="range"
      :min="minValue"
      :max="maxValue"
      :value="currentValue"
      class="slider"
      :step="step"
      id="myRange"
      @input="onInput"
      ref="input"
      v-bind="$attrs"
      :disabled="disabled"
    />
  </div>
</template>

<script>

export default {
  name: 'RangeSlider',
  props: {
    currentValue: {
      type: [String, Number],
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1000,
    },
    isFormat: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return this.disabled
        ? 'slidecontainer disabled'
        : 'slidecontainer';
    },
  },
  methods: {
    onChange() {},
    onInput(e) {
      const inputValue = (e.target.value).replace(/\s/g, '');
      this.$emit('onInput', Number(inputValue));
    },
  },
};
</script>

<style scoped lang="scss">
  .slidecontainer {
    margin: 23px auto;

    .slider {
      -webkit-appearance: none;  /* Override default CSS styles */
      appearance: none;
      width: 100%; /* Full-width */
      height: 8px; /* Specified height */
      background: #52AE30; /* Grey background */
      outline: none; /* Remove outline */
      -webkit-transition: .2s; /* 0.2 seconds transition on hover */
      transition: opacity .2s;
      border-radius: 16px;
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      cursor: pointer;
      background: blue;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.25);
    }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none; /* Override default look */
      appearance: none;
      width: 25px; /* Set a specific slider handle width */
      height: 25px; /* Slider handle height */
      background: #4CAF50; /* Green background */
      cursor: pointer; /* Cursor on hover */
    }

    &.disabled {
      .slider {
        background: #EBEBEB;
      }
    }
  }
</style>
