<template>
  <page>
    <template v-slot:header>
      <page-header
        :showBack="true"
        title="Отчет"
      />
    </template>
    <template v-slot:body>
      <apex-chart
        width="100%"
        type="bar"
        :options="options"
        :series="series"
      ></apex-chart>
    </template>
  </page>
</template>

<script>
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';

export default {
  name: 'ChartPage',
  components: {
    Page,
    PageHeader,
  },
  data() {
    return {
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }],
    };
  },
};
</script>

<style module>

</style>
