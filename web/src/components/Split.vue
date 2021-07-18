<template>
  <div class="split">
    <slot />
  </div>
</template>

<script>

export default {
  name: 'Split',
  mounted: function () {
    this.$nextTick(function () {
      this.initSplitter();
    });
    window.addEventListener('message', this.handleMessage);
  },
  methods: {
    initSplitter() {
      this.rightPane = this.$el.querySelector('.pane-right');
      this.$el.onmousedown = (e) => {
        this.isSplitterDrag = this.isSplitterHover(e);
      };
      this.$el.onmouseup = (_e) => {
        this.isSplitterDrag = false;
        document.body.style.cursor = 'default';
      };
      this.$el.onmouseleave = (_e) => {
        if (!this.isSplitterDrag) {
          document.body.style.cursor = 'default';
        }
      };
      this.$el.onmousemove = (e) => {
        if (this.isSplitterDrag) {
          e.preventDefault();
          document.body.style.cursor = 'ew-resize';
          const x = e.clientX - this.$el.getBoundingClientRect().left;
          const w = this.$el.offsetWidth - x;
          this.rightPane.style.width = w + 'px';
          this.rightPane.style.minWidth = w + 'px';
          this.rightPane.style.maxWidth = w + 'px';
        } else if (e.buttons === 0 && this.isSplitterHover(e)) {
          document.body.style.cursor = 'ew-resize';
        } else {
          document.body.style.cursor = 'default';
        }
      };
    },
    isSplitterHover(e) {
      const rightPaneWidth = this.rightPane.offsetWidth - 2;
      const x = e.clientX - this.$el.getBoundingClientRect().left;
      return (Math.abs(x - (this.$el.offsetWidth - rightPaneWidth)) <= 3);
    }
  },
};
</script>
