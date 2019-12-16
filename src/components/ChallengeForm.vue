<template>
  <v-container class="form-container bg-white-fade elevated pa-10">
    <h3 class="mb-5">Add Challenge</h3>
    <v-text-field
      label="Title"
      dense
      outlined
      v-model="title"
    ></v-text-field>
    <!-- <v-textarea
      v-model="description"
      label="Content"
      auto-grow
      outlined
      rows="3"
      row-height="25"
      shaped
    ></v-textarea> -->
    <wysiwyg v-model="description" placeholder="Description" style="height: 100%; border-color: #BDBDC3; margin-bottom: 20px;" />
    <MonacoEditor class="editor" v-model="skeleton" language="javascript" />
    <div v-for="(testCase, i) in testCases" :key="i">
    <MonacoEditor  class="editor" v-model="testCase.value" language="javascript" />
    </div>
    <v-btn @click="addTestCase" text color="orange"><b>ADD TEST CASE</b></v-btn>
    <v-btn rounded class="float-right primary-gradient" @click="addQuestion">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  name: "askForm",
  data(){
    return {
      title: "",
      description: "",
      skeleton: '// Skeleton Code',
      testCases: [{value: '//Test case 1'}]
    }
  },
  components: {
    MonacoEditor
  },
  methods: {
    addQuestion() {
      let obj = {
        title: this.title,
        description: this.description,
        tags: ["testing", "testtt"]
      }

      this.$store.dispatch("addQuestion", obj)
        .then(() => {
          this.$router.push("/forum")
        })
        .catch(() => {
          console.log("Error")
        })
    },
    addTestCase() {
      const length = this.testCases.length
      this.testCases.push({ value: `//Test case ${length + 1}` });
    }
  }
}
</script>

<style>
.editor {
  height: 30vh;
  margin-bottom: 10px;
}
</style>