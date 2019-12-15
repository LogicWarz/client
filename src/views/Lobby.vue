<template>
  <div class="about mb-10">
    <!-- <h1>HAI</h1> -->
    <!-- <h6>{{newUser}}</h6> -->
    <!-- {{listPlayer.status}}
    <div v-for="(item,index) in listPlayer.players" :key="index">
      <span>{{index+1}}</span> :
      <span>{{item}}</span>
    </div> -->
    <!-- <button @click="playGame(listPlayer._id)" v-if="listPlayer.players.length >= 2">Play</button> -->
    <!-- <button @click="leaveRoom(listPlayer._id)" v-if="listPlayer.status === 'open'">Leave</button> -->
    <div class="center-item mt-2">
      <v-btn
        text
        @click="playGame(listPlayer._id)" v-if="listPlayer.players.length >= 2"
        rounded
        class="primary-gradient"
      >
        <b>PLAY</b>
      </v-btn>
      <v-btn
        color="warning"
        text
        @click="leaveRoom(listPlayer._id)" v-if="listPlayer.status === 'open'"
      >
        <b>LEAVE ROOM</b>
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col sm="6">
          <div >
          <vue-typed-js :strings="['Prepare for battle']">
            <h3 class="typing"></h3 >
          </vue-typed-js>
          <v-img
            style="margin: auto;"
            src="../assets/lobby.png"
            max-height="50vh"
            max-width="50vh"
          ></v-img>
          </div>
        </v-col>
        <v-col sm="6" class="lobby-container bg-white-fade elevated pa-5">
          <div>
            <h3>Players</h3>
          </div>
          <v-row v-for="player in listPlayer.players" :key="player._id" justify="center" align="center">
          <v-col sm="2">
            <v-badge color="orange">
              <template v-slot:badge><b><small>{{player.points}}</small></b></template>
            <v-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
            </v-badge>
          </v-col>
          <v-col>
            <span class="ml-3" style="color: grey" ><b>{{ player.name }}</b></span>
          </v-col>
          <v-col sm="3">
            <v-chip
              class="ma-2"
              color="green"
              text-color="white"
            >
              Beginner
              <v-icon right>mdi-star</v-icon>
            </v-chip>
          </v-col>
          <v-col sm="2">
            <v-img
              src="../assets/beginner.png"
              max-height="70px"
              max-width="70px"
            ></v-img>

          </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import io from 'socket.io-client'
import axios from '../../apis/axios'
import Typed from 'typed.js'
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Lobby',
  data () {
    return {
      newUser: '',
      player: []
    }
  },
  methods: {
    playGame (id) {
      axios({
        method: 'patch',
        url: `/rooms/play/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          return this.$store.dispatch('fetchRoomId', { id: data.room._id })
        })
        .then(() => {
          socket.emit('play-game', { id, msg: 'game start' })
          this.$router.push('/editor')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    leaveRoom (id) {
      axios({
        method: 'patch',
        url: `/rooms/leave/${id}`,
        data: {
          player: 'testQueen'
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          return this.$store.dispatch('fetchRoomId', { id: data.room._id })
        })
        .then(() => {
          socket.emit('leave-room', { id, msg: 'testQueen is disconnected' })
          this.$router.push('/home')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  },
  computed: {
    listPlayer () {
      return this.$store.state.oneRoom
    }
  },
  created () {
    this.$store.dispatch('fetchRoomId', { id: this.$route.params.room })
    socket.on('joinRoom', data => {
      console.log('join room listened in client', data)
      if (data.id === this.$route.params.room) {
        this.$store.dispatch('fetchRoom')
        this.newUser = data.msg
        this.$store
          .dispatch('fetchRoomId', { id: data.id })
          .then(() => {
            console.log('joined')
          })
          .catch(err => {
            console.log(err)
          })
        setTimeout(() => {
          this.newUser = ''
        }, 2000)
      } else {
        this.$store.dispatch('fetchRoomId', { id: this.$route.params.room })
      }
    })

    socket.on('leaveRoom', data => {
      if (data.id === this.$route.params.id) {
        this.newUser = data.msg
        this.$store.dispatch('fetchRoomId', { id: data.id })
        setTimeout(() => {
          this.newUser = ''
        }, 2000)
      } else {
        this.$store.dispatch('fetchRoomId', { id: data.id })
      }
    })

    socket.on('playGame', data => {
      this.$store.dispatch('fetchRoomId', { id: data.id })
    })
  }
}
</script>

<style>
</style>
