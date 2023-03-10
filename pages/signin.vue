<template>
  <ClientOnly >
    <div class="flex min-h-screen">
      <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-12 w-auto " src="../assets/images/logo-osis.svg" alt="Your Company" />
            <h2 class="mt-6 text-2xl font-bold tracking-tight text-primary-blue">Sign in to your account</h2>
            <p class="mt-2 text-sm text-gray-600">
              Or
              {{ ' ' }}
              <NuxtLink to="/" class="font-medium text-blue-800 hover:text-blue-500">start your 14-day free trial</NuxtLink>
            </p>
          </div>

          <div class="mt-8">
            <div>
              <div>
                <p class="text-md font-medium text-gray-700 mb-4">Sign in with</p>

                <div class="flex flex-col items-center w-full py-2">

                    <button @click="connectWallet">{{ account.isConnected ? "Next" : "Connect Wallet" }}</button>


                </div>
              </div>

              <div class="relative mt-6">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="w-full border-t border-gray-300" />
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <div>
                <form action="#" method="POST" class="space-y-6">
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                    <div class="mt-1">
                      <input id="email" name="email" type="email" autocomplete="email" required="" disabled="{{true}}" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-blue focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 sm:text-sm" />
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                      <input id="password" name="password" type="password" autocomplete="current-password" disabled="{{true}}" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-blue  focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 sm:text-sm" />
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-primary-blue  focus:ring-primary-blue " />
                      <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>

                    <div class="text-sm">
                      <a href="#" class="font-medium text-blue-800 hover:text-blue-500">Forgot your password?</a>
                    </div>
                  </div>

                  <div>
                    <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>


import {useAccountStore} from "~/stores/accountStore";
import {watchAccount} from "@wagmi/core";



definePageMeta({
  layout: false,
});


const account = useAccountStore();

function connectWallet(){

  if(account.isConnected) {
    const router = useRouter();
    router.push({ path: "/" });
  }
  account.signIn()

}




onMounted(async ()=>{

})

</script>