<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div>
      <DefaultListHeader/>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div v-if="currencies.length!==0" class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Token</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Balance</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Date Created</th>
              <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            <tr v-for="token in currencies" :key="token.name">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ token.name }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.balance }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.dateCreated }}</td>
              <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ token.role }}</td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4">
                <DropdownButton/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="currencies.length===0">
          <EmptyTokenListState/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DropdownButton from "./DropdownButton";
import EmptyTokenListState from "./EmptyTokenListState";

const currencies = [
  { name: 'WedgeToken', balance: '10000', dateCreated: '12 Nov 2022', role: 'Owner' },
  { name: 'IbrahimCoin', balance: '1000000', dateCreated: '17 Dec 2021', role: 'Owner' },
  // More people...
]
</script>