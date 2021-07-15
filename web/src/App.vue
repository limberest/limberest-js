<template>
  <div>
    <div
      v-for="request in requests"
      :key="request.name"
    >
      <request
        :request="request"
        @updateRequest="onUpdate"
        @updateRequestSource="onUpdateSource"
        @submitRequest="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import * as jsYaml from 'js-yaml';
import Request from './components/Request.vue';
import { Options, defaultOptions } from './model/options';
// import { updateState } from '../state';

/* eslint-disable-next-line */
const vscode = acquireVsCodeApi();

export default {
  name: 'App',
  components: {
    Request
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
        try {
          const isNew = !message.text;
          let text;
          if (isNew) {
              // TODO
              text = '';
              // text = await templates.get('default.flow');
          } else {
              text = message.text.trim();
          }
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
      } else if (message.type === 'action') {
        let requestName = 'newRequest';
        let i = 1;
        while (this.requests.find(req => req.name === requestName)) {
          requestName = 'newRequest' + (i++);
        }
        const newRequest = { name: requestName, method: 'get', headers: {} };
        this.requests.push(newRequest);
        this.onUpdate(newRequest);
        this.$nextTick(function () {
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    },
    onUpdate(updatedRequest) {
      try {
        this.requests[this.requests.findIndex(req => req.name === updatedRequest.name)] = updatedRequest;
        const obj = this.requests.reduce((reqs, req) => {
          const { name, ...bare } = req;
          reqs[name] = bare;
          return reqs;
        }, {});
        // TODO options prop
        const indent = defaultOptions.indent;
        const text = jsYaml.dump(obj, { noCompatMode: true, skipInvalid: true, indent, lineWidth: -1 });
        vscode.postMessage({ type: 'change', text });
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
    },
    onSubmit(requestName) {
      const request = this.requests.find(req => req.name === requestName);
      // need to unwrap proxy for message via Object.assign() -- TODO: better way?
      vscode.postMessage({ type: 'submit', request: JSON.parse(JSON.stringify(request)) });
    }
  }
};
</script>
