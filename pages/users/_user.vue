<template>
  <div class="min-h-screen w-full bg-gray-200">
    <div class="flex flex-col items-center justify-center bg-gray-200">
      <div class="flex flex-col mt-8">
        <img class="h-24 w-24 rounded-full"
             :src="user.profileImage === null ? `https://via.placeholder.com/256` : siteURL + 'files/' + user.profileImage"
             alt="">
      </div>
      <div class="flex flex-row p-8 space-x-6 bg-white rounded-md mt-12 w-full lg:w-2/3 xl:w-1/3 justify-start">
        <div></div>
        <div>
          <div class="text-3xl font-bold">{{ user.name + " " + user.lastName }} <span v-if="user.jobStatus" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">İŞ ARIYOR</span></div>
          <div>{{ getRoleName(user.role) }}</div>
          <ul class="grid grid-cols-3 gap-4 mt-5">

            <li class="flex flex-row items-center text-gray-600">
              <div class="flex flex-row items-center">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ user.phone }}
              </div>
            </li>
            <li class="flex flex-row items-center text-gray-600">
              <div class="flex flex-row items-center">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ user.email }}
              </div>
            </li>
          </ul>
          <ul class="flex flex-row justify-start space-x-4 mt-5">
            <li v-for="account in user.accounts">
              <a target="_blank" :href="account.link">
                <font-awesome-icon :icon="['fab', account.icon]" class="text-gray-600 hover:text-gray-900" size="2x"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-row p-8 space-x-6 bg-white rounded-md mt-12 w-full lg:w-2/3 xl:w-1/3 justify-start">
        <div class="mr-5 text-xl text-gray-600 font-bold">
          İŞ DENEYİMİ
        </div>
        <div class="flex flex-col space-y-4">
          <div class="flex flex-col" v-for="job in user.jobs">
            <div class="text-xl">
              {{ job.name }}
            </div>
            <div class="test-lg">
              {{ job.description }}
            </div>
            <div class="text-gray-600">
              {{ $moment(job.startDate).format("MMMM YYYY") + "-" + (job.endDate === null ? "Devam" : $moment(job.endDate).format("MMMM YYYY")) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      siteURL: process.env.siteURL,
      user: {}
    }
  },
  methods: {
    getRoleName(role) {
      if (typeof this.user.department === 'undefined') {
        return "-";
      }
      if (role === "USER") {
        if (this.user.department !== null) {
          let department = this.user.department.name;
          return department + " Öğrenci";
        }
        return "Öğrenci";
      } else if (role === "ADMIN") {
        return "Yönetici";
      } else {
        if (this.user.department !== null) {
          let department = this.user.department.name;
          return department + " Öğretmen";
        }
        return "Öğretmen";
      }
    },
    getProfileImage(image) {
      return process.env.siteURL + `files/` + image;
    }
  },
  created() {
    this.$axios.get("/auth/user/profile/"+ this.$route.params.user).then(res => {
      this.user = res.data;
    }).catch(err => {
      this.$toasted.error(err.response.data.message, {
        theme: "toasted-primary",
        position: "top-center",
        icon: 'warning',
        iconPack: "material",
        duration: 5000
      });
      this.$router.push("/");
    });
  }
}
</script>

<style scoped>

</style>
