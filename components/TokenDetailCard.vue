<template>
  <div class="overflow-hidden bg-white shadow-lg sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">{{ token.name }}</h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Features, transaction history, and token holders.</p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Creation date</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rCreationDate }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Total supply</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rTotalSupply }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Balance</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rBalance }}</dd>
        </div>
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-gray-500">Number of holders</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ rHolders }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import { useTokensStore } from "../stores/tokenStore";
import {useProviderStore} from "../stores/providerStore";
import {getAccount} from "@wagmi/core";
import {reactive, ref} from "vue";
import moment from "moment/moment";
const tokensStore = await useTokensStore()
const token = tokensStore.currentToken

const provider = useProviderStore()
const account = getAccount()

const contract = await tokensStore.getCurrentContract(provider.walletProvider)
console.log('contract', contract)

let rBalance = ref('Loading...')
let rTotalSupply = ref('Loading...')
let rCreationDate = ref('Loading...')
let rHolders = ref('Loading...')
let holders = reactive([])

const events = await contract.queryFilter('*')
getTokenDetails()
getCreationDate()
calculateHolders()

async function getTokenDetails(){
  const amountPromises = [
    contract.balanceOf(account.address),
    contract.functions.totalSupply(),
  ];
  let [balance, totalSupply] = await Promise.all(amountPromises);
  rBalance.value = (parseInt(balance, 10) / (10 ** 18)).toString();
  rTotalSupply.value = (parseInt(totalSupply, 10) / (10 ** 18)).toString();
  console.log('this part is done **')
}

async function getCreationDate() {
  const block = await provider.walletProvider.getBlock(token.blockNumber);
  const dateTime = moment.unix(block.timestamp).format('DD MMM YYYY, hh:mm A');
  console.log('dateTime=', dateTime);  // Output: 10 Feb 2023, 08:06 AM
  rCreationDate.value = dateTime
}

async function calculateHolders(){
  for (const event of events) {
    let fromAddress = event.args[0];
    let toAddress = event.args[1];

    let fromExists = holders.find(holder => holder === fromAddress);
    if (!fromExists && await balanceNotZero(fromAddress)) {
      holders.push(fromAddress);
    }
    let toExists = holders.find(holder => holder === toAddress);
    if (!toExists && await balanceNotZero(toAddress)) {
      holders.push(toAddress);
    }
  }
  rHolders.value = holders.length.toString()
  console.log('finally now this part is done ;)')
}

async function balanceNotZero(address){
  let balance = await contract.balanceOf(address)
  balance = parseInt(balance, 10) / (10 ** 18);
  return (balance > 0)
}

</script>