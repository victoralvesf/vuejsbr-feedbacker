<template>
  <div class="flex flex-col">
    <div class="flex justify-between">
      <h2 class="text-3xl font-medium text-gray-800">Entre na sua conta</h2>
      <button @click="close" class="close-button">
        <img src="@/assets/icons/cross.svg" alt="fechar" />
      </button>
    </div>

    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input
            type="email"
            :class="{
              'border-brand-danger': !!state.email.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-large bg-gray-100 border-2 border-transparent rounded"
            placeholder="email@example.com"
            v-model="state.email.value"
          />
          <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-8">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input
            type="password"
            :class="{
              'border-brand-danger': !!state.password.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-large bg-gray-100 border-2 border-transparent rounded"
            v-model="state.password.value"
          />
          <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          :disabled="state.isLoading"
          type="submit"
          :class="{
            'opacity-50': state.isLoading
          }"
          class="px-8 py-3 mt-10 text-1xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import useModal from '../../hooks/useModal'
import { validateEmptyAndLength3, validateEmailAndNotEmpty } from '../../utils/validators'

export default {
  setup () {
    const modal = useModal()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmailAndNotEmpty)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    function handleSubmit () {
      console.log(state.email.value)
      console.log(state.password.value)
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>

<style lang="postcss" scoped>
.close-button {
  @apply text-4xl text-gray-600;
  width: 28px;
  height: 28px;
  outline: none;
  padding: 5px;
}
</style>
