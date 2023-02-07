import { defineStore } from 'pinia'
import {ethers} from "ethers";

export const useProviderStore = defineStore('provider', {
    state: () => ({
        network: 'goerli',
        apiKey: 'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0',
    }),
    getters: {
        provider() {
            return new ethers.providers.AlchemyProvider(this.network, this.apiKey);
        },
        walletProvider() {
            //return ... get walletConnect provider instance
        },
    },
    actions: {
    }
});
