/**
 * 指令作用：点击元素外部执行动作（比如让元素消失）
 */
const docEl = document.documentElement

export default {
  bind: function(el, binding, vNode) {
    // console.log(binding.expression)
    el.__isMove = false

    el.__onMouseMove = event => {
      el.__isMove = true
    }
    el.__onMouseUp = event => {
      docEl.removeEventListener('mousemove', el.__onMouseMove);
      docEl.removeEventListener('mouseup', el.__onMouseUp);

      if (el.__isMove) {
        return
      }
      if (!el.contains(event.target)) {
        // call method provided in v-click-outside value
        vNode.context[binding.expression](event)
        // event.stopPropagation()
      }
    }
    el.__onMouseDown = event => {
      el.__isMove = false
      docEl.addEventListener('mousemove', el.__onMouseMove);
      docEl.addEventListener('mouseup', el.__onMouseUp);
    }

    docEl.addEventListener('mousedown', el.__onMouseDown)
  },
  unbind: function(el, binding, vNode) {
    // Remove Event Listeners
    docEl.removeEventListener('mousedown', el.__onMouseDown)

    el.__onMouseDown = null
    el.__onMouseMove = null
    el.__onMouseUp = null
  }
}
