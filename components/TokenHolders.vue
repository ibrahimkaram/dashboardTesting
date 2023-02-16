<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <div>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Token Holders</h1>
            <p class="mt-2 text-sm text-gray-700">Accounts holding a balance in the contract</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Rank</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Address</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Percentage</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="holder in holders" :key="holder.amount">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ holder.rank }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.hash }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.amount }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.percentage }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useTokensStore} from "../stores/tokenStore";
import {ethers} from "ethers";
import {erc20ABI} from "../assets/constants/abis";
import {useProviderStore} from "../stores/providerStore";
import {reactive} from "vue";
const providerStore = useProviderStore();
const provider = providerStore.provider;
const { currentToken } = await useTokensStore();


const contract = await getContact(currentToken.address)
//
console.log('contract =>', contract);
console.log('currentToken.contract =>', currentToken.contract);
const events = await contract.queryFilter('*')
console.log('events:', events);
async function getContact(address){
  return new ethers.Contract(address, erc20ABI, provider)
}

let holders = reactive([])
for(const event of events){
  let fromAddress = event.args[0]
  let toAddress = event.args[1]
  console.log('fromAddress', fromAddress)
  console.log('toAddress', toAddress)

  let fromExists = holders.find(holder => holder.hash === fromAddress);
  if(!fromExists) { await addHolder(fromAddress) }

  let toExists = holders.find(holder => holder.hash === toAddress);
  if (!toExists) { await addHolder(toAddress) }
}

async function addHolder(address) {
  let balance = await contract.balanceOf(address)
  balance = parseInt(balance, 10) / (10 ** 18);
  console.log('balance', balance)
  let totalSupply = await contract.functions.totalSupply()
  totalSupply = parseInt(totalSupply, 10) / (10 ** 18);
  const percent = ((balance.toString() / totalSupply.toString()) * 100).toFixed(2)
  if (balance > 0) holders.push(
      {rank: '', hash: address, amount: balance, percentage: `${percent}%`}
  )
}

holders.sort((a, b) => b.amount - a.amount);
holders.forEach((holder, index) => {
  holder.rank = (index + 1).toString();
});

</script>

<style scoped>

</style>