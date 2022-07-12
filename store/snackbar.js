const state = () => ({
  content: '',
  color: '',
  timeout: 2000
})

// mutations
const mutations = {
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.timeout = payload.timeout
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
