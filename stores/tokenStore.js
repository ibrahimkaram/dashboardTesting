
import { defineStore } from 'pinia'
import {ethers} from "ethers";
import {erc20ABI, erc721ABI} from "assets/constants/abis";
import {useSessionStorage} from "@vueuse/core/index";
import {notFound} from "assets/constants/util";

// let currencyState = [];
// if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('currencies')) {
//     currencyState = useSessionStorage('currencies', [])
// }
export const useTokensStore = defineStore('tokens', {
    state: () => ({
        currencies: useSessionStorage('currencies', []), // array of tokens
        nfts: useSessionStorage('nfts', []), // array of tokens
        currentToken: {},
        tokenHolders: [],
    }),
    getters: {
    },
    actions: {
        async getCurrentContract(provider) {
            let abi;
            console.log('currentToken.type', this.currentToken.type)
            if(this.currentToken.type === 'ERC20'){ abi = erc20ABI }
            if(this.currentToken.type === 'ERC721') { abi = erc721ABI }
            return new ethers.Contract(this.currentToken.address, abi, provider);
        },
        async addCurrency(token){
            const index = this.currencies.findIndex(p => p.address === token.address)
            if(index === notFound){
                this.currencies.push(token)
            }else {
                console.log('this has already been cached')
                this.currencies[index] = token;
            }
        },
        async addNFT(token){
            const index = this.nfts.findIndex(p => p.address === token.address)
            if(index === notFound){
                this.nfts.push(token)
            }else {
                console.log('this has already been cached')
                this.nfts[index] = token;
            }
        },
        getToken(address){
            return this.currencies.find(p => p.address === address)
        },
        getNFT(address){
            return this.nfts.find(p => p.address === address)
        },
        setCurrentToken(token) {
            this.currentToken = token;
        },
        async clearCurrencyCache(){
            this.currencies.splice(0, this.currencies.length);
            console.log('this.currencies after clearing = ', this.currencies)
        },
    },
    hydrate(state, initialState) {
        // in this case we can completely ignore the initial state since we
        // want to read the value from the browser
        state.currencies = useSessionStorage('currencies', []);
        state.nfts = useSessionStorage('nfts', []);
    },
})
