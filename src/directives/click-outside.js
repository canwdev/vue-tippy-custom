/**
 * 指令作用：点击元素外部执行动作（比如让元素消失）
 */
const docEl = document.documentElement

export default {
  bind: function (el, binding, vNode) {
    el.close = (e) => {
      const fun = vNode.context[binding.expression]
      if (!vNode.context[binding.expression]) return
      if (!el.contains(e.target)) {
        fun(e)
      }
    }
    document.addEventListener('mousedown', el.close)
  },
  unbind: function (el, binding, vNode) {
    window.removeEventListener('mousedown', el.close)
  }
}
