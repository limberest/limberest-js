<template>
  <div class="actions">
    <icon
      file="add.svg"
      :options="options"
      @click="onAction"
    />
    <icon
      file="delete.svg"
      :options="options"
      @click="onAction"
    />
    <icon
      file="submit.svg"
      :options="options"
      @click="onAction"
    />
    <icon
      file="run.svg"
      :options="options"
      @click="onAction"
    />
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Actions',
  components: { Icon },
  props: {
    request: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: [
    'requestAction'
  ],
  methods: {
    onAction(action) {
      this.$emit('requestAction', action, this.request.name);
    }
  }
};
</script>
