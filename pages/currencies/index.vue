<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BreadcrumbHeader :crumbs="crumbs" :pageName="pageName"/>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <PopupDialog v-if="dialogs.get('send').open" :dialog="'send'" />
          <PopupDialog v-if="dialogs.get('mint').open" :dialog="'mint'"/>
          <PopupDialog v-if="dialogs.get('burn').open" :dialog="'burn'"/>
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader :title="'My Currencies'"/>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">All previously deployed currencies</p>
                </div>
                <div class="mt-8 flex flex-col">
                  <div class="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
                    <div v-if="currentTokens.length!==0" class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Token</th>
                          <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Total Supply</th>
                          <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Date Created</th>
                          <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Role</th>
                          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                        <tr v-for="token in currentTokens" :key="token.name" @click="navigateToPage(token.address)" class="cursor-pointer hover:bg-indigo-50">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.totalSupply }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.symbol }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">Owner</td>
                          <td class="relative whitespace-nowrap py-4 pl-3 pr-4">
                            <DropdownButton :token="token" @click.stop=""/>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="currentTokens.length===0" class="pb-16">
                      <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">No currencies launched on this network</h3>
                        <p class="mt-1 text-sm text-gray-500">Try switching networks or get started by creating a new currency.</p>
                        <div class="mt-6">
                          <NuxtLink to="/launchpad"
                                    type="button" class="inline-flex items-center rounded-full border border-transparent
                              bg-primary-blue px-5 pr-7 py-2 text-sm font-medium text-white shadow-sm hover:opacity-75
                              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            New Currency
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <nav class="flex items-center justify-between border-t border-gray-200 bg-white py-4 " aria-label="Pagination">
                  <div v-if="totalResults > 0" class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      {{ ' ' }}
                      <span class="font-medium">{{ start + 1 }}</span>
                      {{ ' ' }}
                      to
                      {{ ' ' }}
                      <span class="font-medium">{{ end }}</span>
                      {{ ' ' }}
                      of
                      {{ ' ' }}
                      <span class="font-medium">{{ totalResults }}</span>
                      {{ ' ' }}
                      results
                    </p>
                  </div>
                  <div class="flex flex-1 justify-between sm:justify-end">
                    <button v-if="!firstPage" @click="previous" disabled="{{firstPage}}" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <button v-if="!lastPage" @click="next" disabled="{{lastPage}}" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <!-- Replace with your content -->
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
import {navigateTo} from "nuxt/app";
import { useTokensStore } from "/stores/tokenStore";
import DropdownButton from "/components/DropdownButton";
import EmptyTokenListState from "/components/EmptyTokenListState";
import { reactive, onMounted } from 'vue'
import {ethers, utils} from 'ethers';
import {erc20ABI, erc20FactoryABI} from "/assets/constants/abis";
import {useDialogStore} from "../../stores/dialogStore";
import {useProviderStore} from "../../stores/providerStore";
import {getAccount} from "@wagmi/core";
import {useNavStore} from "../../stores/navStore";

const tokensStore = useTokensStore()
const fullTokenList = tokensStore.currencies
const dialogs = useDialogStore().dialogs
const providerStore = useProviderStore()
const navStore = useNavStore()

const pageName = 'Launched Currencies'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'Currencies', to: '/currencies', current: true },
]
navStore.setPageId(1)

let factoryAddress = providerStore.erc20Factory

let currentTokens = reactive([])

// Connect to the Ethereum blockchain using a provider
const provider = await providerStore.walletProvider
const connectedAccount = await getAccount()
const walletAddress = await connectedAccount.address
console.log('walletAddress:', walletAddress)
console.log('provider.network = ', provider.network)

const factoryInstance = new ethers.Contract(factoryAddress, erc20FactoryABI, provider);
let logs = await factoryInstance.queryFilter('Created');
console.log('events:', logs)

const filteredLogs = logs.filter((_, index) => logs[index].args._fromAddress === walletAddress);
console.log('filtered events:', filteredLogs)

logs.splice(0, logs.length, ...filteredLogs)
let totalResults = logs.length

