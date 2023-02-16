
import { defineStore } from 'pinia'
import {ethers} from "ethers";
import {erc20ABI} from "assets/constants/abis";
import {useSessionStorage} from "@vueuse/core/index";
import {alreadyExists} from "assets/constants/util";

// let currencyState = [];
// if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('currencies')) {
//     currencyState = useSessionStorage('currencies', [])
// }
export const useTokensStore = defineStore('tokens', {
    state: () => ({
        currencies: useSessionStorage('currencies', []), // array of tokens
        nfts: [], // array of tokens
        currentToken: {},
        tokenHolders: [],
    }),
    getters: {
    },
    actions: {
        async getCurrentContract(provider) {
            return new ethers.Contract(this.currentToken.address, erc20ABI, provider);
        },
        async addCurrency(token){
            const index = this.currencies.findIndex(p => p.address === token.address)
            if(index === alreadyExists){
                this.currencies.push(token)
            }else {
                console.log('this has already been cached')
                this.currencies[index] = token;
            }
        },
        getToken(address){
            return this.currencies.find(p => p.address === address)
        },
        setCurrentToken(token) {
            this.currentToken = token;
        },
        async clearCurrencyCache(){
            this.currencies.splice(0, this.currencies.length);
            console.log('this.currencies after clearing = ', this.currencies)
        }
    },
    hydrate(state, initialState) {
        // in this case we can completely ignore the initial state since we
        // want to read the value from the browser
        state.currencies = useSessionStorage('currencies', [])
    },
})
