<template>
  <div class="request">
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
import Endpoint from './Endpoint.vue';
import Editor from './Editor.vue';
import TableComp from './Table.vue';
import { Options, defaultOptions } from '../model/options';

export default {
  name: 'Request',
  components: { Endpoint, Editor, TableComp },
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  emits: [
    'renameRequest',
    'updateRequest',
    'updateRequestSource',
    'submitRequest'
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
      // TODO options prop
      const indent = defaultOptions.indent;
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
      this.$emit('submitRequest', requestName);
    }
  }
};
</script>
