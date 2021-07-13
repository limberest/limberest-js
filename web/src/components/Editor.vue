<template>
  <div class="editor-container">
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import EditorWorker from '../workers/editor.worker.js';
import JsonWorker from '../workers/json.worker.js';

self.MonacoEnvironment = {
  // this doesn't work because of: https://github.com/microsoft/vscode/issues/87282
  // (Error: Unexpected usage at EditorSimpleWorker.loadForeignModule)
  getWorker: function(moduleId, label) {
    if (label === 'json') {
      return new JsonWorker();
    } else {
      return new EditorWorker();
    }
  }
};

export default {
  name: 'editor',
  props: {
    value: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    language: String
  },
  methods: {
    initMonaco() {
      monaco.editor.create(this.$el, {
        value: this.value,
        language: this.language,
        theme: this.theme,
        minimap: {
		      enabled: false
  	    }
      });
    }
  },
  mounted: function () {
      console.log("THEME: " + this.theme);
    this.$nextTick(function () {
      this.initMonaco();
    })
  }
}
</script>
