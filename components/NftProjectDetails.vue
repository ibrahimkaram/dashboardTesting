<template>
  <div class="overflow-hidden bg-white shadow-lg sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <div class="pb-5 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium leading-6 text-gray-900">{{ token.name }}</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">{{ token.description }}</p>
        </div>
        <div class="mt-3 flex sm:mt-0 sm:ml-4">
          <button @click="mint" type="button" class="inline-flex items-center rounded-full border border-transparent
                    bg-primary-blue px-6 py-2 text-sm font-medium text-white shadow-sm hover:opacity-75
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <PlusIcon class="mr-0.5 my-0.5 h-5 w-5"/>
            Mint {{token.name}} token
          </button>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Creation date</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rCreationDate }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Balance</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rBalance }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { ShareIcon, PlusIcon } from '@heroicons/vue/20/solid'

import { useTokensStore } from "../stores/tokenStore";
import {useProviderStore} from "../stores/providerStore";
import {getAccount} from "@wagmi/core";
import {reactive, ref} from "vue";
import moment from "moment/moment";
import {useDialogStore} from "../stores/dialogStore";
const tokensStore = await useTokensStore()
const token = tokensStore.currentToken

const provider = useProviderStore()
const account = getAccount()

const contract = await tokensStore.getCurrentContract(provider.walletProvider)
console.log('contract', contract)

let rBalance = ref('Loading...')
let rCreationDate = ref('Loading...')

// const events = await contract.queryFilter('*')
// console.log('events:', events)
getTokenBalance()
getCreationDate()
// calculateHolders()

async function getTokenBalance(){
  let balance = await contract.balanceOf(account.address);
  rBalance.value = (parseInt(balance, 10)).toString();
  console.log('this part is done **')
}

async function getCreationDate() {
  const block = await provider.walletProvider.getBlock(token.blockNumber);
  const dateTime = moment.unix(block.timestamp).format('DD MMM YYYY, hh:mm A');
  console.log('dateTime=', dateTime);  // Output: 10 Feb 2023, 08:06 AM
  rCreationDate.value = dateTime
}

async function mint() {
  console.log('nftSafeMint clicked')
  useDialogStore().setState('nftSafeMint', true)
  // try{
  //   console.log('burn token ', tokenId)
  //   const signer = await useProviderStore().signerProvider
  //   console.log('signer:', signer)
  //   const contract = await tokensStore.getCurrentContract(signer);
  //   console.log('contract: ', contract)
  //   const result = await contract.safeMint(toAddress, metaDataUri);
  //   console.log('result: ', result)
  // } catch (e) {
  //   console.log('burn exception:', e)
  // }
}

</script>