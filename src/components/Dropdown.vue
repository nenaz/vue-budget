<template>
  <div>
    <div :class="$style.dropdown">
      <label :class="$style.title">
        {{ title }}
      </label>
      <div @click="handleClick">
        <input
          ref="input"
          :class="$style.input"
          :value="value"
          :placeholder="placeholder"
          disabled
        />
        <div :class="$style.maskIcon">
          <slot />
        </div>
      </div>
    </div>
    <portal to="modals">
      <modal-wrapper
        v-if="showDropList"
        :title="title"
        @closeModal="handleClose"
      >
        <div :class="$style.body">
          <span
            v-for="(item) in data"
            :key="item.uuid"
            :class="$style['modal-data-item']"
            @click="handleSelectItem(item)"
            :value="item.uuid"
          >
            {{ item.title }}
          </span>
        </div>
      </modal-wrapper>
    </portal>
  </div>
</template>

<script>
import ModalWrapper from './ModalWrapper';

export default {
  name: 'DropDown',
  components: {
    ModalWrapper,
  },
  inheritAttrs: false,
  data() {
    return {
      showDropList: false,
      showPortal: false,
    };
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
    placeholder: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.showDropList = true;
    },
    handleClose() {
      this.showDropList = false;
    },
    handleSelectItem(item) {
      this.handleClose();
      this.$emit('select', item);
    },
  },
};
</script>

<style lang="scss" module>
$BLACK_OPACITY_06: rgba($BLACK,.6);

  .dropdown {
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
      top: -19px;
      font-size: 12px;
      line-height: 20px;
      left: 2px;
    }

    .maskIcon {
      position: absolute;
      top: 12px;
      left: calc(100% - 25px);
      transform: rotate(-90deg);
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
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 30px;

      &::placeholder {
        color: $BLACK;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .body {
    min-height: 50vh;
    overflow: scroll;
    width: 100%;
    background-color: $WHITE;
    height: 100%;
    height: calc(100% - 38px);
  }

  .modal-data-item {
    height: 48px;
    display: flex;
    align-items: center;
    margin: 5px 0;
    color: $APPLE;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 48px;
    display: inline-block;
    width: 100%;
    text-align: left;
  }
</style>
