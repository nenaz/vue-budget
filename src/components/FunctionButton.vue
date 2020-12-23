<template>
  <div
    :class="classesBlock"
    @click="handleClick"
    :link="params.link"
  >
    <img
      :class="classesImage"
      :src="getImgUrl(params.icon)"
      :alt="params.icon"
    />
    <span :class="classesText">
      {{ params.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FunctionButton',
  props: {
    // iconName: {
    //   type: String,
    //   require: true,
    // },
    // text: {
    //   type: String,
    //   require: true,
    // },
    // link: {
    //   type: String,
    // },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    classesBlock() {
      return {
        [this.$style.disabled]: this.params.disabled,
        [this.$style['menu-button']]: true,
      };
    },
    classesText() {
      return {
        [this.$style['disabled-text']]: this.params.disabled,
        [this.$style.text]: true,
      };
    },
    classesImage() {
      return {
        [this.$style['disabled-image']]: this.params.disabled,
        [this.$style.image]: true,
      };
    },
  },
  methods: {
    getImgUrl(name) {
      const images = require.context('../assets', false, /\.svg$/);
      return images(`./${name}.svg`);
    },
    handleClick(event) {
      if (!this.params.disabled) {
        this.$emit('click', event.currentTarget.attributes.link.value);
      }
    },
  },
};
</script>

<style lang="scss" module>
  .menu-button {
    height: 56px;
    background-color: white;
    margin: 8px 0;
    border-radius: 8px;
    padding: 20px 17px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;

    .image {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 17px;

      &.disabled-image {
        opacity: .35;
      }
    }

    .text {
      font-family: Squad;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      display: flex;
      align-items: center;
      letter-spacing: -0.2px;
      color: $BLACK;

      &.disabled-text {
        color: rgba(128, 128, 128, 0.35);
      }
    }
  }
  .disabled {
    background-color: rgba(128, 128, 128, 0.05);
  }
</style>
