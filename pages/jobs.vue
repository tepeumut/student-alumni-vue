<template>
  <div>
    <transition
      v-if="selectedJob.id"
      enter-active-class="ease-in-out duration-500"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 overflow-hidden z-20" v-show="isOpenDialog">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <transition
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
              <transition
                enter-active-class="ease-in-out duration-500"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="ease-in-out duration-500"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div class="relative w-screen max-w-5xl">
                  <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      @click="isOpenDialog = false"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: x -->
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div
                      class="px-4 sm:px-6  md:px-12 flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center">
                      <div class="flex flex-col">
                        <h2 id="slide-over-heading2" class="text-xl font-medium text-gray-900 mb-2">
                          {{ selectedJob.name }}
                        </h2>
                        <span class="text-gray-600">{{ translateJobType(selectedJob.job_type) }}</span>
                      </div>
                      <div class="flex">
                        <button type="button"
                                @click="showApplyForm"
                                class="inline-flex justify-center py-2 px-4 mt-5 sm:mt-0 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Başvur
                        </button>
                      </div>
                    </div>
                    <hr class="mt-8">
                    <div class="mt-6 relative flex-1 px-4 md:px-12 sm:px-6 z-30">
                      <!-- Replace with your content -->
                      <div class="animate-pulse flex flex-col space-y-4" v-if="dialogLoading">
                        <div v-for="i in 15" class="h-4 bg-gray-400 rounded"
                             :style="`width: ${Math.random()*100}%`"></div>
                      </div>
                      <div class="flex flex-col" v-else>
                        <div class="flex flex-row mb-5 items-center">
                          <img class="h-8 h-8 rounded-full"
                               :src="selectedJob.user.profileImage === null ? `https://via.placeholder.com/64` : `${siteURL}files/` + selectedJob.user.profileImage"
                               alt="">
                          <span class="font-medium pl-5">{{
                              selectedJob.user.name + " " + selectedJob.user.lastName
                            }}</span>
                        </div>
                        <div
                          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-xl w-full">
                          <div class="flex flex-col border-r justify-center p-3">
                            <div class="text-gray-700 text-xs">
                              Tecrübe
                            </div>
                            <div class="font-medium opacity-75">{{ selectedJob.experience }}</div>
                          </div>
                          <div class="flex flex-col border-r justify-center p-3">
                            <div class="text-gray-700 text-xs">
                              Uzmanlık Seviyesi
                            </div>
                            <div class="font-medium opacity-75">{{ selectedJob.workLevel }}</div>
                          </div>
                          <div class="flex flex-col border-r justify-center p-3">
                            <div class="text-gray-700 text-xs">
                              İş Türü
                            </div>
                            <div class="font-medium opacity-75">{{ translateJobType(selectedJob.job_type) }}</div>
                          </div>
                          <div class="flex flex-col justify-center p-3">
                            <div class="text-gray-700 text-xs">
                              Maaş
                            </div>
                            <div class="font-medium opacity-75">{{ selectedJob.offer_salary }}</div>
                          </div>
                        </div>
                        <div class="mt-8 mb-5">
                          <h3 class="font-bold mb-5">İş Detay</h3>
                          <div class="text-gray-700 text-sm" v-html="selectedJob.content"></div>
                        </div>
                      </div>
                      <!-- /End replace -->
                    </div>
                  </div>
                </div>
              </transition>
            </section>
          </transition>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="ease-in-out duration-500"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 overflow-hidden z-20" v-show="isOpenApplyForm">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <transition
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex" aria-labelledby="slide-over-heading">
              <transition
                enter-active-class="ease-in-out duration-500"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="ease-in-out duration-500"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div class="relative w-screen max-w-5xl">
                  <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      @click="isOpenApplyForm = false"
                      class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: x -->
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                    <div class="px-4 sm:px-6  md:px-12 flex flex-row justify-between items-center">
                      <div class="flex flex-col">
                        <h2 id="slide-over-heading-2" class="text-xl font-medium text-gray-900 mb-2">
                          {{ selectedJob.name }}
                        </h2>
                        <span class="text-gray-600">{{ translateJobType(selectedJob.job_type) }}</span>
                      </div>
                      <div class="flex">
                      </div>
                    </div>
                    <hr class="mt-8">
                    <div class="mt-6 relative flex-1 px-4 md:px-12 sm:px-6 z-30">
                      <!-- Replace with your content -->
                      <div class="animate-pulse flex flex-col space-y-4" v-if="dialogLoading">
                        <div v-for="i in 15" class="h-4 bg-gray-400 rounded"
                             :style="`width: ${Math.random()*100}%`"></div>
                      </div>
                      <div>
                        <div class="md:grid md:grid-cols-3 md:gap-6">
                          <div class="md:col-span-1">
                            <div class="px-4 sm:px-0">
                              <h3 class="text-lg font-medium leading-6 text-gray-900">Özgeçmiş</h3>
                              <p class="mt-1 text-sm text-gray-600">
                                Lütfen özgeçmişinizi ve ön başvuru metnini doldurun.
                              </p>
                            </div>
                          </div>
                          <div class="mt-5 md:mt-0 md:col-span-2">
                            <form action="#" method="POST" @submit.prevent="handleApplyForm">
                              <div class="shadow sm:rounded-md sm:overflow-hidden">
                                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

                                  <div>
                                    <label for="about" class="block text-sm font-medium text-gray-700">
                                      Ön Başvuru
                                    </label>
                                    <div class="mt-1">
                                      <textarea id="about" name="about" rows="3"
                                                v-model="applyFormAbout"
                                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder=""></textarea>
                                    </div>
                                  </div>
                                  <div>
                                    <label class="block text-sm font-medium text-gray-700">
                                      Özgeçmiş
                                    </label>
                                    <div
                                      class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                                      v-cloak @drop.prevent="addFile" @dragover.prevent>
                                      <div class="space-y-1 text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                             viewBox="0 0 48 48" aria-hidden="true">
                                          <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        <div class="flex text-sm text-gray-600">
                                          <label for="file-upload"
                                                 class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                            <span>Dosya seçin</span>
                                            <input @change="addFile" ref="inputFile" id="file-upload" name="file-upload"
                                                   type="file"
                                                   class="sr-only">
                                          </label>
                                          <p class="pl-1">veya sürükleyip bırakın</p>
                                        </div>
                                        <p class="text-xs text-gray-500">
                                          PDF, PNG, JPG, JPEG, DOC, DOCX ve 5 MB
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <div class="mt-2 flex items-center" v-for="file in files">
                                        <p>{{ file.name }}</p>
                                        <button type="button"
                                                @click="removeFile(file)"
                                                class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                          Kaldır
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                  <button type="submit"
                                          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Tamamla
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div class="hidden sm:block" aria-hidden="true">
                        <div class="py-5">
                          <div class="border-t border-gray-200"></div>
                        </div>
                      </div>
                      <!-- /End replace -->
                    </div>
                  </div>
                </div>
              </transition>
            </section>
          </transition>
        </div>
      </div>
    </transition>
    <JobAdd :open="isOpenJobAddForm" @changeJobAddForm="isOpenJobAddForm = false" @refreshJobs="refreshJobs"/>
    <main class="bg-gray-100 px-6">
      <div class="lg:max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        <div
          class="flex w-full lg:flex-row lg:justify-between justify-center flex-col justify-around rounded-l-lg rounded-r-lg bg-white flex-grow-0  p-5">
          <div class="flex border-none lg:border lg:border-gray-200 pb-3 flex-grow-1 w-full items-center">
            <div class="mt-1 relative rounded-md shadow-sm w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">
                   <svg class="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </span>
              </div>
              <input type="text" name="price" id="price"
                     v-model="search_term"
                     class="pl-10 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md placeholder-gray-600::placeholder"
                     placeholder="Ara">
            </div>
          </div>
          <div class="flex items-center w-full lg:border lg:border-gray-200 border-none pb-4 lg:pb-0">
            <div class="mt-1 relative w-full">
              <button @click="jobType = !jobType" type="button" aria-haspopup="listbox" aria-expanded="true"
                      aria-labelledby="listbox-label"
                      class="relative w-full pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="ml-3 block truncate">
                    {{ typeof selectedJobType.value !== 'undefined' ? selectedJobType.value : 'İş Tür Seçin' }}
                  </span>
                </span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                       fill="currentColor"
                       aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
              </span>
              </button>
              <transition
                leave-active-class="transition ease-in duration-100"
                leave-to-class="opacity-0"
                leave-class="opacity-100"
              >
                <div :class="jobType ? 'block' : 'hidden'"
                     class="absolute w-full mt-1 w-full bg-white shadow-lg lg:border lg:border-gray-200 border-none z-20"
                     @focusout="jobType = false">
                  <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label"
                      class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <li v-for="type in jobTypes" role="option" :key="type.id"
                        @click="selectedJobType = type; jobType = false"
                        :class="selectedJobType === type ? 'text-white bg-indigo-600' : 'text-gray-900'"
                        class="cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600">
                      <div class="flex items-center">
                        <span class="ml-3 block font-normal truncate">
                          {{ type.value }}
                        </span>
                      </div>
                      <span v-if="selectedJobType === type"
                            class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"/>
                        </svg>
                      </span>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
          <div class="flex items-center w-full lg:border lg:border-gray-200 border-none pb-4 lg:pb-0">
            <div class="mt-1 relative w-full">
              <button @click="jobCategory = !jobCategory" type="button" aria-haspopup="listbox" aria-expanded="true"
                      aria-labelledby="listbox-label"
                      class="relative w-full pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="flex items-center">
                  <svg class="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="ml-3 block truncate">
                    {{ typeof selectedJobCategory.name !== 'undefined' ? selectedJobCategory.name : 'Kategori Seçin' }}
                  </span>
                </span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                       fill="currentColor"
                       aria-hidden="true">
                    <path fill-rule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clip-rule="evenodd"/>
                  </svg>
              </span>
              </button>
              <transition
                leave-active-class="transition ease-in duration-100"
                leave-to-class="opacity-0"
                leave-class="opacity-100"
              >
                <div :class="jobCategory ? 'block' : 'hidden'"
                     class="absolute w-full mt-1 w-full bg-white shadow-lg lg:border lg:border-gray-200 border-none z-10"
                     @focusout="jobCategory = false">
                  <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label"
                      class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    <li role="option"
                        @click="selectedJobCategory = {}; jobCategory = false"
                        :class="selectedJobCategory === {} ? 'text-white bg-indigo-600' : 'text-gray-900'"
                        class="cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600">
                      <div class="flex items-center">
                        <span class="ml-3 block font-normal truncate">
                          Hepsi
                        </span>
                      </div>
                      <span v-if="selectedJobCategory === {}"
                            class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"/>
                        </svg>
                      </span>
                    </li>
                    <li v-for="category in jobCategories" role="option" :key="category.id"
                        @click="selectedJobCategory = category; jobCategory = false"
                        :class="selectedJobCategory === category ? 'text-white bg-indigo-600' : 'text-gray-900'"
                        class="cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-indigo-600">
                      <div class="flex items-center">
                        <span class="ml-3 block font-normal truncate">
                          {{ category.name }}
                        </span>
                      </div>
                      <span v-if="selectedJobCategory === category"
                            class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                          <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"/>
                        </svg>
                      </span>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="font-bold text-xl my-5">
            <h2>{{ filterJobs.length }} iş ilanı bulundu</h2>
          </div>
          <div>
            <button type="button"
                    @click="isOpenJobAddForm = true"
                    class="inline-flex justify-center mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              İş Ekle
            </button>
          </div>
        </div>
        <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <div v-for="job in filterJobs" :key="job.id"
               class="flex flex-col border border-gray-200 rounded-lg p-6 hover:shadow-xl">
            <div class="flex flex-col justify-between">
              <div class="flex flex-col">
                <span class="font-bold text-lg">{{ job.name }}</span>
                <span class="text-gray-600 text-md">{{ translateJobType(job.job_type) }}</span>
              </div>
              <div class="flex flex-row text-gray-500 font-medium text-sm items-center justify-start mt-2">
                <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>&nbsp;{{ $moment(job.created_at).fromNow(true) }}
              </div>
            </div>
            <hr class="my-5">
            <div class="flex flex-col">
              <p class="text-gray-500">{{ job.short_description }}</p>
              <NuxtLink :to="`/users/`+job.user.username" class="flex flex-row mt-5 items-center">
                <img class="h-10 h-10 rounded-full"
                     :src="job.user.profileImage === null ? `https://via.placeholder.com/64` : `${siteURL}files/` + job.user.profileImage"
                     alt="">
                <span class="font-medium pl-5">{{ job.user.name + " " + job.user.lastName }}</span>
              </NuxtLink>
              <button type="button"
                      @click="isOpenDialog = true; selectedJob = job"
                      class="inline-flex justify-center mt-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import JobAdd from "@/components/JobAdd";

