<template>
  <div>
    <div class="flowbee-config-tab-content" />
  </div>
</template>

<script>
import * as flowbee from 'flowbee';

export default {
  name: 'Table',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  emits: [
    'updateValue'
  ],
  mounted: function () {
    this.$nextTick(function () {
      this.initTable();
    });
    window.addEventListener('message', this.handleMessage);
  },
  unmounted: function() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    initTable() {
      const table = new flowbee.Table(
        [ { type: 'text', label: 'Name' }, { type: 'text', label: 'Value' } ],
        this.stringValue(this.value),
        false
      );
      this.syncTheme();
      this.$el.style.display = 'flex';
      const tabContentEl = this.$el.querySelector('.flowbee-config-tab-content');
      tabContentEl.style.padding = '10px 5px 0 0';
      table.tableElement.style.color = 'var(--vscode-editor-foreground)';
      table.tableElement.style.backgroundColor = 'var(--vscode-editor-background)';
      table.onTableUpdate(updateEvent => {
        const value = this.fromString(updateEvent.value);
        if (this.value !== value) {
          this.$emit('updateValue', value);
        }
      });
      tabContentEl.appendChild(table.tableElement);
    },
    stringValue(obj) {
      const keys = Object.keys(obj);
      if (keys.length === 0) {
        return '';
      } else {
        const rows = [];
        for (const key of keys) {
          rows.push([ key, obj[key] ]);
        }
        return JSON.stringify(rows);
      }
    },
    fromString(str) {
      const val = {};
      const rows = JSON.parse(str);
      for (const row of rows) {
        if (row[0] && row[1]) {
          val[row[0]] = row[1];
        }
      }
      return val;
    },
    handleMessage(event) {
      if (event.data.type === 'theme-change') {
        this.syncTheme();
      }
    },
    syncTheme() {
      const theme = document.body.className.endsWith('vscode-light') ? 'light': 'dark';
      this.$el.className = `flowbee-configurator-${theme} table-container`;
    }
  }
};
</script>
