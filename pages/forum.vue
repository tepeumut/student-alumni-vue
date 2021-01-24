<template>
  <div>
    <main class="flex flex-row min-h-screen bg-gray-200">
      <!-- Sidebar -->
      <div
        class="flex justify-center h-full px-5 overflow-y-auto hidden shadow-sm dark:border-dark-800 w-2/12 min-w-76 md:block">
        <div class="flex flex-col mt-2 space-y-1">
          <div class="px-3 pt-5 pb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Kategoriler</div>
          <a v-for="i in 20" href="javascript:void(0)" class="flex items-center space-x-3 px-3 font-medium rounded text-gray-600 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-50">
            <span class="flex-none flex items-center opacity-50">
              <svg class="inline-block w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </span>
            <span class="py-2 flex-grow">Manage</span>
          </a>
        </div>
      </div>
      <!-- Main Content -->
      <div class="flex flex-col bg-white w-full">
        <div class="flex justify-between border border-gray-200 p-4 pl-6">
          <div class="flex flex-row justify-start items-center justify-items-center">
            <a href="#"
               class="mr-4 text-gray-600 hover:text-black font-medium hover:bg-gray-200 rounded-full px-4 py-1">Trending</a>
            <a href="#"
               class="mr-4 text-gray-600 hover:text-black font-medium hover:bg-gray-200 rounded-full px-4 py-1">Populer</a>
            <a href="#"
               class="mr-4 text-gray-600 hover:text-black font-medium hover:bg-gray-200 rounded-full px-4 py-1">Populer</a>
            <a href="#"
               class="mr-4 text-gray-600 hover:text-black font-medium hover:bg-gray-200 rounded-full px-4 py-1">Populer</a>
            <a href="#" class="mr-4 hover:text-black font-medium bg-gray-200 rounded-full px-4 py-1">Latest</a>
          </div>
          <button type="submit"
                  class="group relative w-32  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: lock-closed -->
            <svg class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </span>
            Add
          </button>
        </div>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 mx-6">
          <div v-for="i in 5" class="flex flex-col border border-gray-200 hover:shadow-lg cursor-pointer rounded-lg">
            <div class="flex flex-row p-6 items-center justify-between">
              <div class="flex flex-row items-center">
                <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                     alt="">
                <span class="font-bold ml-3 opacity-75">Ralph Lane</span>
                <span class="text-gray-500 ml-4 font-medium">3 sec ago</span>
                <span class="text-gray-600 rounded-full bg-gray-200 px-4 py-1 ml-3 font-medium">#Design</span>
              </div>
              <div class="flex items-center justify-self-end text-gray-600 font-medium">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                </svg>
                32
              </div>
            </div>
            <div class="flex px-8 pb-6">
              <p class="font-medium text-lg text-gray-800 opacity-75">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Autem dolorem eveniet exercitationem facere illum inventore nostrum perspiciatis quis, quo vitae? Ab
                commodi deleniti facilis, illum perspiciatis quasi quisquam rerum veritatis?</p>
            </div>
          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: "forum"
}
</script>

<style scoped>

</style>
