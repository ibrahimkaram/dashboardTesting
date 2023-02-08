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
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader title="Recently Launched Currencies"/>
                </div>
                <div class="mt-8 flex flex-col">
                  <div class="-my-2 -mx-4  sm:-mx-6 lg:-mx-8">
                    <div v-if="recentCurrencies.length!==0" class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
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
                        <tr v-for="token in recentCurrencies" :key="token.name" @click="navigateToPage(token.address)" class="cursor-pointer hover:bg-indigo-50">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.totalSupply }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.symbol }}</td>
                          <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">Owner</td>
                          <td class="relative whitespace-nowrap py-4 pl-3 pr-4">
                            <DropdownButton @click.stop=""/>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="recentCurrencies.length===0">
                      <EmptyTokenListState/>
                    </div>
                  </div>
                </div>
                <div class="pb-6">
                  <NuxtLink
                      to="/currencies"
                      type="button"
                      class="inline-flex items-center rounded-full border border-transparent
                    bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">See all tokens ({{ currencies.length }})
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <!-- Replace with your content -->
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
                            <DropdownButton/>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div v-if="recentNFTs.length===0">
                      <EmptyTokenListState/>
                    </div>
                  </div>
                </div>
                <nav v-if="recentNFTs.length!==0" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      {{ ' ' }}
                      <span class="font-medium">{{ 1 }}</span>
                      {{ ' ' }}
                      to
                      {{ ' ' }}
                      <span class="font-medium">{{ 5 }}</span>
                      {{ ' ' }}
                      of
                      {{ ' ' }}
                      <span class="font-medium">{{ recentNFTs.length }}</span>
                      {{ ' ' }}
                      results
                    </p>
                  </div>
                  <div class="flex flex-1 justify-between sm:justify-end">
                    <button @click="previous" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <button @click="next" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {navigateTo} from "nuxt/app";

const pageName = 'Token Dashboard'
const crumbs = [
  // { name: 'Overview', to: '/', current: true },
]
import DropdownButton from "/components/DropdownButton";
import EmptyTokenListState from "/components/EmptyTokenListState";

import {ethers } from "ethers";
import {erc20ABI} from "../assets/constants/abis";
import { useTokensStore } from "../stores/tokenStore";
import {initClient, useProviderStore} from "../stores/providerStore";
import { getAccount } from '@wagmi/core'
const tokensStore = useTokensStore()
const currencies = tokensStore.currencies
const nfts = tokensStore.nfts

let recentCurrencies = reactive([])
let recentNFTs = reactive([])

const walletAddress = getAccount().address
const network = 'goerli'
let factoryAddress;
switch (network) {
  case 'goerli':
    factoryAddress = '0x14deE550016F74A7fdda9d6e3976aee616AEA1E6'; // goerli-factory
    break;
  case 'polygon':
    factoryAddress = '0xda196CF836c18962d21588700EE94f077E6032bf'; // polygon-factory
    break;
  case 'mainnet':
    factoryAddress = '0x23E50E5322ca7c5E6dDd81730d1bb2B1bcD7Ea19'; // mainnet-factory
    break;
  default:
    throw new Error(`Unsupported network: ${network}`);
}

// Connect to the Ethereum blockchain using a provider
// const provider = new ethers.providers.AlchemyProvider(
//     'goerli',
//     'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0'
// )
initClient()
const providerStore = useProviderStore()

const provider = await providerStore.walletProvider

const logs = await provider.getLogs({
  fromBlock: 0,
  toBlock: 'latest',
  address: factoryAddress, //goerli factory contract
});
console.log('logs from 1st filter:', logs);

const promises = logs.map(log => provider.getTransactionReceipt(log.transactionHash));
const transactionReceipts = await Promise.all(promises);
const filteredLogs = logs.filter((_, index) => transactionReceipts[index].from === walletAddress);
console.log('logs from 2nd filter:', filteredLogs)
logs.splice(0, logs.length, ...filteredLogs)

async function getAddress(transactionReceipt) {
  let childAddress = null;
  for(const log of transactionReceipt.logs){
    if(log.address !== "0x0000000000000000000000000000000000001010" &&
        log.address !== factoryAddress // ignore factory
    ){
      childAddress = log.address;
    }
  }
  return childAddress;
}

async function getContact(address){
  return new ethers.Contract(address, erc20ABI, provider)
}

function next(){
}
function previous(){
}

const MAX_PAGE_SIZE = 5;

async function extractDataFromLogs(logs) {
  let tokens = []
  for (const log of logs) {

    const transactionReceipt = await provider.getTransactionReceipt(log.transactionHash);
    console.log('this is transactionReceipt:', transactionReceipt)
    if(transactionReceipt.from === walletAddress){
      const address = await getAddress(transactionReceipt, log)
      console.log('this is address: ', address)
      const contract = await getContact(address)
      const tokenData = await getContractData(contract)
      let totalSupply = tokenData.totalSupply.toString();
      totalSupply = parseInt(totalSupply, 10) / (10 ** 18);
      tokens.push({
        name: tokenData.name, symbol: tokenData.symbol,
        address: address, totalSupply: totalSupply, contract: contract,
        network: 'Goerli', type: 'ERC20'
      })
      console.log('token added: ', address)
    }
    if(tokens.length === MAX_PAGE_SIZE){ break; }
  }
  for(const token of tokens){
    await tokensStore.addCurrency(token)
  }
  recentCurrencies.push(...currencies.slice(0,3))
}


async function getContractData(contract){
  const [name, symbol, totalSupply] = await Promise.all([
    contract.functions.name(),
    contract.functions.symbol(),
    contract.functions.totalSupply()
  ])
  return {name: name[0], symbol: symbol[0], totalSupply: totalSupply[0]}
}

function navigateToPage(address) {
  navigateTo(`/currencies/${address}`)
}

onMounted(() => {
  if(currencies.length < MAX_PAGE_SIZE){
    extractDataFromLogs(logs);
  }else {
    recentCurrencies.push(...currencies.slice(0,3))
  }
})


</script>