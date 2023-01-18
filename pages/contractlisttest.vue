<template>
  <div>
    <ul>
      <li v-for="address in addresses" :key="address"> {{address}}
<!--        <div class="flex w-full items-center justify-between space-x-6 p-6">-->
<!--          <div class="flex-1 truncate">-->
<!--            <div class="flex items-center space-x-3">-->
<!--              <h3 class="truncate text-sm font-medium text-gray-900">{{ log.name }}</h3>-->
<!--              <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{ person.role }}</span>-->
<!--            </div>-->
<!--            <p class="mt-1 truncate text-sm text-gray-500">{{ log.title }}</p>-->
<!--          </div>-->
<!--        </div>-->
      </li>
    </ul>
  </div>
</template>

<script setup>

import { ethers } from 'ethers';
import { erc20ABI } from "../assets/constants/abis";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  network: 'goerli', // Replace with your network.
  apiKey: 'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0', // Replace with your Alchemy API Key.
};

// Connect to the Ethereum blockchain using a provider
const provider = new ethers.providers.AlchemyProvider(
    'goerli',
    'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0'
)

// The address of the wallet you want to get the contracts from
const walletAddress = '0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a';

// The topics of the contract deployment event
const topics = [ethers.utils.id('Created(string,string,string,address,Roles,uint256,bytes)')];

// Get the logs of contract deployment transactions
const logs = await provider.getLogs({
  fromBlock: 0,
  toBlock: 'latest',
  address: '0x14deE550016F74A7fdda9d6e3976aee616AEA1E6', //factory
  // topics: [ethers.utils.id('Created(string,string,string,address,Roles,uint256,bytes)')],
  from: '0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a'
});


const addresses = logs.map(log =>
    getTransaction(log.transactionHash)
);


async function getTransaction(transactionHash) {
  const transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  const address = transactionReceipt.logs[0].address
  const contract = new ethers.Contract(address, erc20ABI, provider);
  return address;
}

</script>

<style scoped>

</style>