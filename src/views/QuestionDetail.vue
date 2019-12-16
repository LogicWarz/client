<template>
<div>
  <!-- <v-container class="detail-question-container elevated bg-white-fade pa-8"> -->
  <v-container>
    <v-row>
      <Sidebar />
      <v-col cols="12" sm="9">
        <div style="display:flex; justify-content:space-between;">
          <div>
            <h3 class="mt-5">{{question_detail.title}}</h3>
            <small>asked <b> {{ formatDate(question_detail.createdAt) }} </b></small>
            <small style="margin-left:50px;">Viewed <b> {{ $store.state.question_detail.views.length }} times </b></small>
          </div>
          <div style="display:flex; align-items:flex-end;">
            <v-btn @click="$router.push('/ask')" rounded class="primary-gradient">
              <b>ASK QUESTION</b>
            </v-btn>
          </div>
        </div>
        
        <v-divider class="mt-4"></v-divider>
        <v-row>
          <v-col class="center-item" sm="1">
            <div>
              <v-icon @click="upvoteQuestion(question_detail._id)" style="cursor:pointer;">mdi-navigation</v-icon>
            </div>
            <div class="ma-3">
              <h2>{{ question_detail.upvotes.length - question_detail.downvotes.length }}</h2>
            </div>
            <div>
              <v-icon @click="downvoteQuestion(question_detail._id)" style="cursor:pointer; transform:rotate(180deg);">mdi-navigation</v-icon>
            </div>
          </v-col>
          <v-col  sm="11">
            <p v-html="question_detail.description"></p>
            <div>
              <v-chip small class="mt-2 mr-1" v-for="(tag,i) in question_detail.tags" :key="i" >{{tag}}</v-chip>
            </div>
            <div class="mt-3">
              <v-avatar size="30" class="mr-2">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
              <small>{{ question_detail.UserId.name }}</small>
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                small
                label
              >
                beginner
              </v-chip>
              <small style="color: grey"> asked {{ formatDate(question_detail.createdAt) }}</small>
            </div>
          </v-col>
        </v-row>
      <v-container class="answers-container elevated bg-white-fade pa-8 mt-2">
        <div>
          <h3>{{question_detail.answers.length}} Answers</h3>
        </div>
        <v-divider class="mt-4"></v-divider>
        <v-row v-for="answer in question_detail.answers" :key="answer._id">
          <v-col class="center-item" sm="1">
            <div>
              <v-icon @click="upvoteAnswer(answer._id)" style="cursor:pointer;">mdi-navigation</v-icon>
            </div>
            <div class="ma-3">
              <h2>{{ answer.upvotes.length - answer.downvotes.length }}</h2>
            </div>
            <div>
              <v-icon @click="downvoteAnswer(answer._id)" style="cursor:pointer; transform:rotate(180deg);">mdi-navigation</v-icon>
            </div>
            <div v-if="question_detail.solution === answer._id" style="margin-top:20px;">
              <v-icon @click="addSolution(question_detail._id, answer._id)" style="cursor:pointer; color:ForestGreen;">mdi-check-bold</v-icon>
            </div>
            <div v-else style="margin-top:20px;">
              <v-icon @click="addSolution(question_detail._id, answer._id)" style="cursor:pointer;">mdi-check-bold</v-icon>
            </div>
          </v-col>
          <v-col sm="11">
            <p v-html="answer.description"></p>
            <div class="mt-3">
              <v-avatar size="30" class="mr-2">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
              <small>{{ answer.UserId.name }}</small>
              <v-chip
                class="ma-2"
                color="green"
                text-color="white"
                small
                label
              >
                beginner
              </v-chip>
              <small style="color: grey"> answered {{ formatDate(answer.createdAt) }}</small>
            </div>
            <div v-if="answer.UserId._id === user._id" style="margin-top:10px;">
                <small>
                    <a @click.prevent="$router.push(`/answer/${answer._id}`)" style="color:grey; font-weight:bold; margin-right:20px;">edit</a>
                    <a @click.prevent="deleteAnswer(answer._id)" style="color:grey; font-weight:bold; margin-right:20px;">delete</a>
                </small>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mt-4" style="margin-bottom:10px;"></v-divider>
        <div style="margin-bottom:10px;">
          <h3>Your Answers</h3>
        </div>
        <wysiwyg v-model="description" style="height: 100%; border-color: black; margin-bottom: 20px;" />
        <v-btn rounded class="primary-gradient" @click="addAnswer(question_detail._id)">
          <b>POST</b>
        </v-btn>
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
    description: '',
  }),
  methods: {
    getQuestionDetail() {
      this.$store.dispatch('getQuestionDetail', this.$route.params.id)
        .then((response) => {
          this.$store.commit('SET_QUESTION_DETAIL', response.data);
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    viewQuestion() {
      this.$store.dispatch('viewQuestion', this.$route.params.id)
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    upvoteQuestion(id) {
      this.$store.dispatch('upvoteQuestion', id)
        .then((response) => {
          // this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    downvoteQuestion(id) {
      this.$store.dispatch('downvoteQuestion', id)
        .then((response) => {
          // this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    upvoteAnswer(id) {
      this.$store.dispatch('upvoteAnswer', id)
        .then((response) => {
          // this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    downvoteAnswer(id) {
      this.$store.dispatch('downvoteAnswer', id)
        .then((response) => {
          // this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    addSolution(questionId, answerId) {
      this.$store.dispatch('addSolution', {
        questionId,
        answerId,
      })
        .then((response) => {
          // this.success(response.data.message);
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    addAnswer(questionId) {
      this.$store.dispatch('addAnswer', {
        QuestionId: questionId,
        description: this.description,
      })
        .then((response) => {
          // this.success('Answer posted successfully');
          this.getQuestionDetail();
        })
        .catch((err) => {
          console.log(err);
          // this.danger(err.response.data.message);
        });
    },
    deleteAnswer(id) {
      // this.$buefy.dialog.confirm({
      //   title: 'Deleting answer',
      //   message: 'Are you sure you want to <b>delete</b> your answer? This action cannot be undone.',
      //   confirmText: 'Delete Answer',
      //   type: 'is-danger',
      //   hasIcon: true,
      //   onConfirm: () => {
          this.$store.dispatch('deleteAnswer', id)
            .then((response) => {
              // this.success(response.data.message);
              this.getQuestionDetail();
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
    },
  },
  data () {
    return {
      description: ''
    }
  },
  created () {
    this.viewQuestion();
    this.getQuestionDetail();
  },
  computed: mapState(['question_detail', 'user'])
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
