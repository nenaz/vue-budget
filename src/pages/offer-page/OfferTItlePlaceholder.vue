<template>
  <div :class="$style['credit-line-text']">
    <div>
      <svg width="100%" height="140" xmlns="http://www.w3.org/2000/svg">
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
        <rect fill="url(#MyGradient)" x="0" y="18" rx="3" ry="3" width="70%" height="18"></rect>
        <rect fill="url(#MyGradient)" x="0" y="46" rx="3" ry="3" width="100%" height="18"></rect>
        <rect fill="url(#MyGradient)" x="0" y="86" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="110" rx="3" ry="3" width="57%" height="16"></rect>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferTitlePlaceholder',
};
</script>

<style lang="scss" module>
.credit-line-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $WILD_SAND;
  padding: 12px 31px 8px;

  .title {
    font-weight: bold;
    text-align: center;
    color: $BLACK;
    margin: 15px 0 8px;
    display: inline-block;
    text-align: left;
    width: 100%;
    font-family: Source Sans Pro;
    font-style: normal;
    font-size: 21px;
    line-height: 24px;
  }
}
</style>
