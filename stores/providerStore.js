import { defineStore } from 'pinia'
import {ethers} from "ethers";

import {goerli, mainnet, polygon, polygonMumbai} from "@wagmi/core/chains";
import {configureChains, createClient , getProvider} from "@wagmi/core";
import {modalConnectors, walletConnectProvider} from "@web3modal/ethereum";


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
            return getProvider()
        },
    },
    actions: {
    }
});

export function initClient(){

    const projectId = "c4ebec790772322761f1607cb06c5db8"
    const chains = [ polygon , mainnet, goerli, polygonMumbai];
    const { provider } = configureChains(chains, [
        walletConnectProvider({ projectId: projectId}),
    ]);
    return  createClient({
        autoConnect: true,
        connectors: modalConnectors({ appName: "Osis DashBoard", chains }),
        provider,
    });
}