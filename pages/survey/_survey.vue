<template>
  <div>
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 border">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="ml-3 font-medium text-gray-600 truncate text-xl">Soru {{ currentQuestion + 1 }}</div>
        </div>
        <div class="flex flex-row justify-center items-center">
          <span class="font-medium mr-4 text-gray-700" v-show="percent > 0">%{{ percent }}</span>
          <div class="w-64 bg-gray-200 h-2 relative overflow-hidden rounded-full">
            <div
              class="h-full progressbar bg-green-500 rounded-full"
              role="progressbar"
              :style="{width: `${percent}%`}"
              :aria-valuenow="percent"
              aria-valuemin="0"
              aria-valuemax="100"
            >
        <span class="flex items-center h-full">
            <slot></slot>
        </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-24 mb-24">
      <div class="w-1/3">
        <div class="text-2xl font-semibold">
          {{ question.question }}
        </div>
        <div class="mt-8" v-if="question.type === 'INPUT'">
          <input id="about2" name="about2" rows="3"
                    class="p-3 shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="" v-model="answer.answer"/>
        </div>
        <div class="mt-8" v-else-if="question.type === 'TEXT'">
          <textarea id="about" name="about" rows="3"
                    class="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="" v-model="answer.answer"></textarea>
        </div>
        <div class="my-5" v-else-if="question.type === 'QUALITY'">
          <div class="grid grid-cols-10 w-full">
<!--            <span class="flex justify-center items-center h-16 text-xl border-2 rounded-l-lg rounded-bl-lg">1</span>-->
            <span class="flex justify-center items-center h-16 text-xl border-t-2 border-b-2 border-r-2"
                  :class="{'border-2 rounded-l-lg rounded-bl-lg': i===1, 'rounded-r-lg': i===10, 'bg-green-300 text-white': i===parseInt(answer.answer)}"
                  @click="answer.answer = i"
                  v-for="i in 10">{{
                i
              }}</span>
<!--            <span class="flex justify-center items-center h-16 text-xl bg-green-300 text-white rounded-r-lg">10</span>-->
          </div>
          <div class="flex justify-between items-center mt-3">
            <span class="text-gray-600">Çok Kötü</span>
            <span class="text-gray-600">Çok İyi</span>
          </div>
        </div>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6" v-else-if="question.type === 'CHECKBOX'">
          <fieldset>
            <legend class="text-base font-medium text-gray-900"></legend>
            <div class="mt-4 space-y-4">
              <div class="flex items-start" v-for="box in (this.question.data !== '[]' && JSON.parse(this.question.data)) " :key="box.id">
                <div class="flex items-center h-5">
                  <input :id="`comment_` + box.id" name="checkbox" v-model="answerCheckbox"  :value="box.value" type="checkbox"
                         class="border focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label :for="`comment_` + box.id" class="font-medium text-gray-700">{{ box.name }}</label>
                  <p class="text-gray-500" v-if="box.text">{{ box.text }}</p>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6" v-else-if="question.type === 'RADIO'">
          <fieldset>
            <div class="mt-4 space-y-4">
              <div class="flex items-start" v-for="box in (JSON.parse(this.question.data)) " :key="box.id">
                <div class="flex items-center h-5">
                  <input :id="`comment_` + box.id" name="checkbox" v-model="answerCheckbox"  :value="box.value" type="radio"
                         class="border focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300">
                </div>
                <div class="ml-3 text-sm">
                  <label :for="`comment_` + box.id" class="ml-3 block text-sm font-medium text-gray-700">{{ box.name }}</label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="flex flex-row mt-5 space-x-2">
          <button @click="preQuestion()" type="button"
                  :class="{'opacity-50': currentQuestion < 1, 'cursor-not-allowed': currentQuestion < 1}"
                  class="inline-flex justify-between items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  :disabled="currentQuestion < 1">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Previous
          </button>
          <button @click="nextQuestion()" type="button"
                  :class="{'opacity-50': currentQuestion+1 > questions.length, 'cursor-not-allowed': currentQuestion+1 > questions.length}"
                  class="inline-flex justify-between items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            {{ currentQuestion + 1 >= questions.length ? "Finish" : "Next" }}
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "survey_detail",
  data: () => ({
    questions: [],
    answer: {},
    percent: 0,
    currentQuestion: 0,
    question: {},
    answerCheckbox: [],
    answerRadio: "",

  }),
  methods: {
    nextQuestion() {
      this.updateAnswer();
      this.currentQuestion++;
      if (this.currentQuestion >= this.questions.length) {
        // finish!
        this.$toasted.success("Anket başarıyla bitirildi", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        return this.$router.push("/surveys");
      }
      if (typeof this.questions[this.currentQuestion] === "undefined") {
        this.$toasted.error("Soru bulunamadı", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
        return this.$router.push("/surveys");
      }
      this.question = this.questions[this.currentQuestion];
      this.getAnswer();
    },
    preQuestion() {
      this.updateAnswer();
      this.currentQuestion--;
      if (typeof this.questions[this.currentQuestion] === "undefined") {
        return this.$router.push("/surveys");
      }
      this.question = this.questions[this.currentQuestion];
      this.getAnswer();
    },
    getAnswer() {
      let surveyId = this.$route.params.survey;
      this.$axios.get("/surveys/questions/" + this.question.id + "/answers")
        .then(res => {
          if (res.status === 200 && res.data !== "") {
            this.answer = res.data;
            if (this.question.type === "CHECKBOX") {
              this.answerCheckbox = [];
              let checkedBox = JSON.parse(res.data.answer);
              if (checkedBox != null) {
                checkedBox.forEach(e => {
                  this.answerCheckbox.push(e);
                })
              }
            }
            if (this.question.type === "RADIO") {
              this.answerCheckbox = res.data.answer;
            }
          } else {
            this.answer = {
              answer: ""
            }
          }
        }).catch(err => {
        console.log(err);
        this.answer = {
          answer: ""
        }
      })
    },
    updateAnswer() {
      if (this.question.type === "CHECKBOX") {
        this.answer.answer = JSON.stringify(this.answerCheckbox);
      }
      if (this.question.type === "RADIO") {
        this.answer.answer = this.answerCheckbox;
      }
      if (typeof this.answer.id === "undefined" || this.answer.id === null) {
        this.$axios.post("/surveys/questions/" + this.question.id + "/answers", {
          answer: this.answer.answer
        })
          .then(res => {
          }).catch(err => {
          this.$toasted.error(err.response.data.message, {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        })
      } else {
        this.$axios.put("/surveys/answers/" + this.answer.id, {
          answer: this.answer.answer
        })
          .then(res => {
            console.log(res.data);
          }).catch(err => {
          console.log(err);
        })
      }
    }
  },
  created() {
    let surveyId = this.$route.params.survey;
    this.$axios.get("/surveys/" + surveyId)
      .then((res) => {
        if (res.status === 200) {
          this.percent = 0;
          this.currentQuestion = 0;
          this.questions = res.data.questions;
          if (typeof this.questions[this.currentQuestion] === "undefined") {
            this.$toasted.error("Soru bulunamadı", {
              theme: "toasted-primary",
              position: "top-center",
              icon: 'warning',
              iconPack: "material",
              duration: 5000
            });
            return this.$router.push("/surveys");
          }
          this.question = this.questions[this.currentQuestion];
          this.getAnswer();
        }
      }).catch(err => {
        let error = err.response.data ?? false;
        if (error === false) {
          this.$toasted.error("Soru bulunamadı", {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        } else {
          this.$toasted.error(error.message, {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        }
        this.$router.push("/surveys");
    });

  }
}
</script>

<style scoped>

</style>
