export default {
  namespaced: true,
  state: () => {
    return {
      test: localStorage.getItem('test'),
      answers: JSON.parse(localStorage.getItem('answers'))
    }
  },
  getters: {
    testRunning(state) {
      return !!state.test
    }
  },
  mutations: {
    SET_TEST(state, test) {
      localStorage.setItem('test', test)
      state.test = test
      localStorage.setItem('answers', JSON.stringify([]))
      state.answers = []
    },
    FINISH_TEST(state) {
      localStorage.removeItem('test')
      state.test = undefined
      localStorage.removeItem('answers')
      state.answers = undefined
    },
    SET_ANSWER(state, answer) {
      const answers = JSON.parse(localStorage.getItem('answers'))
      answers.push(answer)
      localStorage.setItem('answers', JSON.stringify(answers))
      state.answers = answers
    }

  },
  //
  actions: {
    startTest({commit}, test) {
      commit('SET_TEST', test)
    },
    answer({commit}, answer) {
      commit('SET_ANSWER', answer)
    },
    async finishTest({commit, state, rootState}, payload) {
      commit('SET_ANSWER', payload.answer)
      const response = await fetch(
        '/api/test/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${rootState.login.token}`
          },
          body: JSON.stringify({test:payload.test,answers:state.answers})
        }
      )
      const data = await response.json()
      data
      commit('FINISH_TEST')
    }
  }
}
