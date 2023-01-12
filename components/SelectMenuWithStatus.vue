<template>
  <Listbox as="div" v-model="selected" class="w-36">

    <div class="relative mt-1">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-blue focus:outline-none focus:ring-primary-blue focus:ring- sm:text-sm">
        <span class="flex items-center">
          <span :aria-label="selected.online ? 'Online' : 'Offline'" :class="['bg-green-400', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
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
                <span :class="[selected ? 'bg-green-400' : 'bg-gray-200', 'inline-block h-2 w-2 flex-shrink-0 rounded-full']" aria-hidden="true" />
                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                  {{ person.name }}
                  <span class="sr-only"> is {{ person.online ? 'online' : 'offline' }}</span>
                </span>
              </div>

              <span v-if="selected" :class="[active ? 'text-white' : 'text-primary-blue', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { ref , watch} from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import { watchNetwork } from '@wagmi/core'

import { configureChains, createClient } from "@wagmi/core";

import { polygonMumbai, mainnet, polygon, goerli } from "@wagmi/core/chains";

import { Web3Modal } from "@web3modal/html";


import { switchNetwork } from '@wagmi/core'


import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";



definePageMeta({
  layout: false,
});


  


const isConnected = ref(false)

const projectId = "c4ebec790772322761f1607cb06c5db8"


  const chains = [ mainnet, goerli, polygon, polygonMumbai];

  // Wagmi Core Client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: projectId}),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Osis DashBoard", chains }),
  provider,
});

// Web3Modal and Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
const web3modal = new Web3Modal(
  { projectId: projectId },
  ethereumClient
);

async function switchTo(idChain){

  const network = await switchNetwork({
  chainId: idChain,
})
}


const people = [
  { id: 1, name: 'Ethereum', online: true , chainId: 1},
  { id: 2, name: 'Polygon', online: false, chainId:137 },
  { id: 3, name: 'Mumbai', online: false, chainId:80001 },
  { id: 4, name: 'Goerli', online: false, chainId:5 },
]

const selected = ref(people[0])

watch(selected, async (currentValue, oldValue) => {
      console.log(currentValue);
      switchTo(selected.value.chainId)
    });

 
 const unwatch = watchNetwork((network) => console.log(network))
</script>