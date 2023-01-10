<template>
   <ClientOnly>
    <TransitionRoot as="template" :show="open" >
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div class="mx-auto flex w-full items-center justify-center space-x-2">
                
                    <Vue3Lottie class="h-24 w-24"
                        :animationData = "logoAnimation"
                        :height="200"
                        :width="200"
                    />
                   
                    <Vue3Lottie class="h-16 w-16" v-if="!isConnected"
                        :animationData = "bridgeAnimation"
                        :height="200"
                        :width="200"
                    />
                    <Vue3Lottie class="h-16 w-16" v-else
                        :animationData = "checkmark"
                        :height="200"
                        :width="200"
                        :loop="false"
                        
                    />
                    <Vue3Lottie class="h-24 w-24"
                        :animationData = "walletAnimation"
                        :height="200"
                        :width="200"
                    />

                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Get Started</DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">Please connect your crypto wallet to continue.</p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 
                  focus:ring-offset-2 sm:text-sm" @click="connectWallet"> {{!isConnected ? "Connect" : "Next"}} </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</ClientOnly>
  
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { CheckIcon } from '@heroicons/vue/24/outline'
  import logoAnimation  from '../assets/animations/osis-logo-lottie.json'
  import bridgeAnimation  from '../assets/animations/connect.json'
  import walletAnimation  from '../assets/animations/wallet-lottie.json'
  import checkmark  from '../assets/animations/checkmark.json'

  const open = ref(true)

  const isConnected = ref(false)
  



  function connectWallet(){
    if(isConnected.value){
    console.log("csecond clicke")
    open.value = false
        
    }else{
        console.log("connect click handler!")
    isConnected.value = true
    }

   

  }

  

  </script>