<template>
  <img :src="qsrc" />
</template>

<script>
import { requestState } from '../rstate'

export default {
  name: 'Image',
  props: {
    'src': String,
    'alt': String
  },
  data() {
    console.log("COMP STATE: " + JSON.stringify(requestState));
    return {
      qsrc: requestState.base + this.src
    }
  }
}
</script>
