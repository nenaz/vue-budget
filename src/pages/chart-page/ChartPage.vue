<template>
  <page noPadding>
    <template v-slot:header>
      <page-header
        :showBack="true"
        title="Отчет"
      />
    </template>
    <template v-slot:body>
      <div :style="{
        backgroundColor: 'rgba(50,32,78,.5)',
      }">
        <apex-chart
          height="800"
          type="donut"
          :options="{
            dataLabels: {
              enabled: true,
            },
            legend: {
              show: true,
              position: 'bottom',
              labels: {
                colors: 'white',
              },
            },
            labels: getOperationsForPeriod.names,
          }"
          :series="getOperationsForPeriod.data"
        ></apex-chart>
      </div>
      <!-- <div>
        <apex-chart
          type="bar"
          height="350"
          :options="chartOptionsForStackedCol100"
          :series="seriesForStackedCol100"
        ></apex-chart>
      </div> -->
    </template>
  </page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      // options: {
      //   chart: {
      //     id: 'vuechart-example',
      //   },
      //   xaxis: {
      //     // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      //     categories: this.getOperationsForPeriod?.names || [],
      //   },
      // },
      // series: [{
      //   name: 'series-1',
      //   // data: [30, 40, 45, 50, 49, 60, 70, 91],
      //   data: this.getOperationsForPeriod?.data || [],
      // }],
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ['1', '2', '3', '4', '5'],
        // chart: {
        //   type: 'donut',
        // },
        // responsive: [{
        //   // breakpoint: 480,
        //   options: {
        //     // chart: {
        //     //   width: 200,
        //     // },
        //     legend: {
        //       position: 'top',
        //       show: true,
        //       showForSingleSeries: true,
        //       showForNullSeries: true,
        //     },
        //   },
        // }],
      },
      seriesForStackedCol100: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43, 21, 49],
      }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27, 33, 12],
      }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      }],
      chartOptionsForStackedCol100: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        }],
        xaxis: {
          categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
            '2012 Q3', '2012 Q4',
          ],
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: 'right',
          offsetX: 0,
          offsetY: 50,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getOperationsForPeriod: 'getOperationsForPeriod',
    }),
  },
  async mounted() {
    await this.fetchOperationsForPeriod();
  },
  methods: {
    ...mapActions([
      'fetchOperationsForPeriod',
    ]),
    getTemp() {
      const chartOptions = {
        options: {
          chart: {
            id: 'vuechart-example',
          },
          xaxis: {
            // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            categories: this.getOperationsForPeriod.names,
          },
        },
        series: [{
          name: 'series-1',
          // data: [30, 40, 45, 50, 49, 60, 70, 91],
          data: this.getOperationsForPeriod.data,
        }],
      };
      return chartOptions;
    },
  },
};
</script>

<style module>

</style>
