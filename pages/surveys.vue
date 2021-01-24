<template>
  <div class="flex flex-row lg:px-20 py-10 h-full">
    <div
      class="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 p-2 sm:p-5 xl:p-6 w-full">
      <NuxtLink :to="`survey/`+survey.id"
         v-for="survey in surveys"
                :key="survey.id"
         class="flex flex-row items-center justify-between rounded-md border-l-8 p-8 border-gray-600 border-t border-r border-b bg-white h-48 w-full">
        <div class="flex flex-col pr-2">
          <div class="text-xl font-medium">
            {{ survey.name }}
          </div>
          <div class="text-gray-500 text-sm mt-3">
            Oluşturulma Tarihi: {{ $moment(survey.createdAt).format("DD.MM.YYYY") }}
          </div>
        </div>
        <div class="flex flex-col items-center justify-center border-l border-gray-300 h-full pl-5">
          <div class="text-gray-600 text-2xl">{{ survey.questions.length }}</div>
          <div class="text-gray-600 ">Soru</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "surveys",
  data: () => ({
    surveys: []
  }),
  created() {
    this.$axios.get("/surveys")
    .then((res) => {
      if (res.status === 200) {
        this.surveys = res.data;
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>

</style>
