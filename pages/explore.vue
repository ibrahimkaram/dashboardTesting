<template>
  <div class="relative">
    <img src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3276&q=80" alt="" class="block w-full">


    <div class="fixed inset-0 flex justify-center items-center z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div class="mx-auto transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
        <Combobox @update:modelValue="onSelect">
          <div class="relative">
            <MagnifyingGlassIcon class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" aria-hidden="true" />
            <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." @change="query = $event.target.value" />
          </div>

          <ComboboxOptions v-if="filteredPeople.length > 0" static class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
            <ComboboxOption v-for="person in filteredPeople" :key="person.id" :value="person" as="template" v-slot="{ active }">
              <li :class="['cursor-default select-none px-4 py-2', active && 'bg-indigo-600 text-white']">
                {{ person.name }}
              </li>
            </ComboboxOption>
          </ComboboxOptions>

          <p v-if="query !== '' && filteredPeople.length === 0" class="p-4 text-sm text-gray-500">No people found.</p>
        </Combobox>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Leslie Alexander', url: '#' },
  // More people...
]

const open = ref(true)
const query = ref('')
const filteredPeople = computed(() =>
    query.value === ''
        ? []
        : people.filter((person) => {
          return person.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

function onSelect(person) {
  window.location = person.url
}
</script>

<style scoped>

</style>