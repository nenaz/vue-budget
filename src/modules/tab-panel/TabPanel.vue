<template>
  <div :class="$style['tab-panel']">
    <tab-button
      v-for="(button, index) in buttons"
      :key="index"
      :type="isActiveButton(button.active)"
      @click="handleClick"
      :nameTab="button.name"
      :disabled="button.isDisabled"
    >
      {{ button.text }}
    </tab-button>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { TabButton } from '@/components/buttons';

export default {
  name: 'TabPanel',
  components: {
    TabButton,
  },
  props: {
    buttons: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event.target.attributes.nameTab.value);
    },
    isActiveButton(isActive) {
      return isActive
        ? 'primary'
        : 'transparent';
    },
    testButton(button) {
      return button.text;
    },
  },
  computed: {
    ...mapFields({
      activeTab: 'creditParams.activeTab',
    }),
  },
};
</script>

<style lang="scss" module>
  .tab-panel {
    display: flex;
    flex-direction: row;
    border: 1px solid #C6C6C6;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 30px;
  }
</style>
