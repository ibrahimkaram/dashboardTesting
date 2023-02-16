<template>
  <div class="overflow-hidden bg-white py-4 px-6 lg:px-8 lg:py-8">
    <div class="relative mx-auto max-w-xl items-center">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 mx-auto">
        <FireIcon class="h-5 w-5 flex-shrink-0 text-white mx-auto" aria-hidden="true" />
      </div>
      <svg class="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
          <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
      </svg>
      <div class="text-center pt-4">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Burn</h2>
      </div>
      <div class="pt-8">
        <!--    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>-->
        <div class="relative mt-1 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div>
          <input type="text" name="amount" id="amount" v-model="useDialogStore().amount" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" aria-describedby="amount-currency" />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-gray-500 sm:text-sm" id="amount-currency">{{ currentToken.symbol }}</span>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <form action="#" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div class="sm:col-span-2">
            <label for="wallet-address" class="block text-sm font-medium text-gray-700">Burn To</label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">address:</span>
              <input type="text" name="wallet-address" id="wallet-address" v-model="useDialogStore().address" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0xf986...05e7a" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <div class="mt-1">
              <textarea id="message" name="message" rows="4" class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Switch v-model="agreed" :class="[agreed ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                  <span class="sr-only">Agree to policies</span>
                  <span aria-hidden="true" :class="[agreed ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                </Switch>
              </div>
              <div class="ml-3">
                <p class="text-base text-gray-500">
                  By selecting this, you agree to the
                  {{ ' ' }}
                  <a href="#" class="font-medium text-gray-700 underline">Privacy Policy</a>
                  {{ ' ' }}
                  and
                  {{ ' ' }}
                  <a href="#" class="font-medium text-gray-700 underline">Cookie Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import { FireIcon } from '@heroicons/vue/20/solid'
import {useDialogStore} from "../stores/dialogStore";
import {useTokensStore} from "../stores/tokenStore";
const currentToken = await useTokensStore().currentToken
const agreed = ref(false)
</script>