// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui',
        '@pinia/nuxt',
        '@vueuse/nuxt',
    ],
    //fixing Build issues
    build: {
        transpile: ['@heroicons/vue']
    },
    runtimeConfig: {
        // The private keys which are only available within server-side
        ipfsToken: process.env.IPFS_TOKEN,
        // Keys within public, will be also exposed to the client-side
        public: {
            ipfsToken: process.env.IPFS_TOKEN,
        },
    },


})
