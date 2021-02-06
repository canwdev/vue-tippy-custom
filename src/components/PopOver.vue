<template>
  <div class="popover-wrap">
    <div class="popover-arrow"></div>
    <div class="popover-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
name: "PopOver"
}
</script>

<style lang="scss" scoped>
.popover-wrap {
  position: relative;
}
.popover-box {
  border-radius: 4px;
  width: 520px;
  height: 484px;
  background: #FFFFFF;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.25);
}
</style>
