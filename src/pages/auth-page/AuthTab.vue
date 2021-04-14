<template>
  <div>
      <el-input
        placeholder="Логин"
        v-model="login"
        label="Пароль"
      />
      <el-input
        placeholder="Пароль"
        v-model="password"
        show-password
        label="Пароль"
      />
    <el-button
      type="primary"
      :loading="requestInProgress"
      @click="handleAuthStart"
      :class="$style.test"
    >
      Продолжить
    </el-button>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'AuthTab',
  computed: {
    ...mapFields({
      login: 'auth.login',
      password: 'auth.password',
      requestInProgress: 'requestInProgress',
    }),
  },
  methods: {
    handleAuthStart() {
      this.$emit('auth-start');
    },
  },
};
</script>

<style lang="scss" module>
  .test {
    width: 100%;
  }
</style>
