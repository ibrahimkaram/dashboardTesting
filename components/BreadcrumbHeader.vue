<template>
  <div>
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <NuxtLink to="/" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
          <ChevronLeftIcon class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          Back
        </NuxtLink>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li v-for="page in crumbs" :key="page.name">
            <div class="flex items-center">
              <NuxtLink :to="page.to" class="mr-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</NuxtLink>
              <ChevronRightIcon v-if="!page.current" class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-primary-blue  sm:truncate sm:text-3xl sm:tracking-tight">{{pageName}}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import SelectMenuWithStatus from "./SelectMenuWithStatus";

const { crumbs, pageName } = defineProps(['crumbs', 'pageName'])

</script>