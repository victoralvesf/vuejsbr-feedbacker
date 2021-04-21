import { reactive } from 'vue'

const state = reactive({
  isLoading: false,
  hasError: false
})

export default state

export function setGlobalLoading (status) {
  state.isLoading = status
}

export function setGlobalError (status) {
  state.hasError = status
}
