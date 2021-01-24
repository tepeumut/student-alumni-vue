<template>
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
    <div v-for="user in users" :key="user.id"
         class="flex flex-col border border-gray-200 rounded-lg p-6 hover:shadow-xl">
      <div class="flex flex-col justify-between">
        <div class="flex flex-col">
          <img class="h-48" :src="`https://via.placeholder.com/128`" alt="">
          <span class="font-bold text-lg">{{ user.name + " " + user.lastName }}</span>
          <span class="text-gray-600 text-md">Mezuniyet: {{ user.graduationDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "graduates",
  data: () => ({
    users: []
  }),
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
