<template>
  <transition
    enter-active-class="ease-in-out duration-500"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in-out duration-500"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 overflow-hidden z-20" v-show="open">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
            <transition
              enter-active-class="ease-in-out duration-500"
              enter-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="ease-in-out duration-500"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div class="relative w-screen max-w-5xl">
                <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                  <button
                    @click="changeForm"
                    class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span class="sr-only">Close panel</span>
                    <!-- Heroicon name: x -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div class="px-4 sm:px-6  md:px-12 flex flex-row justify-between items-center">
                    <div class="flex flex-col">
                      <h2 id="slide-over-heading-2" class="text-xl font-medium text-gray-900 mb-2">
                        Cevaplar
                      </h2>
                    </div>
                    <div class="flex">
                    </div>
                  </div>
                  <hr class="mt-8">
                  <div class="mt-6 relative flex-1 px-4 md:px-12 sm:px-6 z-30">
                    <div class="text-2xl font-semibold">
                      {{ question.question }}
                    </div>
                    <div v-if="question.type === 'INPUT' || question.type === 'TEXT'">
                      <div v-for="answer in answers">
                        <div class="mt-8">
                          <div>{{ answer.user.name + " " + answer.user.lastName}}</div>
                          <textarea readonly id="about" name="about" rows="3"
                                    class="shadow-sm border focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="" v-model="answer.answer"></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="my-5" v-else-if="question.type === 'QUALITY'">
                      <div class="grid grid-cols-10 w-full">
                        <span class="flex justify-center items-center h-16 text-xl border-t-2 border-b-2 border-r-2"
                              :class="{'border-2 rounded-l-lg rounded-bl-lg': i===1, 'rounded-r-lg': i===10, 'bg-green-300 text-white': i===avgQuality}"
                              v-for="i in 10">{{
                            i
                          }}</span>
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
                          <div class="flex items-start"
                               v-for="box in questionData"
                               :key="box.id">
                            <div class="flex items-center h-5">
                              <input :id="`comment_` + box.id" name="checkbox"
                                     :value="box.value" type="checkbox"
                                     class="border focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" disabled>
                            </div>
                            <div class="ml-3 text-sm">
                              <label :for="`comment_` + box.id" class="font-medium text-gray-700">{{
                                  box.name
                                }}</label>

                            </div>
                            <div class="flex flex-row justify-center items-center ml-8">
                              <span class="font-medium mr-4 text-gray-700">%{{ box.percent }}</span>
                              <div class="w-64 bg-gray-200 h-2 relative overflow-hidden rounded-full">
                                <div
                                  class="h-full progressbar bg-green-500 rounded-full"
                                  role="progressbar"
                                  :style="{width: `${box.percent}%`}"
                                  :aria-valuenow="box.percent"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                    <span class="flex items-center h-full">
                                      <slot></slot>
                                    </span>
                                </div>
                              </div>
                              <div class="ml-3">
                                {{ box.answerCount }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6" v-else-if="question.type === 'RADIO'">
                      <fieldset>
                        <div class="mt-4 space-y-4">
                          <div class="flex items-start" v-for="box in questionData"
                               :key="box.id">
                            <div class="flex items-center h-5">
                              <input :id="`comment_` + box.id" name="checkbox"
                                     :value="box.value" type="radio"
                                     class="border focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" disabled>

                            </div>
                            <div class="ml-3 text-sm flex flex-row">
                              <label :for="`comment_` + box.id" class="ml-3 block text-sm font-medium text-gray-700">{{
                                  box.name
                                }}</label>

                              <div class="flex flex-row justify-center items-center ml-8">
                                <span class="font-medium mr-4 text-gray-700">%{{ box.percent }}</span>
                                <div class="w-64 bg-gray-200 h-2 relative overflow-hidden rounded-full">
                                  <div
                                    class="h-full progressbar bg-green-500 rounded-full"
                                    role="progressbar"
                                    :style="{width: `${box.percent}%`}"
                                    :aria-valuenow="box.percent"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    <span class="flex items-center h-full">
                                      <slot></slot>
                                    </span>
                                  </div>
                                </div>
                                <div class="ml-3">
                                  {{ box.answerCount }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div class="hidden sm:block" aria-hidden="true">
                      <div class="py-5">
                        <div class="border-t border-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </section>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "JobCategoryEdit",
  props: {
    open: Boolean,
    questionId: Number,
  },
  data: () => ({
    dialogLoading: false,
    loginLoading: false,
    answers: {},
    question: {},
    formErrors: [],
    avgQuality: 0,
    percents: [],
    questionData: [],
  }),
  methods: {
    changeForm() {
      this.$emit("changeQuestionForm");
    },
    getPercents() {
      this.$axios.get(`/surveys/questions/${this.questionId}/percents`).then(res => {
        this.percents = res.data;
        this.questionData.forEach(e => {
          e.percent = Math.round(this.percents[e.value] / this.questionData.length*100);
          e.answerCount = this.percents[e.value];
          e.value = 0;
        });
      }).catch(err => {
        this.$toasted.error(err.response.data.message, {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    getAvgQuality() {
      let avgQuality = 0;
      this.answers.forEach(a => {
        avgQuality += parseInt(a.answer);
      });
      this.avgQuality = Math.round(avgQuality/this.answers.length);
    }
  },
  created() {
    this.$axios.get(`/surveys/questions/${this.questionId}/answers-full`).then(res => {
      this.answers = res.data;
      this.$axios.get(`/surveys/questions/${this.questionId}`).then(res => {
        this.question = res.data;
        if (this.question.type === 'RADIO' || this.question.type === 'CHECKBOX') {
          this.getPercents();
          this.questionData = JSON.parse(this.question.data);
          this.questionData.map(c => {
            c.percent = 0; c.answerCount = 0;
          });
        }
        if (this.question.type === 'QUALITY') {
          this.getAvgQuality();
        }
      });
    }).catch(err => {
      this.$toasted.error(err.response.data.message, {
        theme: "toasted-primary",
        position: "top-center",
        icon: 'warning',
        iconPack: "material",
        duration: 5000
      });
    })
  }
}
</script>
