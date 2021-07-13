<template>
  <div id="body-editor">{{content}}
  </div>
</template>

<script>
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor';

const initMonaco = () => {
    const ed = document.getElementById('body-editor');
    monaco.editor.create(ed, {
        value: `{
  "credits": [
    {
      "name": "Alan Crosland",
      "role": "director"
    },
    {
      "name": "Warren William",
      "role": "actor"
    },
    {
      "name": "Mary Astor",
      "role": "actor"
    },
    {
      "name": "Allen Jenkins",
      "role": "actor"
    },
    {
      "name": "Grant Mitchell",
      "role": "actor"
    },
    {
      "name": "Helen Trenholme",
      "role": "actor"
    }
  ],
  "poster": "cothd.jpg",
  "title": "The Case of the Howling Dog",
  "webRef": {
    "ref": "tt0024958",
    "site": "imdb.com"
  },
  "year": 1934
}
`,
        language: 'json',
    });
};

console.log("HAS MY CHANGES");


export default {
  name: 'body-content',
  data() {
    return {
      content: `{
  "credits": [
    {
      "name": "Alan Crosland",
      "role": "director"
    },
    {
      "name": "Warren William",
      "role": "actor"
    },
    {
      "name": "Mary Astor",
      "role": "actor"
    },
    {
      "name": "Allen Jenkins",
      "role": "actor"
    },
    {
      "name": "Grant Mitchell",
      "role": "actor"
    },
    {
      "name": "Helen Trenholme",
      "role": "actor"
    }
  ],
  "poster": "cothd.jpg",
  "title": "The Case of the Howling Dog",
  "webRef": {
    "ref": "tt0024958",
    "site": "imdb.com"
  },
  "year": 1934
}
`
    }
  },
  mounted: function () {
    // initMonaco();
    this.$nextTick(function () {
      initMonaco();
    })
  }
}
</script>
