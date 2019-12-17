<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="8">
      <div @click="$router.push(`challenge/${challenge._id}`)" class="clickable">
        <h3>{{challenge.title}}</h3>
      </div>
      <div @click="$router.push(`challenge/${challenge._id}`)" class="clickable">
        <!-- {{ challenge.description | truncate(200) }} -->
        <small v-if="challenge.description.length > 50" style="color: grey" v-trim v-html="challenge.description"></small>
        <small v-else style="color: grey" v-html="challenge.description"></small><br/><br/>
        <small style="color: grey"> created {{ formatDate(challenge.createdAt) }}</small>
      </div>
      <div>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          small
          label
        >
          {{challenge.difficulty}}
        </v-chip>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      <small>
          <a @click.prevent="$router.push(`/challenge/edit/${challenge._id}`)" style="color:grey; font-weight:bold; margin-right:20px;">edit</a>
          <a @click.prevent="deleteChallenge(challenge._id)" style="color:grey; font-weight:bold; margin-right:20px;">delete</a>
      </small>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
export default {
  name: 'challenge',
  props: ['challenge'],
  methods: {
    deleteChallenge (id) {
      // this.$buefy.dialog.confirm({
      //   title: 'Deleting question',
      //   message: 'Are you sure you want to <b>delete</b> your question? This action cannot be undone.',
      //   confirmText: 'Delete Question',
      //   type: 'is-danger',
      //   hasIcon: true,
      //   onConfirm: () => {
      this.$store.dispatch('deleteChallenge', id)
        .then((response) => {
          // this.success(response.data.message);
          this.$store.dispatch('fetchChallenges')
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
      //   },
      // });
    },
    formatDate (date) {
      return moment(new Date(date)).fromNow()
    }
  }
}
</script>

<style>

</style>
