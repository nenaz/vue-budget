<template>
  <div v-click-outside="close">
    <div :class="$style.input"
      @click="open"
    >
      <base-input
        @input="onInput"
        :maxlength=255
        v-bind="$props"
        :title="title"
        ref="input"
        @focus="onFocus"
      />
    </div>
    <div
      :class="$style.suggestion"
      v-show="suggestions.length && show"
      :style="suggestionListWidth"
    >
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        :class="addressClasses(suggestion)"
        @click="select(suggestion)"
      >
        <span :class="$style.text">
          {{ suggestion.value }}
        </span>
        <span
          v-if="showSecondLine"
          :class="$style['sub-text']"
          :style="secondLineStyle"
        >
          {{ secondLineText(suggestion) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import get from 'lodash.get';
import { BaseInput } from '@/components/inputs';
import { promptRequest } from '@/utils/dadata';

export default {
  name: 'SuggestionInput',
  components: {
    BaseInput,
  },
  directives: {
    ClickOutside,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    url: {
      type: String,
      default: 'address',
    },
    showSecondLine: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    secondLineDataPath: {
      type: String,
      default: 'data.name.full',
    },
  },
  data() {
    return {
      show: false,
      suggestions: [],
    };
  },
  computed: {
    suggestionListWidth() {
      const width = window.screen.availWidth;
      const pagePadding = 32;
      const suggestionPadding = 32;

      return {
        width: `calc(${width}px - ${pagePadding}px - ${suggestionPadding}px)`,
      };
    },
    suggestionTextWidth() {
      const suggestionPadding = 32;

      return {
        width: `calc(100% - ${suggestionPadding}px)`,
      };
    },
    secondLineStyle() {
      return {
        width: `${this.suggestionListWidth}px - 16px - 20px`,
      };
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    onInput(value) {
      this.requestDate(value);
    },
    onFocus(value) {
      this.requestDate(value);
    },
    requestDate(value) {
      if (!value) {
        this.suggestions = [];
        this.$emit('select', []);
      } else {
        // отправить запрос в Dadata
        promptRequest({
          url: this.url,
          query: value,
        })
          .then((result) => {
            this.suggestions = result.data.suggestions || [];
          });
      }
    },
    select(suggestion) {
      this.close();
      this.$emit('select', suggestion);
    },
    addressClasses(suggestion) {
      return {
        [this.$style.address]: true,
        [this.$style.active]: suggestion.value === this.$props.value,
        [this.$style.multyline]: this.showSecondLine,
      };
    },
    secondLineText(suggestion) {
      return get(suggestion, this.secondLineDataPath, '');
    },
  },
};
</script>

<style lang="scss" module>
  .suggestion {
    border: 2px solid $APPLE;
    box-sizing: border-box;
    filter: drop-shadow(0px 16px 48px rgba(0, 0, 0, 0.16));
    border-radius: 12px;
    background: $WHITE;
    padding: 5px 8px;
    position: absolute;
    z-index: 999999;
    max-height: 192px;
    overflow: scroll;
  }

  .address {
    padding: 7px 12px 9px 8px;
    height: 48px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .text, .sub-text {
      text-align: left;
      display: inline-block;
      height: 20px;
      display: flex;
      align-items: center;
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
    }

    .text {
      color: $WOODSMOKE;
    }

    .sub-text {
      color: $SILVER_CHALICE;
      overflow: hidden;
      height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }

    &.active {
      background-color: $ALABASTER;
      border-radius: 8px;
    }

    &.multyline {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
</style>
