<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <Sidebar />
      <v-col cols="12" sm="9">
        <div style="display:flex; justify-content:space-between; padding-bottom:10px;">
          <h2>My Questions</h2>
          <v-btn @click="$router.push('/ask')" rounded class="primary-gradient">
            <b>ASK QUESTION</b>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <MyQuestion v-for="question in my_questions" :key="question._id" :question="question"></MyQuestion>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import MyQuestion from '../components/MyQuestion'
import Sidebar from '../components/Sidebar'
import { mapState } from 'vuex'
export default {
  name: 'MyQuestions',
  components: {
    MyQuestion,
    Sidebar
  },
  methods: {
    getMyQuestions() {
      this.$store.dispatch('getMyQuestions')
        .then((response) => {
          this.$store.commit('SET_MY_QUESTIONS', response.data);
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
  },
  created () {
    this.getMyQuestions();
  },
  computed: mapState(['my_questions'])
}
</script>

<style>

</style>
