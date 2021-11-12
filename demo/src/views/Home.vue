<template>
  <div class="home">
    <Demos/>
  </div>
</template>

<script>
// @ is an alias to /src
import Demos from '@/components/Demos.vue'

export default {
  name: 'Home',
  components: {
    Demos
  }
}
</script>
