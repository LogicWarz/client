<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <Sidebar />
      <v-col cols="12" sm="9">
        <div style="display:flex; justify-content:space-between;">
          <h2>All Questions</h2>
          <div style="display:flex; justify-content:space-between;">
            <v-text-field
              
              solo
              dense
              rounded
              v-model="search"
              label="Search question"
              prepend-inner-icon="mdi-magnify"
              style="margin-right:20px"
              class="bg-white-fade"
            ></v-text-field>
            <v-btn @click="$router.push('/ask')" rounded class="primary-gradient">
              <b>ASK QUESTION</b>
            </v-btn>
          </div>
        </div>
        <v-divider></v-divider>
        <Question v-for="question in filteredQuestions" :key="question._id" :question="question"></Question>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import Question from '../components/Question'
import Sidebar from '../components/Sidebar'
import { mapState } from 'vuex'
import errorHandler from '../utils/errorHandler'
export default {
  name: 'Questions',
  data () {
    return {
      search: ''
    }
  },
  components: {
    Question,
    Sidebar
  },
  created () {
    this.$store.commit('SET_LOADING', true)
    this.$store.dispatch('getQuestions')
      .then((response) => {
        this.$store.commit('SET_LOADING', false)
        this.$store.commit('SET_QUESTIONS', response.data)
      })
      .catch(errorHandler)
  },
  computed: {
    ...mapState(['questions']),
    filteredQuestions () {
      return this.questions.filter((el) => {
        return el.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>

<style>

</style>
