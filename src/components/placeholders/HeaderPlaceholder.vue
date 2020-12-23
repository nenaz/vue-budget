<template>
  <div :class="$style.placeholder">
    <div :class="$style.loader">
      <svg width="100%" height="55" xmlns="http://www.w3.org/2000/svg">
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
          y="0"
          width="100%"
          height="20"
        >
          <div :class="$style.block">
            <span :class="$style.text">
              Доступно:
            </span>
            <span :class="$style.text">
              Всего:
            </span>
          </div>
        </foreignObject>
        <rect fill="url(#MyGradient)" x="0" y="19" width="30%" height="15" />
        <rect fill="url(#MyGradient)" x="250" y="19" width="30%" height="15" />
        <rect fill="url(#MyGradient)" x="0" y="49" rx="3" ry="3" width="100%" height="15" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderPlaceholder',
};
</script>

<style lang="scss" module>
  .placeholder {
    // background-color: #EAEAEA;
    // border-radius: 8px;
    // margin-bottom: 8px;

    .loader {
      box-sizing: border-box;
      padding: 8px 16px;
      height: 79px;
    }
  }

  .block {
    display: flex;
    justify-content: space-between;
  }

  .text {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 13px;
    color: $DUSTY_GRAY;
    // text-align: left;
    // width: 100%;
    display: inline-block;
  }
</style>
