<template>
  <div class="request">
    <div class="request-name">
      {{ request.name }}
    </div>
    <endpoint :request="request" />
    <el-tabs tab-position="left">
      <el-tab-pane label="Body">
        <editor
          :value="request.body"
          :language="language"
        />
      </el-tab-pane>
      <el-tab-pane label="Query">
        Config
      </el-tab-pane>
      <el-tab-pane label="Headers">
        Headers Here
      </el-tab-pane>
      <el-tab-pane label="Source">
        Source Here?
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Endpoint from './Endpoint.vue';
import Editor from './Editor.vue';

export default {
  name: 'RequestItem',
  components: { Endpoint, Editor },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      language: 'json',
      theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark': 'vs'
    };
  },
};
</script>
