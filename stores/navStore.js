import { defineStore } from 'pinia'
import {useSessionStorage} from "@vueuse/core/index";

export const useNavStore = defineStore('navigation', {
    state: () => ({
        currentBreadcrumbs: useSessionStorage('breadcrumbs', []),
        pageId: useSessionStorage('page', 0),
    }),
    actions: {
        setPageId(tabId){
            this.pageId = tabId
        }
    },
    hydrate(state, initialState) {
        // in this case we can completely ignore the initial state since we
        // want to read the value from the browser
        state.pageId = useSessionStorage('page', 0)
    },
})