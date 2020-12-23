<template>
  <page>
    <template v-slot:header>
      <page-header />
    </template>
    <template v-slot:body>
      <iframe
        frameborder="0" border="0" cellspacing="0"
        style="border-style: none;width: 100%; height: calc(100vh - 161px);"
        :src="getDocumentLocation"
      />
    </template>
  </page>
</template>

<script>
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { mapActions } from 'vuex';

export default {
  name: 'PdfViewPage',
  components: {
    Page,
    PageHeader,
  },
  props: {
    uuid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      documentObj: {},
    };
  },
  computed: {
    getDocumentLocation() {
      return `${process.env.VUE_APP_FILE_BASE_PATH}${this.documentObj.location}`;
    },
  },
  methods: {
    ...mapActions([
      'fetchDocument',
      'downloadDocument',
    ]),
    goBack() {
      this.$router.back();
    },
  },
  async mounted() {
    if (this.uuid) {
      this.documentObj = await this.fetchDocument(this.uuid);
    }
  },
};
</script>
