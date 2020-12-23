<template>
  <div>
    <div>firstPayDate = {{ calcFirestPayDate }}</div>
    <div>
      <div>monthlyPayment = {{ calcCreditTerm.monthlyPayment }}</div>
      <div>term = {{ calcCreditTerm.term }}</div>
    </div>
  </div>
</template>

<script>
import { firstPayDate } from '@/utils/calculator/by-monthly-payment';
import { calculateTerm } from '@/utils/calculator/by-term';

export default {
  name: 'TestsPage',
  computed: {
    calcFirestPayDate() {
      const result = firstPayDate('30.06.2020', 5);
      return result.format('DD.MM.YYYY');
    },
    calcCreditTerm() {
      const result = calculateTerm(189000, 6, 20000);
      return result;
    },
  },
};
</script>

<style module lang="scss">

</style>
