<template>
  <div :class="$style['virtual-card']">
    <div :class="$style['title-block']">
      <img
        src="@/assets/v-card.svg"
        alt="virtual-card"
      />
    </div>
    <div :class="$style['sub-block']">
      <div :class="$style['block']">
        <span :class="$style['sub-title']">Ежемесячное обслуживание</span>
        <span :class="$style['sub-value']">0.00 ₽</span>
      </div>
      <div :class="$style['block']">
        <span :class="$style['sub-title']">Срок действия</span>
        <span :class="$style['sub-value']">{{ term }} мес</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualCard',
  props: {
    term: {
      type: [String, Number],
    },
  },
};
</script>

<style lang="scss" module>
  .virtual-card {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    letter-spacing: -0.15px;
    color: rgba(0, 0, 0, 0.87);
    background: $WHITE;
    border-radius: 24px;
    box-sizing: border-box;
  }

  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
    margin: 15px 20%;
  }

  .title-block {
    display: flex;
    flex-direction: column;
  }

  .block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .sub-title {
    letter-spacing: -0.24px;
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.87);
  }

  .sub-value {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 32px;
    text-align: right;
    color: rgba(0, 0, 0, 0.87);
  }
</style>
