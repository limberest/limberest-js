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
  emits: [
    'updateSource',
  ],
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
      if (!this.value) {
        this.$el.style.height = '200px';
      }
      this.initMonaco();
      this.resizeObserver = new ResizeObserver(() => {
        this.editor.layout();
      }).observe(this.$el);
    });
    window.addEventListener('message', this.handleMessage);
  },
  unmounted: function() {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$el);
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
    window.removeEventListener('message', this.handleMessage);
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
        renderLineHighlight: 'none',
        glyphMargin: false,
        renderIndentGuides: false,
        scrollbar: {
          verticalScrollbarSize: 11,
          horizontalSliderSize: 11
        },
        minimap: {
          enabled: false
        }
      });
      this.editor.onDidChangeModelContent( () => {
        const value = this.editor.getValue();
        if (this.value !== value) {
          this.$emit('updateSource', value);
        }
      });
    },
    handleMessage(event) {
      if (event.data.type === 'theme-change') {
        this.syncTheme();
      }
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
