<template>
<div>
  <v-container class="detail-question-container elevated bg-white-fade pa-8">
    <div>
      <v-btn @click="deleteEvent" rounded class="primary-gradient" v-if="isUser">
          <b>Delete</b>
      </v-btn>
      <h3 class="mt-5">{{question.title}}</h3>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="center-item" sm="1">
        <div>
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <div class="ma-3">
          <h2>4</h2>
        </div>
        <div>
          <v-icon>mdi-arrow-down</v-icon>
        </div>
      </v-col>
      <v-col  sm="11">
        <p v-html="question.description"></p>
        <div class="mt-3">
          <v-avatar size="30" class="mr-2">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <small>test</small>
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            small
            label
          >
            beginner
          </v-chip>
          <small style="color: grey">Asked on Dec 12, 2019</small>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="answers-container elevated bg-white-fade pa-8 mt-2">
    <div>
      <h3>{{question.answers.length}} Answers</h3>
    </div>
    <v-divider class="mt-4"></v-divider>
    <!-- <v-row v-for="answer in question.answers" :key="answer._id">
      <v-col class="center-item" sm="1">
        <div>
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <div class="ma-3">
          <h2>4</h2>
        </div>
        <div>
          <v-icon>mdi-arrow-down</v-icon>
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
          <small>John Watts</small>
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            small
            label
          >
            beginner
          </v-chip>
          <small style="color: grey">Asked on Dec 12, 2019</small>
        </div>
      </v-col>
    </v-row> -->
    
  </v-container>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuestionDetail",
  methods: {
    deleteEvent() {
      this.$store.dispatch("deleteQuestion", this.question._id)
    }
  },
  data(){
    return {
      isUser: false
    }
  },
  created(){
    
    this.$store.dispatch("findOneQuestion", this.$route.params.id)
      .then(({data}) => {
        this.$store.commit("SET_QUESTION", data);
        let id = localStorage.getItem("id")
        if (id === this.question.UserId._id){
          this.isUser = true
        } 
        
        // console.log(this.question.answers)
      })
      .catch(err => {
        console.log(err)
      }) 
    
      
  },
  computed: mapState(["question"])
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
