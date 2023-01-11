<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div>
      <DefaultListHeader/>
    </div>
    <ul role="list" class="pt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="person in people" :key="person.email" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
        <div class="flex w-full items-center justify-between space-x-6 p-6">
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="truncate text-sm font-medium text-gray-900">{{ person.name }}</h3>
              <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{ person.role }}</span>
            </div>
            <p class="mt-1 truncate text-sm text-gray-500">{{ person.title }}</p>
          </div>
          <component :is="person.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
<!--              <a :href="`mailto:${person.email}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">-->
<!--                <EnvelopeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />-->
<!--                <span class="ml-3">Email</span>-->
<!--              </a>-->
            </div>
            <div class="-ml-px flex w-0 flex-1">
<!--              <a :href="`tel:${person.telephone}`" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">-->
<!--                <PhoneIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />-->
<!--                <span class="ml-3">Call</span>-->
<!--              </a>-->
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { SparklesIcon, FingerPrintIcon, CakeIcon  } from '@heroicons/vue/20/solid'

const people = [
  {
    name: 'Luigi Badges',
    title: 'Rare Italian Art Collection',
    role: 'Owner',
    icon: SparklesIcon,
    email: 'luigi@example.com',
    telephone: '+1-202-555-0170',
  },
  {
    name: 'Weege Apes',
    title: 'Punk Style Weege Apes',
    role: 'Owner',
    icon: FingerPrintIcon,
    email: 'luigi@example.com',
    telephone: '+1-202-555-0170',
  },
  {
    name: 'Ibrahim Fruits',
    title: 'Collection of Ibrahims as fruit',
    role: 'Owner',
    icon: CakeIcon,
    email: 'ibrahim@example.com',
    telephone: '+1-202-555-0170',
  },
  // More people...
]
</script>