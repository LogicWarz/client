<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="9">
      <div @click="$router.push(`question/${question._id}`)" class="clickable">
        <h3>{{question.title}}</h3>
      </div>
      <div @click="$router.push(`question/${question._id}`)" class="clickable">
        <small v-if="question.description.length > 50" style="color: grey" v-trim v-html="question.description"></small>
        <small v-else style="color: grey" v-html="question.description"></small>
      </div>
      <div>
        <v-chip small class="mt-2 mr-1" v-for="(tag,i) in question.tags" :key="i" >{{tag}}</v-chip>
      </div>
      <div class="mt-2">
        <v-avatar color="white">
          <span>
            <b>{{question.UserId.name.substring(0, 1).toUpperCase()}}</b>
          </span>
        </v-avatar>
        <small class="ml-2">{{question.UserId.name}}</small>
        <v-chip class="mr-2 ml-2" v-if="question.UserId.points < 100" color="green" text-color="white" x-small>
          <b>Beginner</b>
          <v-icon small right>mdi-star-outline</v-icon>
        </v-chip>
        <v-chip class="mr-2 ml-2" v-else-if="question.UserId.points < 200" color="blue" text-color="white" x-small>
          <b>Intermediate</b>
          <v-icon size="small" right>mdi-star-half</v-icon>
        </v-chip>
        <v-chip class="mr-2 ml-2" v-else color="red" text-color="white" x-small>
          <b>Advance</b>
          <v-icon size="small" right>mdi-star</v-icon>
        </v-chip>
        <small style="color: grey"> asked {{ formatDate(question.createdAt) }}</small>
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
  name: 'question',
  props: ['question'],
  methods: {
    formatDate (date) {
      return moment(new Date(date)).fromNow()
    }
  }
}
</script>

<style>

</style>
