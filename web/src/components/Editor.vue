<template>
  <div class="editor-container" />
</template>

<script>
import * as monaco from 'monaco-editor';
import EditorWorker from '../workers/editor.worker.js';
import JsonWorker from '../workers/json.worker.js';

self.MonacoEnvironment = {
  // this doesn't work because of: https://github.com/microsoft/vscode/issues/87282
  // (Error: Unexpected usage at EditorSimpleWorker.loadForeignModule)
  getWorker: function(_moduleId, label) {
    if (label === 'json') {
      return new JsonWorker();
    } else {
      return new EditorWorker();
    }
  }
};

export default {
  name: 'Editor',
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
  watch: {
    value(newValue) {
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
        }
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
  },
  methods: {
    // TODO: which of these options should be configurable?
    initMonaco() {
      this.editor = monaco.editor.create(this.$el, {
        value: this.value,
        language: this.language,
        theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark' : 'vs',
        folding: false,
        lineNumbers: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0,
        glyphMargin: false,
        renderIndentGuides: false,
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
};
</script>
