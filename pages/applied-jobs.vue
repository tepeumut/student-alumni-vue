<template>
  <div>
    <JobEdit :job-id="selectedJobId" v-if="isOpenEditForm" :open="isOpenEditForm"
             @changeJobEditForm="isOpenEditForm=false" @refreshJobs="refreshJobs"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İş
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tip
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yayınlayan Kullanıcı
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başvuru Tarihi
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>

                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="apply in jobs" :key="apply.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ apply.job.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ translateJobType(apply.job.job_type) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ apply.job.category.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ apply.job.user.name + " " + apply.job.user.lastName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(apply.createdAt).format("DD-MM-YYYY hh:mm:ss") }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="getStatusColor(apply.status)"
                    >
                      {{ getStatusName(apply.status) }}
                    </span>
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
  name: "applied-jobs",
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
      this.$axios.delete("/job-applies/" + jobId).then(res => {
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
    },
    getStatusColor(status) {
      switch (status) {
        case 'NEW':
        case 'WAITING':
          return "bg-yellow-100 text-yellow-800";
        case 'RESERVED':
          return "bg-green-100 text-green-800";
        default:
          return "bg-red-100 text-red-800";
      }
    },
    getStatusName(status) {
      switch (status) {
        case 'NEW':
          return "Yeni";
        case 'WAITING':
          return "İşlem bekleniyor";
        case 'RESERVED':
          return "Tamamlandı";
        case 'CANCELLED':
          return "İptal Edildı";
        case 'REJECTED':
          return "Reddedildi";
        default:
          return "Bilinmeyen";
      }
    },
  },
  created() {
    this.$axios.get("/job-applies/my-applied").then(res => {
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
