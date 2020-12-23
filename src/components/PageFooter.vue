<template>
  <div :class="$style.footer">
    <div :class="$style['bank-license']">
      <div :class="$style.phones">
        <span :class="$style.phone">
        </span>
        <span :class="$style.phone">
        </span>
      </div>
      <span :class="$style['license-name']">      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
};
</script>

<style lang="scss" module>
  .footer {
    height: 81px;
    border-top: 1px solid $GALLERY;
    padding: 12px 16px;
    box-sizing: border-box;

    .bank-license {
      display: flex;
      flex-direction: column;
      justify-content: left;

      .phones {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .phone {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        text-align: left;
        color: $APPLE;

        a {
          text-decoration: none;
          color: $APPLE;
        }
      }

      .license-name {
        font-family: Source Sans Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: $BOULDER;
        text-align: left;
        margin-top: 9px;
      }
    }
  }
</style>
