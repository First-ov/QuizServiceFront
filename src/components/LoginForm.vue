<template>
  <div class="text-center">
    <v-btn
        color="white"
    >
      Войти
      <v-dialog
          v-model="dialog"
          activator="parent"
          width="500"
          @update:model-value="clear"
      >
        <v-card class="elevation-12">
          <v-toolbar color="white">
            <v-toolbar-title>Войти</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="UserForm" @submit.prevent="login">
              <v-text-field
                  v-model="username"
                  label="Логин"
                  prepend-icon="mdi-account"
                  :rules="[(v) => !!v || 'Это поле обязательно']"
              >
              </v-text-field>
              <v-text-field
                  v-model="password"
                  label="Пароль"
                  prepend-icon="mdi-lock"
                  :rules="[(v) => !!v || 'Это поле обязательно']"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
              >
              </v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="blue" class="mr-4">Войти</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'LoginForm',
  data() {
    return {
      dialog: false,
      username: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    ...mapActions('login', ['loginUser']),
    clear() {
      this.username = ''
      this.password = ''
    },
    async login() {
      const isValid = (await this.$refs['UserForm'].validate()).valid
      if (!isValid) {
        return
      } else {
        await this.loginUser({username: this.username, password: this.password})
      }
      if (this.isAuthenticated) {
        this.dialog = false
      }
    }

  }
}
</script>

<style></style>
