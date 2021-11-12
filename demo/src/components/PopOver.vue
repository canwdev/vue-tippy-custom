<template>
  <transition name="fade">
    <div v-show="value" class="popover-wrap" v-click-outside="handleClickOutside">
      <div class="popover-arrow"></div>
      <div class="popover-box" :style="boxStyles">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "PopOver",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    boxStyles: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    mValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleClickOutside(e) {
      if (!this.mValue) {
        return
      }
      console.log('handleClickOutside',e)
      this.mValue = false
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.popover-wrap {
  display: inline-block;
  position: fixed;
  top: 10px;
  left: 10px;
  filter: drop-shadow(0px 2px 9px rgba(0, 0, 0, 0.25));
}

.popover-arrow {
  position: absolute;
  top: -8px;
  left: 10px;
  border-bottom: 8px solid white;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
}

.popover-box {
  border-radius: 4px;
  background: #FFFFFF;
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.1);
  overflow: auto;
}
</style>
