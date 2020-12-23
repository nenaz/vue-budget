<template>
  <page
    :grid-config="pageConfig"
    :isGridPage="true"
  >
    <template v-slot:header>
      <page-header />
    </template>
    <template v-slot:body>
      <div :class="$style.block">
        <span :class="$style.title">
          В данный момент предложение “кредитная линия” для вас недоступно
        </span>
        <span :class="$style.text">
          Вы можете ознакомиться подробнее с предложением и узнать как его получить на странице
          описания продукта или получить консультацию в call-центре позвонив по телефону
          указанном ниже
        </span>
        <div :class="$style.button">
          <base-button
            type="primary"
          >
            Узнать о продукте
          </base-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'NoLinePage',
  components: {
    Page,
    PageHeader,
    BaseButton,
  },
  data() {
    return ({
      pageConfig: {
        rowsCount: 2,
        flexibleRow: 2,
      },
    });
  },
};
</script>

<style lang="scss" module>
  .block {
    display: grid;
    grid-template-rows: auto auto 1fr;
    height: 100%;
  }

  .title {
    font-family: Squad;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: $BLACK;
  }

  .text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #4A4A4A;
    padding: 16px 0;
  }

  .button {
    display: flex;
    align-items: flex-end;
  }
</style>
