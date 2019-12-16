import store from '../store'

export default (err) => {
  store.commit('SET_ALERT', true)
  console.log(err)
  if (err.data) {
    store.commit('SET_ALERT_MESSAGE', err.data.message)
  }
  setTimeout(() => {
    store.commit('SET_ALERT', false)
  }, 3000)
}
