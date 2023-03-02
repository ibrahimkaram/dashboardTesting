<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <div>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
            <p class="mt-2 text-sm text-gray-700 w-full whitespace-normal ">A history of functions called and interactions with contract</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Hash</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Type</th>
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
    <Pagination :start="0" :end="transactions.length" :totalResults="transactions.length"/>
  </div>
</template>

<script setup>

import {useTokensStore} from "../stores/tokenStore";
import {BigNumber, ethers, utils} from "ethers";
import {erc20ABI} from "../assets/constants/abis";
import {useProviderStore} from "../stores/providerStore";
import {reactive} from "vue";
import moment from "moment";
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
  const tx = await provider.getTransaction(event.transactionHash)
  const receipt = await provider.getTransactionReceipt(event.transactionHash)
  console.log('tx', tx)
  const iFace = new ethers.utils.Interface(erc20ABI);
  try{
    const parsedTx = iFace.parseTransaction(tx);
    console.log('parsedTx', parsedTx)
    await logEventAsTransaction(receipt, parsedTx.name, parsedTx.args[0])
  }catch (e) {
    console.log(e)
  }
}
transactions.reverse();

async function logEventAsTransaction(receipt, txName, to) {
  const shortHash = `${receipt.transactionHash.slice(0,4)}...${receipt.transactionHash.slice(receipt.transactionHash.length -5,receipt.transactionHash.length -1)}`
  console.log('receipt', receipt)
  const block = await provider.getBlock(receipt.blockHash);
  console.log('block', block)

  const recipient = `${to.slice(0, 4)}...${to.slice(9, 13)}`

  let weiValue;
  if (receipt.logs.length > 1) {
    weiValue = parseInt(receipt.logs[1].data, 16);
  } else {
    weiValue = parseInt(receipt.logs[0].data, 16);
  }

  const quantity = (weiValue / 1e18).toString();
  console.log('quantity=', quantity);  // Output: 10

  const dateTime = moment.unix(block.timestamp).format('DD MMM YYYY, hh:mm A');
  console.log('dateTime=', dateTime);  // Output: 10 Feb 2023, 08:06 AM

  const transaction = {
    hash: shortHash, type: txName, amount: `${quantity}`, recipient: recipient, timestamp: `${dateTime}`
  }
  transactions.push(transaction)
}

</script>

<style scoped>

</style>