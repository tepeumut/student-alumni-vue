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
          Hesap Doğrulama
        </h2>
      </div>
      <div class="mt-8 space-y-6" v-if="formError.message">
        <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
          <span class="text-xl inline-block mr-5 align-middle">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>
          <span class="inline-block align-middle mr-8">
            <b class="capitalize">{{ formError.field}}</b> {{ formError.message }}
          </span>
        </div>
      </div>
      <div class="mt-8 space-y-6" v-else>
        <div class="flex flex-row justify-center items-center">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Hesabınız doğrulanıyor. Lütfen bekleyiniz...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  name: "email_code",
  auth: false,
  data: () => ({
    formError: {
    }
  }),
  created() {
    this.$axios.post("/user-verifications", {code: this.$route.params.code}).then(res => {
      this.$toasted.success("Hesabınız başarıyla etkinleştirildi.", {
        theme: "toasted-primary",
        position: "top-center",
        icon: 'warning',
        iconPack: "material",
        duration: 5000
      });
      this.$router.push("/");
    }).catch(err => {
      let message;
      if (typeof err.response.data.apierror !== 'undefined') {
        message = err.response.data.apierror.message
      }
      if (typeof err.response.data.message !== 'undefined') {
        message = err.response.data.message
      }
      this.formError = {
        message: message,
        field: "Hata!"
      };
      this.$toasted.error(message, {
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
