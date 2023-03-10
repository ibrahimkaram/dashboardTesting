import {defineStore} from "pinia";


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import {configureChains, createClient, getProvider, watchAccount} from '@wagmi/core'
import {arbitrum, goerli, mainnet, polygon, polygonMumbai} from '@wagmi/core/chains'
import { getAccount } from '@wagmi/core'



export const useAccountStore = defineStore('account', {
    state: () => ({
        network: "",
        networkId : "" ,
        apiKey: 'IujOeHw6FElFb9cvUbH6mEV0pIVeAN-0',
        isConnected: false ,
        address: "",


    }),
    getters: {
        walletProvider(){
            return getProvider()
        }

    },
    actions: {

        async signIn(){
            console.log("Sign in load : ", this.apiKey )


            const chains = [ mainnet, polygon, goerli , polygonMumbai]
            const projectId = '7896a619a3c50d1502018f25e342bfac'

            const { provider } = configureChains(chains, [w3mProvider({ projectId })])
            const wagmiClient = createClient({
                autoConnect: true,
                connectors: w3mConnectors({ projectId, version: 1, chains }),
                provider
            })
            const ethereumClient = new EthereumClient(wagmiClient, chains)
            const web3modal = new Web3Modal({ projectId }, ethereumClient)

            web3modal.setDefaultChain(goerli) ;
            let account = getAccount()
            if(account.isConnected) {
                console.log("We are Connected")
                this.isConnected = true;
                return
            }

            await web3modal.openModal();
            account = getAccount()
            if(account.isConnected) {
                console.log("We are Connected")
                this.isConnected = true;
            }

        },
        setWatcher(){

        },
        setClient(){
            const chains = [ mainnet, polygon, goerli , polygonMumbai]
            const projectId = '7896a619a3c50d1502018f25e342bfac'

            const { provider } = configureChains(chains, [w3mProvider({ projectId })])
            const wagmiClient = createClient({
                autoConnect: true,
                connectors: w3mConnectors({ projectId, version: 1, chains }),
                provider
            })
        }

    }
});