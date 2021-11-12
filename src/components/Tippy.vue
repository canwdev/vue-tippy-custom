<template>
  <div>
    <div ref="trigger">
      <slot name="trigger"></slot>
    </div>

    <div ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import tippy from 'tippy.js'
  import humps from '../humps'
  import defaultProps, {booleanProps} from '../props'

  // const bodyEl = document.body

  export default {
    name: 'Tippy',
    props: {
      to: undefined,
      toSelector: undefined,
      toElement: undefined,
      content: undefined,
      enabled: undefined,
      visible: undefined, // 需要设置 Tippy 选项 trigger="manual" 才能使用
      triggerTarget: undefined,
      hideOnClickOutside: { // 是否开启【点击外部关闭】（修复版）
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        tip: null,
        options: {
          // 重写默认设置
          maxWidth: 'none',
          arrow: true,
          interactive: true,
          theme: 'light',
          placement: 'bottom-start',
          hideOnClick: 'toggle',
          appendTo: 'parent',
          trigger: 'click',
          boundary: 'window'
        },
        toElm: null
      }
    },
    mounted() {
      this.init()

      if (this.hideOnClickOutside) {
        document.addEventListener('mousedown', this.onClickOutside)
      }
    },

    watch: {
      content() {
        if (this.tip) {
          this.tip.set(this.getOptions())
        }
      },
      enabled(val) {
        if (!this.tip) return

        if (val) {
          this.tip.enable()
        } else {
          this.tip.hide()
          this.tip.disable()
        }
      },
      visible(val) {
        if (!this.tip) return

        if (val) {
          this.tip.show()
        } else {
          this.tip.hide()
        }
      }
    },
    updated() {
      if (this.tip && !this.content) {
        this.tip.set(this.getOptions())
      }
    },
    beforeDestroy() {
      if (!this.tip) return

      this.tip.destroy()

      if (this.hideOnClickOutside) {
        document.removeEventListener('mousedown', this.onClickOutside)
      }
    },
    computed: {
      isManualTrigger() {
        return this.options.trigger === 'manual'
      }
    },
    methods: {
      init() {
        if (this.tip) {
          try {
            this.tip.destroy()
          } catch (error) {
            console.error(error)
          }

          this.tip = null
        }

        let elm = this.toElement

        if (elm == null) {
          if (this.to) {
            elm = document.querySelector(`[name='${this.to}']`)
          } else if (this.toSelector) {
            elm = document.querySelector(this.toSelector)
          } else if (
            this.$refs.trigger &&
            this.$refs.trigger.childElementCount > 0
          ) {
            elm = this.$refs.trigger
          } else {
            elm = this.$el.parentElement
          }
        }

        if (!elm) {
          return
        }

        this.toElm = elm

        const tip = tippy(elm, this.getOptions())

        if (!tip) {
          return
        }

        if (Array.isArray(tip)) {
          if (tip.length > 0) {
            this.tip = tip[0]
          } else {
            return
          }
        }

        this.tip = tip

        this.$emit('onCreate', this.tip)
        this.$emit('init', this.tip)

        if (this.enabled === false) {
          this.tip.disable()
        }

        if (this.isManualTrigger && this.visible === true) {
          this.tip.show()
        }
      },
      tippy() {
        return this.tip
      },
      filterOptions() {
        const getValue = (key, value) => {
          // eslint-disable-next-line no-prototype-builtins
          if (booleanProps.hasOwnProperty(key)) {
            if (value === '') return true
            if (value === 'false') return false
            if (value === 'true') return true
          }

          return value
        }

        for (const key of Object.keys(this.options)) {
          // eslint-disable-next-line no-prototype-builtins
          if (!defaultProps.hasOwnProperty(key)) {
            // We're replacing this.options anyway, we don't have to worry about modifying the object
            delete this.options[key]
          } else {
            this.options[key] = getValue(key, this.options[key])
          }
        }
        // console.log('filterOptions', this.options)
        return this.options
      },
      getOptions() {
        // console.log('$attrs', this.$attrs)
        Object.assign(this.options, humps.camelizeKeys(this.$attrs))
        this.filterOptions()

        if (!this.options.onShow && this.$listeners && this.$listeners['show']) {
          this.options.onShow = (...args) => {
            return this.$listeners['show'].fns(...args)
          }
        }

        if (!this.options.onShown) {
          this.options.onShown = (...args) => {
            this.$emit('shown', ...args)
          }
        }

        if (!this.options.onHidden) {
          this.options.onHidden = (...args) => {
            this.$emit('hidden', ...args)
          }
        }

        if (!this.options.onHide && this.$listeners && this.$listeners['hide']) {
          this.options.onHide = (...args) => {
            return this.$listeners['hide'].fns(...args)
          }
        }

        if (!this.options.onMount) {
          this.options.onMount = (...args) => {
            this.$emit('mount', ...args)
          }
        }

        // eslint-disable-next-line no-prototype-builtins
        if (!this.options.hasOwnProperty('content')) {
          this.options.content = this.content ? this.content : this.$refs.content
        }

        this.options.triggerTarget = this.triggerTarget

        return this.options
      },
      onClickOutside(e) {
        const target = e.target
        const trigger = this.toElm
        const content = this.$refs.content

        // console.log('onClickOutside', {
        //   target,
        //   trigger,
        //   content
        // })

        // 防止点击触发按钮不隐藏
        if (trigger !== e.target && !content.contains(target) && !trigger.contains(target)) {
          // console.log('>>>hide', trigger)
          this.tip.hide()
        }
      }
    }
  }
</script>
