<template>
  <img
    :src="qsrc"
    :alt="alt"
    :width="width"
  >
</template>

<script>

export default {
  name: 'Image',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  data() {
    // console.log("COMP STATE: " + JSON.stringify(requestState));
    const requestState = { base: 'TODO://' };
    return {
      qsrc: requestState.base + this.src
    };
  }
};
</script>
