<template>
  <div>
    <MonacoEditor class="editor" v-model="userSolution" language="javascript" />
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "Editor",
  components: {
    MonacoEditor
  },
  data() {
    return {
      userSolution: ""
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },

    submitEvent() {
      // console.log(this.testing)
     this.$store.dispatch("parsingData", this.testing)
      .then(({data}) => {
        // alert(JSON.stringify(data))
        console.log(data)
      })
    }
  },
  
  watch: {
    userSolution() {
      this.$emit('setUserSolution', this.userSolution)
    }
  }
};
</script>

<style>
.editor {
  width: 66vw;
  height: 50vh;
}
</style>
