<template>
  <ClientOnly>
    <div class="min-h-full">
      <UploadDialog v-if="dialogs.get('nftSafeMint').open" :dialog="'nftSafeMint'"/>
      <div class="py-10">
        <header>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BreadcrumbHeader :crumbs="crumbs" :pageName="pageName"/>
          </div>
        </header>
        <div class="p-10">
          <NftProjectDetails/>
        </div>

        <div class="px-10 py-2">
          <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li v-for="nft in nonBurnedNfts" :key="nft.email" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
              <div class="flex flex-1 flex-col p-8">
                <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" :src="nft.imageUrl" alt="" />
                <h3 class="mt-6 text-sm font-medium text-gray-900">{{ nft.name }}</h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                  <dt class="sr-only">Title</dt>
                  <dd class="text-sm text-gray-500">{{ nft.description }}</dd>
                  <dt class="sr-only">Role</dt>
                  <dd class="mt-3">
                    <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{ `owner` }}</span>
                  </dd>
                </dl>
              </div>
              <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                  <div class="flex w-0 flex-1">
                    <button @click="burn(nft.tokenId)" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <FireIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Burn
                    </button>
                  </div>
                  <div class="-ml-px flex w-0 flex-1">
                    <a :href="`tel:${nft.telephone}`" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                      <ArrowUpIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                      Send
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import {ArrowsRightLeftIcon, CodeBracketSquareIcon, FireIcon, ArrowUpIcon, UsersIcon} from '@heroicons/vue/20/solid'
import {reactive, ref} from 'vue'
import {useRoute} from "nuxt/app";
import PopupDialog from "../../components/PopupDialog";
import {useDialogStore} from "../../stores/dialogStore";
import {useTokensStore} from "../../stores/tokenStore";
import {ethers} from "ethers";
import {erc721ABI} from "../../assets/constants/abis";
import moment from "moment/moment";
import {useProviderStore} from "../../stores/providerStore";
import {notFound} from "../../assets/constants/util";
import axios from "axios";

const tokensStore = await useTokensStore()
const {address} = useRoute().params
const currentToken = await tokensStore.getNFT(address)
await tokensStore.setCurrentToken(currentToken)
const dialogs = useDialogStore().dialogs
const provider = useProviderStore().walletProvider

const open = ref(false)


const pageName = 'Project Details'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'NFT Projects', to: '/nfts', current: false },
  { name: 'Project Details', to: `${address}`, current: true },
]


const tabs = [
  { name: 'Contract Features', id: 0, icon: CodeBracketSquareIcon, current: true },
  { name: 'Transaction History', id: 1, icon: ArrowsRightLeftIcon, current: false },
  { name: 'Token Holders', id: 2, icon: UsersIcon, current: false },
]


const contract = await tokensStore.getCurrentContract(provider);
const filter = contract.filters.Transaction
const events = await contract.queryFilter('*')
console.log('events:', events);


let nonBurnedNfts = reactive([])

const mintEvents = [];
const burnEvents = [];
let mintCount = 1

for(const event of events){
  const tx = await provider.getTransaction(event.transactionHash)
  // const receipt = await provider.getTransactionReceipt(event.transactionHash)
  console.log('tx', tx)
  const iFace = new ethers.utils.Interface(erc721ABI);
  try{
    const parsedTx = iFace.parseTransaction(tx);
    console.log('parsedTx', parsedTx)
    if(parsedTx.name === 'safeMint'){
      mintEvents.push({parsedTx: parsedTx, tokenId: mintCount})
      mintCount = mintCount + 1
    }
    if(parsedTx.name === 'burn'){
      burnEvents.push({parsedTx: parsedTx, tokenId: parseInt(parsedTx.args.tokenId, 10)})
    }
  }catch (e) {
    console.log(e)
  }
}

// check burned array
console.log('check burned array:')
for(const burned of burnEvents){
  console.log('burned:', burned.tokenId)
}

for(const mintedNft of mintEvents){
  if(notBurned(mintedNft.tokenId)){
    console.log('apparently not burned')
    await addNonBurnedNfts(mintedNft.parsedTx.name, mintedNft.parsedTx.args.uri, mintedNft.tokenId)
  }
}

async function addNonBurnedNfts(txName, uri, tokenId) {
  let imageURI = uri
  let name = txName
  let description = tokenId
  try {
    const dataFromURL = await axios.get(uri)
    console.log('dataFromURL:', dataFromURL)
    if(dataFromURL.data !== undefined){
      imageURI = dataFromURL.data.image
      name = dataFromURL.data.name
      description = dataFromURL.data.description
    }
  } catch (e) {
    console.log('axios error:', e)
  }

  const nonBurnedNft = {
    name: name, description: description, imageUrl: imageURI, tokenId: tokenId
  }
  nonBurnedNfts.push(nonBurnedNft)
}

// mintedNfts.reverse();
function notBurned(tokenId){
  console.log('tokenId being used to determine if is not burned: ', tokenId)
  const index = burnEvents.findIndex(p => p.tokenId === tokenId);
  return (index === notFound);
}

async function burn(tokenId) {
  try{
    console.log('burn token ', tokenId)
    const signer = await useProviderStore().signerProvider
    console.log('signer:', signer)
    const contract = await tokensStore.getCurrentContract(signer);
    console.log('contract: ', contract)
    const result = await contract.burn(tokenId);
    console.log('result: ', result)
  } catch (e) {
    console.log('burn exception:', e)
  }
}


</script>


<style scoped>
</style>