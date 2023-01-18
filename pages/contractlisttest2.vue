<template>

</template>

<script>

import { ethers } from 'ethers';
import { erc20ABI } from "../assets/constants/abis";

// Connect to the Ethereum blockchain using a provider
const provider = new ethers.providers.AlchemyProvider(
    'goerli',
    'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0'
)

// The address of the wallet you want to get the contracts from
const walletAddress = '0xf986AB80D7bC2EF37bb8A6D536b7718218705e7a';


// Get the logs of contract deployment transactions
provider.getLogs({
  fromBlock: 0,
  toBlock: 'latest',
  address: '0x14deE550016F74A7fdda9d6e3976aee616AEA1E6', // factory contract address
  from: walletAddress
}).then(async (logs) => {
  if (!logs.length) {
    console.log("No logs found for this address")
    return
  }
  // add the requests for getting the transaction receipts to the batch
  logs.forEach(log => batch.add(provider.getTransactionReceipt(log.transactionHash)));
  // execute the batch
  const receipts = await batch.execute();
  let contracts = []
  for (let i = 0; i < receipts.length; i++) {
    if (!receipts[i]) {
      console.log("transaction receipt not found for transaction:",logs[i].transactionHash)
      continue
    }
    const address = receipts[i].logs[0].address
    // create the contract instance
    const contract = new ethers.Contract(address, erc20ABI, provider);
    contracts.push(contract)
  }
  console.log(contracts)

  const batch2 = new ethers.BatchRequest(provider);
  contracts.forEach(contract => {
    batch2.add(contract.functions.name());
    batch2.add(contract.functions.symbol());
    batch2.add(contract.functions.totalSupply());
  });
  const results = await batch2.execute();

// results is an array of the return values of each function call in the order they were added to the batch
// you can use a loop to iterate through the results and get the name, symbol, and total supply of each contract

  for (let i = 0; i < results.length; i += 3) {
    const name = results[i];
    const symbol = results[i + 1];
    const totalSupply = results[i + 2];
    console.log(`Contract ${i/3 + 1}`);
    console.log(`name: ${name}`);
    console.log(`symbol: ${symbol}`);
    console.log(`totalSupply: ${totalSupply}`);
  }

  const promises = contracts.map(contract => contract.name());
  Promise.all(promises)
      .then(results => {
        console.log(results)
      })
      .catch(error => {
        console.log(error)
      });

  // const batch2 = new ethers.BatchRequest(provider);
  //
  // contracts.forEach(contract => {
  //   const data = contract.interface.functions.name.encode();
  //   batch2.add(provider.call({ to: contract, data }));
  // });
  //
  // const results = await batch2.execute();
  // console.log(results);
});
</script>

<style scoped>

</style>