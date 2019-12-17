import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../apis/axios'
import router from '../router'
import errorHandler from '../utils/errorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // User Store
    isLogin: false,
    user: {},
    // Room Store
    allRoom: [],
    oneRoom: {
      players: [],
      challenge: {}
    },
    message: '',
    testString: '',
    // Question Store
    questions: [],
    question: {},
    // inGame: [],
    challenges: [],
    winner: null,
    my_questions: [],
    my_answers: [],
    question_detail: {},
    answer_detail: {},
    challenge_detail: {},
    alert: false,
    alertMessage: '',
    loading: false,
    losers: []
  },
  mutations: {
    SET_WINNER(state, payload) {
      state.winner = payload
    },
    SET_LOSERS(state, payload) {
      state.losers = payload
    },
    // User Mutation
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    // Room Mutation
    SET_ROOMS(state, payload) {
      state.rooms = payload
    },
    SET_MESSAGE(state, payload) {
      state.message = payload
    },
    SET_TEST(state, payload) {
      state.testString = payload
    },
    CREATED_ROOM(state, room) {
      state.allRoom.unshift(room)
    },
    ALL_ROOM(state, room) {
      state.allRoom = room
    },
    ROOM_ID(state, room) {
      state.oneRoom = room
    },
    // Question Mutation
    SET_QUESTIONS(state, payload) {
      state.questions = payload
    },
    SET_MY_QUESTIONS(state, payload) {
      state.my_questions = payload
    },
    SET_MY_ANSWERS(state, payload) {
      state.my_answers = payload
    },
    SET_QUESTION_DETAIL(state, payload) {
      state.question_detail = payload
    },
    SET_ANSWER_DETAIL(state, payload) {
      state.answer_detail = payload
    },
    SET_QUESTION(state, payload) {
      state.question = payload
    },
    // SET_INGAME_PLAYERS(state, payload) {
    //   state.inGame = payload
    // }
    SET_CHALLENGES(state, payload) {
      state.challenges = payload
    },
    SET_CHALLENGE_DETAIL(state, payload) {
      state.challenge_detail = payload
    },
    SET_ALERT(state, payload) {
      state.alert = payload
    },
    SET_ALERT_MESSAGE(state, payload) {
      state.alertMessage = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    register({ commit }, payload) {
      commit('SET_LOADING', true)
      axios.post('/users/signup', payload)
        .then(({ data }) => {
          // console.log(data)
          commit('SET_LOADING', false)
          localStorage.setItem('token', data.token)
          commit('SET_USER', data.user_data)
          localStorage.setItem('id', data.user_data._id)
          localStorage.setItem('name', data.user_data.name)
          localStorage.setItem('email', data.user_data.email)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          commit('SET_LOADING', false)
          err.response ? commit('SET_MESSAGE', err.response.data.message.join(', ')) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    },
    login({ commit }, payload) {
      commit('SET_LOADING', true)
      axios.post('/users/signin', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_LOADING', false)
          localStorage.setItem('token', data.token)
          commit('SET_USER', data.user_data)
          localStorage.setItem('id', data.user_data._id)
          localStorage.setItem('name', data.user_data.name)
          localStorage.setItem('email', data.user_data.email)
          commit('SET_IS_LOGIN', true)
          commit('SET_MESSAGE', '')
          router.push('/')
        })
        .catch(err => {
          commit('SET_LOADING', false)
          console.log(err.response)
          err.response ? commit('SET_MESSAGE', err.response.data.message) : commit('SET_MESSAGE', `couldn't connect to the server`)
        })
    },
    parsingData({ commit }, payload) {
      return axios.post('https://n4k8xe0cd7.execute-api.us-east-1.amazonaws.com/dev/', payload, {})
    },
    fetchRoom(context, payload) {
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
        .catch(errorHandler)
    },
    fetchRoomId(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/rooms/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            context.commit('ROOM_ID', data.room)
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    createRoom(context, payload) {
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
            // console.log(data)
            context.commit('CREATED_ROOM', data.room)
            resolve(data.room)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    joinRoom(context, payload) {
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
    },
    glogin(context, payload) {
      return axios({
        method: 'POST',
        url: '/users/gsignin',
        data: {
          idToken: payload.idToken
        }
      })
    },
    getUserData(context) {
      return axios({
        method: 'GET',
        url: '/users',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getQuestions(context) {
      return axios({
        method: 'GET',
        url: '/questions'
      })
    },
    getMyQuestions(context) {
      return axios({
        method: 'GET',
        url: '/questions/user',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getMyAnswers(context) {
      return axios({
        method: 'GET',
        url: '/answers/user',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getQuestionDetail(context, payload) {
      return axios({
        method: 'GET',
        url: `/questions/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    viewQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/view/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addQuestion(context, payload) {
      return axios({
        method: 'POST',
        url: '/questions',
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    editQuestion(context, payload) {
      return axios({
        method: 'PUT',
        url: `/questions/${payload.QuestionId}`,
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteQuestion(context, payload) {
      return axios({
        method: 'DELETE',
        url: `/questions/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addSolution(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/solution/${payload.questionId}`,
        data: {
          AnswerId: payload.answerId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    upvoteQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/upvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    downvoteQuestion(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/questions/downvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getAnswerDetail(context, payload) {
      return axios({
        method: 'GET',
        url: `/answers/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addAnswer(context, payload) {
      return axios({
        method: 'POST',
        url: '/answers',
        data: {
          QuestionId: payload.QuestionId,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    editAnswer(context, payload) {
      return axios({
        method: 'PUT',
        url: `/answers/${payload.AnswerId}`,
        data: {
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteAnswer(context, payload) {
      return axios({
        method: 'DELETE',
        url: `/answers/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    upvoteAnswer(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/upvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    downvoteAnswer(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/answers/downvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          router.push('/forum')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addChallenge({ commit }, payload) {
      return axios.post('/challenges', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    editChallenge(context, payload) {
      return axios({
        method: 'PATCH',
        url: `/challenges/${payload._id}`,
        data: {
          title: payload.title,
          description: payload.description,
          skeletonCode: 'payload.skeleton',
          testCase: payload.testCase,
          difficulty: payload.difficulty
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    deleteChallenge(context, payload) {
      return axios({
        method: 'DELETE',
        url: `/challenges/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },

    fetchChallenges({ commit }, payload) {
      axios.get(`/challenges`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CHALLENGES', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getChallengeDetail(context, payload) {
      return axios({
        method: 'GET',
        url: `/challenges/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
