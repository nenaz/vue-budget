<template>
  <div :class="$style.placeholder">
    <div :class="$style.loader">
      <svg width="100%" height="25" xmlns="http://www.w3.org/2000/svg">
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
        <rect fill="url(#MyGradient)" x="0" y="0" rx="3" ry="3" width="29" height="24" />
        <rect fill="url(#MyGradient)" x="40" y="5" rx="3" ry="3" width="100%" height="16" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputPlaceholder',
};
</script>

<style lang="scss" module>
  .placeholder {
    background-color: #EAEAEA;
    border-radius: 8px;
    margin-bottom: 8px;
    height: 40px;

    .loader {
      box-sizing: border-box;
      padding: 8px;
    }
  }
</style>
