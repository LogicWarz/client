<template>
  <div>
    <MonacoEditor class="editor" v-model="testing" language="javascript" />
    <button @click="submitEvent">Submit</button>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'Editor',
  components: {
    MonacoEditor
  },
  data () {
    return {
      testing: ""
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    },

    submitEvent() {
     this.$store.dispatch("parsingData", this.testing)
      .then(({data}) => {
        console.log(data)
      })

      
    }
  }
}
</script>

<style>
.editor{
  width: 900px;
  height: 70vh;
}

</style>
