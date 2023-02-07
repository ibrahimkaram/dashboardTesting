<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <div>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
            <p class="mt-2 text-sm text-gray-700">A history of functions called and interactions with contract</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Transaction Hash</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Transaction Type</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Recipient</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Date Created</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="transaction in transactions" :key="transaction.amount">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ transaction.hash }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ transaction.type }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ transaction.amount }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ transaction.recipient }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ transaction.timestamp }}</td>
                  <td class="relative whitespace-nowrap py-4 text-right text-sm font-medium sm:pr-6 md:pr-0">
<!--                    <a href="#" class="text-indigo-600 hover:text-indigo-900 pr-16">-->
<!--                      Link<span class="sr-only">, {{ transaction.type }}</span>-->
<!--                    </a>-->
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination/>
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
const filter = contract.filters.Transaction
const events = await contract.queryFilter('*')
console.log('events:', events);
async function getContact(address){
  return new ethers.Contract(address, erc20ABI, provider)
}

let transactions = reactive([])
for(const event of events){
  const shortHash = `${event.transactionHash.slice(0,6)}...${event.transactionHash.slice(6,13)}`
  const transaction = {
    hash: shortHash, type: event.event, amount: '100', recipient: '0xd482...78858', timestamp: '12 Nov 2022, 08:44 AM'
  }
  transactions.push(transaction)
}

// const logs = await provider.getLogs({
//   fromBlock: 0,
//   toBlock: 'latest',
//   address: currentToken.address, //goerli factory contract
// });
// console.log('logs from 1st filter:', logs)
// const promises = logs.map(log => provider.getTransactionReceipt(log.transactionHash));
// const transactionReceipts = await Promise.all(promises);
// console.log('transactionReceipts', transactionReceipts)
//
// for(const receipt of transactionReceipts){
//   const tx = await provider.getTransaction(receipt.transactionHash);
//   console.log('tx',tx)
// }




transactions.push(...[
  { hash: '0xb76ec...d791b19', type: 'Mint', amount: '10,000', recipient: '0xd482...78858', timestamp: '12 Nov 2022, 07:05 AM'},
  { hash: '0xf192f...f192f48', type: 'Transfer', amount: '1000', recipient: '0xd482...78858', timestamp: '12 Nov 2022, 04:49 AM'},
  { hash: '0xb192f...b7fb65e', type: 'Burn', amount: '100', recipient: '0xd482...78858', timestamp: '12 Nov 2022, 01:57 AM'},
])



// Assuming you have the contract instance and contract address

// async function getTransactionHistory(contract) {
//   const events = await contract.getPastEvents({fromBlock: 0, toBlock: 'latest'});
//   console.log('events:', events);
//
//   return events.map((event) => {
//     return {
//       from: event.returnValues.from,
//       to: event.returnValues.to,
//       value: event.returnValues.value
//     }
//   });
// }
// const transactionHistory = await getTransactionHistory(contract);
// console.log('Transaction history:', transactionHistory);

</script>

<style scoped>

</style>