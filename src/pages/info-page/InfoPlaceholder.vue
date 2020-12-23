<template>
  <div :class="$style.placeholder">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="MyGradient">
          <stop offset="0%" stop-color="#DEDEDE" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-2; 1"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="50%" stop-color="#F6F6F6" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1.5; 1.5"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="100%" stop-color="#DEDEDE" stop-opacity="1">
            <animate
              attributeName="offset"
              values="-1; 2"
              dur="2s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
      <rect
        fill="url(#MyGradient)"
        x="calc(50% - 38px)"
        y="40px"
        rx="5"
        ry="5"
        width="79px"
        height="69px"
      ></rect>
      <rect
        fill="url(#MyGradient)"
        x="calc(50% - 80px)"
        y="170"
        rx="3"
        ry="3"
        width="50%"
        height="20"
      ></rect>
      <rect fill="url(#MyGradient)" x="0" y="213" rx="3" ry="3" width="100%" height="16"></rect>
      <rect fill="url(#MyGradient)" x="0" y="238" rx="3" ry="3" width="100%" height="16"></rect>
      <rect fill="url(#MyGradient)" x="0" y="262" rx="3" ry="3" width="100%" height="16"></rect>
      <rect fill="url(#MyGradient)" x="0" y="75%" rx="3" ry="3" width="100%" height="43"></rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'InfoPlaceholder',
};
</script>

<style lang="scss" module>
  .placeholder {
    height: 100%;
  }
</style>
