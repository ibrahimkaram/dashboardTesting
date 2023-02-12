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
                  <DefaultListHeader/>
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
                    <div v-if="currentTokens.length===0">
                      <EmptyTokenListState/>
                    </div>
                  </div>
                </div>
                <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
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
                    <button @click="previous" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <button @click="next" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader/>
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
                        <tr v-for="token in currentTokens" :key="token.name">
                          <NuxtLink :to="`/currencies/${token.address}`" class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</NuxtLink>
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
                    <div v-if="currentTokens.length===0">
                      <EmptyTokenListState/>
                    </div>
                  </div>
                </div>
                <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
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

import {navigateTo} from "nuxt/app";
import { useTokensStore } from "/stores/tokenStore";
import DropdownButton from "/components/DropdownButton";
import EmptyTokenListState from "/components/EmptyTokenListState";
import { reactive, onMounted } from 'vue'
import {ethers, utils} from 'ethers';
import {erc20ABI} from "/assets/constants/abis";
import {useDialogStore} from "../../stores/dialogStore";
import {useProviderStore} from "../../stores/providerStore";
import {getAccount} from "@wagmi/core";

const tokensStore = useTokensStore()
const fullTokenList = tokensStore.currencies
const dialogs = useDialogStore().dialogs
const providerStore = useProviderStore()

const pageName = 'Launched Currencies'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'Currencies', to: '/currencies', current: true },
]

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

let currentTokens = reactive([])

// Connect to the Ethereum blockchain using a provider
const provider = await providerStore.walletProvider
const connectedAccount = await getAccount()
const walletAddress = await connectedAccount.address
console.log('provider.network = ', provider.network)

console.log('we are about to get logs:')
//let logs = null
const logs = await provider.getLogs({
  fromBlock: 0,
  toBlock: 'latest',
  address: factoryAddress, //goerli factory contract
  // topics: [
  //   utils.id("Created(string,string,string,address,Roles,uint256,bytes)"),
  //   hexZeroPad('0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a', 32)
  // ]
  //event Created(string _name, string _symbol, string _tokenType, address _tokenAddress, Roles _role, uint256 _feePaid, bytes _data);
});
console.log('logs from 1st filter:', logs)


const promises = logs.map(log => provider.getTransactionReceipt(log.transactionHash));
const transactionReceipts = await Promise.all(promises);
const filteredLogs = logs.filter((_, index) => transactionReceipts[index].from === walletAddress);
console.log('logs from 2nd filter:', filteredLogs)
logs.splice(0, logs.length, ...filteredLogs)
let totalResults = logs.length


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

async function getContract(address){
  return new ethers.Contract(address, erc20ABI, provider)
}

function next(){
  if(end < fullTokenList.length){
    start = start + MAX_PAGE_SIZE
    end = end + MAX_PAGE_SIZE
    remaining = totalResults - start
    if(end > totalResults){
      end = end - MAX_PER_REQUEST + remaining
    }
    console.log(`totalResults = ${totalResults}`)
    console.log(`start = ${start}`)
    console.log(`remaining = ${remaining}`)
    console.log(`end = ${end}`)
    let nextTokens = fullTokenList.slice(start, end);
    currentTokens.splice(0, MAX_PAGE_SIZE, ...nextTokens);
  }else {
    if(fullTokenList.length < logs.length){
      getTokenDataList(logs)
    }else {
      console.log('you have reached the end')
    }
  }

}

function previous(){
  if(start - MAX_PAGE_SIZE < 0){
    console.log('you have reached the beginning')
    return
  }
  remaining = totalResults - start
  if(remaining < MAX_PAGE_SIZE){
    end = end - remaining
  } else { end = end - MAX_PAGE_SIZE }
  start = start - MAX_PAGE_SIZE
  console.log(`totalResults = ${totalResults}`)
  console.log(`start = ${start}`)
  console.log(`remaining = ${remaining}`)
  console.log(`end = ${end}`)
  let previousTokens = fullTokenList.slice(start, end);
  currentTokens.splice(0, MAX_PAGE_SIZE, ...previousTokens);
}

const MAX_PAGE_SIZE = 5;
const MAX_PER_REQUEST = 5;
let request = 0;
let start = 0;
let end = 0;
let remaining;

async function getTokenDataList(logs){
  await createQueueFromLogs(logs)
}

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
  let currentQueueTokens = []
  for (const log of logs) {
    const transactionReceipt = await provider.getTransactionReceipt(log.transactionHash);
    const tx = await provider.getTransaction(log.transactionHash);
    console.log('this is tx:', tx)
    const method = tx.data.toString().slice(0,10)
    const canMint = tx.data.toString().slice(138, 202)
    const canBurn = tx.data.toString().slice(202, 266)
    console.log('this is tx: method = ', method)
    console.log('this is tx: method = ', canMint)
    console.log('this is tx: method = ', canBurn)
    const isMintable = (canMint === '0000000000000000000000000000000000000000000000000000000000000001')
    const isBurnable = (canBurn === '0000000000000000000000000000000000000000000000000000000000000001')
    console.log('isMintable = ', isMintable)
    console.log('isBurnable = ', isBurnable)
    console.log('this is transactionReceipt:', transactionReceipt)
    if(transactionReceipt.from !== walletAddress){
      logs.splice(log.index, 1)
    } else {
      const address = await getAddress(transactionReceipt, log)
      console.log('this is address: ', address)
      const contract = await getContract(address)
      const tokenData = await getContractData(contract)
      let totalSupply = tokenData.totalSupply.toString();
      totalSupply = parseInt(totalSupply, 10) / (10 ** 18);
      currentQueueTokens.push({
        name: tokenData.name,
        symbol: tokenData.symbol,
        address: address, totalSupply: totalSupply,
        network: 'Goerli',
        type: 'ERC20', isMintable: isMintable, isBurnable: isBurnable
      })
      console.log('token added: ', address)    }

  }
  console.log('currentQueueTokens: ', currentQueueTokens);
  currentTokens.splice(0, currentTokens.length, ...currentQueueTokens);
  for(const token of currentQueueTokens){
    await tokensStore.addCurrency(token)
  }
  request++;
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

  getTokenDataList(logs)

  // const unwatch = watchProvider(
  //     {
  //       chainId: 1, // 5-goerli ... 137 polygon ...  ... 80001
  //     },
  //     async (wProvider) => {
  //       provider = wProvider
  //       console.log(provider)
  //       logs = await provider.getLogs({
  //         fromBlock: 0,
  //         toBlock: 'latest',
  //         address: '0x23E50E5322ca7c5E6dDd81730d1bb2B1bcD7Ea19', //goerli factory contract
  //         from: '0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a',
  //       });
  //       console.log(logs)
  //       await getTokenDataList(logs)
  //     }
  // )
})

</script>