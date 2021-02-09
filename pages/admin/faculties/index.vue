<template>
  <div>
    <FacultyAdd :open="isOpenFacultyAddForm" @changeFacultyAddForm="isOpenFacultyAddForm = false" @refreshFaculties="refreshFaculties"/>
    <FacultyEdit :faculty-id="selectedFacultyId" v-if="isOpenEditForm" :open="isOpenEditForm" @changeFacultyEditForm="isOpenEditForm=false" @refreshFaculties="refreshFaculties"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <button type="button"
                      @click="isOpenFacultyAddForm = true"
                      class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Fakülte Ekle
              </button>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fakülte Adı
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eklenme Tarihi
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Düzenle/Sil</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="faculty in faculties" :key="faculty.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ faculty.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(faculty.createdAt).format("DD-MM-YYYY HH:mm:ss ") }}
                  </td>
                  <td class="px-6 py-4 text-right text-sm font-medium flex flex-row space-x-2">
                    <NuxtLink :to="`/admin/faculties/` + faculty.id" class="text-gray-300 hover:text-white bg-purple-600 py-2 px-4 rounded-lg">Bölümler</NuxtLink>
                    <a href="javascript:void(0)" @click="selectedFacultyId=faculty.id; isOpenEditForm=true" class="p-2 text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
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
  name: "admin-teachers",
  data: () => ({
    faculties: [],
    selectedFacultyId: 0,
    isOpenEditForm: false,
    isOpenFacultyAddForm: false,
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
    refreshFaculties() {
      this.$axios.get("/faculties").then(res => {
        this.faculties = res.data;
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
    this.$axios.get("/faculties").then(res => {
      this.faculties = res.data;
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
