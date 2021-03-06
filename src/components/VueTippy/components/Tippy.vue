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
import tippy from "tippy.js";
import humps from "humps";
import defaultProps, {booleanProps} from "../props";

export default {
  props: {
    to: undefined,
    toSelector: undefined,
    toElement: undefined,
    content: undefined,
    enabled: undefined,
    visible: undefined,
    triggerTarget: undefined,
    isCloseOnClickOutside: { // 是否开启 点击外部关闭（修改版）
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tip: null,
      options: {
        // 重写默认设置
        arrow: true,
        interactive: true,
        theme: 'light',
        placement: 'bottom-start',
        hideOnClick: 'toggle',
        appendTo: 'parent',
        trigger: 'click'
      },
      toElm: null
    };
  },
  mounted() {
    this.init();

    if (this.isCloseOnClickOutside) {
      document.addEventListener('mousedown', this.onClickOutside)
    }
  },
  watch: {
    content() {
      if (this.tip) {
        this.tip.set(this.getOptions());
      }
    },
    enabled(val) {
      if (!this.tip) return;

      if (val) {
        this.tip.enable();
      } else {
        this.tip.hide();
        this.tip.disable();
      }
    },
    visible(val) {
      if (!this.tip) return;

      if (val) {
        this.tip.show();
      } else {
        this.tip.hide();
      }
    }
  },
  updated() {
    if (this.tip && !this.content) {
      this.tip.set(this.getOptions());
    }
  },
  beforeDestroy() {
    if (!this.tip) return;

    this.tip.destroy();

    if (this.isCloseOnClickOutside) {
      document.removeEventListener('mousedown', this.onClickOutside)
    }
  },
  computed: {
    isManualTrigger() {
      return this.options.trigger === "manual";
    }
  },
  methods: {
    init() {
      if (this.tip) {
        try {
          this.tip.destroy();
        } catch (error) {
        }

        this.tip = null;
      }

      let elm = this.toElement;

      if (elm == null) {
        if (this.to) {
          elm = document.querySelector(`[name='${this.to}']`);
        } else if (this.toSelector) {
          elm = document.querySelector(this.toSelector);
        } else if (
            this.$refs.trigger &&
            this.$refs.trigger.childElementCount > 0
        ) {
          elm = this.$refs.trigger;
        } else {
          elm = this.$el.parentElement;
        }
      }

      if (!elm) {
        return;
      }

      this.toElm = elm

      let tip = tippy(elm, this.getOptions());

      if (!tip) {
        return;
      }

      if (Array.isArray(tip)) {
        if (tip.length > 0) {
          this.tip = tip[0];
        } else {
          return;
        }
      }

      this.tip = tip;

      this.$emit("onCreate", this.tip);
      this.$emit("init", this.tip);

      if (this.enabled === false) {
        this.tip.disable();
      }

      if (this.isManualTrigger && this.visible === true) {
        this.tip.show();
      }
    },
    tippy() {
      return this.tip;
    },
    filterOptions() {
      const getValue = (key, value) => {
        if (booleanProps.hasOwnProperty(key)) {
          if (value === "") return true;
          if (value === "false") return false;
          if (value === "true") return true;
        }

        return value;
      };

      for (const key of Object.keys(this.options)) {
        if (!defaultProps.hasOwnProperty(key)) {
          // We're replacing this.options anyway, we don't have to worry about modifying the object
          delete this.options[key];
        } else {
          this.options[key] = getValue(key, this.options[key]);
        }
      }

      return this.options;
    },
    getOptions() {
      Object.assign(this.options, humps.camelizeKeys(this.$attrs));
      this.filterOptions();

      if (!this.options.onShow && this.$listeners && this.$listeners["show"]) {
        this.options.onShow = (...args) => {
          return this.$listeners["show"].fns(...args);
        };
      }

      if (!this.options.onShown) {
        this.options.onShown = (...args) => {
          this.$emit("shown", ...args);
        };
      }

      if (!this.options.onHidden) {
        this.options.onHidden = (...args) => {
          this.$emit("hidden", ...args);
        };
      }

      if (!this.options.onHide && this.$listeners && this.$listeners["hide"]) {
        this.options.onHide = (...args) => {
          return this.$listeners["hide"].fns(...args);
        };
      }

      if (!this.options.onMount) {
        this.options.onMount = (...args) => {
          this.$emit("mount", ...args);
        };
      }

      if (!this.options.hasOwnProperty("content")) {
        this.options.content = this.content ? this.content : this.$refs.content;
      }

      this.options.triggerTarget = this.triggerTarget;

      return this.options;
    },
    onClickOutside(e) {
      const trigger = this.toElm
      const content = this.$refs.content

      // console.log({
      //   target: e.target,
      //   trigger,
      //   content
      // })

      if (trigger !== e.target && !content.contains(e.target)) {
        console.log('hide')
        this.tip.hide()
      }
    }
  }
};
</script>
