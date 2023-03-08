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
                <UploadTest v-if="dialog === 'nftSafeMint'"/>
                <TransferTest v-if="dialog === 'nftSend'"/>
              </div>

              <div class="pb-4 mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-blue px-4 py-2 text-base font-medium text-white shadow-sm hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                        @click="positiveClick">
                  {{ positiveButtonText }}
                </button>
                <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                        @click="close" ref="cancelButtonRef">
                  Cancel
                </button>
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
import {erc20ABI, erc721ABI} from "../assets/constants/abis";
import {useProviderStore} from "../stores/providerStore";
import {fetchSigner, getAccount, prepareWriteContract, writeContract} from "@wagmi/core";
import axios from "axios";
import TransferTest from "./TransferTest";
const { dialog } = defineProps(['dialog'])
const dialogStore = useDialogStore()
const dialogs = dialogStore.dialogs
const tokenStore = useTokensStore()
const provider = useProviderStore()

let positiveButtonText = ''
if(dialog === 'nftSafeMint'){
  positiveButtonText = 'Mint'
}
if(dialog === 'nftSend'){
  positiveButtonText = 'Send'
}


function close(){
  dialogStore.setState(dialog, false)
}

function positiveClick(){
  if(dialog === 'nftSafeMint'){
    safeMintToken()
  }
  if(dialog === 'nftSend'){
    safeTransfer()
  }
}

async function safeTransfer() {
  try{
    console.log('transfer token ', dialogStore.tokenId)
    const tokenId = dialogStore.tokenId
    const fromAddress = await getAccount().address
    const toAddress = await useDialogStore().address
    const signer = await useProviderStore().signerProvider
    const contract = await tokenStore.getCurrentContract(signer);
    console.log('contract:', contract)
    console.log('tokenId: with override method', tokenId)
    console.log('from:', fromAddress)
    console.log('to:', toAddress)
    const result = await contract["safeTransferFrom(address,address,uint256)"](fromAddress, toAddress, tokenId);
    console.log('result: ', result)
  } catch (e) {
    console.log('safeTransfer exception:', e)
  }
}

async function safeMintToken() { // toAddress, metaDataUri
  console.log('safeMintToken from inside dialog')
  console.log('dialogStore.address: ', dialogStore.address)
  console.log('dialogStore.description: ', dialogStore.description)

  let mintSuccess;
  const metaCID = await storeMetaData()
  if(metaCID){
    mintSuccess = await mint(metaCID)
  }
  if(mintSuccess){
    close()
  }
}

async function mint(metaCID){
  let mintSuccess;
  try {
    const uri = `ipfs://${metaCID}`
    console.log('uri: ', uri)
    const signer = await provider.signerProvider
    const contract = await tokenStore.getCurrentContract(signer);
    const result = await contract.safeMint(dialogStore.address, uri);
    console.log('NFT mint result:', result);
    mintSuccess = true;
  } catch (error) {
    console.error('Error:', error);
    mintSuccess = false;
  }
  return mintSuccess;
}

async function storeMetaData(){
  const imageCID = await storeImage()
  const metaData = {
    name: dialogStore.name,
    description: dialogStore.description,
    image: `ipfs://${imageCID}`,
  }
  // console.log('metaData:', metaData)
  let metaCID;
  const metaResponse = await uploadToIPFS(metaData)
  if(metaResponse.ok){
    metaCID = metaResponse.value.cid
  }
  return metaCID
}

async function storeImage(){
  let imageCID;
  const imgResponse = await uploadToIPFS(dialogStore.file)
  if(imgResponse.ok){
    imageCID = imgResponse.value.cid
  }
  return imageCID
}

async function uploadToIPFS(content){
  let result = {
    success: false,
    data: null
  }
  try{
    const response = await axios.post('https://api.nft.storage/upload', content, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzRUJhODM1NDdlYjlkN2M5RDNEMmUzQUFjMTVmNzc1NzMwN2NDMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NzI4MDc3NjAxMywibmFtZSI6IkxhdW5jaHBhZFN0b3JlS2V5In0.VTxwONCLcFGBcO9IV64URAkSDoNHTKGDi2XwxFwmnqc',
      },
    })
    result.data = response.data
    result.success = true;
  } catch (e) {
    console.log('uploadToIPFS error:', e)
    result.data = null;
    result.success = false;
  }
  return result.data;
}

async function fakeImageUpload(content){
  console.log('fakeImageUpload: ', content)
  return fakeImageResponse;
}
async function fakeMetadataUpload(content){
  console.log('fakeMetadataUpload: ', content)
  return fakeMetadataResponse;
}

const fakeImageResponse = {
  "ok": true,
  "value": {
    "cid": "bafkreifjq3ztrjji6p4njji4s63a5rgcmhu3dlog62jwifwqtfi35glebi",
    "size": 132614,
    "created": "2021-03-12T17:03:07.787Z",
    "type": "image/jpeg",
    "scope": "default",
    "pin": {
      "cid": "bafkreifjq3ztrjji6p4njji4s63a5rgcmhu3dlog62jwifwqtfi35glebi",
      "name": "pin name",
      "meta": {},
      "status": "queued",
      "created": "2021-03-12T17:03:07.787Z",
      "size": 132614
    },
    "files": [
      {
        "name": "logo.jpg",
        "type": "image/jpeg"
      }
    ],
    "deals": [
      {
        "batchRootCid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
        "lastChange": "2021-03-18T11:46:50.000Z",
        "miner": "f05678",
        "network": "nerpanet",
        "pieceCid": "bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
        "status": "queued",
        "statusText": "miner rejected my data",
        "chainDealID": 138,
        "dealActivation": "2021-03-18T11:46:50.000Z",
        "dealExpiration": "2021-03-18T11:46:50.000Z"
      }
    ]
  }
}

const fakeMetadataResponse = {
  "ok": true,
  "value": {
    "cid": "bafkreiemgcsoutajs6b6t3pjqimq34bretmhpb3uhc44shn4pph3zq3ezu",
    "created": "2023-03-01T20:13:03.486+00:00",
    "type": "text/plain;charset=UTF-8",
    "scope": "LaunchpadStoreKey",
    "files": [],
    "size": 469,
    "name": "Upload at 2023-03-01T20:13:03.486Z",
    "pin": {
      "cid": "bafkreiemgcsoutajs6b6t3pjqimq34bretmhpb3uhc44shn4pph3zq3ezu",
      "created": "2023-03-01T20:13:03.486+00:00",
      "size": 469,
      "status": "pinned"
    },
    "deals": []
  }
}


</script>