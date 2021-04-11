<template>
  <div>
    <div class="request-name">Create Movie</div>
    <endpoint />
    <el-tabs tab-position="left">
      <el-tab-pane label="Body">
        <body-content></body-content>
      </el-tab-pane>
      <el-tab-pane label="Query">Config</el-tab-pane>
      <el-tab-pane label="Headers">Role</el-tab-pane>
      <el-tab-pane label="Source">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { requestState } from '../rstate'
import Endpoint from './Endpoint.vue'
import BodyContent from './BodyContent.vue'

export default {
  components: { Endpoint, BodyContent },
  name: 'request',
  props: {
  }
}
</script>
