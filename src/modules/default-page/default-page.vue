<template>
  <page>
    <template v-slot:header>
      <page-header
        :title="title"
        :handleBackButton="goBack"
        :isMenuButtonHide="true"
      />
    </template>
    <template v-slot:body>
      <slot name="page-body" />
      <div class="buttons">
        <base-button
          type="primary"
          @BBclick="goNextStep"
          :isDisabled="isDisabled"
        >
          Продолжить
        </base-button>
        <base-button
          @BBclick="goToMainPage"
        >
          Оформить позднее
        </base-button>
      </div>
    </template>
    <template v-slot:footer>
      <bottom-menu />
    </template>
  </page>
</template>

<script>
import { mapActions } from 'vuex';
// import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import BottomMenu from '@/components/BottomMenu';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'DefaultPage',
  props: {
    title: {
      type: String,
      default: '',
    },
    goBackUrl: {
      type: String,
      default: '',
    },
    homeUrl: {
      type: String,
      default: 'main',
    },
    isResetStateWhenGoHome: {
      type: Boolean,
      default: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // Page,
    PageHeader,
    BottomMenu,
    BaseButton,
  },
  methods: {
    ...mapActions([
      'resetState',
    ]),
    goBack() {
      this.$router.replace(`/${this.goBackUrl}`);
    },
    goNextStep() {
      this.$emit('gonextstep');
    },
    goToMainPage() {
      if (this.isResetStateWhenGoHome) {
        this.resetState();
      }
      this.$router.replace(`/${this.homeUrl}`);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
