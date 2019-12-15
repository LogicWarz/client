<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <Sidebar />
      <v-col cols="12" sm="9">
        <div style="display:flex; justify-content:space-between; padding-bottom:10px;">
          <h2>My Answers</h2>
          <v-btn @click="$router.push('/ask')" rounded class="primary-gradient">
            <b>ASK QUESTION</b>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <MyAnswer v-for="answer in my_answers" :key="answer._id" :answer="answer"></MyAnswer>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import MyAnswer from '../components/MyAnswer'
import Sidebar from '../components/Sidebar'
import { mapState } from 'vuex'
export default {
  name: 'MyAnswers',
  components: {
    MyAnswer,
    Sidebar
  },
  methods: {
    getMyAnswers() {
      this.$store.dispatch('getMyAnswers')
        .then((response) => {
          this.$store.commit('SET_MY_ANSWERS', response.data);
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
  },
  created () {
    this.getMyAnswers();
  },
  computed: mapState(['my_answers'])
}
</script>

<style>

</style>
