<template>
  <div class="h-full w-full flex flex-col grow justify-start sm:justify-center items-center space-y-6 text-center max-w-5xl mx-auto">
    <h1 class="pt-4 text-color text-3xl font-bold px-10">
      Upload Image for NFT
    </h1>

    <div v-if="!isFileSelected" class="w-[80%] h-1/3 max-w-md rounded-3xl border-2 border-[#4FA9DB] border-dashed flex flex-col justify-center px-4 space-y-5 items-center relative">
      <input type="file" class="opacity-0 h-full w-full absolute top-0" accept="image/png, image/jpeg, application/pdf"  @change="loadFile($event)">
      <img src="~/assets/images/cloud-fill-ic.svg" alt="">
      <div>
        <div class="text-[#4FA9DB] flex ">Choose file<p class="text-color px-1">or</p>Drag here</div>
        <p class="pb-4 text-color" >Size limit: 5MB</p>
      </div>
    </div>
    <div v-if="isImage" class="w-[80%] max-w-md rounded-3xl  h-1/3  border-2 border-[#4FA9DB]   flex flex-col justify-center items-center  p-4" >
      <div class="relative w-48 h-48 flex justify-center items-center">
        <img class="w-44 h-44 p-1 object-cover  rounded-2xl border-2 border-[#4FA9DB]  border-dashed  drop-shadow-xl " :src="filePreview" alt="">
        <img class="bg-white rounded-full h-8 absolute bottom-0 right-0 drop-shadow-md " src="~/assets/images/close-ic.svg" @click="closeFile"  alt="">
      </div>
    </div>
<!--    <div v-else class="w-[80%] max-w-md rounded-3xl  h-1/3  border-2 border-[#4FA9DB]   flex flex-col justify-center items-center  p-4" >-->
<!--      <div class="relative w-48 h-48 flex justify-center items-center object-cover ">-->
<!--        <pdf class="w-44 h-44 p-1 object-cover overflow-clip  rounded-2xl border-2 border-[#4FA9DB]  border-dashed  drop-shadow-xl " :src="filePreview"/>-->
<!--        <img class="bg-white rounded-full h-8 absolute bottom-0 right-0 drop-shadow-md " src="./assets/images/close-ic.svg" @click="closeFile"  alt="">-->
<!--      </div>-->
<!--    </div>-->
    <p class="text-color text-sm font-normal  w-4/5 ">
      Please upload the image you want to represent your NFT
    </p>

<!--    <outline-button button-text="LogFile Info" @click="validateFile"/>-->
<!--    <outline-button button-text="Next" @click="prepareFile"/>-->
  </div>
  <div>
    <div class="mt-12">
      <form action="#" method="POST" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div class="sm:col-span-2">
          <label for="wallet-address" class="block text-sm font-medium text-gray-700">Mint To</label>
          <div class="mt-1 flex rounded-md shadow-sm">
            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">address:</span>
            <input type="text" name="wallet-address" id="wallet-address" v-model="useDialogStore().address" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 text-sm" placeholder="0xf986...05e7a" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="name" class="block text-sm font-medium text-gray-700">Token Name</label>
          <div class="mt-1">
            <input type="text" name="name" id="name" v-model="useDialogStore().name" class="block w-full rounded-md min-w-0 flex-1 border-gray-300 px-3 py-2 text-gray-900 shadow-sm text-sm"  />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label for="message" class="block text-sm font-medium text-gray-700">Description</label>
          <div class="mt-1">
            <textarea id="message" name="message" rows="4" v-model="useDialogStore().description" class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>
        <div class="sm:col-span-2">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <Switch v-model="agreed" :class="[agreed ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                <span class="sr-only">Agree to policies</span>
                <span aria-hidden="true" :class="[agreed ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
              </Switch>
            </div>
            <div class="ml-3">
              <p class="text-base text-gray-500">
                By selecting this, you agree to the
                {{ ' ' }}
                <a href="#" class="font-medium text-gray-700 underline">Privacy Policy</a>
                {{ ' ' }}
                and
                {{ ' ' }}
                <a href="#" class="font-medium text-gray-700 underline">Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Switch } from '@headlessui/vue'
import {useDialogStore} from "../stores/dialogStore";
import {ref} from "vue";

const agreed = ref(false)

let isFileSelected = false;
const filePreview = ref('');
let selectedFile = null;
const isImage = ref(false);


function loadFile(event){
  selectedFile = event.target.files[0];
  useDialogStore().file = selectedFile;
  if (selectedFile.name.includes(".png") || selectedFile.name.includes(".jpg") || selectedFile.name.includes(".jpeg")  ) {
    isFileSelected = true
    isImage.value = true
    filePreview.value = URL.createObjectURL(selectedFile);
    console.log('filePreview.value', filePreview.value)
  }
  else if(selectedFile.name.includes(".pdf")){
    isFileSelected = true
    isImage.value = false
    filePreview.value = URL.createObjectURL(selectedFile);
  } else {
    selectedFile = null
    isFileSelected = false
    console.log("file type not supported!")
  }
}

function closeFile(){
  isFileSelected = null
  isFileSelected = false
  isImage.value = false
}


</script>

<style scoped>

</style>