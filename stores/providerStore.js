import { defineStore } from 'pinia'
import {ethers} from "ethers";

import {goerli, mainnet, polygon, polygonMumbai} from "@wagmi/core/chains";
import {configureChains, createClient, fetchSigner, getProvider, normalizeChainId} from "@wagmi/core";

import {factoryAddresses, nftFactoryAddresses} from "assets/constants/factories";
import {erc20ABI} from "assets/constants/abis";




export const useProviderStore = defineStore('provider', {
    state: () => ({
        network: 'Mumbai',
        networkId : "Mumbai" ,
        apiKey: 'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0',
    }),
    getters: {
        provider() {
            return new ethers.providers.AlchemyProvider(this.network, this.apiKey);
        },
        walletProvider() {
            return getProvider()
        },
        signerProvider() {
            return fetchSigner();
        },
        erc20Factory(){
            if (this.network in factoryAddresses) {
                return factoryAddresses[this.network];
            } // else ->
            throw new Error(`Unsupported network: ${this.network}`);
        },
        erc721Factory(){
            if (this.network in nftFactoryAddresses) {
                return nftFactoryAddresses[this.network];
            } // else ->
            throw new Error(`Unsupported network: ${this.network}`);
        },
        setNetwork(network){
            this.network = network
        }
    },
    actions: {
        async getContract(address){
            return new ethers.Contract(address, erc20ABI, this.walletProvider)
        },
    }
});
