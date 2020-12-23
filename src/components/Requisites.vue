<template>
  <div :class="$style.requisites">
    <div
      :class="$style.requisite"
      v-for="(item , key) in data"
      :key="key"
    >
      <div :class="$style.item">
        <span :class="$style.text">{{ item.name }}</span>
        <span v-if="!item.showValue" :class="$style.value">
          {{ item.maskValue }}
        </span>
        <span v-else :class="$style.value">
          {{ item.value }}
        </span>
      </div>
      <div>
        <span v-if="item.showButton" :class="$style.copy">
          {{ item.buttonText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Requisites',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" module>
  .requisites {
    margin: 16px 0;

    .requisite {
      border-radius: 8px;
      background-color: $WHITE;
      height: 64px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: 50% 50%;
      align-items: center;
      padding: 13px 16px;
      margin: 8px 0;

      .item {
        display: flex;
        flex-direction: column;

        .text {
          font-family: Squad;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          display: flex;
          align-items: center;
          letter-spacing: -0.2px;
          color: $DUSTY_GRAY;
          margin-bottom: 7px;
        }

        .value {
          font-family: Squad;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 16px;
          display: flex;
          align-items: center;
          letter-spacing: -0.2px;
          color: $BLACK;
        }
      }

      .copy {
        font-family: Squad;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
        display: inline-block;
        width: 100%;
        align-items: center;
        letter-spacing: -0.2px;
        color: $APPLE;
        text-align: right;
      }
    }
  }
</style>
