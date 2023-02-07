<template>

</template>

<script>


import {ethers} from 'ethers';
import {erc20ABI} from "../assets/constants/abis";

// Connect to the Ethereum blockchain using a provider
const provider = new ethers.providers.AlchemyProvider(
    'goerli',
    'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0'
)

const factoryAddress = '0x14deE550016F74A7fdda9d6e3976aee616AEA1E6'
const fromAddress = '0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a'
const logs = await provider.getLogs({
  fromBlock: 0,
  toBlock: 'latest',
  address: factoryAddress, //goerli factory contract
  from: fromAddress,
});

async function getAddress(transactionHash) {
  const transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  return transactionReceipt.logs[0].address;
}

async function getContact(address){
  return new ethers.Contract(address, erc20ABI, provider)
}

async function getContractData(contract){
  return Promise.all([
    contract.functions.name(),
    contract.functions.symbol(),
    contract.functions.totalSupply()
  ])
}

const MAX_PER_PAGE = 10;
let tokenDataList = [];

const queue = logs.map(log => async () => {
  const address = await getAddress(log.transactionHash);
  const contract = await getContact(address);
  const [name, symbol, totalSupply] = await getContractData(contract);
  tokenDataList.push({name, symbol, totalSupply});
});

let page = 0;
let start = page * MAX_PER_PAGE;
let end = start + MAX_PER_PAGE;
let currentQueue = queue.slice(start, end);

async function processQueue() {
  for (const task of currentQueue) {
    await task();
  }
  page++;
  start = page * MAX_PER_PAGE;
  end = start + MAX_PER_PAGE;
  currentQueue = queue.slice(start, end);
  if (currentQueue.length > 0) {
    await processQueue();
  } else {
    console.log(tokenDataList);
  }
}
console.log(logs);
// await processQueue();











</script>

<style scoped>

</style>