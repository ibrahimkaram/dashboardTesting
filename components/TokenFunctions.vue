<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <a v-for="item in resources" :key="item.name" :href="item.href" class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
        <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
        <div class="ml-4">
          <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </a>
    </div>
    <div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
      <div>
        <h3 class="text-base font-medium text-gray-500">Recent Posts</h3>
        <ul role="list" class="mt-4 space-y-4">
          <li v-for="post in recentPosts" :key="post.id" class="truncate text-base">
            <a :href="post.href" class="font-medium text-gray-900 transition duration-150 ease-in-out hover:text-gray-700">{{ post.name }}</a>
          </li>
        </ul>
      </div>
      <div class="mt-5 text-sm">
        <a href="#" class="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">
          View all posts
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookmarkSquareIcon, CalendarIcon, LifebuoyIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: LifebuoyIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]
</script>

<style scoped>

</style>