<template>
  <div>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yayınlanma Tarihi
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Düzenle/Sil</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="survey in surveys" :key="survey.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ survey.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ survey.questions.length }} Soru
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(survey.createdAt).format("DD-MM-YYYY hh:mm:ss") }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <NuxtLink :to="`/admin/surveys/` + survey.id" class="text-gray-300 hover:text-white bg-purple-600 py-2 px-4 rounded-lg">Cevaplar</NuxtLink>
                    <a href="javascript:void(0)" @click="selectedSurveyId=survey.id; isOpenEditForm=true" class="text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
                    <NuxtLink :to="`/admin/surveys/` + survey.id + `/questions`" class="text-gray-300 hover:text-white bg-indigo-600 py-2 px-4 rounded-lg">Sorular</NuxtLink>
                    <a href="javascript:void(0)" @click="deleteSurvey(survey.id)" class="text-gray-300 hover:text-white bg-red-600 py-2 px-4 rounded-lg">Sil</a>
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
    surveys: [],
    selectedSurveyId: 0,
    isOpenEditForm: false,
    isOpenSurveyAddForm: false,
  }),
  methods: {
    translateSurveyType(type) {
      let surveyType = this.surveyTypes.find(e => e.name === type);
      return typeof surveyType !== 'undefined' ? surveyType.value : "-";
    },
    refreshSurveys() {
      this.$axios.get("/surveys").then(res => {
        this.surveys = res.data;
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
    deleteSurvey(surveyId) {
      this.$axios.delete("/surveys/" + surveyId).then(res => {
        this.$toasted.success("Başarıyla silindi!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.refreshSurveys();
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
    this.$axios.get("/surveys").then(res => {
      this.surveys = res.data;
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
