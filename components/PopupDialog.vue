<template>
  <TransitionRoot as="template" :show="dialogs.get(dialog).open">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

              <div>
                <BigSendTest v-if="dialog === 'send'"/>
                <BigMintTest v-if="dialog === 'mint'"/>
                <BigBurnTest v-if="dialog === 'burn'"/>
              </div>

              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm" @click="positiveClick">Send</button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm" @click="close" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import {useDialogStore} from "../stores/dialogStore";
import {useTokensStore} from "../stores/tokenStore";
import {ethers} from "ethers";
import {erc20ABI} from "../assets/constants/abis";
import {useProviderStore} from "../stores/providerStore";
import {fetchSigner, prepareWriteContract, writeContract} from "@wagmi/core";
const { dialog } = defineProps(['dialog'])
const dialogStore = useDialogStore()
const dialogs = dialogStore.dialogs
const tokenStore = useTokensStore()
const provider = useProviderStore()


function close(){
  dialogStore.setState(dialog, false)
}

function positiveClick(){
  const operator = dialog;
  const operatorFunctions = {
    send: () => transferTokens(),
    mint: () => mintTokens(),
    burn: () => burnTokens(),
  };
  if (operatorFunctions[operator]) {
    operatorFunctions[operator]();
  } else {
    console.log('Invalid operator');
  }
}

async function transferTokens() {
  try {
    // const contract = await tokenStore.getContractInstance(address, provider.provider);
    let amount = 'error(invalid amount)'
    if(dialogStore.amount){
      amount = ethers.utils.parseEther(dialogStore.amount);
    }else {
      console.log('please enter valid amount')
      return
    }
    const recipientAddress = dialogStore.address;
    console.log(`Transferring: ${amount} - To Recipient: ${recipientAddress}`);

    const signer = await provider.signerProvider
    const contract = await tokenStore.getCurrentContract(signer);
    console.log('contract', contract)
    const result = await contract.transfer(recipientAddress, amount);
    console.log('Tokens transferred successfully:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  close()
}

async function mintTokens() {
  try {
    // const contract = await tokenStore.getContractInstance(address, provider.provider);
    let amount = 'error(invalid amount)'
    if (dialogStore.amount) {
      amount = ethers.utils.parseEther(dialogStore.amount);
    } else {
      console.log('please enter valid amount')
      return
    }
    const mintToAddress = dialogStore.address;
    console.log(`Minting: ${amount} - To Recipient: ${mintToAddress}`);

    const signer = await provider.signerProvider
    const contract = await tokenStore.getCurrentContract(signer);
    console.log('contract', contract)
    const result = await contract.mint(mintToAddress, amount);
    console.log('Tokens minted successfully:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  close()
}

async function burnTokens() {
  try {
    // const contract = await tokenStore.getContractInstance(address, provider.provider);
    let amount = 'error(invalid amount)'
    if (dialogStore.amount) {
      amount = ethers.utils.parseEther(dialogStore.amount);
    } else {
      console.log('please enter valid amount')
      return
    }
    const burnFromAddress = dialogStore.address;
    console.log(`Burn: ${amount} - To Recipient: ${burnFromAddress}`);

    const signer = await provider.signerProvider
    const contract = await tokenStore.getCurrentContract(signer);
    console.log('contract', contract)
    const result = await contract.burn(burnFromAddress, amount);
    console.log('Tokens burned successfully:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  close()
}

</script>