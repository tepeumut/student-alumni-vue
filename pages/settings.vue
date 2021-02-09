<template>
  <div>
    <UserJobAdd :open="isOpenJobAddForm" @changeUserJobAddForm="isOpenJobAddForm = false" @refreshUserJobs="refreshUser"/>
    <UserJobEdit :job-id="selectedUserJobId" v-if="isOpenJobEditForm" :open="isOpenJobEditForm" @changeUserJobEditForm="isOpenJobEditForm = false" @refreshUserJobs="refreshUser"/>
    <UserAccountAdd :open="isOpenAccountAddForm" @changeUserAccountAddForm="isOpenAccountAddForm = false" @refreshUserAccounts="refreshUser"/>
    <UserAccountEdit :account-id="selectedUserAccountId" v-if="isOpenAccountEditForm" :open="isOpenAccountEditForm" @changeUserAccountEditForm="isOpenAccountEditForm = false" @refreshUserAccounts="refreshUser"/>

    <div class="pt-16 pl-32 pr-32">
      <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profil</h3>
              <p class="mt-1 text-sm text-gray-600">
                Profilinizdeki bilgileri buradan düzenleyebilirsiniz.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" @submit.prevent="handleProfileForm">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">
                      Hakkımda
                    </label>
                    <div class="mt-1">
                      <textarea id="about" v-model="user.about" name="about" rows="3" class="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Profiliniz için kısa açıklama
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Profil Fotoğrafı
                    </label>
                    <div class="mt-2 flex items-center">
                <span class="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                  <img class=""
                       :src="$auth.user.profileImage === null ? `https://via.placeholder.com/256` : siteURL + 'files/' + $auth.user.profileImage"
                       alt="">
                </span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Profil Fotoğrafı Güncelle
                    </label>
                    <div
                      class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                      v-cloak @drop.prevent="addFile" @dragover.prevent>
                      <div class="space-y-1 text-center" v-if="!profileImage.name">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                             viewBox="0 0 48 48" aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload"
                                 class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Dosya seçin</span>
                            <input @change="addFile" ref="inputFile" id="file-upload" name="file-upload" type="file"
                                   class="sr-only" accept="image/*">
                          </label>
                          <p class="pl-1">veya sürükleyip bırakın</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, JPEG
                        </p>
                      </div>
                      <div class="flex flex-col justify-center items-center" v-else>
                        <img :src="profileImageData" class="h-32 w-32" alt="">
                        <button type="button" @click="removeFile" class="mt-3 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          İptal Et
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 sm:col-span-3">
                    <label for="job_status" class="block text-sm font-medium text-gray-700">İş Durumu</label>
                    <select required v-model="user.jobStatus" id="job_status" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="true">İş Arıyorum</option>
                      <option value="false">İş Aramıyorum</option>
                    </select>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Kaydet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Kişisel Bilgiler</h3>
              <p class="mt-1 text-sm text-gray-600">
                Bilgilerinizi buradan güncelleyebilirsiniz.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" @submit.prevent="handlePersonnelForm">
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="first_name" class="block text-sm font-medium text-gray-700">Ad</label>
                      <input v-model="user.name" type="text" name="first_name" id="first_name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="last_name" class="block text-sm font-medium text-gray-700">Soyad</label>
                      <input v-model="user.lastName" type="text" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>

                    <div class="col-span-6 sm:col-span-4">
                      <label for="email_address" class="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                      <input v-model="user.email" type="text" name="email_address" id="email_address" autocomplete="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>


                    <div class="col-span-6 sm:col-span-3">
                      <label for="country" class="block text-sm font-medium text-gray-700">Fakülte</label>
                      <select @change="refreshDepartments" v-model="selectedFacultyId" id="country" name="country" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option :value="faculty.id" v-for="faculty in faculties" :key="faculty.id">{{ faculty.name }}</option>
                      </select>
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="department" class="block text-sm font-medium text-gray-700">Bölüm</label>
                      <select v-model="selectedDepartmentId" id="department" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option :value="department.id" v-for="department in departments" :key="department.id">{{ department.name }}</option>
                      </select>
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label for="phone" class="block text-sm font-medium text-gray-700">Telefon</label>
                      <input type="text"
                             v-model="user.phone"
                             v-mask="'+90 ### ### ## ##'"
                             id="phone" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Kaydet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0 mb-24">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">İşler</h3>
              <p class="mt-1 text-sm text-gray-600">
                İş geçmişinizi buradan düzenleyebilirsiniz.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <button type="button"
                    @click="isOpenJobAddForm = true"
                    class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              İş Deneyimi Ekle
            </button>
            <table class="divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Şirket Adı
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pozisyon
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç Tarihi
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş Tarihi
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Düzenle/Sil</span>
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="job in user.jobs" :key="job.id">
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
                  <div class="text-sm text-gray-900">{{ job.position }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ $moment(job.startDate).format("DD-MM-YYYY") }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ job.endDate===null ? "-" : $moment(job.endDate).format("DD-MM-YYYY") }}
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium flex flex-row space-x-2">
                  <a href="javascript:void(0)" @click="selectedUserJobId=job.id; isOpenJobEditForm=true" class="p-2 text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
                  <a href="javascript:void(0)" @click="deleteUserJob(job.id)" class="p-2 text-gray-300 hover:text-white bg-red-600 py-2 px-4 rounded-lg">Sil</a>
                </td>
              </tr>
              <!-- More items... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200"></div>
        </div>
      </div>

      <div class="mt-10 sm:mt-0 mb-24">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Sosyal Medya Hesapları</h3>
              <p class="mt-1 text-sm text-gray-600">
                Sosyal medya hesaplarınızı buradan düzenleyebilirsiniz.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <button type="button"
                    @click="isOpenAccountAddForm = true"
                    class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Hesap Ekle
            </button>
            <table class="divide-y divide-gray-200">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hesap Adı
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Düzenle/Sil</span>
                </th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="account in user.accounts" :key="account.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ getAccountIconToName(account.icon) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ account.link }}</div>
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium flex flex-row space-x-2">
                  <a href="javascript:void(0)" @click="selectedUserAccountId=account.id; isOpenAccountEditForm=true" class="p-2 text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
                  <a href="javascript:void(0)" @click="deleteUserAccount(account.id)" class="p-2 text-gray-300 hover:text-white bg-red-600 py-2 px-4 rounded-lg">Sil</a>
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
</template>

