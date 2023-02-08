<template>
  <ClientOnly>
    <Listbox  :model-value="selected"  as="div"  @update:model-value="updateNetwork($event)" class="w-40">

      <div class="relative mt-1">
        <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-blue focus:outline-none focus:ring-primary-blue focus:ring- sm:text-sm">
        <span class="flex items-center">
          <span :aria-label="selected.online ? 'Online' : 'Offline'" :class="[selected.online  ? 'bg-green-400' : 'bg-gray-200', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" />
          <span class="ml-3 block truncate">
            {{ selected.online ? networkNameRef : "Connecting..."}}
          </span>
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
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import {  ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import {watchNetwork, watchAccount, getNetwork, getAccount} from '@wagmi/core'



import { switchNetwork } from '@wagmi/core'


import {initClient, useMainStore} from "~/stores/web3store";



const wgClient = initClient()




definePageMeta({
  layout: true,
});


const unwatchAccount = watchAccount((account) =>
    {
      console.log(account)
      if(account.isDisconnected){
        const router = useRouter();
        router.push({ path: "/signin" });
        console.log("time to leave")
      }
    }



)



async function switchTo(idChain){
  const network = await switchNetwork({
    chainId: idChain,
  })
}


const people = [
  { id: 0, name: 'Ethereum', online: true , chainId: 1},
  { id: 1, name: 'Polygon', online: false, chainId:137 },
  { id: 2, name: 'Mumbai', online: false, chainId:80001 },
  { id: 3, name: 'Goerli', online: false, chainId:5 },
]

const networkNameRef = useState('networkNameRef');

async function updateNetwork(e){
  selected.value.online = false ;
  let cashedValue = networkNameRef.value ;
  try {
    await switchTo(e.chainId) ;
  }catch (e) {
    networkNameRef.value = cashedValue;
  }

}

const selected = ref(people[0])

const isMenuReady  = ref(false)

const mainStore = useMainStore()


function mapNetwork(chainindex) {
  let id = 0;
  switch (chainindex) {
    case 1 :
      id = 0 ;
      networkNameRef.value = "Ethereum";
      mainStore.networkId  = "Ethereum";
      break ;
    case 137 :
      id =1 ;
      networkNameRef.value = "Polygon";
      mainStore.networkId  = "Polygon";
      break  ;
    case 80001 :
      id =2 ;
      networkNameRef.value = "Mumbai";
      mainStore.networkId  = "Mumbai";
      break  ;
    case 5 :
      id =3 ;
      networkNameRef.value = "Goerli";
      mainStore.networkId  = "Goerli";
      break  ;
    default :
      id =0 ;
      networkNameRef.value = "ETH";
      break ;
  }


  selected.value = people[id];
  selected.value.online = true;
  console.log("selected should be :  ", selected.value)
}

const unwatch = watchNetwork((network) => {

  mapNetwork(network.chain.id);
})

onMounted(async () => {

  try {

    const account = await getAccount()
    const {chain} = await getNetwork()
    mapNetwork(chain.id);
    isMenuReady.value = true;
  } catch (e){
    const router = useRouter();
    router.push({ path: "/signin" });
  }
})


</script>