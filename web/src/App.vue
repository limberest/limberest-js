<template>
  <div>
    <div
      v-for="request in requests"
      :key="request.name"
    >
      <request-item :request="request" />
    </div>
  </div>
</template>

<script>
import * as jsYaml from 'js-yaml';
import RequestItem from './components/RequestItem.vue';
// import { updateState } from '../state';

/* eslint-disable-next-line */
const vscode = acquireVsCodeApi();

export default {
  name: 'App',
  components: {
    RequestItem
  },
  data() {
    return {
      requests: []
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

          try {
            const reqs = jsYaml.load(text, message.file);
            this.requests = Object.keys(reqs).map(reqName => {
              return { name: reqName, ...reqs[reqName] };
            });
            // updateState({
            //     base: message.base,
            //     file: message.file,
            //     text,
            //     readonly: message.readonly
            // });
          } catch (err) {
            console.error(err);
            vscode.postMessage({
              type: 'alert',
              message: { level: 'error', text: err.message }
            });
          }
      }
    }
  }
};
</script>
