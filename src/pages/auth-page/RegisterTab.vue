<template>
  <div>
    <el-input
      placeholder="Логин"
      v-model="login"
      label="Логин"
    />
    <el-input
      placeholder="Пароль"
      v-model="password"
      show-password
      label="Пароль"
    />
    <el-input
      placeholder="Повторить пароль"
      v-model="confirmPassword"
      show-password
      label="Повторить пароль"
    />
    <el-button
      type="primary"
      :loading="requestInProgress"
      @click="handleAuthStart"
      :class="$style.test"
    >
      Регистрация
    </el-button>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'RegisterTab',
  data() {
    return {
      login: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapFields({
      requestInProgress: 'requestInProgress',
    }),
  },
  methods: {
    handleAuthStart() {
      this.$emit('register-start');
    },
  },
};
</script>

<style lang="scss" module>
  .test {
    width: 100%;
  }
</style>
