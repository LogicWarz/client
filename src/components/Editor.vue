<template>
  <div style="width: 100%">
    <MonacoEditor
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from 'monaco-editor-vue'
export default {
  name: 'App',
  components: {
    MonacoEditor
  },
  data () {
    return {
      options: {
      }
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>
