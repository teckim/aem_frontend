const state = () => ({
  teams: [],
  team: {}
})

const mutations = {
  SET_TEAMS (state, payload) {
    state.teams = payload
  },
  SET_TEAM (state, payload) {
    state.team = payload
  }
}

const actions = {
  setUserTeams ({ commit }, teams) {
    commit('SET_TEAMS', teams)
    commit('SET_TEAM', teams[0])
  },
  setUserTeam ({ commit }, team) {
    commit('SET_TEAM', team)
  }
}

const getters = {
  teams (state) {
    return state.teams
  },
  team (state) {
    return state.team
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
