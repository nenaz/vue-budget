<template>
  <div :class="$style['credit-block']">
    <div :class="$style.credit">
      <div :class="$style.top">
        <span :class="$style.amount">{{ amountWithFormat }}</span>
        <span :class="$style.date">{{ startDateWithFormat }}</span>
      </div>
      <div :class="$style.bottom">
        <div :class="$style['credit-info-inprogress']" v-if="inProgress">
          <div></div>
          <div :class="$style['left-button']">
            <base-button
              type="primary"
              @click="handleClick"
            >
              Продолжить
            </base-button>
          </div>
          <div :class="$style['right-button']">
            <base-button
              type="cancel"
              @click="handleCancel"
            >
              Отказаться
            </base-button>
          </div>
        </div>
        <div :class="$style['credit-info']" v-else>
          <span :class="$style.title">Оформляется, скоро деньги поступят на карту</span>
          <span :class="$style.info">Обычно это занимает до 30 минут</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';
import { formatDate } from '@/utils/date-utils';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'CurrentTrancheWidget',
  components: {
    BaseButton,
  },
  props: {
    inProgress: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0.00,
    },
    startDate: {
      type: String,
      default: '',
    },
  },
  computed: {
    amountWithFormat() {
      return moneyFormat(this.amount, true);
    },
    startDateWithFormat() {
      return `Кредит от ${formatDate(new Date(this.startDate))}`;
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    handleCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style module lang="scss">
  .credit-block {
    padding: 8px 0;
    background-color: $WHITE;
    border-radius: 8px;
    margin: 8px 0;
  }

  .credit {
    .top {
      padding: 16px;
      border-bottom: 1px solid $GALLERY_CREDIT;
      display: flex;
      flex-direction: rows;
      justify-content: space-between;
      align-items: center;

      .amount {
        font-family: Squad;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.2px;
        color: #979797;
      }

      .date {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.2px;
        color: $APPLE;
      }
    }

    .bottom {
      // display: grid;
      // grid-template-columns: 55% auto;
      padding: 16px 16px 8px;
      align-items: center;

      .credit-info {
        display: flex;
        flex-direction: column;

        .title {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          text-align: left;
          letter-spacing: -0.2px;
        }

        .info {
          font-family: Source Sans Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: -0.2px;
          text-align: left;
          color: $TUNDORA;
        }
      }
    }
  }

  .credit-info-inprogress {
    display: grid;
    grid-template-columns: 20% 40% 40%;
  }
  .left-button {
    padding-right: 7px;
  }
  .right-button {
    padding-left: 7px;
  }
</style>
