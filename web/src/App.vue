<template>
  <div>
    <div
      v-for="request in requests"
      :key="request.name"
      :ref="setRequestElement"
    >
      <request
        :request="request"
        :options="options"
        @renameRequest="onRename"
        @updateRequest="onUpdate"
        @requestAction="onAction"
      />
    </div>
  </div>
</template>

<script>
import * as jsYaml from 'js-yaml';
import Request from './components/Request.vue';
import { Options } from './model/options';

/* eslint-disable-next-line */
const vscode = acquireVsCodeApi();

export default {
  name: 'App',
  components: {
    Request
  },
  data() {
    return {
      requests: [],
      options: new Options(''),
      requestElements: []
    };
  },
  beforeUpdate() {
    this.requestElements = [];
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('message', this.handleMessage);
      vscode.postMessage({ type: 'ready' });
    });
  },
  unmounted: function() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    setRequestElement(el) {
      if (el) {
        this.requestElements.push(el.querySelector('.request'));
      }
    },
    handleMessage(event) {
      const message = event.data; // json message data from extension
      console.debug(`message: ${JSON.stringify(message, null, 2)}`);
      if (message.type === 'update') {
        this.options = new Options(message.base);
        const isNew = !message.text;
        let text;
        if (isNew) {
          this.addRequest(0);
          text = this.toYaml();
        } else {
          text = message.text.trim();
          const reqs = jsYaml.load(text, message.file);
          this.requests = Object.keys(reqs).map(reqName => {
            return { name: reqName, ...reqs[reqName] };
          });
        }
        if (message.select) {
          let id = message.select;
          const dot = id.indexOf('.');
          if (dot > 0) {
            id = id.substring(dot + 1);
          }
          this.$nextTick(function () {
            location.hash = id;
          });
        }
      } else if (message.type === 'action') {
        if (message.action === 'add') {
          this.addRequest();
        }
      }
    },
    addRequest(index = -1) {  // no index means append to end
      let requestName = 'New Request';
      let i = 1;
      while (this.requests.find(req => req.name === requestName)) {
        requestName = 'New Request ' + (i++);
      }
      const newRequest = { name: requestName, method: 'get', headers: {} };
      if (index >= 0) {
        this.requests.splice(index, 0, newRequest);

      } else {
        this.requests.push(newRequest);
      }
      this.update();
      this.$nextTick(function () {
        this.focusRequestName(requestName);
      });
    },
    onRename(requestName, newRequestName, nameEl) {
      const dup = this.requests.find(req => req.name === newRequestName);
      if (dup) {
        vscode.postMessage({
          type: 'alert',
          message: { level: 'error', text: `Request '${newRequestName}' already exists in ${this.options.file}` }
        });
        nameEl.focus();
      } else {
        const request = this.requests.find(req => req.name === requestName);
        request.name = newRequestName;
        this.onUpdate(request);
      }
    },
    onUpdate(updatedRequest) {
      this.requests[this.requests.findIndex(req => req.name === updatedRequest.name)] = updatedRequest;
      this.update();
    },
    onAction(action, requestName) {
      if (action === 'add') {
        this.addRequest(this.requests.findIndex(req => req.name === requestName));
      } else if (action === 'delete') {
        this.requests.splice(this.requests.findIndex(req => req.name === requestName), 1);
        this.update();
      } else if (action === 'run' || action === 'submit') {
        const request = this.requests.find(req => req.name === requestName);
        // need to unwrap proxy for message via Object.assign() -- TODO: better way?
        vscode.postMessage({ type: 'action', action, request: JSON.parse(JSON.stringify(request)) });
      }
    },
    update() {
      const text = this.toYaml();
      vscode.postMessage({ type: 'change', text });
    },
    focusRequestName(requestName) {
      location.hash = requestName;
      const reqEl = this.requestElements.find(rel => rel.getAttribute('data-reqname') === requestName);
      reqEl.querySelector('.request-name').focus();
    },
    fromYaml(text, file) {
      try {
        const reqs = jsYaml.load(text, file);
        this.requests = Object.keys(reqs).map(reqName => {
          return { name: reqName, ...reqs[reqName] };
        });
      } catch (err) {
        console.error(err);
        vscode.postMessage({
          type: 'alert',
          message: { level: 'error', text: err.message }
        });
      }
    },
    toYaml() {
      try {
        const obj = this.requests.reduce((reqs, req) => {
          const { name, ...bare } = req;
          reqs[name] = bare;
          return reqs;
        }, {});
        const indent = this.options.indent;
        return jsYaml.dump(obj, { noCompatMode: true, skipInvalid: true, indent, lineWidth: -1 });
      } catch (err) {
        console.error(err);
        vscode.postMessage({
          type: 'alert',
          message: { level: 'error', text: err.message }
        });
      }
    }
  }
};

</script>
