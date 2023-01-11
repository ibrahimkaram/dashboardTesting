<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">WedgeToken</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Features, transaction history, and token holders .</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Creation date</dt>
          <dd class="mt-1 text-sm text-gray-900">WedgeToken</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total supply</dt>
          <dd class="mt-1 text-sm text-gray-900">1,000,000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Balance</dt>
          <dd class="mt-1 text-sm text-gray-900">199,000</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Number of holders</dt>
          <dd class="mt-1 text-sm text-gray-900">1368</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'

const { tokenData, address } = defineProps(['tokenData', 'address'])
</script>