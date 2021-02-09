<template>
  <div>
    <DepartmentAdd :open="isOpenDepartmentAddForm" @changeDepartmentAddForm="isOpenDepartmentAddForm = false" @refreshDepartments="refreshDepartments"/>
    <DepartmentEdit :department-id="selectedDepartmentId" v-if="isOpenEditForm" :open="isOpenEditForm" @changeDepartmentEditForm="isOpenEditForm=false" @refreshDepartments="refreshDepartments"/>
    <div class="lg:px-20 py-10 h-full">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <button type="button"
                      @click="isOpenDepartmentAddForm = true"
                      class="inline-flex justify-center mb-5 mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Bölüm Ekle
              </button>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adı
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eklenme Tarihi
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Düzenle / Sil</span>
                  </th>
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="department in departments" :key="department.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ department.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $moment(department.createdAt).format("DD-MM-YYYY HH:mm:ss ") }}
                  </td>
                  <td class="px-6 py-4 text-right text-sm font-medium flex flex-row space-x-2">
                    <a href="javascript:void(0)" @click="selectedDepartmentId=department.id; isOpenEditForm=true" class="p-2 text-gray-300 hover:text-white bg-green-600 py-2 px-4 rounded-lg">Düzenle</a>
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
  name: "admin-faculty-departments",
  data: () => ({
    departments: [],
    selectedDepartmentId: 0,
    isOpenEditForm: false,
    isOpenDepartmentAddForm: false,
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
    refreshDepartments() {
      this.$axios.get(`/faculty-departments/${this.$route.params.id}`).then(res => {
        this.departments = res.data;
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
    this.$axios.get(`/faculty-departments/${this.$route.params.id}`).then(res => {
      this.departments = res.data;
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
