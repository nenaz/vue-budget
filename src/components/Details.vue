<template>
  <div :class="$style.details">
    <div :class="$style['sub-block']">
      <div
        :class="$style['block']"
        v-for="(item, key) in details"
        :key="key"
      >
        <span :class="$style['sub-title']">{{ item.title }}</span>
        <span :class="$style['sub-line']" />
        <span :class="$style['sub-value']">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Details1',
  props: {
    details: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" module>
  .details {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    letter-spacing: -0.15px;
    color: rgba(0, 0, 0, 0.87);
    background: #FFFFFF;
    border-radius: 24px;
    box-sizing: border-box;
    margin-top: 16px;
  }

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
    margin: 5px 20%;
  }

  .title-block {
    display: flex;
    flex-direction: column;
  }

  .block {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
  }

  .sub-title {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: rgba(0, 0, 0, 0.54);

    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    /* or 200% */


    color: rgba(0, 0, 0, 0.87);
  }

  .sub-line {
    border-bottom: 1px dashed #E2E2E2;
    margin: 0 2px;
  }

  .sub-value {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 21px;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);

    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 32px;
    /* or 200% */

    text-align: right;

    color: rgba(0, 0, 0, 0.87);
  }
</style>
