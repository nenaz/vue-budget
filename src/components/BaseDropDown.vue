<template>
  <div class="pos-base-input">
    <label class="title">
      <slot>{{ title }}</slot>
    </label>
    <div @click="handleClick">
      <input
        ref="input"
        class="pos-input"
        :value="`${value} ${postFix}`"
        v-bind="$attrs"
        :placeholder="placeholder"
        disabled
      />
      <div class="maskIcon">
        <slot name="maskIcon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BaseDropDown',
  inheritAttrs: false,
  data: () => ({
    openModal: false,
    name: 'DropDown',
  }),
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
    placeholder: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
    },
    handleUpdate: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    postFix: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions(['setModalStatus']),
    handleClick() {
      this.setModalStatus({
        openModal: true,
        title: this.title,
        data: this.data,
        handleUpdate: this.handleUpdate,
        name: this.name,
      });
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
      top: 35px;
      left: calc(100% - 25px);
      transform: rotate(180deg);
    }

    .pos-input {
      display: inline-flex;
      align-items: center;
      position: relative;
      text-align: left;
      box-sizing: border-box;
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
      padding: 10px 30px 10px 16px;;
      border: 0;
      position: relative;
      text-overflow: ellipsis;

      &:focus {
        outline: none;
      }
    }
  }
</style>
