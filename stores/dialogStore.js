import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialogs', {
    state: () => ({
        dialogs: new Map([
            ['send', { open: false }],
            ['mint', { open: false }],
            ['burn', { open: false }],
            ['advanced', { open: false }],
            ['nftSafeMint', {open: false}],
            ['nftSend', {open: false}],
        ]),
        amount: '', // probably should be a number
        address: '',
        description: '',
        message: '',
        file: null,
        name: '',
        tokenId: 0
    }),
    actions: {
        setState(name, open){
        const dialog = this.dialogs.get(name)
        dialog.open = open
        },
    },
})