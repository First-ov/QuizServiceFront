import Vuex from 'vuex'

import login from '@/store/modules/login'
import quiz from '@/store/modules/quiz'

export default new Vuex.Store({

  modules: {
    login,
    quiz
  }
})
