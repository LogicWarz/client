<template>
  <v-container>
    <v-img contain height="20vh" class="mb-3" :src="require('../assets/rank.png')"></v-img>
    <Board class="mb-10" :users="users"></Board>
  </v-container>
</template>

<script>
import Board from '../components/Board'
import axios from '../../apis/axios'
import errorHandler from '../utils/errorHandler'
export default {
  name: 'Rank',
  components: {
    Board
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    getUsers() {
      axios.get('users/all', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.users = data
        })
        .catch(errorHandler)
    }
  },
  created() {
    this.getUsers()
  }
}
</script>

<style>

</style>