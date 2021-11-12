<template>
  <div class="hello">

    <fieldset>
      <legend>Basic Demo</legend>

      <div>
        <button content="Hi!" v-tippy>Button</button>
        <button content="Content Message" v-tippy="{
      trigger : 'click',
       interactive : true,
       theme : 'light',
       placement : 'bottom',
       arrow: true
    }">Button
        </button>
        <button content="Hello" v-tippy="{ placement : 'top',  arrow: true }">
          Button
        </button>
      </div>
    </fieldset>

    <fieldset>
      <legend>ref Demo</legend>

      <div>
        <button
            name="myTrigger"
        >
          Click
        </button>
        <input type="text" v-model="txt">

        <tippy to="myTrigger"
               theme='light test-tippy'
               ref="tipppy"
        >
          <div>
            <input type="text" v-model="txt">
            <p>
              For a guide and recipes on how to configure / customize this project,<br>
              check out the
              <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
            </p>
            <h3>Installed CLI Plugins</h3>
            <ul>
              <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
                     rel="noopener">babel</a></li>
              <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank"
                     rel="noopener">router</a></li>
              <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank"
                     rel="noopener">vuex</a></li>
            </ul>
            <h3>Essential Links</h3>
            <ul>
              <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
              <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
              <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
              <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
              <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
            </ul>
            <h3>Ecosystem</h3>
            <ul>
              <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
              <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
              <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank"
                     rel="noopener">vue-devtools</a>
              </li>
              <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
              <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
            </ul>

            <h1 v-for="i in 1" :key="i">Test {{ i }}</h1>
          </div>

        </tippy>
      </div>
    </fieldset>

    <fieldset>
      <legend>Append To Body</legend>

      <div>
        <div class="overflow-hidden-box">
          <button name="myTrigger1">Append To Body</button>
          <div v-for="i in 5" :key="i">Test {{ i }} TestTestTestTestTestTest</div>
        </div>

        <tippy
            to="myTrigger1"
        >
          <h1>Tippy Content</h1>
        </tippy>
      </div>
    </fieldset>

    <fieldset>
      <legend>Manual v-model</legend>

      <div>
        <input type="checkbox" v-model="isShow"/>
      </div>

      <tippy
          :arrow="false"
          theme="light no-transform-y"
          trigger="manual"
          :visible.sync="isShow"
          :append-to="appendTo"
          @show="handleShow"
          @hide="handleHide"
      >
        <h1>Tippy Content</h1>
      </tippy>
    </fieldset>

  </div>
</template>

<script>
export default {
  name: 'Demos',
  data() {
    return {
      txt: '',
      isShow: false,
      appendTo: document.body
    }
  },
  methods: {
    handleClickOutside() {
      const t = this.$refs.tipppy
      t.tip.hide()
    },
    handleHide(e) {
      this.isShow = false
      console.log('hide', e)
    },
    handleShow(e) {
      console.log('show', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

fieldset {
  margin-bottom: 50px;
}

.overflow-hidden-box {
  overflow: hidden;
  height: 100px;
  width: 100px;
  border: 1px solid red;
}
</style>

<style lang="scss">
.test-tippy-theme {
  .tippy-content {
    overflow: auto;
  }
}


</style>
