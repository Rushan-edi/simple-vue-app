import AuthenticationService from '@/services/AuthenticationService'

const state = {
  url: process.env.VUE_APP_URL,
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isUserLoggedIn: localStorage.getItem('token') || false
}

const getters = {
  getUrl: (state) => {
    return state.url
  },
  isAuthenticated: (state) => {
    return state.isUserLoggedIn
  },
  getToken: (state) => {
    return state.token
  },
  currentUser: (state) => {
    return state.user
  }
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      state.isUserLoggedIn = true
    } else {
      state.isUserLoggedIn = false
    }
  },
  SET_USER_DATA(state, data) {
    state.user = data
  },
  CLEAR_AUTH(state) {
    state.token = null
    state.user = null
    state.isUserLoggedIn = false
  }
}

const actions = {
  signIn({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      AuthenticationService.signIn(credentials)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          commit('SET_TOKEN', data.token)
          localStorage.setItem('user', JSON.stringify({email : data.email, first_name: data.first_name,photoUrl: data.image}))
          commit('SET_USER_DATA', {email : data.email, first_name: data.first_name , photoUrl: data.image})
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  },
  signOut({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    commit('CLEAR_AUTH')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
