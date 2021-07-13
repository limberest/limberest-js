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
    language: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    initMonaco() {
      this.editor = monaco.editor.create(this.$el, {
        value: this.value,
        language: this.language,
        theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark' : 'vs',
        minimap: {
		      enabled: false
  	    }
      });
    },
    syncTheme() {
      const theme = document.body.className.endsWith('vscode-dark') ? 'vs-dark' : 'vs';
      if (this.editor) {
        monaco.editor.setTheme(theme);
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initMonaco();
    });
    window.addEventListener('message', async (event) => {
      if (event.data.type === 'theme-change') {
        this.syncTheme();
      }
    });
  }
};
</script>
