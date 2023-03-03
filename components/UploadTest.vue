<template>
  <div class="h-full w-full flex flex-col grow justify-start sm:justify-center items-center space-y-6 text-center max-w-5xl mx-auto">
    <h1 class="text-color text-3xl font-bold px-10">
      Please upload the image for your NFT.
    </h1>

    <div v-if="!isFileSelected" class="w-[80%] h-1/3 max-w-md rounded-3xl border-2 border-[#4FA9DB] border-dashed flex flex-col justify-center px-4 space-y-5 items-center relative">
      <input type="file" ref="file" class="opacity-0 h-full w-full absolute top-0" accept="image/png, image/jpeg, application/pdf"  @change="loadFile">
      <img src="./assets/images/cloud-fill-ic.svg" alt="">
      <div>
        <div class="text-[#4FA9DB] flex ">Choose file<p class="text-color px-1">or</p>Drag here</div>
        <p class="text-color" >Size limit: 5MB</p>
      </div>
    </div>
    <div v-else-if="isImage" class="w-[80%] max-w-md rounded-3xl  h-1/3  border-2 border-[#4FA9DB]   flex flex-col justify-center items-center  p-4" >
      <div class="relative w-48 h-48 flex justify-center items-center">
        <img class="w-44 h-44 p-1 object-cover  rounded-2xl border-2 border-[#4FA9DB]  border-dashed  drop-shadow-xl " :src="filePreview" alt="">
        <img class="bg-white rounded-full h-8 absolute bottom-0 right-0 drop-shadow-md " src="./assets/images/close-ic.svg" @click="closeFile"  alt="">
      </div>
    </div>
<!--    <div v-else class="w-[80%] max-w-md rounded-3xl  h-1/3  border-2 border-[#4FA9DB]   flex flex-col justify-center items-center  p-4" >-->
<!--      <div class="relative w-48 h-48 flex justify-center items-center object-cover ">-->
<!--        <pdf class="w-44 h-44 p-1 object-cover overflow-clip  rounded-2xl border-2 border-[#4FA9DB]  border-dashed  drop-shadow-xl " :src="filePreview"/>-->
<!--        <img class="bg-white rounded-full h-8 absolute bottom-0 right-0 drop-shadow-md " src="./assets/images/close-ic.svg" @click="closeFile"  alt="">-->
<!--      </div>-->
<!--    </div>-->
    <p class="text-color text-sm font-normal  w-4/5 ">
      Please upload the image you want to represent your NFT.
    </p>
    <div class="h-6"/>
<!--    <outline-button button-text="LogFile Info" @click="validateFile"/>-->
<!--    <outline-button button-text="Next" @click="prepareFile"/>-->
  </div>
</template>

<script setup>

import {onMounted} from "vue";

let isFileSelected = false;
let filePreview = null;
let selectedFile = null;
let isImage = false;


function loadFile(){
  selectedFile = this.$refs.file.files[0];
  if (selectedFile.name.includes(".png") || selectedFile.name.includes(".jpg") || selectedFile.name.includes(".jpeg")  ) {
    isFileSelected = true
    isImage = true
    filePreview = URL.createObjectURL(selectedFile);
  }
  else if(selectedFile.name.includes(".pdf")){
    isFileSelected = true
    isImage = false
    filePreview = URL.createObjectURL(selectedFile);
  } else {
    selectedFile = null
    isFileSelected = false
    console.log("file type not supported!")
  }
}

function closeFile(){
  isFileSelected = null
  isFileSelected = false
  isImage = false
}

onMounted(() => {
  //works! child components were loaded
  console.log(this.$refs.mapRef)
})


</script>

<style scoped>

</style>