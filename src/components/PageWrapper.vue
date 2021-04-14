<template>
  <div :class="$style['page-wrapper']">
    <div :class="$style.body">
      <slot />
    </div>
    <!-- <page-footer /> -->
    <portal to="modals">
      <left-menu
        v-if="!hideMenu"
        @close="handleCloseClick"
        @exit="handleExitClick"
        @select="handleSelectMenuItem"
      />
    </portal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
// import PageFooter from '@/components/PageFooter';
import LeftMenu from './Menu';

export default {
  name: 'PageWrapper',
  components: {
    // PageFooter,
    LeftMenu,
  },
  computed: {
    ...mapFields({
      hideLoader: 'loaderObject.hide',
      hideMenu: 'hideMenu',
    }),
  },
  methods: {
    ...mapActions([
      'resetState',
      'closeSession',
    ]),
    handleCloseClick() {
      this.$store.commit('HIDE_MENU');
    },
    handleExitClick() {
      this.closeSession();
      this.handleCloseClick();
      this.resetState();
      this.$router.replace('/');
    },
    handleSelectMenuItem(link) {
      if (link) {
        this.handleCloseClick();
        this.$router.push(link);
      }
    },
  },
  // data() {
  //   return {
  //     hideMenu: false,
  //   };
  // },
};
</script>

<style lang="scss" module>
  .page-wrapper {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
  }

  .body {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
