<template>
  <div>
    <MonacoEditor class="editor" v-model="userSolution" language="javascript" />
  </div>
</template>

<script>
// import io from "socket.io-client";
import axios from '../../apis/axios'
import MonacoEditor from 'vue-monaco'
import socket from '../socket/socket'

export default {
  name: 'Editor',
  components: {
    MonacoEditor
  },
  data () {
    return {
      userSolution: ''
    }
  },
  props: ['skeletonCode'],
  methods: {
    onChange (value) {
      console.log(value)
    },

    submitEvent () {
      this.$store
        .dispatch('parsingData', this.testing)
        .then(({ data }) => {
          console.log(data)
          return axios({
            method: 'delete',
            url: `/rooms/success/${this.$route.params.room}`,
            headers: {
              token: localStorage.getItem('token')
            }
          })
        })
        .then(() => {
          console.log('nice')
        })
        .catch(err => {
          console.log(err)
        })
      this.$store.commit('SET_WINNER', localStorage.getItem('id'))
      socket.emit('remove-room')
      socket.emit('success-challenge', {
        id: localStorage.getItem('id'),
        room: this.$route.params.room
      })
    }
  },
  computed: {
    getPlayers () {
      return this.$store.state.oneRoom.players
      // console.log(this.testing)
      this.$store.dispatch('parsingData', this.testing).then(({ data }) => {
        // alert(JSON.stringify(data))
        console.log(data)
      })
    }
  },
  created() {
    this.userSolution = this.skeletonCode
  },
  watch: {
    userSolution () {
      this.$emit('setUserSolution', this.userSolution)
    },
    skeletonCode() {
       this.userSolution = this.skeletonCode
    }
  }
}
</script>

<style>
.editor {
  width: 66vw;
  height: 50vh;
}
</style>
