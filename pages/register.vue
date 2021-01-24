<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <svg class="mx-auto w-auto w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
        </svg>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Kayıt Ol
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          veya
          <NuxtLink to="login" class="font-medium text-indigo-600 hover:text-indigo-500">
            giriş yapın
          </NuxtLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="userRegister">
        <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500" v-for="formError in formErrors"
             :key="formError.id">
          <span class="text-xl inline-block mr-5 align-middle">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </span>
          <span class="inline-block align-middle mr-8">
            <b class="capitalize">Hata!</b> {{ formError.message }}
          </span>
        </div>
        <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500" v-if="formSuccess.status">
          <span class="text-xl inline-block mr-5 align-middle">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </span>
          <span class="inline-block align-middle mr-8">
            <b class="capitalize">Başarılı!</b> {{ formSuccess.message }}
          </span>
          <button
            class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
            <span>×</span>
          </button>
        </div>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Kullanıcı Adı</label>
            <input id="username" name="username" type="text" autocomplete="username" v-model="register.username"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Kullanıcı Adı">
          </div>
          <div>
            <label for="password" class="sr-only">Şifre</label>
            <input id="password" name="password" type="password" autocomplete="current-password"
                   v-model="register.password"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Şifre">
          </div>
          <div>
            <label for="email-address" class="sr-only">E-posta Adresi</label>
            <input id="email-address" name="email" type="text" autocomplete="email" v-model="register.email"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="E-posta Adresi">
          </div>
          <div>
            <label for="phone" class="sr-only">Telefon</label>
            <input id="phone" name="password" type="text"
                   v-model="register.phone"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Telefon +90......">
          </div>
          <div>
            <label for="name" class="sr-only">Ad</label>
            <input id="name" name="name" type="text"
                   v-model="register.name"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Ad">
          </div>
          <div>
            <label for="lastName" class="sr-only">Soyad</label>
            <input id="lastName" name="lastName" type="text" v-model="register.lastName"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Soyad">
          </div>
          <div>
            <label for="graduationDate" class="sr-only">Mezuniyet Tarihi</label>
            <input id="graduationDate" name="graduationDate" type="date" v-model="register.graduationDate"
                   required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Soyad">
            </div>
            <div>
            <label for="role" class="sr-only">Tür</label>
            <select id="role" name="role" type="text" v-model="register.role"
                    required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="USER" selected>Öğrenci</option>
              <option value="TEACHER">Öğretmen</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit"
                  :class="{'btn-loading': loginLoading}"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
            Kayıt Ol
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'login',
  name: "register",
  auth: false,
  data: () => ({
    register: {},
    formErrors: [],
    formSuccess: {
      status: false,
      message: ""
    },
    loginLoading: false,
  }),
  methods: {
    async userRegister() {
      this.loginLoading = true;
      this.$axios.post("/auth/register", this.register).then(res => {
        this.formSuccess.status = true;
        this.formSuccess.message = "Başarıyla kayıt oldunuz. Lütfen e-posta hesabınızı kontrol edin.";
        this.formErrors = [];
        this.register = {};
        this.loginLoading = false;
      }).catch(err => {
        this.loginLoading = false;
        this.formErrors = [];
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
          this.formErrors.push({
            id: 99,
            field: "login",
            message: errData.message
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
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
