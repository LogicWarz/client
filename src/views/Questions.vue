<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <v-col class="center-item" cols="12" sm="3">
        <v-btn @click="$router.push('/ask')" rounded class="primary-gradient">
          <b>ASK A QUESTION</b>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="9">
        <div>
          <h2>All Questions</h2>
        </div>
        <v-divider></v-divider>
        <Question v-for="n in 2" :key="n"></Question>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import Question from '../components/Question'
export default {
  name: 'Questions',
  components: {
    Question
  }
}
</script>

<style>

</style>