<template>
  <div style="display:flex;margin-left:100px;">
    <el-select v-model="method" style="top:4px;width:135px;">
      <el-option
        v-for="item in methods"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input placeholder="https://api.example.com/things" v-model="url"></el-input>
    <el-button type="text" style="margin-left:7px;">Submit</el-button>
  </div>
</template>

<script>
import { requestState } from '../rstate'

export default {

  name: 'request',
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
    }
  }
}
</script>
