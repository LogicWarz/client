<template>
<div>
  <!-- <v-container class="detail-question-container elevated bg-white-fade pa-8"> -->
  <v-container>
    <v-row class="mt-4" justify="center">
      <v-col class="center-item" cols="6" sm="2">
        <v-btn @click="$router.push('/challenges')" rounded class="primary-gradient">
          <b>LIST OF CHALLENGES</b>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="10">
        <div style="display:flex; justify-content:space-between;">
          <div>
            <h3>{{challenge_detail.title}}</h3>
            <small>asked <b> {{ formatDate(challenge_detail.createdAt) }} </b></small>
            <v-chip
              color="green"
              text-color="white"
              small
              label
            >
              {{challenge_detail.difficulty}}
            </v-chip>
          </div>
          <div style="display:flex; align-items:flex-end;">
            <v-btn @click="$router.push('/add-challenge')" rounded class="primary-gradient">
              <b>ADD A CHALLENGE</b>
            </v-btn>
          </div>
        </div>

        <v-divider class="mt-4"></v-divider>
        <small style="color: grey" v-html="challenge_detail.description"></small>
        <v-divider class="mt-4"></v-divider>
        <v-container class="answers-container elevated bg-white-fade pa-8 mt-2">
          <div>
            <h3> Skeleton Code </h3>
          </div>
          <v-divider class="mt-4"></v-divider>
              <code style="width:100%" v-html="challenge_detail.skeletonCode"></code>
        </v-container>
        <v-divider class="mt-4"></v-divider>
        <v-container class="answers-container elevated bg-white-fade pa-8 mt-2">
          <div>
            <h3>{{challenge_detail.testCase.length}} Test Cases</h3>
          </div>
          <v-divider class="mt-4"></v-divider>
          <v-row v-for="(test, i) in challenge_detail.testCase" :key="i">
            <v-col sm="12">
              <code style="width:100%" v-html="test"></code>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Sidebar from '../components/Sidebar'

export default {
  name: 'QuestionDetail',
  components: {
    Sidebar
  },
  data: () => ({
    description: ''
  }),
  methods: {
    getChallengeDetail () {
      this.$store.dispatch('getChallengeDetail', this.$route.params.id)
        .then((response) => {
          this.$store.commit('SET_CHALLENGE_DETAIL', response.data)
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
    },
    formatDate (date) {
      return moment(new Date(date)).fromNow()
    }
  },
  data () {
    return {
      description: ''
    }
  },
  created () {
    this.getChallengeDetail()
  },
  computed: mapState(['challenge_detail'])
}
</script>

<style>
.detail-question-container {
  max-width: 60vw;
}
.answers-container {
  max-width: 60vw;
}
</style>
