<template>
  <div class="min-h-full">
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BreadcrumbHeader :crumbs="crumbs" :pageName="pageName"/>
        </div>
      </header>
      <div class="p-10">
        <TokenDetailCard :tokenData="tokenData" :address="address"/>
      </div>
      <div class="p-10">
        <TokenDetailCard :tokenData="tokenData" :address="address"/>
      </div>
    </div>
  </div>
</template>

<script setup>
const { address } = useRoute().params

const pageName = 'Token Details'
const crumbs = [
  { name: 'Overview', to: '/', current: false },
  { name: 'Currencies', to: '/currencies', current: false },
  { name: 'Token Details', to: `${address}`, current: true },
]

const { tokenData } = defineProps(['tokenData'])

</script>


<style scoped>
</style>