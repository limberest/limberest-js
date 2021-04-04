<template>
  <div>
    <img alt="Ply logo" src="/img/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 in VS Code" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
