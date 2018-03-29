<template>
<div class="m-header">
  <div class="icon"></div>
  <h1 class="text">Chicken Music</h1>
</div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style scoped type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";

  .m-header
    position: relative
    height: 40px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align top
      margin_top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 40px
      font-size: $font-size-large
</style>
