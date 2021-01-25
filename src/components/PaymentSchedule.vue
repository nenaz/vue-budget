<template>
  <div :class="$style['payment-schedule']">
    <div
      :class="$style.line"
      v-for="operation in currentOperations"
      :key="operation._id"
    >
      <div>
        <img
          v-if="operation.status !== 'planned'"
          :src="getImgUrl(operation.status)"
          :alt="operation.status"
        />
      </div>
      <span :class="$style['operation-name']">{{ operation.category.title }}</span>
      <!-- <span /> -->
      <span>{{ scheduleAmountWithFormat(operation.amount) }}</span>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
// import { mapFields } from 'vuex-map-fields';
import moneyFormat from '@/utils/money-formatter';

export default {
  name: 'PaymentSchedule',
  props: {
    // schedule: {
    //   type: Array,
    //   default: () => [],
    // },
    currentOperations: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // ...mapFields({
    //   operations: 'operations',
    // }),
  //   ...mapGetters([
  //     '',
  //   ]),
    // currentOperations() {
    //   console.log('this.$store.getters.getOperations', this.$store.state.operations);
    //   return this.$store.state.operations;
    // },
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
      grid-template-columns: 36px auto 95px;
      border-bottom: 1px solid #F1F1F1;
      height: 31px;
      align-content: center;
    }
  }

  .operation-name {
    text-align: left;
  }
</style>
