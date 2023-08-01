<template>
  <v-app>
    <v-app-bar color="blue" app dark clipped-left clipped-right fixed>
      <v-toolbar-title class="text-uppercase">
        <span>Система тестирования</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <login-form v-if="!isAuthenticated">Войти</login-form>
      <registration-form v-if="!isAuthenticated">Регистрация</registration-form>
      <v-btn v-if="!!isAuthenticated" @click="logoutUser">Выйти</v-btn>
    </v-app-bar>
    <v-main v-if="isAuthenticated">
      <test-list v-if="!testRunning"></test-list>
      <test-card v-if="testRunning"></test-card>
    </v-main>
  </v-app>
</template>
<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import TestList from '@/components/TestList.vue'
import TestCard from '@/components/TestCard.vue'

export default {
  components: {
    TestCard,
    TestList,
    RegistrationForm,
    LoginForm
  },
  data: () => {
    return {
      isTest: undefined
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.login.isAuthenticated
    }),
    ...mapGetters('quiz', ['testRunning'])
  },
  watch:{
    test: function (){
      this.isTest = this.test
    }
  },
  methods: {
    ...mapActions('login', ['logoutUser'])
  }
}

</script>
<style scoped>

</style>
