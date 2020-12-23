<template>
  <div :class="$style['payment-schedule']">
    <div
      :class="$style.line"
      v-for="(schedule, key) in schedule"
      :key="key"
    >
      <div>
        <img
          v-if="schedule.status !== 'planned'"
          :src="getImgUrl(schedule.status)"
          :alt="schedule.status"
        />
      </div>
      <span>{{ schedule.payDate }}</span>
      <span />
      <span>{{ scheduleAmountWithFormat(schedule.amount) }}</span>
    </div>
  </div>
</template>

<script>
import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'PaymentSchedule',
  props: {
    schedule: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
  },
  methods: {
    scheduleAmountWithFormat(amount) {
      return moneyFormat(amount, true);
    },
    getImgUrl(status) {
      const images = require.context('../assets', false, /\.svg$/);
      const path = status === 'completed'
        ? 'icon-checked'
        : 'icon-alert';
      return images(`./${path}.svg`);
    },
  },
};
</script>

<style lang="scss" module>
  .payment-schedule {
    margin-top: 17px;
    border-top: 1px solid #F1F1F1;

    .line {
      display: grid;
      grid-template-columns: 36px 70px auto 95px;
      border-bottom: 1px solid #F1F1F1;
      height: 31px;
      align-content: center;
    }
  }
</style>