function next(){
  // if(!currentlyLoading){
  //   if(end < fullTokenList.length){
  //     start = start + MAX_PAGE_SIZE
  //     end = end + MAX_PAGE_SIZE
  //     remaining = totalResults - start
  //     if(end > totalResults){
  //       end = end - MAX_PER_REQUEST + remaining
  //     }
  //     console.log(`totalResults = ${totalResults}`)
  //     console.log(`start = ${start}`)
  //     console.log(`remaining = ${remaining}`)
  //     console.log(`end = ${end}`)
  //     let nextTokens = fullTokenList.slice(start, end);
  //     currentTokens.splice(0, MAX_PAGE_SIZE, ...nextTokens);
  //   }else {
  //     if(fullTokenList.length < logs.length){
  //       createQueueFromLogs(logs)
  //     }else {
  //       console.log('you have reached the end')
  //     }
  //   }
  // } else {
  //   console.log('currentlyLoading')
  // }
}

function previous(){
  // if(!currentlyLoading){
  //   if(start - MAX_PAGE_SIZE < 0){
  //     console.log('you have reached the beginning')
  //     return
  //   }
  //   remaining = totalResults - start
  //   if(remaining < MAX_PAGE_SIZE){
  //     end = end - remaining
  //   } else { end = end - MAX_PAGE_SIZE }
  //   start = start - MAX_PAGE_SIZE
  //   console.log(`totalResults = ${totalResults}`)
  //   console.log(`start = ${start}`)
  //   console.log(`remaining = ${remaining}`)
  //   console.log(`end = ${end}`)
  //   let previousTokens = fullTokenList.slice(start, end);
  //   currentTokens.splice(0, MAX_PAGE_SIZE, ...previousTokens);
  // }else {
  //   console.log('currentlyLoading')
  // }
}

const MAX_PAGE_SIZE = 5;
const MAX_PER_REQUEST = 5;
let request = 0;
let start = 0;
let end = totalResults;
let remaining;
let lastPage = true
let firstPage = true

async function createQueueFromLogs(logs) {
  start = request * MAX_PER_REQUEST;
  end = start + MAX_PER_REQUEST;
  remaining = totalResults - start;
  if(end > totalResults){
    end = end - MAX_PER_REQUEST + remaining
  }
  console.log(`totalResults = ${totalResults}`)
  console.log(`start = ${start}`)
  console.log(`remaining = ${remaining}`)
  console.log(`end = ${end}`)

  let pageQueue = logs.slice(start, end);

  if (pageQueue.length > 0 && pageQueue.length <= MAX_PAGE_SIZE) {
    console.log('queue is working')
    await extractDataFromLogs(pageQueue);
  } else {
    console.log('queue is finished');
  }

}

async function extractDataFromLogs(logs) {
  let extractedTokens = []
  for (const log of logs) {
    console.log('decoded-log.args:', log.args)
    const name = log.args._token[0]
    const symbol = log.args._token[1]
    const initSupply = log.args._token[2]
    const isBurnable = log.args._token[4]
    const isMintable = log.args._token[5]
    const address = log.args._token[6]

    let totalSupply = initSupply
    if(isBurnable || isMintable){
      const contract = await providerStore.getContract(address)
      totalSupply = (await contract.totalSupply()).toString();
      totalSupply = parseInt(totalSupply, 10) / (10 ** 18);
    }
    extractedTokens.push({
      name: name,
      symbol: symbol,
      address: address,
      totalSupply: totalSupply,
      network: providerStore.network,
      type: 'ERC20',
      isMintable: isMintable,
      isBurnable: isBurnable,
      blockNumber: log.blockNumber
    })
    console.log('token added: ', address)
  }
  console.log('extractedTokens: ', extractedTokens);
  const shortenedList = extractedTokens.slice(0, MAX_PAGE_SIZE)
  currentTokens.splice(0, currentTokens.length, ...shortenedList);
  for(const token of extractedTokens){
    await tokensStore.addCurrency(token)
  }
  request++;
}

function navigateToPage(address) {
  navigateTo(`/currencies/${address}`)
}

onMounted(() => {
  extractDataFromLogs(filteredLogs)
})

</script>