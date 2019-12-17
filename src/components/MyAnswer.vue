<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="9">
      <div @click="$router.push(`question/${answer.QuestionId._id}`)" class="clickable">
        <h3>{{answer.QuestionId.title}}</h3>
      </div>
      <div @click="$router.push(`question/${answer.QuestionId._id}`)" class="clickable">
        <small v-if="answer.QuestionId.description.length > 50" style="color: grey" v-trim v-html="answer.QuestionId.description"></small>
        <small v-else style="color: grey" v-html="answer.QuestionId.description"></small>
      </div>
      <div>
        <v-chip small class="mt-2 mr-1" v-for="(tag,i) in answer.QuestionId.tags" :key="i" >{{tag}}</v-chip>
      </div>
      <div class="mt-2">
        <v-avatar size="30" class="mr-2">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <small>{{answer.QuestionId.UserId.name}}</small>
        <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          small
          label
        >
          beginner
        </v-chip>
        <small style="color: grey"> asked {{ formatDate(answer.QuestionId.createdAt) }}</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar class="primary-gradient" size="40">
        <span class="white--text">{{answer.QuestionId.answers.length}}</span>
      </v-avatar>
      <div>
        <small style="color: grey">answers</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar color="white" size="40">
        <span class="grey--text">{{ answer.QuestionId.upvotes.length - answer.QuestionId.downvotes.length }}</span>
      </v-avatar>
      <div>
        <small style="color: grey">votes</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar color="white" size="40">
        <span class="grey--text">{{ answer.QuestionId.views.length }}</span>
      </v-avatar>
      <div>
        <small style="color: grey">views</small>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MyAnswer',
  props: ['answer'],
  methods: {
    getMyQuestions () {
      this.$store.dispatch('getMyQuestions')
        .then((response) => {
          this.$store.commit('SET_MY_QUESTIONS', response.data)
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
    },
    formatDate (date) {
      return moment(new Date(date)).fromNow()
    }
  }
}
</script>

<style>

</style>
