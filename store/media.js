const state = () => ({
  show: false,
  tab: 0,
  files: [],
  progress: [],
  failed: [],
  images: [],
  selectedImage: null,
  preview: false
})

const mutations = {
  SET_SHOW (state, payload) {
    state.show = payload
  },
  SET_TAB (state, payload) {
    state.tab = payload
  },
  SET_FILES (state, payload) {
    state.files = payload
  },
  ADD_FILES (state, payload) {
    state.files.push(...payload)
  },
  REMOVE_FILES (state, index) {
    state.files.splice(index, 1)
    state.progress.splice(index, 1)
    state.progress.splice(index, 1)
  },
  RESET_FILES (state) {
    state.files = []
    state.progress = []
    state.failed = []
  },
  RESET_FAILED (state, index) {
    if (index !== undefined) {
      state.failed.splice(index, 1)
    } else {
      state.failed = []
    }
  },
  SET_PROGRESS (state, payload) {
    state.progress.splice(payload.index, 1, payload.value)
  },
  SET_IMAGES (state, payload) {
    state.images = payload
  },
  SET_SELECTED_IMAGE (state, payload) {
    state.selectedImage = payload
  },
  SET_PREVIEW (state, payload) {
    state.preview = payload
  }
}

const actions = {
  toggleShow ({ commit, state }, payload = null) {
    if ([0, 1].includes(payload)) {
      commit('SET_TAB', payload)
    }
    commit('SET_SHOW', !state.show)
  },
  setTab ({ commit }, payload) {
    commit('SET_TAB', payload)
  },
  addFiles ({ commit }, payload) {
    commit('ADD_FILES', payload)
  },
  removeFiles ({ commit }, payload) {
    if (typeof payload === 'object') {
      payload.forEach((i) => {
        commit('REMOVE_FILES', i)
      })
    } else {
      commit('RESET_FILES')
    }
  },
  uploadAll ({ dispatch, state }) {
    if (!state.files.length) {
      return null
    }
    state.files.forEach((image, i) => {
      dispatch('uploadByIndex', i)
    })
  },
  uploadByIndex ({ commit, state }, index) {
    commit('RESET_FAILED', index)
    if (state.progress[index] === 100 && !state.failed.includes(index)) {
      return
    }
    const data = new FormData()
    data.append('image', state.files[index])

    this.$axios
      .post('/images', data, {
        onUploadProgress: (e) => {
          commit('SET_PROGRESS', {
            index,
            value: Math.round((e.loaded * 100) / e.total)
          })
        }
      })
      .then((res) => {
        commit('SET_PROGRESS', {
          index,
          value: 100
        })
      })
      .catch((e) => {
        state.failed.push(index)
        commit('SET_PROGRESS', {
          index,
          value: 0
        })
        if (e.response) {
          e.response.data.errors.image.forEach((error) => {
            this.$notifier.error(error)
          })
        }
      })
  },
  setImages ({ commit }) {
    this.$axios
      .$get('/images')
      .then((data) => {
        commit('SET_IMAGES', data)
      })
      .catch((e) => {
        this.$notifier.error("couldn't get images, Please try again")
      })
  },
  setSelectedImage ({ commit }, payload) {
    commit('SET_SELECTED_IMAGE', payload)
  },
  setPreview ({ commit }, payload) {
    commit('SET_PREVIEW', payload)
  }
}

const getters = {
  show (state) {
    return state.show
  },
  tab (state) {
    return state.tab
  },
  files (state) {
    return state.files
  },
  progress (state) {
    return state.progress
  },
  failed (state) {
    return state.failed
  },
  images (state) {
    return state.images
  },
  selectedImage (state) {
    return state.selectedImage
  },
  preview (state) {
    return state.preview
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
