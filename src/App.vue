<template>
  <div id="app" ref="app">
    <page-wrapper>
      <router-view />
    </page-wrapper>
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import PageWrapper from '@/components/PageWrapper';

export default {
  name: 'App',
  components: {
    PageWrapper,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $PICKLED_BLUEWOOD;
  height: 100vh;
  overflow-y: scroll;
}

#app.showModal {
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: $PICKLED_BLUEWOOD;
}

#nav a.router-link-exact-active {
  color: $OCEAN_GREEN;
}
</style>
