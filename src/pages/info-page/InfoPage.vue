<template>
  <page
    :small-page="true"
    body-color="white"
  >
    <template v-slot:header>
      <page-header />
    </template>
    <template v-slot:body>
      <transition name="fade" mode="out-in">
        <info-placeholder v-if="requestInProgress" />
        <div :class="$style.content" v-else>
          <error-template
            v-if="isError"
            :errorMessages="errorMessages"
            :buttonText="buttonText"
            :backUrl="backUrl"
          />
          <reject-template v-else-if="isReject" />
          <success-template v-else />
        </div>
      </transition>
    </template>
  </page>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import Page from '@/components/Page';
import PageHeader from '@/components/PageHeader';
import { Errors } from '@/store/types';
import InfoPlaceholder from './InfoPlaceholder';
import SuccessTemplate from './SuccessTemplate';
import ErrorTemplate from './ErrorTemplate';
import RejectTemplate from './RejectTemplate';

const ALLOW_STATUSES = [
  'success',
  'reject',
  'error',
  Errors.CANCELED,
  Errors.TIMEOUT,
  '',
];

export default {
  name: 'InfoPage',
  components: {
    Page,
    PageHeader,
    SuccessTemplate,
    ErrorTemplate,
    RejectTemplate,
    InfoPlaceholder,
  },
  props: {
    status: {
      type: String,
      default: '',
      validate: (value) => ALLOW_STATUSES.includes(value),
    },
    buttonText: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
      default: '',
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapFields({
      statusType: 'error.statusType',
      statusErr: 'error.status',
      requestInProgress: 'requestInProgress',
      authStatus: 'authStatus',
    }),
    isError() {
      const error = !this.authStatus
        || this.errorMessages.length
        || this.statusType === ALLOW_STATUSES[2]
        || this.statusType === ALLOW_STATUSES[3]
        || this.statusType === ALLOW_STATUSES[4];
      return error;
    },
    isReject() {
      return this.statusType === ALLOW_STATUSES[1];
    },
  },
};
</script>

<style lang="scss" module>
  .content {
    padding: 0 16px;
    height: 100%;
  }
</style>
