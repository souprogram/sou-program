import { defineStore } from 'pinia';


export const useMainStore = defineStore('mainStore', {
    state: () => ({
        errorMessage: '',
    }),
    actions: {
        setErrorMessage(message) {
            this.errorMessage = message;
        },
        clearErrorMessage() {
            this.errorMessage = '';
        }
        
    },
});
