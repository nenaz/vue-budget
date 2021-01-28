<template>
  <div :class="$style.title">
    <span :class="$style.text" @click="handleTitleCLick">
      {{ text }}
    </span>
    <span v-if="subText" :key="subText" :class="$style['sub-text']">
      {{ subText }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'PageBodyContentTitle',
  props: {
    text: {
      type: String,
      default: '',
    },
    subText: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleTitleCLick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" module>
  .title {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    text-align: left;

    .text {
      font-family: Squad;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: $BLACK;
    }

    .sub-text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #494949;
      margin-bottom: 15px;
    }
  }
</style>
