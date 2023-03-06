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
          <!-- Start of Currencies -->
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader title="Recently Launched Currencies"/>
                </div>
                <div class="mt-8 flex flex-col">
                  <div class="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
                    <div v-if="recentCurrencies.length!==0" class=" w-full py-2 align-middle md:px-6 lg:px-8">
                      <table class="max-w-full divide-y divide-gray-300">
                        <thead>
                        <tr class="">
                          <th scope="col" class="w-full  py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Token</th>
                          <th scope="col" class="py-3.5 whitespace-nowrap px-3 text-left text-sm font-semibold text-gray-900">Total Supply</th>
                          <th scope="col" class="py-3.5 whitespace-nowrap px-3 text-left text-sm font-semibold text-gray-900">Date Created</th>
                          <!-- <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Role</th> -->
                          <!-- <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                            <span class="sr-only">Edit</span>
                          </th> -->
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                        <tr v-for="token in recentCurrencies" :key="token.name" @click="navigateToPage(token.address)" class="cursor-pointer hover:bg-indigo-50">
                          <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.totalSupply }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.symbol }}</td>
                          <!-- <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">Owner</td> -->
                          <!-- <td class="relative whitespace-nowrap py-4 pl-3 pr-4">
                            <DropdownButton :token="token" @click.stop=""/>
                          </td> -->
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="recentCurrencies.length===0" class="pb-4">
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
                <div class="py-6 w-full flex justify-end ">
                  <NuxtLink v-if="currencies.length > 0"
                      to="/currencies"
                      type="button"
                      class="inline-flex items-center rounded-full border border-transparent
                    bg-primary-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-75
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">See all tokens ({{ currencies.length }})
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <!-- End of Currencies -->

          <!-- Start of NFTs -->
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader title="Recently Launched NFTs"/>
                </div>
                <div class="mt-8 flex flex-col">
                  <div class="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
                    <div v-if="recentNFTs.length!==0" class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                        <tr v-for="token in recentNFTs" :key="token.name">
                          <NuxtLink :to="`/currencies/${token.name}`" class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</NuxtLink>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.totalSupply }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.symbol }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">Owner</td>
                          <td class="relative whitespace-nowrap py-4 pl-3 pr-4">

                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="recentNFTs.length===0">
                    <div class="text-center pt-12 pb-16">
                      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                      <h3 class="mt-2 text-sm font-medium text-gray-900">No NFTs</h3>
                      <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- End of NFTs -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
import {onMounted, reactive} from "vue";
import {navigateTo} from "nuxt/app";

const navStore = useNavStore()
const pageName = 'Token Dashboard'
const crumbs = [
  // { name: 'Overview', to: '/', current: true },
]
navStore.setPageId(0)
import DropdownButton from "/components/DropdownButton";
import EmptyTokenListState from "/components/EmptyTokenListState";

import {ethers } from "ethers";
import {erc20ABI, erc20FactoryABI} from "../assets/constants/abis";
import { useTokensStore } from "../stores/tokenStore";
import {initClient, useProviderStore} from "../stores/providerStore";
import {getAccount, watchNetwork} from '@wagmi/core'
import {useNavStore} from "../stores/navStore";
import {useDialogStore} from "../stores/dialogStore";
import {factoryAddresses} from "assets/constants/factories";
const providerStore = useProviderStore()
const dialogs = useDialogStore().dialogs
const tokensStore = useTokensStore()
const currencies = tokensStore.currencies
const nfts = tokensStore.nfts

let recentCurrencies = reactive([])
let recentNFTs = reactive([])

initClient()


// Connect to the Ethereum blockchain using a provider
const provider = await providerStore.walletProvider

console.log("Network Id is ", provider.network.chainId);

let factoryAddress = factoryAddresses[provider.network.chainId] ;
console.log("Factory is ", factoryAddress)


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



const MAX_PAGE_SIZE = 5;

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
  recentCurrencies.splice(0, recentCurrencies.length, ...shortenedList);
  await tokensStore.clearCurrencyCache()
  for(const token of extractedTokens){
    await tokensStore.addCurrency(token)
  }
}



function navigateToPage(address) {
  navigateTo(`/currencies/${address}`)
}

function checkSigninState(){
    const account =  getAccount()

    if(account.isDisconnected ){
      const router = useRouter();
      router.push({ path: "/signin" });

    }

}

onMounted(() => {

  checkSigninState()


  if(currencies.length < MAX_PAGE_SIZE){
    extractDataFromLogs(logs);
  }else {
    recentCurrencies.push(...currencies.slice(0,3))
  }
  const unwatch = watchNetwork(async (net) => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  })

})


</script>