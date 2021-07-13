<template>
  <div>
    <div class="request-name">
      Create Movie
    </div>
    <endpoint />
    <el-tabs tab-position="left">
      <el-tab-pane label="Body">
        <editor
          :value="value"
          :language="language"
        />
      </el-tab-pane>
      <el-tab-pane label="Query">
        Config
      </el-tab-pane>
      <el-tab-pane label="Headers">
        Role
      </el-tab-pane>
      <el-tab-pane label="Source">
        Task
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Endpoint from './Endpoint.vue';
import Editor from './Editor.vue';

export default {
  name: 'Request',
  components: { Endpoint, Editor },
  props: {
  },
  data() {
    return {
      language: 'json',
      theme: document.body.className.endsWith('vscode-dark') ? 'vs-dark': 'vs',
      value: `{
  "credits": [
    {
      "name": "Alan Croxland",
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
    };
  }
};
</script>
