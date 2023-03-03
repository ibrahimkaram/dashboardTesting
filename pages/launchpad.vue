<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
    <div class="mx-auto max-w-2xl px-8 py-28">
      <!-- Content goes here -->
      <div>
        <h2 class="text-lg font-medium text-gray-900">Projects</h2>
        <p class="mt-1 text-sm text-gray-500">You haven’t created a project yet. Get started by selecting a template or start from an empty project.</p>
        <ul role="list" class="mt-6 grid grid-cols-1 gap-6 border-t border-b border-gray-200 py-6 sm:grid-cols-2">
          <li v-for="(item, itemIdx) in items" :key="itemIdx" class="flow-root">
            <div class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <div :class="[item.background, 'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg']">
                <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">
                  <a href="#" class="focus:outline-none">
                    <span class="absolute inset-0" aria-hidden="true" />
                    <span>{{ item.title }}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
              </div>
            </div>
          </li>
        </ul>
        <div class="mt-4 flex">
          <a href="https://launchpad.osisplatform.com/" class="text-sm font-medium text-indigo-600

          hover:text-indigo-500">z
            Or start from an empty project
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CurrencyDollarIcon,
  PhotoIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  ScaleIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'
import {useNavStore} from "../stores/navStore";
const navStore = useNavStore()
navStore.setPageId(3)
const items = [
  {
    title: 'Create a Currency',
    description: 'Be the master of your own economy.',
    icon: CurrencyDollarIcon,
    background: 'bg-pink-500',
  },
  {
    title: 'Create an NFT',
    description: 'Make your mark on the digital world, non-fungible.',
    icon: PhotoIcon,
    background: 'bg-yellow-500',
  },
  {
    title: 'Create a Neo Bank',
    description: 'Pave the way for the future of finance.',
    icon: BuildingLibraryIcon,
    background: 'bg-green-500',
  },
  {
    title: 'Create a Game',
    description: 'Why play by the rules - when you can make your own game.',
    icon: RocketLaunchIcon,
    background: 'bg-blue-500',
  },
  {
    title: 'Create a Vote System',
    description: 'Give people a voice in the democratic process',
    icon: ScaleIcon,
    background: 'bg-indigo-500',
  },
  {
    title: 'Create a ChatBot',
    description: "Talk too much? - there's a robot for that",
    icon: ChatBubbleLeftRightIcon,
    background: 'bg-purple-500',
  },
]
</script>