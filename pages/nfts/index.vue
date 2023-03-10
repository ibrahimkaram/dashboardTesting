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
            <div class="rounded-lg  shadow-lg">
              <div class="pt-12 px-4 sm:px-6 lg:px-8">
                <div>
                  <DefaultListHeader :title="'My NFT Projects'"/>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">Each project represents a smart contract that manages a set of NFTS.</p>
                  <div class="py-12">
                    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <li v-for="nft in currentContracts" :key="nft.cid" @click="navigateToPage(nft.address)" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:cursor-pointer">
                        <div class="flex flex-1 flex-col p-8">
                          <img v-if="nft.uri" class="mx-auto h-32 w-32 flex-shrink-0" :src="nft.uri" alt="" />
                          <h3 class="mt-6 text-sm font-medium text-gray-900">{{ nft.name }}</h3>
                          <dl class="mt-1 flex flex-grow flex-col justify-between">
                            <dt class="sr-only">Title</dt>
                            <dd class="text-sm text-gray-500">{{ nft.symbol }}</dd>
                            <dt class="sr-only">Role</dt>
                            <dd class="mt-3">
                              <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{ nft.type }}</span>
                            </dd>
                          </dl>
                        </div>
                        <div>
                          <div class="-mt-px flex divide-x divide-gray-200">
                            <div class="flex w-0 flex-1">
                            </div>
                            <div class="-ml-px flex w-0 flex-1">
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
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
import {factoryAddresses, nftFactoryAddresses} from "../../assets/constants/factories";

const pageName = 'Launched NFT Projects'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'NFTs', to: '/nfts', current: true },
]

import {useProviderStore} from "../../stores/providerStore";
import {onMounted, reactive} from "vue";
import {getAccount} from "@wagmi/core";
import {ethers} from "ethers";
import {erc20FactoryABI, erc721ABI, erc721FactoryABI} from "../../assets/constants/abis";
import {navigateTo, useRuntimeConfig} from "nuxt/app";
import axios from "axios";
import {useTokensStore} from "../../stores/tokenStore";

const tokensStore = useTokensStore()
const providerStore = useProviderStore()

let currentContracts = reactive([])

// Connect to the Ethereum blockchain using a provider
const provider = await providerStore.walletProvider
const connectedAccount = await getAccount()
const walletAddress = await connectedAccount.address

let factoryAddress = nftFactoryAddresses[provider.network.chainId];
console.log("Factory is ", factoryAddress)

const factoryInstance = new ethers.Contract(factoryAddress, erc721FactoryABI, provider);
console.log('factoryInstance = ', factoryInstance)
let logs = await factoryInstance.queryFilter('Created');
console.log('logs:', logs)
console.log('events:', logs);

const filteredLogs = logs.filter((_, index) => logs[index].args._fromAddress === walletAddress);
console.log('filtered events:', filteredLogs)

logs.splice(0, logs.length, ...filteredLogs)
let totalResults = logs.length


async function extractDataFromLogs(logs) {
  let extractedContracts = []
  for (const log of logs) {
    console.log('decoded-log.args._fromAddress:', log.args._fromAddress)
    const name = log.args._token.name
    const symbol = log.args._token.symbol
    const isBurnable = log.args._token.isBurnable
    console.log('isBurnable:', isBurnable)
    const isMintable = log.args._token.isMintable
    const tokenAddress = log.args._token.tokenAddress
    console.log('tokenAddress:', tokenAddress)
    let uri = 'https://i.pinimg.com/originals/05/a2/ea/05a2ea52838d1585d20bb702f42df9a2.gif'
    extractedContracts.push({
      name: name,
      symbol: symbol,
      description: '',
      address: tokenAddress,
      network: providerStore.network,
      type: 'ERC721',
      isMintable: isMintable,
      isBurnable: isBurnable,
      blockNumber: log.blockNumber,
      dateTimeCreated: 'Loading...',
      uri: uri,
      uriHolder: log.args._uri
    })

  }
  currentContracts.splice(0, currentContracts.length, ...extractedContracts);
  getImages().then()
}

async function getImages(){
  for (let i = 0; i < currentContracts.length; i++) {
    console.log('uri:', currentContracts[i].uriHolder)
    const uri = formatURI(currentContracts[i].uriHolder)
    console.log('formatURI:', uri)
    const uriData = await axios.get(uri)
    console.log( 'axios.get(uri)', uriData)

    if(uriData.data.image){
      currentContracts[i].uri = formatURI(uriData.data.image)
      currentContracts[i].description = uriData.data.description
    } else {
      // const nestedData = await axios.get(uri)
      // console.log('nestedData', nestedData)
      currentContracts[i].description = uriData.data.description
      currentContracts[i].uri = 'https://docs.soliditylang.org/en/v0.8.19/_static/logo.svg'
    }
  }
  for(const contract of currentContracts){
    await tokensStore.addNFT(contract)
  }
}

function formatURI(URI){
  let uri = URI
  if (uri.startsWith('ipfs://')) {
    uri = uri.replace('ipfs://', 'https://') + '.ipfs.nftstorage.link';
  }
  if (uri.startsWith('baf')) {
    uri = uri.replace('baf', 'https://baf') + '.ipfs.nftstorage.link';
  }
  return uri;
}

function navigateToPage(address) {
  navigateTo(`/nfts/${address}`)
}

onMounted(() => {
  extractDataFromLogs(filteredLogs)
})

</script>