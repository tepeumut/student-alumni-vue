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
                    @click="changeUserAddForm"
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
                        Yeni Kullanıcı Ekle
                      </h2>
                    </div>
                    <div class="flex">
                    </div>
                  </div>
                  <hr class="mt-8">
                  <div class="mt-6 relative flex-1 px-4 md:px-12 sm:px-6 z-30">
                    <!-- Replace with your content -->
                    <div>
                      <div class="mt-5 md:mt-0 md:col-span-2 min-h-full">
                        <form action="#" method="POST" @submit.prevent="handleAddForm">
                          <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                              <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"
                                   v-for="formError in formErrors"
                                   :key="formError.id">
                                  <span class="text-xl inline-block mr-5 align-middle">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                    </svg>
                                  </span>
                                <span class="inline-block align-middle mr-8">
                                    <b class="capitalize">Hata</b> {{ formError.message }}
                                  </span>
                              </div>
                              <div class="grid grid-cols-6 gap-6 mb-5">
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name" class="block text-sm font-medium text-gray-700">Ad</label>
                                  <input type="text" name="name" id="name" v-model="user.name"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name3" class="block text-sm font-medium text-gray-700">Soyad</label>
                                  <input type="text" name="name" id="name3" v-model="user.lastName"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                              </div>
                              <div class="grid grid-cols-6 gap-6 mb-5">
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name2" class="block text-sm font-medium text-gray-700">Mezuniyet Tarihi</label>
                                  <datepicker placeholder="Mezuniyet Tarihi" :language="datePickerLang"
                                              v-model="user.graduationDate" class="z-20 border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name4" class="block text-sm font-medium text-gray-700">Telefon</label>
                                  <input type="text" name="name" id="name4" v-model="user.phone"
                                         v-mask="'+90### ### ## ##'"
                                         placeholder="Telefon +90......"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                              </div>
                              <div class="grid grid-cols-6 gap-6 mb-5">
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name2" class="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                                  <input type="text" name="name" id="name2" v-model="user.email"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name6" class="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
                                  <input type="text" name="name" id="name6" v-model="user.username"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                              </div>

                              <div class="grid grid-cols-6 gap-6 mb-5">
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="status" class="block text-sm font-medium text-gray-700">Durum</label>
                                  <select v-model="user.isActive" id="status" name="status"
                                          class="border mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="true">Aktif</option>
                                    <option value="false">Pasif</option>
                                  </select>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name9" class="block text-sm font-medium text-gray-700">Okul Numarası</label>
                                  <input type="text" inputmode="numeric" name="test" id="name9" v-model="user.studentNumber"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                              </div>
                              <div class="grid grid-cols-6 gap-6 mb-5">
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name2" class="block text-sm font-medium text-gray-700">Şifre</label>
                                  <input type="password" name="name" id="name2" v-model="user.password"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                  <label for="name6" class="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                                  <input type="password" name="name" id="name6" v-model="user.repassword"
                                         class="border mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                </div>
                              </div>
                            </div>
                            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 pt-40">
                              <button type="submit"
                                      :class="{'btn-loading':loginLoading}"
                                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Kaydet
                              </button>
                            </div>
                          </div>
                        </form>
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
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {tr} from 'vuejs-datepicker/dist/locale'
export default {
  name: "UserAdd",
  props: {
    open: Boolean
  },
  components: {
    Datepicker
  },
  data: () => ({
    datePickerLang: tr,
    dialogLoading: false,
    loginLoading: false,
    user: {},
    formErrors: [],
  }),
  methods: {
    changeUserAddForm() {
      this.$emit('changeUserAddForm');
    },
    handleAddForm() {
      this.formErrors = [];
      this.loginLoading = true;
      if (this.user.password !== this.user.repassword) {
        this.formErrors.push({
          id: 99,
          field: "",
          message: "Şifreler eşleşmiyor."
        });
        this.loginLoading = false;
        return false;
      }
      this.$axios.post("/users", this.user).then(res => {
        this.loginLoading = false;
        this.answerCheckbox = [];
        this.$toasted.success("Başarıyla eklendi", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.$emit('refreshUsers');
        this.$emit('changeUserAddForm')
      }).catch(err => {
        this.loginLoading = false;
        this.formErrors = [];
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
        if (errData.subErrors) {
          let errors = errData.subErrors;
          errors.forEach((v, i) => {
            this.formErrors.push({
              id: i,
              field: v.field,
              message: v.message
            });
          });
        }
        setTimeout(() => {
          this.loginLoading = false;
        }, 500);
      })
    }
  }
}
</script>
<style scoped>
.vdp-datepicker__calendar {
  z-index: 999;
}
</style>
