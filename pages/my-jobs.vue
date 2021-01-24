<template>
  <div>
    <JobEdit :job-id="selectedJobId" v-if="isOpenEditForm" :open="isOpenEditForm" @changeJobEditForm="isOpenEditForm=false" @refreshJobs="refreshJobs"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İş
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
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
                <tr v-for="job in jobs" :key="job.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ job.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ translateJobType(job.job_type)}}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ job.category.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(job.created_at).format("DD-MM-YYYY hh:mm:ss") }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <NuxtLink :to="`/applies/` + job.id" class="text-gray-300 hover:text-white bg-purple-600 py-2 px-4 rounded-lg">İş Başvuruları</NuxtLink>
                    <a href="javascript:void(0)" @click="selectedJobId=job.id; isOpenEditForm=true" class="text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
                    <a href="javascript:void(0)" @click="deleteJob(job.id)" class="text-gray-300 hover:text-white bg-red-600 py-2 px-4 rounded-lg">Sil</a>
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
  name: "my-jobs",
  data: () => ({
    jobs: [],
    selectedJobId: 0,
    isOpenEditForm: false,
    jobTypes: [
      {id: 11, name: "FULLTIME", value: "Tam Zamanlı"},
      {id: 22, name: "PARTTIME", value: "Yarı Zamanlı"},
      {id: 33, name: "REMOTE", value: "Remote"},
      {id: 44, name: "PROJECT", value: "Proje Bazlı"},
      {id: 55, name: "INTERN", value: "Stajyer"},
    ],
  }),
  methods: {
    translateJobType(type) {
      let jobType = this.jobTypes.find(e => e.name === type);
      return typeof jobType !== 'undefined' ? jobType.value : "-";
    },
    refreshJobs() {
      this.$axios.get("/jobs/my-jobs").then(res => {
        this.jobs = res.data;
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
    deleteJob(jobId) {
      this.$axios.delete("/jobs/" + jobId).then(res => {
        this.$toasted.success("Başarıyla silindi!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.refreshJobs();
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
    this.$axios.get("/jobs/my-jobs").then(res => {
      this.jobs = res.data;
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
