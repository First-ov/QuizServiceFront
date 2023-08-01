<template>
  <div class="text-center">
    <v-btn
        color="white"
    >
      Регистрация
      <v-dialog
          v-model="dialog"
          activator="parent"
          width="500"
          @update:model-value="clear"
      >
        <v-card class="elevation-12">
          <v-toolbar color="white">
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="UserForm" @submit.prevent="registrate">
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
                <v-btn type="submit" color="blue" class="mr-4">Регистрация</v-btn>
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
  name: 'RegistrationForm',
  data() {
    return {
      dialog: false,
      username: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    ...mapActions('login', ['registrateUser']),
    clear() {
      this.username = ''
      this.password = ''
    },
    async registrate() {
      const isValid = (await this.$refs['UserForm'].validate()).valid
      if (!isValid) {
        return
      } else {
        const success = await this.registrateUser(
          {username: this.username, password: this.password})
        if (success) {
          this.dialog = false
        }
      }

    }

  }
}
</script>

<style></style>
