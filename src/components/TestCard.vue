<template>
  <v-row
      align="center"
      class="ma-4"
      justify="center"
  >
    <v-card
        color="transparent" border-color="transparent"
        style="min-height: 250px"
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
      <v-card v-if="list" style="top: 20px">
        <v-card-title class="text-h5">
          {{testName}}
        </v-card-title>
        <v-card-subtitle>
          Тест номер  {{ testID }}
        </v-card-subtitle>
        <v-form>
          <h5>Текст вопроса</h5>
          <h3>{{list[answers.length].text}}</h3>
          <v-card-text class="d-flex flex-column">
            <div v-if="list[answers.length].multiple">
              <select v-model="selected" multiple style="min-width: 400px">
                <option v-for="answer in list[answers.length].answers" :key="answer" :value="answer.id">
                  {{answer.id}}:{{answer.text}}
                </option>
              </select>
              Выбранный ответ : {{selected}}
            </div>
            <div v-else>
              <div v-for="answer in list[answers.length].answers" :key="answer">
                <input id="one" type="radio" v-model="selected[0]" :value="answer.id"  />
                <label :for="`id${answer}`">{{answer.id}}:{{answer.text}}</label>
              </div>
              Выбранный ответ : {{selected[0]}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="list.length-1!==answers.length" color="blue" class="mr-4" @click="answerQuestion">
              Ответить
            </v-btn>
            <v-btn v-else color="blue" class="mr-4" @click="finish">
              Завершить тест
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-card>

  </v-row>

</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'TestCard',
  data() {
    return {
      list: undefined,
      results: undefined,
      testName: '',
      testID: '',
      selected: []
    }
  },
  computed: {
    ...mapState({
      test: (state) => state.quiz.test,
      answers: (state) => state.quiz.answers,
      token: (state) => state.login.token
    }
    )
  },
  async mounted() {
    await this.getTest()
  },
  methods: {
    ...mapActions('quiz', ['answer', 'finishTest']),
    async getTest() {
      const response = await fetch(
        `/api/quizzes/${this.test}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
      )
      const data = await response.json()
      this.list = data.questions
      this.testName = data.name
      this.testID = data.id
    },
    answerQuestion() {
      this.answer(this.selected)
      this.selected = []
    },
    async finish() {
      this.list = undefined
      await this.finishTest({answer: this.selected, test: this.testID})
      this.testName=''
      this.testID=''
      this.selected = []
    }
  }
}
</script>

<style scoped>

</style>