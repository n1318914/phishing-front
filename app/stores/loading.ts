import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        stripe: true,
        paypal: false
    }),
    actions: {
        loadStripe() {
            this.stripe = true
        },
        unloadStripe() {
            this.stripe = false
        },
        loadPaypal() {
            this.paypal = true
        },
        unloadPaypal() {
            this.paypal = false
        }
    }
})