<template>
  <img
    class="icon"
    :src="src"
    :alt="alt"
    :style="style"
    @click="onClick"
  >
</template>

<script>

export default {
  name: 'Icon',
  props: {
    file: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: [
    'click'
  ],
  computed: {
    src() {
      return `${this.options.iconBase}/${this.file}`;
    },
    alt() {
      return this.file.substring(0, this.file.lastIndexOf('.'));
    },
    style() {
      const cursor = this.onClick ? 'pointer' : 'default';
      return `cursor:${cursor}`;
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.alt);
    }
  }
};
</script>
