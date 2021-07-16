<template>
  <div
    class="request"
    :data-reqname="request.name"
  >
    <a :name="request.name" />
    <div
      class="request-name"
      tabindex="0"
      contenteditable="true"
      @input="onRename"
      @keydown="onNameKeyDown"
      @blur="onNameBlur"
    >
      {{ request.name }}
    </div>
    <actions
      :request="request"
      :options="options"
      @requestAction="onAction"
    />
    <endpoint
      :request="request"
      @updateRequest="onUpdate"
      @submitRequest="onSubmit"
    />
    <el-tabs tab-position="left">
      <el-tab-pane label="Body">
        <editor
          :value="request.body"
          :language="language"
          @updateSource="onUpdateBody"
        />
      </el-tab-pane>
      <el-tab-pane label="Query">
        TODO: Query Params
      </el-tab-pane>
      <el-tab-pane label="Headers">
        <table-comp
          :value="request.headers"
          @updateValue="onUpdateHeaders"
        />
      </el-tab-pane>
      <el-tab-pane label="Source">
        <pre><code class="">{{ requestSource }}</code></pre>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as jsYaml from 'js-yaml';
import Actions from './Actions.vue';
import Endpoint from './Endpoint.vue';
import Editor from './Editor.vue';
import TableComp from './Table.vue';

export default {
  name: 'Request',
  components: { Actions, Endpoint, Editor, TableComp },
  props: {
    request: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: [
    'renameRequest',
    'updateRequest',
    'updateRequestSource',
    'requestAction'
  ],
  data() {
    return {
      language: 'json',
      theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark': 'vs',
      rename: this.request.name
    };
  },
  computed: {
    requestSource() {
      const { name, ...bare } = this.request;
      const obj = { [name]: bare };
      const indent = this.options.indent;
      return jsYaml.dump(obj, { noCompatMode: true, skipInvalid: true, indent, lineWidth: -1 });
    }
  },
  methods: {
    onRename(event) {
      this.rename = event.target.innerText.trim();
    },
    onNameKeyDown(event) {
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.target.blur();
      }
    },
    onNameBlur() {
      if (this.rename !== this.request.name) {
        this.$emit('renameRequest', this.request.name, this.rename);
      }
    },
    onUpdate(updatedRequest) {
      this.$emit('updateRequest', updatedRequest);
    },
    onUpdateBody(content) {
      const request = { ...this.request };
      if (content.trim().length > 0) {
        request.body = content;
      } else {
        delete request.body;
      }
      this.$emit('updateRequest', request);
    },
    onUpdateHeaders(updatedHeaders) {
      this.$emit('updateRequest', { ...this.request, headers: updatedHeaders });
    },
    onSubmit(requestName) {
      this.onAction('submit', requestName);
    },
    onAction(action, requestName) {
      this.$emit('requestAction', action, requestName);
    }
  }
};
</script>
