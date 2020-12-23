<template>
  <div>
    <div :class="$style.maskIcon" @click="handleIconClick">
      <img
        src="@/assets/icon-help.svg"
        alt="arrow"
      />
    </div>
    <portal to="modals">
      <modal-wrapper
        v-if="showDropList"
        :title="title"
        @closeModal="handleClose"
      >
        <div :class="$style.body">
          <div :class="$style.text">
            <slot />
          </div>
          <div :class="$style.buttons">
            <base-button
              type="primary"
              @click="handleClose"
            >
              Понятно
            </base-button>
          </div>
        </div>
      </modal-wrapper>
    </portal>
  </div>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'HelpIcon',
  components: {
    ModalWrapper,
    BaseButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showDropList: false,
    };
  },
  methods: {
    handleClose() {
      this.showDropList = false;
    },
    handleIconClick() {
      this.showDropList = true;
    },
  },
};
</script>

<style lang="scss" module>
  .body {
    display: grid;
    grid-template-rows: auto 1fr;
    height: calc(100% - 64px);
  }

  .buttons {
    display: flex;
    align-items: flex-end;
  }

  .maskIcon {
    font-size: 12px;
  }

  .text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    color: #4A4A4A;
  }
</style>
