<template>

  <ClientOnly>
    <h1 class="text-black">Count is {{filtersList}}</h1>
    <button class="bg-amber-400" @click=""> Add</button>

    <div class="">

    <!--profile data-->
    <div class=" h-auto max-w-6xl m-auto">
      <div class="flex flex-col-reverse md:flex-row-reverse flex-wrap ">
        <div class="w-full md:w-3/4 p-4 text-center ">
          <div class="text-left pl-4 pt-3">
            <span class="text-base text-gray-700 text-3xl font-medium mr-4">HiraveSonali</span>
            <span class="text-base font-semibold text-gray-700 mr-2">
              <button
                class="bg-transparent hover:bg-blue-800 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
              >Edit Profile</button>
            </span>

          </div>

          <div class="text-left pl-4 pt-3">
            <span class="text-base font-semibold text-gray-700 mr-2">
              <b>240</b> Tokens
            </span>
            <span class="text-base font-semibold text-gray-700 mr-2">
              <b>114</b> followers
            </span>
            <span class="text-base font-semibold text-gray-700">
              <b>200</b> following
            </span>
          </div>

          <div class="text-left pl-4 pt-3">
            <p
              class="text-base font-medium text-blue-700 mr-2"
            >#graphicsdesigner #reader #blogger #digitalmarketer</p>
            <p
              class="text-base font-medium text-gray-700 mr-2"
            >John Smith is a talented graphic designer with over 5 years of experience in the industry. He specializes in creating visually stunning designs for print and digital media, including brochures, advertisements, and websites. John is skilled in using various design software and tools, including Adobe Photoshop, Illustrator, and InDesign.
              <br>https://www.behance.net/hiravesona7855</p>
          </div>
        </div>

        <div class="w-1/4 p-4 text-center">
          <div class="w-full relative md:w-3/4 text-center mt-8">
            <button
              class="flex rounded-full"
              id="user-menu"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <img
                class="min-h-48 min-w-48 rounded-full object-fill border-4 border-gray-200 shadow-lg "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"   alt=""
              />
            </button>
          </div>
        </div>
      </div>



      <hr class="border-gray-300 " />

      <!--post icon and title-->
      <div class="flex flex-row  justify-center mr-16">
        <div class="flex text-gray-700 text-center py-2  items-center pr-2 border-gray-600 border-t-2">
          <div class="flex inline-flex b">
            <button
              class="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <div class="flex inline-flex ml-2 mt-1">
            <h3 class="text-sm font-bold text-gray-800 mr-2">TOKENS</h3>
          </div>
        </div>

        <div class="flex text-gray-700 text-center py-2 m-2 pr-5">
          <div class="flex inline-flex">
            <button
              class="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
          <div class="flex inline-flex ml-2 mt-1">
            <h3 class="text-sm font-medium text-gray-700 mr-2">NFTS</h3>
          </div>
        </div>

        <div class="flex text-gray-700 text-center py-2 m-2 pr-5">
          <div class="flex inline-flex">
            <button
              class="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
          <div class="flex inline-flex ml-2 mt-1">
            <h3 class="text-sm font-medium text-gray-700 mr-2">SAVED</h3>
          </div>
        </div>

        <div class="flex text-gray-700 text-center py-2 m-2 pr-5">
          <div class="flex inline-flex">
            <button
              class="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
              aria-label="Notifications"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
          </div>
          <div class="flex inline-flex ml-2 mt-1">
            <h3 class="text-sm font-medium text-gray-700 mr-2">TAGGED</h3>
          </div>
        </div>
      </div>

      <!--post images-->

      <div class="flex pt-4">
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </div>

      <div class="flex pt-4">
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </div>

      <div class="flex pt-4">
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img
            class="w-full"
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </div>
    </div>
  </div>
    
  </ClientOnly>

</template>

<script>





</script>

<style scoped>

</style>