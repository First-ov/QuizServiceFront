<template>
  <v-row
      align="center"
      class="ma-4"
      justify="center"
  >
    <v-card
        color="transparent" border-color="transparent"
        style="min-height: 200px"
        width="100%"
    >
      <v-row justify="center">
        <v-overlay
            :model-value="!list"
            contained
            class="align-center justify-center"
            persistent
        >
          <v-progress-circular
              indeterminate
              size="64"
              color="blue"
          ></v-progress-circular>
        </v-overlay>
      </v-row>
      <v-card
          v-for="test of list"
          :key="`testNo${test}`"
          style="top: 20px">
        <v-card-title>
          {{ test.name }}
        </v-card-title>
        <v-card-subtitle>
          Тест номер {{ test.id }}
        </v-card-subtitle>
        <div v-if="results[test.id]">
          <v-progress-circular
              :model-value="100*results[test.id].numOfCorrectAnswers/results[test.id].numOfAnswers"
              color="blue"
          ></v-progress-circular>
          {{ 100 * results[test.id].numOfCorrectAnswers / results[test.id].numOfAnswers }}%
          <br>
          Количество вопросов в тесте: {{ results[test.id].numOfAnswers }}
          <br>
          Количество правильных ответов: {{ results[test.id].numOfCorrectAnswers }}
        </div>
        <v-card-actions v-if="!results[test.id]">
          <v-btn
              @click="startTest(test.id)"
          >Пройти тест
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>

  </v-row>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'TestList',
  data() {
    return {
      list: undefined,
      results: undefined
    }
  },
  computed: {
    ...mapState({
      token: state => state.login.token
    })
  },
  async mounted() {
    await this.getResults()
    await this.getList()
  },
  methods: {
    ...mapActions('quiz', ['startTest']),
    async getList() {
      const response = await fetch('/api/quizzeslist/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
      )
      const data = await response.json()
      this.list = data
    },
    async getResults() {
      const response = await fetch('/api/results/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
      )
      const data = await response.json()
      this.results = {}
      await data.forEach((x) => this.results[x.quiz] = {
        numOfAnswers: x.num_of_answers,
        numOfCorrectAnswers: x.num_of_correct_answers
      })
    }
  }
}
</script>

<style scoped>

</style>