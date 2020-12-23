<template>
  <page>
    <template v-slot:header>
      <page-header :showMenu="true" :showBack="true" />
      <div :class="$style['credit-line-text']">
        <span :class="$style['title']">
          Как делать покупки?
        </span>
        <span :class="$style['sub-title']">
          Напоминаем, взятую в рамках лимита сумму можно потратить только на покупку товаров
        </span>
      </div>
    </template>
    <template v-slot:body>
      <div :class="$style['body-content']">
        <div :class="$style['step-text-block']">
          <span :class="$style['step-title']">Оплата с помощью телефна</span>
          <span :class="$style['step-sub-title']">
            Ваш телефон должен должен обладать технологией бесконтактных платежей.
            Для оплаты покупок в обычном магазине вам необходимо привязать виртуальную
             карту к кошельку вашего телефона, используя ее реквизиты. Реквизиты карты
             можно узнать в разделе виртуальная ката. Ознакомиться с технологией
             бесконтактной оплаты можно здесь.
          </span>
        </div>
      </div>
      <div :class="$style['body-content']">
        <div :class="$style['step-text-block']">
          <span :class="$style['step-title']">C помощью реквизитов каты</span>
          <span :class="$style['step-sub-title']">
            В интернет магазинах можно оплачивать покупки используя реквизиты вашей
             виртуальной карты. Чтобы узнать их, перейдите по ссылке ниже, или найдите
             их в разделе виртуальная карта
          </span>
        </div>
      </div>
      <div :class="$style.buttons">
        <base-button
          type="primary"
          :disabled="true"
        >
          Посмотреть реквизиты карты
        </base-button>
      </div>
    </template>
  </page>
</template>

<script>
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'HelpPage',
  components: {
    Page,
    PageHeader,
    BaseButton,
  },
};
</script>

<style lang="scss" module>
  .credit-line-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $WILD_SAND;
    padding: 12px 31px 8px;

    .title {
      font-weight: bold;
      text-align: center;
      color: $BLACK;
      margin: 15px 0 8px;
      display: inline-block;
      text-align: left;
      width: 100%;
      font-family: Source Sans Pro;
      font-style: normal;
      font-size: 21px;
      line-height: 24px;
    }

    .sub-title {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: $TUNDORA_CALC;
      margin-top: 10px;
      display: inline-block;
      text-align: left;
      width: 100%;
    }
  }

  .body-content {
    background: $WHITE;
    backdrop-filter: blur(16px);
    border-radius: 8px;
    width: 100%;
    padding: 23px 16px 15px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }

  .step-text-block {
    display: flex;
    flex-direction: column;
    padding-top: 3px;
    text-align: left;

    .step-title {
      font-family: Squad;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 24px;
      color: $BLACK;
      margin-bottom: 15px;
    }

    .step-sub-title {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: $TUNDORA_CALC;
      margin-bottom: 15px;
    }
  }
</style>
