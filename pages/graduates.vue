<template>
  <section class="pt-8 px-4 pb-4">
    <h2 class="text-4xl mb-2 leading-tight font-semibold font-heading">Mezunlar</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 -mx-4 text-center">
      <div class="px-4 mb-8" v-for="user in users">
        <div class="h-full pb-6 rounded shadow">
          <img class="mx-auto mb-4" :src="user.profileImage===null ? `https://via.placeholder.com/256` : `${siteURL}files/`+user.profileImage" alt="">
          <div class="px-8">
            <h3 class="text-xl mb-1 font-semibold font-heading font-semibold"><NuxtLink :to="`/users/`+ user.username">{{ user.name + " " + user.lastName }}</NuxtLink></h3>
            <span>Mezuniyet: {{ $moment(user.graduationDate).format("MMMM YYYY")}}</span>
            <span>{{ user.department===null ? "Öğrenci" : user.department.name }}</span>
            <span v-if="user.jobStatus" class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">İŞ ARIYOR</span>
            <div class="flex justify-center space-x-6 py-3 my-4 mx-12 border-t border-b">
              <a target="_blank" v-for="account in user.accounts" :href="account.link" :key="account.id">
                <font-awesome-icon :icon="['fab', account.icon]" class="text-indigo-600 hover:text-indigo-900" size="2x"/>
              </a>
            </div>
            <p>{{ user.about }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "graduates",
  data() {
    return {
      users: [],
      siteURL: process.env.siteURL
    }
  },
  created() {
    this.$axios.get("/users/graduation-date").then(res => {
      this.users = res.data;
    }).catch(err => {
      this.$toasted.error("Veriler çekilemedi!", {
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
