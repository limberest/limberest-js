<template>
  <div style="display:flex;margin-left:100px;">
    <el-select
      v-model="method"
      style="top:4px;width:135px;"
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
      placeholder="https://api.example.com/things"
    />
    <el-button
      type="text"
      style="margin-left:7px;"
    >
      Submit
    </el-button>
  </div>
</template>

<script>

export default {

  name: 'Request',
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
      method: 'post',
      url: '${baseUrl}/movies'
    };
  }
};
</script>
