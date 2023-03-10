<template>
  <div class="min-h-full">

    <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <a helf="/" class="flex flex-shrink-0 items-center">
              <img class="block h-8 w-auto lg:hidden" src="../assets/images/osis-icon.svg" alt="Your Company" />
              <img class="hidden h-8 w-auto lg:block" src="../assets/images/osis-icon.svg" alt="Your Company" />
            </a>
            <ClientOnly>
              <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <NuxtLink v-for="item in navigation" :key="item.name" @click="switchTabs(item.id)" :to="item.to" :class="[useNavStore().pageId===item.id ? 'border-primary-blue text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium']" :aria-current="useNavStore().pageId===item.id ? 'page' : undefined">{{ item.name }}</NuxtLink>
              </div>
            </ClientOnly>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="mr-4">
              <SelectMenuWithStatus/>
            </div>
            <button type="button" class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue  focus:ring-offset-2">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <div @click="navigateToPage(item.id)" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</div>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <div class="mr-4">
              <SelectMenuWithStatus/>
            </div>
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue  focus:ring-offset-2">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <ClientOnly>
          <div class="space-y-1 pt-2 pb-3 ">
            <DisclosureButton v-for="item in navigation" :key="item.name" as="div" @click="navigateToPage(item.id)" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</DisclosureButton>
          </div>
        </ClientOnly>
        <div class="border-t border-gray-200 pt-4 pb-3">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
            </div>
            <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue  focus:ring-offset-2">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 ">
            <DisclosureButton v-for="item in userNavigation" :key="item.name" as="div" @click="navigateToPage(item.id)" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div>
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { disconnect, } from '@wagmi/core'

import {useNavStore} from "../stores/navStore";
import {ref} from "vue";

const navStore = await useNavStore()
console.log('useNavStore().pageId => ',useNavStore().pageId)

const user = {
  name: 'Luigi Cook',
  email: 'luigi@example.com',
  imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Overview', to: '/', current: false, id:0 },
  { name: 'Currencies', to: '/currencies', current: false, id:1 },
  { name: 'NFTs', to: '/nfts', current: false, id:2 },
  { name: 'Launchpad', to: '/launchpad', current: false, id:3 },
  { name: 'Collaborate', to: '/collaborate', current: false, id:4 },
]
const userNavigation = [
  { name: 'Your Profile', to: '/', id:0 },
  { name: 'Settings', to: '/' , id : 1},
  { name: 'Sign out', to: '/' , id:-1},
]



function switchTabs(id){
  navStore.setPageId(id)
  console.log("this switch happening")
  console.log('useNavStore().pageId => ',useNavStore().pageId)
}
async function navigateToPage(pageId) {
  console.log("Trying to nav to ", pageId)

  const router = useRouter();
  if(pageId === -1){
    await disconnect()

    router.push({ path: "/signin" });

  }else if (pageId===0){
    router.push({ path: "/" });
  }
  else if (pageId===1){
    router.push({ path: "/currencies/" });
  }
  else if (pageId===2){
    router.push({ path: "/nfts/" });

  }else if (pageId===3){
    router.push({ path: "/launchpad/" });
  }
}




</script>