import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialogs', {
    state: () => ({
        dialogs: new Map([
            ['send', { open: false }],
            ['mint', { open: false }],
            ['burn', { open: false }],
            ['advanced', { open: false }],
        ]),
    }),
    actions: {
        setState(name, open){
        const dialog = this.dialogs.get(name)
        dialog.open = open
    },
},
})