export default {
  components: {
    JobAdd
  },
  data: () => ({
    isOpenJobAddForm: false,
    isLoading: false,
    jobType: false,
    jobCategory: false,
    selectedJob: {},
    selectedJobType: {},
    selectedJobCategory: {},
    isOpenDialog: false,
    dialogContent: false,
    dialogLoading: false,
    isOpenApplyForm: false,
    jobCategories: [],
    jobs: [],
    files: [],
    applyFormAbout: "",
    search_term: "",
    jobTypes: [
      {id: 11, name: "FULLTIME", value: "Tam Zamanlı"},
      {id: 22, name: "PARTTIME", value: "Yarı Zamanlı"},
      {id: 33, name: "REMOTE", value: "Remote"},
      {id: 44, name: "PROJECT", value: "Proje Bazlı"},
      {id: 55, name: "INTERN", value: "Stajyer"},
    ],
    inputFile: "",
    siteURL: process.env.siteURL
  }),
  computed: {
    filterJobs() {
      console.log(this.selectedJobType.name);
      return this.jobs.filter(job => {
        return job.name.indexOf(this.search_term) !== -1
          && (typeof this.selectedJobType.name !== 'undefined' ? job.job_type === this.selectedJobType.name : true)
          && (typeof this.selectedJobCategory.created_at !== 'undefined' ? job.category.id === this.selectedJobCategory.id : true)
      })
    }
  },
  methods: {
    showApplyForm() {
      this.isOpenDialog = false;
      this.isOpenApplyForm = true;
    },
    translateJobType(type) {
      let jobType = this.jobTypes.find(e => e.name === type);
      return typeof jobType !== 'undefined' ? jobType.value : "-";
    },
    addFile(e) {
      let droppedFiles;
      if (typeof e.target.files !== 'undefined') {
        droppedFiles = e.target.files;
      } else if (typeof e.dataTransfer !== 'undefined') {
        droppedFiles = e.dataTransfer.files;
      }
      if (!droppedFiles) return;
      ([...droppedFiles]).forEach(f => {
        let types = [
          "application/pdf",
          "application/msword",
          "image/jpeg",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/png"
        ]
        if (types.indexOf(f.type) !== -1) {
          this.files.push(f);
        } else {
          this.$toasted.error("Yüklemeye çalıştığınız dosya türüne izin verilmiyor. " + f.name, {
            theme: "toasted-primary",
            position: "top-center",
            icon: 'warning',
            iconPack: "material",
            duration: 5000
          });
        }
      });
    },
    removeFile(file) {
      this.files = this.files.filter(f => {
        return f !== file;
      });
    },
    handleApplyForm(e) {
      let formData = new FormData();
      ([...this.files]).forEach(f => {
        formData.append("files", f);
      });
      formData.append("about", this.applyFormAbout);
      this.$axios.post("/jobs/" + this.selectedJob.id + "/apply-forms", formData, {}).then(res => {
        this.$toasted.success("Başvurunuz başarıyla alındı", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'check',
          iconPack: "material",
          duration: 5000
        });
        this.isOpenApplyForm = false;
        this.selectedJob = {};
        this.files = [];
        this.applyFormAbout = "";
      }).catch(err => {
        let message;
        let error = err.response.data;
        if (typeof error.apierror !== 'undefined') {
          message = error.apierror.message
        }
        if (typeof err.response.data.message !== 'undefined') {
          message = err.response.data.message
        }
        this.$toasted.error(message, {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      });
    },
    refreshJobs() {
      this.$axios.get("/jobs").then(res => {
        this.jobs = res.data;
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
  },
  created() {
    this.$axios.get("/job-categories").then(res => {
      this.jobCategories = res.data;
    }).catch(err => {
      this.$toasted.error(err.response.data.message, {
        theme: "toasted-primary",
        position: "top-center",
        icon: 'warning',
        iconPack: "material",
        duration: 5000
      });
    });
    this.$axios.get("/jobs").then(res => {
      this.jobs = res.data;
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
