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
          <PopupDialog v-if="dialogs.get('send')?.open" :dialog="'send'" />
          <PopupDialog v-if="dialogs.get('mint')?.open" :dialog="'mint'"/>
          <PopupDialog v-if="dialogs.get('burn')?.open" :dialog="'burn'"/>
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
                  <div v-if="end > 0" class="hidden sm:block">
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
                      <span class="font-medium">{{ tokensStore.currencies.length }}</span>
                      {{ ' ' }}
                      results
                    </p>
                  </div>
                  <div class="flex flex-1 justify-between sm:justify-end">
                    <button v-if="start!==0" @click="previous"
                            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <button :disabled="!(end<tokensStore.currencies.length)" @click="next"
                            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700
                            hover:bg-gray-50 disabled:cursor-default disabled:opacity-50">Next</button>
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
console.log('events:', logs);

const filteredLogs = logs.filter((_, index) => logs[index].args._fromAddress === walletAddress);
console.log('filtered events:', filteredLogs)

logs.splice(0, logs.length, ...filteredLogs)
let totalResults = logs.length

let currentlyLoading = false;
function next(){
  const isMoreTokensRemain = (end < tokensStore.currencies.length)
  // get more tokens from cache
  const newList = tokensStore.currencies.slice(end, (end+MAX_PAGE_SIZE))
  // fully overwrite currentTokens
  currentTokens.splice(0, currentTokens.length, ...newList);
  // adjust start value: from(0).. -> from(10)..
  start = start + MAX_PAGE_SIZE
  // use new start to adjust new end
  end = start + currentTokens.length //ex: (14) = (10) + (4)
  updateTotalSupplyValues() // only need to call on next, not previous
}

function previous(){
  // go back MAX_PAGE_SIZE
  start = start - MAX_PAGE_SIZE
  // get previous tokens from cache - will always be MAX_PAGE_SIZE
  const backList = tokensStore.currencies.slice(start, (start+MAX_PAGE_SIZE));//ex: 0, (0+10)
  // fully overwrite currentTokens
  currentTokens.splice(0, currentTokens.length, ...backList);
  // use new list to determine new end
  end = start + backList.length //ex: (end) = (0) + (10)
}



let MAX_PAGE_SIZE = 5;
const MAX_PER_REQUEST = 5;
let request = 0;
let start = 0;
let end = 0;
let remaining;
let lastPage = true
let firstPage = true


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
      totalSupply = 'Loading...'
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
      blockNumber: log.blockNumber,
      dateTimeCreated: 'Loading...'
    })
    console.log('token added: ', address)
  }
  console.log('extractedTokens: ', extractedTokens);
  const shortenedList = extractedTokens.slice(0, MAX_PAGE_SIZE)
  end = start + shortenedList.length
  currentTokens.splice(0, currentTokens.length, ...shortenedList);
  await tokensStore.clearCurrencyCache()
  for(const token of extractedTokens){
    await tokensStore.addCurrency(token)
  }
  console.log('tracking - finished extracting all logs')
}

async function updateTotalSupplyValues(){
  currentlyLoading = true;
  for(let token of currentTokens){
    if(token.totalSupply === 'Loading...'){
      const contract = await providerStore.getContract(token.address)
      let totalSupply = (await contract.totalSupply()).toString();
      totalSupply = parseInt(totalSupply, 10) / (10 ** 18);
      token.totalSupply = totalSupply //-> updates currentTokens
      // update the cache as well
      await tokensStore.addCurrency(token)
      console.log('tracking - updating totalSupply on Loading...')
    }
  }
  currentlyLoading = false;
}

function navigateToPage(address) {
  navigateTo(`/currencies/${address}`)
}

onMounted(() => {
  console.log('tracking1')
  extractDataFromLogs(filteredLogs)
  console.log('tracking2')
  updateTotalSupplyValues()
  console.log('tracking3')
})

</script>