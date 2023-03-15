@@ -0,0 +1,188 @@
<template>
  <ClientOnly>
    <Listbox  :model-value="selected"  as="div"  @update:model-value="updateNetwork($event)" class="w-40">

      <div class="relative mt-1">
        <ListboxButton class=" isConnecting:cursor-progress relative w-full hover:cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-blue focus:outline-none focus:ring-primary-blue focus:ring- sm:text-sm ">
        <span class="flex items-center">
          <span :aria-label=" !isConnecting ? 'Online' : 'Offline'" :class="[ !isConnecting ? 'bg-green-400' : 'bg-gray-200', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" />
          <ClientOnly>
             <span class="ml-3 block truncate">
            {{ isConnecting ? "Connecting..." :  mainStore.networkId }}
          </span>
          </ClientOnly>
        </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="person in people" :key="person.id" :value="person" v-slot="{ active, selected }">
              <li :class="[active ? 'text-white bg-primary-blue' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <span :class="[ 'bg-gray-200', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" aria-hidden="true" />
                  <span :class="['font-normal', 'ml-3 block truncate']">
                  {{ person.name }}
                </span>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </ClientOnly>
</template>

<script setup>
import { ref} from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import {watchNetwork, watchAccount, getNetwork, getAccount} from '@wagmi/core'

import { configureChains, createClient } from "@wagmi/core";

import { polygonMumbai, mainnet, polygon, goerli } from "@wagmi/core/chains";

import { Web3Modal } from "@web3modal/html";


import { switchNetwork } from '@wagmi/core'


import { useProviderStore } from "~/stores/providerStore";
import {useAccountStore} from "~/stores/accountStore";



useAccountStore().setClient()





definePageMeta({
  layout: true,
});








async function switchTo(idChain){
  try{
    const network = await switchNetwork({
      chainId: idChain,
    })
  }catch (e){
    isConnecting.value = false;
  }

}


const people = [
  { id: 0, name: 'Ethereum', chainId: 1},
  { id: 1, name: 'Polygon',  chainId:137 },
  { id: 2, name: 'Mumbai',  chainId:80001 },
  { id: 3, name: 'Goerli' ,  chainId:5 },
]

const mynetworkName = useState('mynetworkName');
const isConnecting = useState("isConnecting");


async function updateNetwork(e){
  if(e.name === mynetworkName.value){
    return;
  }
  isConnecting.value = true;
  await switchTo(e.chainId) ;
}

const selected = ref(people[0])

const isMenuReady  = ref(false)

const mainStore = useProviderStore()


function mapNetwork(chainindex) {
  isConnecting.value = false ;
  console.log("change is done you are in  chain id : " , chainindex);
  switch (chainindex) {
    case 1 :

      mynetworkName.value = "Ethereum";
      mainStore.networkId  = "Ethereum";
      break ;
    case 137 :

      mynetworkName.value = "Polygon";
      mainStore.networkId  = "Polygon";
      break  ;
    case 80001 :

      mynetworkName.value = "Mumbai";
      mainStore.networkId  = "Mumbai";
      break  ;
    case 5 :

      mynetworkName.value = "Goerli";
      mainStore.networkId  = "Goerli";
      break  ;
    default :
      mynetworkName.value = "Mumbai";
      mainStore.networkId = "Mumbai";
      break ;
  }

}


const unwatch = watchNetwork(async (network) => {

  var delayInMilliseconds = 500; //1 second
  setTimeout(async function () {
    const {chain} = await getNetwork()
    mapNetwork(chain.id);
  }, delayInMilliseconds);

})

onMounted(async () => {

  try {
    isConnecting.value = false;
    const account = await getAccount()
    const {chain} = await getNetwork()
    mapNetwork(chain.id);
    isMenuReady.value = true;
  } catch (e){
    // const router = useRouter();
    // router.push({ path: "/signin" });
  }
})


</script>