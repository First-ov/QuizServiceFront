export default {
  namespaced: true,
  state: () => {
    return {
      token: localStorage.getItem('token'),
      refresh: localStorage.getItem('refresh'),
      isAuthenticated: localStorage.getItem('isAuthenticated')
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      localStorage.setItem('token', payload.token)
      localStorage.setItem('refresh', payload.refresh)
      state.token = payload.token
      state.refresh = payload.refresh
    },
    REMOVE_TOKEN(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      state.token = null
      state.refresh = null
    },
    SET_AUTHENTICATED(state) {
      localStorage.setItem('isAuthenticated', 'true')
      state.isAuthenticated = true
    },
    SET_UNAUTHENTICATED(state) {
      localStorage.removeItem('isAuthenticated')
      state.isAuthenticated = false
    }
  },

  actions: {
    async registrateUser(ctx, payload) {
      const response = await fetch('/api/register/',
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (response.status === 201 ) {
        alert('Пользователь создан')
        return true
      }
      else {
        alert(JSON.stringify(data))
        return false
      }
    },
    async loginUser({commit}, payload) {
      const response = await fetch('/api/token/',
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      if (response.status === 200 ) {
        commit('SET_TOKEN', {token: data.access, refresh: data.refresh})
        commit('SET_AUTHENTICATED')
      }
      else {
        alert(data.detail)
      }
    },
    logoutUser({commit}) {
      commit('SET_UNAUTHENTICATED')
      commit('REMOVE_TOKEN')
    }
  }
}
