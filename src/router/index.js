import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/Auth.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Play.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/forum',
    name: 'forum',
    component: () => import(/* webpackChunkName: "forum" */ '../views/Questions.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "ask" */ '../views/AskQuestion.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import(/* webpackChunkName: "questions" */ '../views/MyQuestions.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/question/edit/:id',
    name: 'editquestion',
    component: () => import(/* webpackChunkName: "editquestion" */ '../views/MyQuestionEdit.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/question/:id',
    name: 'question',
    component: () => import(/* webpackChunkName: "question" */ '../views/QuestionDetail.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/answers',
    name: 'answers',
    component: () => import(/* webpackChunkName: "answers" */ '../views/MyAnswers.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/answer/:id',
    name: 'answer',
    component: () => import(/* webpackChunkName: "answer" */ '../views/AnswerEdit.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/lobby/:room',
    name: 'lobby',
    component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
