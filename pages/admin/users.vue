<template>
  <div>
    <UserAdd :open="isOpenUserAddForm" @changeUserAddForm="isOpenUserAddForm = false" @refreshUsers="refreshUsers"/>
    <UserEdit :user-id="selectedUserId" v-if="isOpenEditForm" :open="isOpenEditForm" @changeUserEditForm="isOpenEditForm=false" @refreshUsers="refreshUsers"/>
    <UserPasswordEdit :user-id="selectedUserId" v-if="isOpenPasswordForm" :open="isOpenPasswordForm" @changeUserPasswordEditForm="isOpenPasswordForm=false" @refreshUsers="refreshUsers"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <button type="button"
                      @click="isOpenUserAddForm = true"
                      class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Kullanıcı Ekle
              </button>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı Adı
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    E-posta Adresi
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt Tarihi
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Düzenle/Sil</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.name + " " + user.lastName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.username }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(user.createdAt).format("DD-MM-YYYY HH:mm:ss ") }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="getStatusColor(user.isActive)"
                    >
                      {{ user.isActive ? "Aktif" : "Pasif" }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right text-sm font-medium flex flex-row space-x-2">
                    <a href="javascript:void(0)" @click="selectedUserId=user.id; isOpenPasswordForm=true" class="p-2 text-gray-300 hover:text-white bg-indigo-600 py-2 px-4 rounded-lg">Şifre</a>
                    <a href="javascript:void(0)" @click="selectedUserId=user.id; isOpenEditForm=true" class="p-2 text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
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
  layout: 'admin',
  name: "admin-users",
  data: () => ({
    users: [],
    isOpenPasswordForm: false,
    selectedUserId: 0,
    isOpenEditForm: false,
    isOpenUserAddForm: false,
  }),
  methods: {
    getStatusColor(status) {
      switch (status) {
        case true:
          return "bg-green-300 text-green-800";
        default:
          return "bg-red-300 text-red-800";
      }
    },
    refreshUsers() {
      this.$axios.get("/users").then(res => {
        this.users = res.data;
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
  },
  created() {
    this.$axios.get("/users").then(res => {
      this.users = res.data;
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
