<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->

            <button @click="openMobileMenu = !openMobileMenu"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-expanded="false">
              <span class="sr-only">Open main menu</span>

              <svg :class="openMobileMenu ? 'hidden' : 'block'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>

              <svg :class="openMobileMenu ? 'block' : 'hidden'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex-shrink-0 flex items-center">
              <img class="block lg:hidden h-8 w-auto"
                   src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
              <img class="hidden lg:block h-8 w-auto"
                   src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
            </div>
            <div class="hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <NuxtLink to="/admin/jobs"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  İşler
                </NuxtLink>
                <NuxtLink to="/admin/job-categories"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  İş Kategoriler
                </NuxtLink>
                <NuxtLink to="/admin/surveys"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Anketler
                </NuxtLink>
                <NuxtLink to="/admin/users"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Kullanıcılar
                </NuxtLink>
                <NuxtLink to="/admin/teachers"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Öğretmenler
                </NuxtLink>
                <NuxtLink to="/admin/admins"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Yöneticiler
                </NuxtLink>
                <NuxtLink to="/admin/faculties"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Fakülteler
                </NuxtLink>
                <NuxtLink to="/"
                          v-if="$auth.user.role === 'ADMIN'"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Site
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <div>
                <button @click="isShowProfile = !isShowProfile"
                        class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full"
                       :src="$auth.user.profileImage === null ? `https://via.placeholder.com/64` : `${siteURL}files/` + $auth.user.profileImage"
                       alt="">
                </button>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100 transform"
                enter-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75 transform"
                leave-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <<div v-show="isShowProfile"
                      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20"
                      role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <NuxtLink active-class="" exact-active-class="" to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Profil</NuxtLink>
                <NuxtLink active-class="" exact-active-class="" to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem">Ayarlar</NuxtLink>
                <a href="#" @click="logoutUser" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Çıkış Yap</a>
              </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!--
        Mobile menu, toggle classes based on menu state.

        Menu open: "block", Menu closed: "hidden"
      -->
      <div :class="openMobileMenu ? 'block' : 'hidden'" class="sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 flex flex-col">
          <NuxtLink to="/admin/jobs"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            İşler
          </NuxtLink>
          <NuxtLink to="/admin/job-categories"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            İş Kategoriler
          </NuxtLink>
          <NuxtLink to="/admin/surveys"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Anketler
          </NuxtLink>
          <NuxtLink to="/admin/users"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Kullanıcılar
          </NuxtLink>
          <NuxtLink to="/admin/teachers"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Öğretmenler
          </NuxtLink>
          <NuxtLink to="/admin/admins"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Yöneticiler
          </NuxtLink>
          <NuxtLink to="/admin/faculties"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Fakülteler
          </NuxtLink>
          <NuxtLink to="/"
                    v-if="$auth.user.role === 'ADMIN'"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Site
          </NuxtLink>
        </div>
      </div>
    </nav>
    <Nuxt/>
  </div>
</template>
<script>
export default {
  data: () => ({
    isShowProfile: false,
    openMobileMenu: false,
    siteURL: process.env.siteURL,
  }),
  methods: {
    async logoutUser() {
      await this.$auth.logout();
      this.$router.push("/login");
    }
  }
}
</script>
