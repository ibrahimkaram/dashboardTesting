<template>
  <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
      <div>
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Token Holders</h1>
            <p class="mt-2 text-sm text-gray-700">Accounts holding a balance in the contract</p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Rank</th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Address</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th scope="col" class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">Percentage</th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                <tr v-for="holder in holders" :key="holder.amount">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0">{{ holder.rank }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.hash }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.amount }}</td>
                  <td class="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{{ holder.percentage }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const holders = [
  { rank: '1', hash: '0xb192f...7gdf6ec', amount: '199,000', percentage: '55%'},
  { rank: '2', hash: '0xfb65e...b8d1d48', amount: '98,000', percentage: '26%'},
  { rank: '3', hash: '0xb76ec...d791b19', amount: '73,000', percentage: '19%'},
]
</script>

<style scoped>

</style>