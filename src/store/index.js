import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    allRoom: [],
    oneRoom: {
      players: []
    },
    message: '',
    testString: ''
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_ROOMS (state, payload) {
      state.rooms = payload
    },
    SET_MESSAGE (state, payload) {
      state.message = payload
    },
    SET_TEST (state, payload) {
      state.testString = payload
    },
    CREATED_ROOM (state, room) {
      state.allRoom.unshift(room)
    },
    ALL_ROOM (state, room) {
      state.allRoom = room
    },
    ROOM_ID (state, room) {
      state.oneRoom = room
    }
  },
  actions: {
    register ({ commit }, payload) {
      console.log('aaaa')
      axios.post('/users/signup', payload)
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          err.response ? commit('SET_MESSAGE', err.response.data.message.join(', ')) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    },
    login ({ commit }, payload) {
      axios.post('/users/signin', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          console.log(err.response)
          err.response ? commit('SET_MESSAGE', err.response.data.message) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    },
    parsingData ({ commit }, payload) {
      return axios.post('https://n4k8xe0cd7.execute-api.us-east-1.amazonaws.com/dev/', payload, {
      })
    },
    fetchRoom (context, payload) {
      axios({
        method: 'get',
        url: '/rooms',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('ALL_ROOM', data.rooms)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    fetchRoomId (context, payload) {
      console.log('fetch room payload', payload)
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/rooms/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('ROOM_ID', data.room)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    createRoom (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/rooms',
          data: {
            title: payload.title,
            level: payload.level,
            player: payload.player
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('CREATED_ROOM', data.room)
            resolve(data.room)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    joinRoom (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `/rooms/join/${payload.id}`,
          data: { player: payload.name },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('ROOM_ID', data.room)
            // context.commit('JOIN_ROOM', data.room)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    }
  },
  modules: {
  }
})
