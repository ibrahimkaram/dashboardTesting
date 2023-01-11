<template>
  <ClientOnly>
    <div class="min-h-full">
      <div class="py-10">
        <header>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BreadcrumbHeader :crumbs="crumbs" :pageName="pageName"/>
          </div>
        </header>
        <div class="p-10">
          <TokenDetailCard :tokenData="tokenData" :address="address"/>
        </div>
        <div class="px-10">
          <div>
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">Select a tab</label>
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                <option v-for="tab in tabs" :key="tab.name" :selected="tabId===tab.id">{{ tab.name }}</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                  <a v-for="tab in tabs" :key="tab.name" :class="[tabId===tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm']" :aria-current="tabId===tab.id ? 'page' : undefined">
                    <button @click="switchTabs(tab.id)" class="flex" >
                      <component :is="tab.icon" :class="[tabId===tab.id ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500', '-ml-0.5 mr-2 h-5 w-5']" aria-hidden="true" />
                      <span>{{ tab.name }}</span>
                    </button>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div class="px-10">
          <TokenFunctions v-if="tabId === 0"/>
          <TokenTransactions v-if="tabId === 1" />
          <TokenHolders v-if="tabId === 2"/>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowsRightLeftIcon, CodeBracketSquareIcon, UsersIcon } from '@heroicons/vue/20/solid'
import TokenTransactions from "../../components/TokenTransactions";
import Pagination from "../../components/Pagination";
const { address } = useRoute().params

const tabId = ref(0)

const pageName = 'Token Details'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'Currencies', to: '/currencies', current: false },
  { name: 'Token Details', to: `${address}`, current: true },
]
const { tokenData } = defineProps(['tokenData'])

const tabs = [
  { name: 'Contract Features', id: 0, icon: CodeBracketSquareIcon, current: true },
  { name: 'Transactions', id: 1, icon: ArrowsRightLeftIcon, current: false },
  { name: 'Token Holders', id: 2, icon: UsersIcon, current: false },
]

function switchTabs(id){
  tabId.value = id;

  console.log("this switch happening")
}

// const { transactions } = useFetch(getTransaction)

</script>


<style scoped>
</style>