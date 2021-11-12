/**
 * 指令作用：点击元素外部执行动作（比如让元素消失）
 */
const docEl = document.documentElement

export default {
  bind: function (el, binding, vNode) {
    el.$onClickOutside = (e) => {
      const callback = vNode.context[binding.expression]
      if (callback && !el.contains(e.target)) {
        callback(e)
      }
    }
    document.addEventListener('mousedown', el.$onClickOutside)
  },
  unbind: function (el, binding, vNode) {
    document.removeEventListener('mousedown', el.$onClickOutside)
  }
}
