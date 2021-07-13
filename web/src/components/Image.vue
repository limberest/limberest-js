<template>
  <img :src="qsrc" :alt="alt" :width="width" />
</template>

<script>

export default {
  name: 'Image',
  props: {
    src: String,
    alt: String,
    width: Number
  },
  data() {
    // console.log("COMP STATE: " + JSON.stringify(requestState));
    return {
      qsrc: requestState.base + this.src
    }
  }
}
</script>
