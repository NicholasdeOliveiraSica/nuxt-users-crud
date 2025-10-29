import { defineNuxtPlugin } from '#app'
import { VueMaskDirective } from 'v-mask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', VueMaskDirective)
})