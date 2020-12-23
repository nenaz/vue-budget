<template>
  <div>
    <function-button
      v-for="(item) in items"
      :key="item.icon"
      :params="item"
      @click="handleItemClick"
    />
  </div>
</template>

<script>
import FunctionButton from '@/components/FunctionButton';

export default {
  name: 'FunctionalButtonModule',
  components: {
    FunctionButton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleItemClick(value) {
      console.log('FunctionalButtonModule', value);
      console.log('FunctionalButtonModule items', this.items);
      // ДОБАВТЬ КОНСТАНТУ И ПЕРЕСМОТРЕТЬ ЛОГИКУ
      if (value === 'credit-params') {
        this.$router.push('/credit-params');
      } else {
        this.$router.push(`/${value}`);
      }
    },
  },
};
</script>

<style lang="scss" module>

</style>
