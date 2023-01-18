<template>
  <div>
    <!--    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>-->
    <div class="relative mt-1 rounded-md shadow-sm">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span class="text-gray-500 sm:text-sm">$</span>
      </div>
      <input type="text" name="amount" id="amount" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" aria-describedby="amount-currency" />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span class="text-gray-500 sm:text-sm" id="amount-currency">USD</span>
      </div>
    </div>
  </div>
</template>
