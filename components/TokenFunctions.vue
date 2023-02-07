<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <a v-for="item in resources" :key="item.name" @click="item.onClick" class="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
        <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
        <div class="ml-4">
          <p class="text-base font-medium text-gray-900">{{ item.name }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
        </div>
      </a>
    </div>
    <div class="bg-gray-50 px-5 py-5 sm:px-8 sm:py-8">
    </div>
  </div>
</template>

<script setup>
import { FireIcon, BanknotesIcon, ArrowUpIcon, AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
import {useDialogStore} from "../stores/dialogStore";

const resources = [
  {
    name: 'Send Tokens',
    description: 'Transfer from your balance to another address.',
    onClick: sendTokens,
    icon: ArrowUpIcon,
  },
  {
    name: 'Burn',
    description: 'Reduce the total supply of your token.',
    onClick: burnTokens,
    icon: FireIcon,
  },
  {
    name: 'Mint',
    description: 'Increase the total circulating supply of your token.',
    onClick: mintTokens,
    icon: BanknotesIcon,
  },
  { name: 'Advanced', description: 'Look under the hood for more functions.', href: '#', icon: AdjustmentsHorizontalIcon },
]

function sendTokens(){
  console.log('sendTokens clicked')
  useDialogStore().setState('send', true)
}
function mintTokens(){
  console.log('mintTokens clicked')
  useDialogStore().setState('mint', true)
}
function burnTokens(){
  console.log('burnTokens clicked')
  useDialogStore().setState('burn', true)
}

</script>

<style scoped>

</style>