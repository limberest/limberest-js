<template>
  <div>
    <el-select v-model="method">
      <el-option
        v-for="item in methods"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
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
        method: 'get'
      }
    }
}
</script>
