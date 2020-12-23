<template>
  <div :class="$style['document-link-list']">
    <div
      :class="$style['doc-item']"
      v-for="(document, index) in documents"
      :key="index"
    >
      <img
        :class="$style['doc-image']"
        src="@/assets/icon-document.svg"
      />
      <span
        :class="$style.text"
        @click="handleDocumentClick(document.uuid)"
      >
        <a :class="$style.aLink">
          {{ document.title }}
        </a>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DocumentLinkList',
  props: {
    documents: {
      type: Array[Object],
    },
  },
  methods: {
    ...mapActions([
      'fetchDocument',
      'downloadDocument',
    ]),
    handleDocumentClick(uuid) {
      this.$emit('click', uuid);
    },
  },
};
</script>

<style scoped lang="scss" module>
  .document-link-list {
    // background: #F5F6F8;
    margin: 17px 0 23px;
  }

  .title {
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.0024em;
    color: #000000;
    text-align: left;
    margin-bottom: 16px;
  }

  .doc-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // margin-bottom: 24px;
    border-bottom: 1px solid #F1F1F1;
    height: 47px;
    align-items: center;

    &:first-child {
      border-top: 1px solid #F1F1F1;
    }
  }

  .doc-image {
    width: 24px;
    height: 24px;
  }

  .doc-item {
    span {
      margin-left: 14px;

      .aLink{
        text-decoration: none;
        font-size: 15px;
        line-height: 18px;
        letter-spacing: -0.0024em;
        color: #52AE30;
        display: inline-block;
        text-align: left;
        font-family: Source Sans Pro;
      }
    }
  }
</style>
