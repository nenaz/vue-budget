<template>
  <div :class="$style['resend-sms']">
    <span :class="$style['repeat-text']">
      {{ repeatMessageText }}
      <br />
      <span
        :class="{
          [$style['repeat-link']]: true,
          [$style.disabled]: isRepeatLinkDisabled,
        }"
        @click="handleRepeatLink"
      >
        Отправить код повторно
      </span>
    </span>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { TIME_TO_RESEND_SEC } from './constants';

export default {
  name: 'ResendSMS',
  data() {
    return {
      time: TIME_TO_RESEND_SEC,
      isRepeatLinkDisabled: true,
    };
  },
  computed: {
    ...mapFields({
      phone: 'auth/.phone',
    }),
    repeatMessageText() {
      return `Если вы не получили код, нажмите отправить код повторно по истечении ${this.time} сек.`;
    },
  },
  mounted() {
    this.repeatSMS();
  },
  methods: {
    repeatSMS() {
      const timerId = setInterval(() => {
        if (this.time < 1) {
          clearInterval(timerId);
          this.isRepeatLinkDisabled = false;
        } else {
          this.time -= 1;
        }
      }, 1000);
    },
    handleRepeatLink() {
      if (!this.isRepeatLinkDisabled) {
        this.time = TIME_TO_RESEND_SEC;
        this.isRepeatLinkDisabled = true;
        this.repeatSMS();
        this.$emit('click');
        // await this.authProcedure();
      }
    },
  },
};
</script>

<style lang="scss" module>
  .repeat-text {
    font-family: Squad;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: $TUNDORA;
    text-align: left;
    display: inline-block;
  }

  .repeat-link {
    font-family: Squad;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
    color: $APPLE;
    font-size: 18px;
    padding: 16px 0 20px;
    display: inline-block;

    &.disabled {
      color: $GRAY;
    }
  }
</style>
