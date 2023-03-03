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
                  <DefaultListHeader :title="'Coming soon!'"/>
                  <p class="mt-1 max-w-2xl text-sm text-gray-500">NFTs are currently under construction. See cool examples ;)</p>
                  <div class="pt-12">
                    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <li v-for="nft in currentTokens" :key="nft.cid" @click="navigateToPage(nft.address)" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                        <div class="flex flex-1 flex-col p-8">
                          <img v-if="nft.cid" class="mx-auto h-32 w-32 flex-shrink-0" :src="nft.url" alt="" />
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
const pageName = 'Launched NFT Projects'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'NFTs', to: '/nfts', current: true },
]

import {useProviderStore} from "../../stores/providerStore";
import {onMounted, reactive} from "vue";
import {getAccount} from "@wagmi/core";
import {ethers} from "ethers";
import {erc20FactoryABI, erc721FactoryABI} from "../../assets/constants/abis";
import {navigateTo, useRuntimeConfig} from "nuxt/app";
import axios from "axios";
import {useTokensStore} from "../../stores/tokenStore";

const tokensStore = useTokensStore()
const providerStore = useProviderStore()

let factoryAddress = '0x72e5a2b1AFe5207c5bbAE8e360e4c6b4EC15479E';

let currentTokens = reactive([])

// Connect to the Ethereum blockchain using a provider
const provider = await providerStore.walletProvider
const connectedAccount = await getAccount()
const walletAddress = await connectedAccount.address

const factoryInstance = new ethers.Contract(factoryAddress, erc721FactoryABI, provider);
console.log('factoryInstance = ', factoryInstance)
let logs = await factoryInstance.queryFilter('Created');
console.log('events:', logs);

const filteredLogs = logs.filter((_, index) => logs[index].args._fromAddress === walletAddress);
console.log('filtered events:', filteredLogs)

logs.splice(0, logs.length, ...filteredLogs)
let totalResults = logs.length


async function extractDataFromLogs(logs) {
  let extractedTokens = []
  for (const log of logs) {
    console.log('decoded-log.args:', log.args)
    const name = log.args._token[0]
    const symbol = log.args._token[1]
    const isBurnable = log.args._token[4]
    console.log('isBurnable', isBurnable)
    const isMintable = log.args._token[5]
    const address = log.args._token[6]
    const cid = log.args._uri
    console.log('uri', cid)
    let url = `https://ipfs.io/ipfs/${cid}`
    console.log('url', url)
    // const dataFromURL = await fetch(url)
    // console.log('dataFromURL:', dataFromURL)
    // const response = await fetch(`https://api.nft.storage/bafybeiaeyu2wa7qtw7j73kkx3pslecf2mc3ty5qi3klmbgvg5xab62pmre`, {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     Authorization: 'Bearer ',
    //   },
    // })

    const res = await axios.get(
        `https://api.nft.storage/${cid}`,
        {
          headers:{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzRUJhODM1NDdlYjlkN2M5RDNEMmUzQUFjMTVmNzc1NzMwN2NDMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NzI4MDc3NjAxMywibmFtZSI6IkxhdW5jaHBhZFN0b3JlS2V5In0.VTxwONCLcFGBcO9IV64URAkSDoNHTKGDi2XwxFwmnqc`,
          }
        }
    ).then((res) => {
      console.log('cid storage data:', res)
      url = `${url}/${res.data.value.files[0].name}`
    })



    extractedTokens.push({
      name: name,
      symbol: symbol,
      address: address,
      network: providerStore.network,
      type: 'ERC721',
      isMintable: isMintable,
      isBurnable: isBurnable,
      blockNumber: log.blockNumber,
      dateTimeCreated: 'Loading...',
      cid: cid,
      url: url
    })
    console.log('token added: ', address)

  }
  console.log('extractedTokens: ', extractedTokens);

  currentTokens.splice(0, currentTokens.length, ...extractedTokens);
  for(const token of extractedTokens){
    await tokensStore.addNFT(token)
  }
}

function navigateToPage(address) {
  navigateTo(`/nfts/${address}`)
}

onMounted(() => {
  extractDataFromLogs(filteredLogs)
})

</script>