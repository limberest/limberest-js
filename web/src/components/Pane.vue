<template>
  <div
    :class="{ pane: true, 'pane-left': !isRight, 'pane-right': isRight }"
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'Pane',
  props: {
    isRight: {
      type: Boolean,
      default: false
    }
  },
};
</script>
