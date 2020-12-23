<template>
  <svg width="100%" height="120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="MyGradient">
        <stop offset="0%" stop-color="#DEDEDE" stop-opacity="1">
          <animate
          attributeName="offset" values="-2; 1" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stop-color="#F6F6F6" stop-opacity="1">
          <animate
            attributeName="offset" values="-1.5; 1.5" dur="2s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#DEDEDE" stop-opacity="1">
          <animate
          attributeName="offset" values="-1; 2" dur="2s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <foreignObject
      x="0"
      y="20"
      width="100%"
      height="200"
    >
      <span :class="$style['sms-text']">
        Мы отправили смс с проверочным кодом на ваш номер:
      </span>
      <br />
      <span :class="$style['sms-text']">
        {{ phone }}
      </span>
    </foreignObject>
    <rect
      fill="url(#MyGradient)"
      x="0"
      y="75"
      width="100%"
      height="15"
      v-if="requestInProgress"
    />
  </svg>
</template>

<script>
export default {
  name: 'PhonePlaceholder',
  props: {
    phone: {
      type: String,
      default: '',
    },
    requestInProgress: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" module>
  .sms-text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: $TUNDORA;
    display: inline-block;
    padding-bottom: 11px;
    text-align: left;
  }
</style>
