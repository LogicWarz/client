import store from '../store'

export default (err) => {
  console.log(err.response)
  console.log(err.data)
  console.log(JSON.stringify(err))
  store.commit('SET_ALERT', true)
  console.log(err)
  if (err.data) {
    store.commit('SET_ALERT_MESSAGE', err.data.message)
  } else if (err.message) {
    store.commit('SET_ALERT_MESSAGE', err.message)
  }
  setTimeout(() => {
    store.commit('SET_ALERT', false)
  }, 3000)
}
