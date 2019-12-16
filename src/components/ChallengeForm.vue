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
    <div >
    <MonacoEditor  class="editor" v-model="testCase" language="javascript" />
    </div>
    <!-- <v-btn @click="addTestCase" text color="orange"><b>ADD TEST CASE</b></v-btn> -->
    <v-btn rounded class="float-right primary-gradient" @click="addChallenge">
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
      skeleton: '// Skeleton Code\n\nfunction yourFunctionName (param1,param2){\n    \n}',
      testCase: '[\n    {\n        \"input\": [\"params1\",\"params2\"],\n        \"output\": \"asdasddsa\"\n    },\n    {\n        \"input\": [\"params1\",\"params2\"],\n        \"output\": \"asdasddsa\"\n    },\n    {\n        \"input\": [\"params1\",\"params2\"],\n        \"output\": \"asdasddsa\"\n    }\n]'
    }
  },
  components: {
    MonacoEditor
  },
  methods: {
    addChallenge() {
      this.testCase = this.testCase.replace(/'/g, `"`)
      let parseTestCase = JSON.parse(this.testCase)
      let challenge = {
        title: this.title,
        description: this.description,
        skeletonCode: this.skeleton,
        testCase: parseTestCase,
        difficulty: 'beginner'
      }

      this.$store.dispatch('addChallenge', challenge)
        .then(() => {
          this.$router.push('/challenges');
        })
        .catch(err => {
          console.log(err)
        })
    },
    // addTestCase() {
    //   console.log(JSON.parse(this.testCase))
    // }
  }
}
</script>

<style>
.editor {
  height: 30vh;
  margin-bottom: 10px;
}
</style>