<template>
  <v-container class="form-container bg-white-fade elevated pa-10">
    <h3 class="mb-5">Edit Challenge</h3>
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
    <v-select
      v-model="difficulty"
      :items="['beginner', 'intermediate', 'advance']"
      label="Difficulty"
      outlined
    ></v-select>
    <MonacoEditor class="editor" v-model="skeleton" language="javascript" />
    <div >
    <MonacoEditor  class="editor" v-model="testCase" language="javascript" />
    </div>
    <!-- <v-btn @click="addTestCase" text color="orange"><b>ADD TEST CASE</b></v-btn> -->
    <v-btn rounded class="float-right primary-gradient" @click="editChallenge">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import {mapState} from 'vuex'

export default {
  name: 'askForm',
  data () {
    return {
      title: '',
      description: '',
      difficulty: '',
      skeleton: '',
      testCase: ''
    }
  },
  components: {
    MonacoEditor
  },
  methods: {
    getChallengeDetail () {
      this.$store.dispatch('getChallengeDetail', this.$route.params.id)
        .then((response) => {
          this.title = response.data.title
          this.description = response.data.description
          this.difficulty = response.data.difficulty
          this.skeleton = response.data.skeleton
          this.testCase = JSON.stringify(response.data.testCase)
          this.$store.commit('SET_CHALLENGE_DETAIL', response.data)
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
    },
    editChallenge () {
      this.testCase = this.testCase.replace(/'/g, `"`)
      let parseTestCase = JSON.parse(this.testCase)
      let challenge = {
        _id: this.$store.state.challenge_detail._id,
        title: this.title,
        description: this.description,
        skeletonCode: this.skeleton,
        testCase: parseTestCase,
        difficulty: this.difficulty
      }

      this.$store.dispatch('editChallenge', challenge)
        .then(() => {
          this.$router.push('/challenges')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getChallengeDetail()
  },
  computed: mapState(['challenge_detail'])
}
</script>

<style>
.editor {
  height: 30vh;
  margin-bottom: 10px;
}
</style>
