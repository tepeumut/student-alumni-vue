<template>
  <div>
    <QuestionAdd :open="isOpenQuestionAddForm" @changeQuestionAddForm="isOpenQuestionAddForm = false" @refreshQuestions="refreshQuestions"/>
    <QuestionEdit :question-id="selectedQuestionId" v-if="isOpenEditForm" :open="isOpenEditForm" @changeQuestionEditForm="isOpenEditForm=false" @refreshQuestions="refreshQuestions"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <button type="button"
                      @click="isOpenQuestionAddForm = true"
                      class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Soru Ekle
              </button>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Soru
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Düzenle/Sil</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="question in questions" :key="question.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ question.question }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="javascript:void(0)" @click="selectedQuestionId=question.id; isOpenEditForm=true" class="text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
                    <a href="javascript:void(0)" @click="deleteQuestion(question.id)" class="text-gray-300 hover:text-white bg-red-600 py-2 px-4 rounded-lg">Sil</a>
                  </td>
                </tr>

                <!-- More items... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  name: "admin-surveys",
  data: () => ({
    questions: [],
    selectedQuestionId: 0,
    isOpenEditForm: false,
    isOpenQuestionAddForm: false,
  }),
  methods: {
    refreshQuestions() {
      this.$axios.get("/surveys/" + this.$route.params.id).then(res => {
        this.questions = res.data.questions;
      }).catch(err => {
        this.$toasted.error(err.response.data.message, {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      })
    },
    deleteQuestion(surveyId) {
      this.$axios.delete("/surveys/questions/" + surveyId).then(res => {
        this.$toasted.success("Başarıyla silindi!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.refreshQuestions();
      }).catch(err => {
        if (!err.response) {
          this.$toasted.error("Bilinmeyen bir hata oluştu", {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        } else {
          if (typeof err.response.data.message !== "undefined") {
            this.formErrors.push({
              id: 99,
              field: "login",
              message: err.response.data.message
            });
            return;
          }
          let errData = err.response.data.apierror;
          this.$toasted.error(errData.message, {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
          setTimeout(() => {
            this.loginLoading = false;
          }, 500);
        }
      })
    }
  },
  created() {
    this.$axios.get("/surveys/" + this.$route.params.id).then(res => {
      this.questions = res.data.questions;
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

<style scoped>

</style>
