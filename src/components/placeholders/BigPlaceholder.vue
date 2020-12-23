<template>
  <div :class="$style.placeholder">
    <div :class="$style.loader">
      <svg width="100%" height="133" xmlns="http://www.w3.org/2000/svg">
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
        <rect fill="url(#MyGradient)" x="0" y="0" rx="3" ry="3" width="130" height="32" />
        <rect
        fill="url(#MyGradient)" x="160" y="10" rx="3" ry="3" width="70%" height="16" />
        <rect fill="url(#MyGradient)" x="0" y="70" width="100%" height="3" />
        <rect fill="url(#MyGradient)" x="0" y="90" rx="3" ry="3" width="45%" height="16" />
        <rect fill="url(#MyGradient)" x="0" y="110" rx="3" ry="3" width="45%" height="16" />
        <rect
        fill="url(#MyGradient)" x="220" y="85" rx="3" ry="3" width="45%" height="40" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigPlaceholder',
};
</script>

<style lang="scss" module>
  .placeholder {
    background-color: #EAEAEA;
    border-radius: 8px;
    margin-bottom: 8px;

    .loader {
      box-sizing: border-box;
      padding: 16px;
    }
  }
</style>
