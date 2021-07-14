<template>
  <div>
    <div class="request-name">
      Create Movie
    </div>
    <endpoint />
    <el-tabs tab-position="left">
      <el-tab-pane label="Body">
        <editor
          :value="bodyContent"
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
// import { updateState } from '../state';

/* eslint-disable-next-line */
const vscode = acquireVsCodeApi();

export default {
  name: 'Request',
  components: { Endpoint, Editor },
  props: {
  },
  data() {
    return {
      language: 'json',
      theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark': 'vs',
      bodyContent: ''
    };
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('message', this.handleMessage);
      vscode.postMessage({ type: 'ready' });
    });
  },
  methods: {
    handleMessage(event) {
      const message = event.data; // json message data from extension
      console.debug(`message: ${JSON.stringify(message, null, 2)}`);
      if (message.type === 'update') {
          const isNew = !message.text;
          let text;
          if (isNew) {
              // TODO
              text = '';
              // text = await templates.get('default.flow');
          } else {
              text = message.text.trim();
          }

          this.bodyContent = text;

          console.log("bodyContent: " + this.bodyContent);

          // updateState({
          //     base: message.base,
          //     file: message.file,
          //     text,
          //     readonly: message.readonly
          // });
      }
      // this.$forceUpdate();
    }
  }
};
</script>
