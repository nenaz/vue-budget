<template>
  <div :class="$style['wrapper-modal']">
    <div :class="$style.content">
      <div :class="$style.header">
        <span :class="$style.title">
          {{ title }}
        </span>
        <span
          :class="$style.close"
          @click="closeModal"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWrapper',
  props: {
    openModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" module>
  .wrapper-modal {
    position: absolute;
    width: calc(100vw);
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    bottom: 0;
    height: 100vh;
    z-index: 99999999999;
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100vw - 16px);
    margin: 8px;
    background: $GALLERY;
    height: calc(100vh - 16px);
    border-radius: 24px;
    padding: 24px 24px 14px;
    box-sizing: border-box;
    width: 100vw;
    margin: 16px 0 0;
    background: $WHITE;
    height: 100%;
    border-radius: 16px 16px 0 0;
  }

  .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
  }

  .title {
    font-family: Squad;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: $BLACK;
    width: 100%;
    display: inline-block;
    text-align: left;
  }

  .close {
    background-image: url('../assets/icon-close-green.svg');
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: cover;
  }
</style>
