<template>
  <div>
    <Image src="/img/logo.png" alt="Ply logo" />
    <HelloWorld msg="Hello Vue 3.0 in VS Code" />
  </div>
</template>

<script>
import Image from './components/Image.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Image
  }
}
</script>
