<template>
  <div style="display:flex;margin-left:100px;">
    <el-select
      v-model="method"
      style="top:4px;width:135px;"
      @change="update('method', $event)"
    >
      <el-option
        v-for="item in methods"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input
      v-model="url"
      @input="update('url', $event)"
    />
    <el-button
      type="text"
      style="margin-left:7px;"
      @click="submit"
    >
      Submit
    </el-button>
  </div>
</template>

<script>

export default {
  name: 'Endpoint',
  props: {
    request: {
      type: Object,
      required: true
    },
  },
  emits: [
    'updateRequest',
    'submitRequest'
  ],
  data() {
    return {
      methods: [{
        value: 'get',
        label: 'GET'
      }, {
        value: 'post',
        label: 'POST'
      }, {
        value: 'put',
        label: 'PUT'
      }, {
        value: 'patch',
        label: 'PATCH'
      }, {
        value: 'delete',
        label: 'DELETE'
      }],
      method: this.request.method,
      url: this.request.url
    };
  },
  methods: {
    update(field, value) {
      this.$emit('updateRequest', { ...this.request, [field]: value });
    },
    submit() {
      this.$emit('submitRequest', this.request.name);
    }
  },
};
</script>
