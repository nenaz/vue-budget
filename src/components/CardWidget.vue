<template>
  <div :class="$style['card-block']" @click="handleCardClick">
    <div :class="$style['card']">
      <!-- <div v-if="isActiveStatus" :class="$style['card-image']" :key="productData['_id']">
        <span :class="$style['icon-card-background']" />
        <span :class="$style['icon-card-logo']" />
        <span :class="$style['icon-card-number']">{{ productData.name }}</span>
      </div> -->
      <!-- <div v-else :class="$style['card-image']" :key="productData.status">
        <span :class="$style['icon-card-empty-background']" />
      </div> -->
      <div v-if="isActiveStatus" :class="$style['text-block']">
        <span :class="$style.title">{{ productData.name }}</span>
        <span :class="$style.text">
          {{ getFormattedAmount(Number(productData.amount)) }}
        </span>
      </div>
      <div v-else :class="$style['text-block']">
        <!-- <span :class="$style.title"></span> -->
        <span :class="$style.text">
          Добавить счет
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'CardWidget',
  props: {
    title: {
      type: String,
    },
    productData: {
      type: Object,
      default: () => ({}),
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    isActiveStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      number: 5678,
    };
  },
  methods: {
    getFormattedAmount(amount) {
      return moneyFormat(amount, true);
    },
    handleCardClick() {
      console.log('this', this.productData);
      // eslint-disable-next-line no-underscore-dangle
      this.$emit('click', this.productData._id);
    },
  },
};
</script>

<style lang="scss" module>
  .card-block {
    // padding-bottom: 8px;
    margin: 4px;
  }

  .card {
    background: #cdbdde;
    background-image: url('../assets/card-background3.jpg');
    border-radius: 8px;
    height: 88px;
    display: flex;
    flex-direction: row;
    padding: 16px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: cover;
    border: 1px solid #258ee9;
  }

  .text-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    // white-space: nowrap;
    // width: 70%;

    .title {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 18px;
      letter-spacing: -0.2px;
      color: $DOVE_GRAY;
      color: #001740;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      // width: 90%;
    }

    .text {
      font-family: Squad;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.2px;
      color: $BLACK;
      color: white
    }

    .text-empty {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.2px;
      color: #FF6600;
    }
  }

  .card-image {
    position: relative;
    padding-right: 16px;

    .icon-card-background {
      background-image: url('../assets/icon-card-background.svg');
      display: inline-block;
      width: 88px;
      height: 56px;
    }

    .icon-card-empty-background {
      background-image: url('../assets/icon-clock.svg');
      display: inline-block;
      width: 88px;
      height: 56px;
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
      border: 1px solid #ECECEC;
      border-radius: 4px;
    }

    .icon-card-logo {
      background-image: url('../assets/icon-card-logo.svg');
      display: inline-block;
      width: 26px;
      height: 16px;
      position: absolute;
      left: 54px;
      top: 8px;
    }

    .icon-card-number {
      // background-image: url('../assets/icon-card-number.svg');
      display: inline-block;
      font-family: Squad;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      color: $WHITE;
      position: absolute;
      top: 35px;
      left: 54px;
    }
  }
</style>
