<template>
  <div>
    <endpoint />
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="Body">User</el-tab-pane>
      <el-tab-pane label="Query">Config</el-tab-pane>
      <el-tab-pane label="Headers">Role</el-tab-pane>
      <el-tab-pane label="Source">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { requestState } from '../rstate'
import Endpoint from './Endpoint.vue'

export default {
  components: { Endpoint },
  name: 'request',
  props: {
  }
}
</script>
