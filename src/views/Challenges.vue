<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <v-col class="center-item" cols="12" sm="3">
        <v-btn @click="$router.push('/add-challenge')" rounded class="primary-gradient">
          <b>ADD A CHALLENGE</b>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="9">
        <div>
          <h2>All Challenges</h2>
        </div>
        <v-divider></v-divider>
        <Challenge v-for="challenge in challenges" :key="challenge._id" :challenge="challenge"></Challenge>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import Challenge from '../components/Challenge'
import { mapState } from "vuex";
export default {
  name: 'Challenges',
  components: {
    Challenge
  },
  created() {
    this.$store.dispatch("fetchChallenges")
  },
  computed: mapState(["challenges"])
}
</script>

<style>

</style>