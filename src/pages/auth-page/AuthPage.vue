<template>
  <page
    :grid-config="pageConfig"
  >
    <template v-slot:header>
      <!-- <page-auth-header /> -->
    </template>
    <template v-slot:body>
      <div :class="$style.body">
        <el-card class="box-card">
          <div slot="header" :class="$style.clearfix">
              <span :class="$style['avatar-logo']"></span>
            <!-- <el-avatar :size="size" :src="circleUrl">
            </el-avatar> -->
          </div>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane
              label="Вход"
              name="first"
              :disabled="requestInProgress"
            >
              <auth-tab
                @auth-start="authProcedureStart"
              />
            </el-tab-pane>
            <el-tab-pane
              label="Регистрация"
              name="second"
              :disabled="requestInProgress"
            >
              <register-tab
                @register-start="registerProcStart"
              />
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <!-- <span :class="$style['body-title']">
          Необходимо
          <br />
          войти
        </span> -->
        <!-- <div :class="$style['input-block']"> -->
      </div>
    </template>
    <template v-slot:footer>
      <span>ver.</span>
    </template>
  </page>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { required } from 'vuelidate/lib/validators';
// import { }
// import { BaseInput } from '@/components/inputs';
// import Checkbox from '@/components/Checkbox';
// import BaseButton from '@/components/BaseButton';
import Page from '@/components/Page';
import AuthTab from './AuthTab';
import RegisterTab from './RegisterTab';
// import PageFooter from '@/components/PageFooter';

export default {
  name: 'AuthPage',
  components: {
    // BaseButton,
    // BaseInput,
    // Checkbox,
    Page,
    AuthTab,
    RegisterTab,
    // PageFooter,
  },
  data() {
    return {
      pageConfig: {
        rowsCount: 2,
        flexibleRow: 2,
      },
      activeName: 'first',
      // circleUrl: './src/assets/logo.png',
      circleUrl: 'c:\\Work\\JS\\pos-prototype-2\\src\\assets\\logo.png',
    };
  },
  computed: {
    ...mapFields({
      // login: 'auth.login',
      // password: 'auth.password',
      consent: 'auth.consent',
      error: 'error.statusType',
      requestInProgress: 'requestInProgress',
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
      'fetchFlyRequest',
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
    registerProcStart() {},
  },
  async mounted() {
    await this.fetchFlyRequest();
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
  .clearfix {
    background-color: #409eff;
  }
  .avatar-logo {
    background-image: url('../../assets/logo.png');
    width: 100%;
    height: 75px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
  }
  .test {
    width: 100%;
  }

  .body {
    padding: 27px 16px 5px;
    position: relative;
    box-sizing: border-box;
    // display: grid;
    // grid-template-rows: auto auto auto 1fr;
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
