<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="9">
      <div @click="$router.push(`question/${question._id}`)" class="clickable">
        <h3>{{question.title}}</h3>
      </div>
      <div @click="$router.push(`question/${question._id}`)" class="clickable">
        <small style="color: grey" v-html="question.description"></small>
      </div>
      <div>
        <v-chip small class="mt-2 mr-1" v-for="(tag,i) in question.tags" :key="i" >{{tag}}</v-chip>
      </div>
      <div class="mt-2">
        <v-avatar size="30" class="mr-2">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <small>{{question.UserId.name}}</small>
        <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          small
          label
        >
          beginner
        </v-chip>
        <small style="color: grey"> asked {{ formatDate(question.createdAt) }}</small>
      </div>
      <div style="margin-top:20px;">
          <small>
              <a @click.prevent="$router.push(`/question/edit/${question._id}`)" style="color:grey; font-weight:bold; margin-right:20px;">edit</a>
              <a @click.prevent="deleteQuestion(question._id)" style="color:grey; font-weight:bold; margin-right:20px;">delete</a>
          </small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar class="primary-gradient" size="40">
        <span class="white--text">{{question.answers.length}}</span>
      </v-avatar>
      <div>
        <small style="color: grey">answers</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar color="white" size="40">
        <span class="grey--text">{{ question.upvotes.length - question.downvotes.length }}</span>
      </v-avatar>
      <div>
        <small style="color: grey">votes</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="1" style="display:flex; flex-direction:column; justify-content:center; align-items:center;">
      <v-avatar color="white" size="40">
        <span class="grey--text">{{ question.views.length }}</span>
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
  name: 'MyQuestion',
  props: ['question'],
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
    deleteQuestion(id) {
      // this.$buefy.dialog.confirm({
      //   title: 'Deleting question',
      //   message: 'Are you sure you want to <b>delete</b> your question? This action cannot be undone.',
      //   confirmText: 'Delete Question',
      //   type: 'is-danger',
      //   hasIcon: true,
      //   onConfirm: () => {
          this.$store.dispatch('deleteQuestion', id)
            .then((response) => {
              // this.success(response.data.message);
              this.getMyQuestions();
            })
            .catch((err) => {
              console.log(err);
              // this.danger(err.response.data.message);
            });
      //   },
      // });
    },
    formatDate(date) {
      return moment(new Date(date)).fromNow();
    }
  }
}
</script>

<style>

</style>
