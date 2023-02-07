
import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useTokensStore = defineStore('tokens', {
    state: () => ({
        currencies: [], // array of tokens
        nfts: [], // array of tokens
        currentToken: null,
    }),
    // getters: {
    //     recentCurrencies(){
    //         return this.currencies.slice(0, 3);
    //     }
    // },
    actions: {
        async getCurrencies(){
            const data = ['coolToken']
            data.push('anotherToken')
            this.currencies = data
        },
        async getNfts(){
            //const nfts = await
        },
        async addCurrency(token){
            const exists = this.currencies.find(p => p.address === token.address)
            if(!exists){
                this.currencies.push({...token, isTrash: false})
            }else {
                console.log('this has already been cached')
            }
        },
        getToken(address){
            return this.currencies.find(p => p.address === address)
        },
        setCurrentToken(token) {
            this.currentToken = token;
        }
    },
})
