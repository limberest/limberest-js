<template>
  <pre><code class="">{{content}}</code></pre>
</template>

<script>

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
  }
}
</script>
