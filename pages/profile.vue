<template>
  <div class="flex flex-col items-center justify-center bg-gray-200">
    <div class="flex flex-row p-8 space-x-6 bg-white rounded-md mt-12 w-full lg:w-1/3 justify-between">
      <div class="mr-5">
        <img class="h-20 w-20 rounded-full"
             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
             alt="">
      </div>
      <div>
        <div class="text-3xl font-bold">{{ $auth.user.name + " " + $auth.user.lastName }}</div>
        <div>Status...</div>
        <ul class="grid grid-cols-3 gap-4 mt-5">
          <li class="flex flex-row items-center text-gray-600"><svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg> Location</li>
          <li class="flex flex-row items-center text-gray-600"><svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg> 1 Year Experience</li>
          <li class="flex flex-row items-center text-gray-600"><svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg> Turkey</li>
          <li class="flex flex-row items-center text-gray-600"><svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg> +905394822757</li>
          <li class="flex flex-row items-center text-gray-600"><svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg> john@due.com</li>
        </ul>
      </div>
      <ul class="flex flex-col justify-between">
        <li><font-awesome-icon :icon="['fab', 'facebook-f']" class="text-gray-600" size="lg"/></li>
        <li><font-awesome-icon :icon="['fab', 'linkedin-in']" class="text-gray-600" size="lg"/></li>
        <li><font-awesome-icon :icon="['fab', 'github']" class="text-gray-600" size="lg"/></li>
        <li><font-awesome-icon :icon="['fab', 'twitter']" class="text-gray-600" size="lg"/></li>
      </ul>
    </div>
    <div class="flex flex-row p-8 space-x-6 bg-white rounded-md mt-12 w-full lg:w-1/3 justify-start">
      <div class="mr-5 text-xl text-gray-600 font-bold">
        EDUCATION
      </div>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <div class="text-xl">
            B.Tech, Chemical Engineering
          </div>
          <div class="test-lg">
            Indian Institue of Technology, Roorkee
          </div>
          <div class="text-gray-600">2016-2020</div>
        </div>
        <div class="flex flex-col">
          <div class="text-xl">
            B.Tech, Chemical Engineering
          </div>
          <div class="test-lg">
            Indian Institue of Technology, Roorkee
          </div>
          <div class="text-gray-600">2016-2020</div>
        </div>
      </div>
    </div>
    <div class="flex flex-row p-8 space-x-6 bg-white rounded-md mt-12 w-full lg:w-1/3 justify-start">
      <div class="mr-5 text-xl text-gray-600 font-bold">
        EXPERIENCE
      </div>
      <div class="flex flex-col space-y-4">
        <div class="flex flex-col">
          <div class="text-xl">
            B.Tech, Chemical Engineering
          </div>
          <div class="test-lg">
            Indian Institue of Technology, Roorkee
          </div>
          <div class="text-gray-600">2016-2020</div>
        </div>
        <div class="flex flex-col">
          <div class="text-xl">
            B.Tech, Chemical Engineering
          </div>
          <div class="test-lg">
            Indian Institue of Technology, Roorkee
          </div>
          <div class="text-gray-600">2016-2020</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile"
}
</script>

<style scoped>

</style>
