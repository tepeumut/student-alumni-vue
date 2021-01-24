<template>
  <div>
    <div v-if="isOpenApplyForm">
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="fixed inset-0 overflow-hidden z-20">
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute inset-0 bg-gray-1000 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
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
                        @click="isOpenApplyForm = false"
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
                            Başvuru Görüntüle
                          </h2>
                        </div>
                        <div class="flex">
                        </div>
                      </div>
                      <hr class="mt-8">
                      <div class="mt-6 relative flex-1 px-4 md:px-12 sm:px-6 z-30">
                        <div class="bg-white shadow">
                          <div class="md:grid md:grid-cols-3 md:gap-6">
                            <div class="md:col-span-1">
                              <div class="px-4 sm:px-0">
                                <h3 class="text-lg font-medium leading-6 text-gray-900">Başvuru Detayları</h3>
                              </div>
                            </div>
                            <div class="mt-5 md:mt-0 md:col-span-2">
                              <dl>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    Ad Soyad
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ selectedJobApply.user.name + " " + selectedJobApply.user.lastName }}
                                  </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    İş İlanı
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ selectedJobApply.job.name }}
                                  </dd>
                                </div>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    E-posta Adresi
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ selectedJobApply.user.email }}
                                  </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    Telefon
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ selectedJobApply.user.phone }}
                                  </dd>
                                </div>
                                <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    Ön Bilgi
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ selectedJobApply.about }}
                                  </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    Belgeler
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                                      <li v-for="file in selectedJobApply.files" :key="file.id"
                                          class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div class="w-0 flex-1 flex items-center">
                                          <!-- Heroicon name: paper-clip -->
                                          <svg class="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
                                          </svg>
                                          <span class="ml-2 flex-1 w-0 truncate">
                                          {{ file.file }}
                                        </span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                          <a :href="`http://localhost:8080/files/` + file.file"  target="_blank" class="font-medium text-indigo-600 hover:text-indigo-500">
                                            İndir
                                          </a>
                                        </div>
                                      </li>
                                    </ul>
                                  </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                  <dt class="text-sm font-medium text-gray-500">
                                    Durum Güncelle
                                  </dt>
                                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div class="col-span-6 sm:col-span-3">
                                      <select v-model="job_apply_status" id="country" name="country" autocomplete="country"
                                              class="border mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option :value="category.name" v-for="category in jobStatus" :key="category.id">
                                          {{ category.value }}
                                        </option>
                                      </select>
                                      <button
                                        :class="{'btn-loading':loginLoading}"
                                        @click="handledjobApplyUpdate"
                                        class="inline-flex mt-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Güncelle
                                      </button>
                                    </div>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>

                        <div class="hidden sm:block" aria-hidden="true">
                          <div class="py-5">
                            <div class="border-t border-gray-200"></div>
                          </div>
                        </div>
                        <!-- /End replace -->
                      </div>
                    </div>
                  </div>
                </transition>
              </section>
            </transition>
          </div>
        </div>
      </transition>
    </div>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
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
                    Başvuran Kullanıcı
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Başvuru Tarihi
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Görüntüle</span>
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
                    {{ apply.user.name + " " + apply.user.lastName }}
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
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="javascript:void(0)" @click="selectedJobApply=apply; isOpenApplyForm=true" class="text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Görüntüle</a>
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
  name: "id-applied-jobs",
  data: () => ({
    jobs: [],
    selectedJobApply: {},
    loginLoading: false,
    job_apply_status: "",
    isOpenEditForm: false,
    isOpenApplyForm: false,
    changeJobEditForm: false,
    jobTypes: [
      {id: 11, name: "FULLTIME", value: "Tam Zamanlı"},
      {id: 22, name: "PARTTIME", value: "Yarı Zamanlı"},
      {id: 33, name: "REMOTE", value: "Remote"},
      {id: 44, name: "PROJECT", value: "Proje Bazlı"},
      {id: 55, name: "INTERN", value: "Stajyer"},
    ],
    jobStatus: [
      {id: 12, name: "NEW", value: "Yeni"},
      {id: 13, name: "WAITING", value: "İşlem bekleniyor"},
      {id: 14, name: "RESERVED", value: "Tamamlandı"},
      {id: 15, name: "CANCELLED", value: "İptal Edildı"},
      {id: 16, name: "REJECTED", value: "Reddedildi"},
    ]
  }),
  methods: {
    translateJobType(type) {
      let jobType = this.jobTypes.find(e => e.name === type);
      return typeof jobType !== 'undefined' ? jobType.value : "-";
    },
    refreshJobs() {
      this.$axios.get("/job-applies/" + this.$route.params.id).then(res => {
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
    handledjobApplyUpdate() {
      this.$axios.put("/job-applies/" + this.selectedJobApply.id, {
        status: this.job_apply_status
      })
        .then(res => {
          this.$toasted.success("Başarıyla güncellendi", {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'check',
            iconPack: "material",
            duration: 5000
          });
          this.refreshJobs();
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
  },
  created() {
    this.$axios.get("/job-applies/" + this.$route.params.id).then(res => {
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