<script>
export default {
  name: "settings",
  data: () => ({
    user: {},
    profileImage: {},
    profileImageData: "",
    siteURL: process.env.siteURL,
    faculties: [],
    departments: [],
    selectedFacultyId: 0,
    selectedDepartmentId: 0,
    isOpenJobAddForm: false,
    isOpenJobEditForm: false,
    selectedUserJobId: 0,
    isOpenAccountAddForm: false,
    isOpenAccountEditForm: false,
    selectedUserAccountId: 0,
    accounts: [
      {id:1, name:"Facebook", value: "facebook-square"},
      {id:2, name:"Twitter", value: "twitter-square"},
      {id:3, name:"Linkedin", value: "linkedin"},
      {id:4, name:"Github", value: "github-square"},
      {id:5, name:"Instagram", value: "instagram-square"},
      {id:6, name:"Medium", value: "medium"},
      {id:7, name:"Skype", value: "skype"},
      {id:8, name:"Steam", value: "steam-square"},
      {id:9, name:"Telegram", value: "telegram"},
      {id:10, name:"Wordpress", value: "wordpress"},
      {id:11, name:"Youtube", value: "youtube"},
      {id:12, name:"Viber", value: "viber"},
      {id:13, name:"Twitch", value: "twitch"},
      {id:14, name:"Reddit", value: "reddit-square"},
      {id:15, name:"HackerNews", value: "hacker-news-square"},
      {id:16, name:"Hacker Rank", value: "hackerrank"},
      {id:17, name:"Messenger", value: "facebook-messenger"},
      {id:18, name:"Behance", value: "behance-square"},
      {id:19, name:"Dribbble", value: "dribbble-square"},
    ]
  }),
  methods: {
    addFile(e) {
      let droppedFiles;
      if (typeof e.target.files !== 'undefined') {
        droppedFiles = e.target.files;
      } else if (typeof e.dataTransfer !== 'undefined') {
        droppedFiles = e.dataTransfer.files;
      }
      if (!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        let types = [
          "image/jpeg",
          "image/jpg",
          "image/png"
        ]
        if (types.indexOf(f.type) !== -1) {
          this.profileImage = f;
          let reader = new FileReader();
          reader.onload = (e) => {
            this.profileImageData = e.target.result;
          }
          reader.readAsDataURL(this.profileImage);
        } else {
          this.$toasted.error("Yüklemeye çalıştığınız dosya türüne izin verilmiyor. " + f.name, {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        }
      });
    },
    removeFile() {
      this.profileImage = {};
    },
    handleProfileForm(e) {
      let formData = new FormData();
      if (this.profileImage.name !== 'undefined') {
        formData.append("image", this.profileImage);
      }
      formData.append("about", this.user.about);
      formData.append("job_status", this.user.jobStatus);
      this.$axios.post("/auth/user", formData, {}).then(res => {
        this.$toasted.success("Profil başarıyla güncellendi", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.profileImage = {};
        this.profileImageData = "";
        this.$auth.fetchUser();
      }).catch(err => {
        let message;
        let error = err.response.data;
        if (typeof error.apierror !== 'undefined') {
          message = error.apierror.message
        }
        if (typeof err.response.data.message !== 'undefined') {
          message = err.response.data.message
        }
        this.$toasted.error(message, {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    handlePersonnelForm(e) {
      this.user.departmentId = this.selectedDepartmentId;
      this.$axios.post("/auth/user-personnel", this.user, {}).then(res => {
        this.$toasted.success("Profil başarıyla güncellendi", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
      }).catch(err => {
        let message;
        let error = err.response.data;
        if (typeof error.apierror !== 'undefined') {
          message = error.apierror.message
        }
        if (typeof err.response.data.message !== 'undefined') {
          message = err.response.data.message
        }
        this.$toasted.error(message, {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    refreshDepartments() {
      this.$axios.get(`/faculty-departments/${this.selectedFacultyId}`).then(res => {
        this.departments = res.data;
      }).catch(err => {
        this.$toasted.error("Sunucu hatası!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      })
    },
    deleteUserJob(id) {
      this.$axios.delete("/user-jobs/" + id).then(res => {
        this.$toasted.success("Başarıyla silindi!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
        this.refreshUser();
      }).catch(err => {
        this.$toasted.error("Sunucu hatası!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    deleteUserAccount(id) {
      this.$axios.delete("/user-accounts/" + id).then(res => {
        this.$toasted.success("Başarıyla silindi!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
        this.refreshUser();
      }).catch(err => {
        this.$toasted.error("Sunucu hatası!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    refreshUser() {
      this.$axios.get("/auth/user").then(res => {
        this.user = res.data.user;
        if (this.user.department !== null) {
          this.selectedFacultyId = this.user.department.faculty.id;
          this.selectedDepartmentId = this.user.department.id;
          this.refreshDepartments();
        }
      }).catch(err => {
        this.$toasted.error("Sunucu hatası!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
      this.$auth.fetchUser();
    },
    getAccountIconToName(icon) {
      let account = this.accounts.find(e => e.value === icon);
      if (typeof account === 'undefined') {
        return "-Bilinmeyen-";
      }
      return account.name;
    }
  },
  created() {
    this.refreshUser();
    this.$axios.get("/faculties").then(res => {
      this.faculties = res.data;
    }).catch(err => {
      this.$toasted.error("Sunucu hatası!", {
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
