<template>
  <page
    :grid-config="pageConfig"
    :isGridPage="true"
  >
    <template v-slot:header>
      <page-auth-header />
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <span :class="$style['body-title']">
          Необходимо
          <br />
          войти
        </span>
        <div :class="$style['input-block']">
          <!-- <span :class="$style['body-text']">
            Введите логин и пароль от интернет банка ОТП
          </span> -->
          <base-input
            v-model="login"
            title="Логин"
          />
          <base-input
            title="Пароль"
            v-model="password"
            type="password"
          />
        </div>
        <div :class="$style.consent">
          <checkbox
            position="left"
            @input="handleChangeConsent"
            v-model="consent"
            name="auth-consent"
          >
            Я даю согласие на обработку Банком моих персональных
              данных в целях рассмотрения настоящего сообщения
          </checkbox>
        </div>
        <div :class="$style.buttons">
          <base-button
            type="primary"
            :disabled="!isPageValid"
            @click="authProcedureStart"
          >
            Продолжить
          </base-button>
        </div>
      </div>
    </template>
  </page>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { required } from 'vuelidate/lib/validators';
import { BaseInput } from '@/components/inputs';
import Checkbox from '@/components/Checkbox';
import BaseButton from '@/components/BaseButton';
import Page from '@/components/Page';
import PageAuthHeader from '@/components/PageAuthHeader';

export default {
  name: 'AuthPage',
  components: {
    BaseButton,
    BaseInput,
    Checkbox,
    Page,
    PageAuthHeader,
  },
  data() {
    return {
      pageConfig: {
        rowsCount: 2,
        flexibleRow: 2,
      },
    };
  },
  computed: {
    ...mapFields({
      login: 'auth.login',
      password: 'auth.password',
      consent: 'auth.consent',
      error: 'error.statusType',
    }),
    isPageValid() {
      return this.$v.login.required
        && this.$v.password.required
        && this.consent;
    },
    bodyStyle() {
      return {
        height: `${window.screen.availHeight - 185}px`,
      };
    },
  },
  methods: {
    ...mapActions([
      'authProcedure',
      'removeAuthInfo',
    ]),
    handleChangeConsent(value) {
      this.$store.commit('SET_AUTH_CONSENT', value);
    },
    async authProcedureStart() {
      await this.authProcedure();
      if (!this.error) {
        this.$router.push('/main');
      }
    },
  },
  mounted() {
    this.removeAuthInfo();
  },
  validations: {
    login: {
      required,
    },
    password: {
      required,
    },
    consent: {
      required,
    },
  },
};
</script>

<style lang="scss" module>
  .body {
    padding: 27px 16px 5px;
    position: relative;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: auto auto auto 1fr;
    height: 100%;

    .body-title {
      font-family: Squad;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 32px;
      color: $BLACK;
      padding-bottom: 10px;
      display: inline-block;
      text-align: left;
      width: 100%;
    }

    .body-text {
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $TUNDORA;
      display: inline-block;
      padding-bottom: 11px;
      text-align: left;
    }

    .buttons {
      display: flex;
      align-items: flex-end;
      width: 100%;
    }
  }
</style>
