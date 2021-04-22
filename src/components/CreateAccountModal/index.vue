<template>
  <div class="flex flex-col" id="modal-create-account">
    <div class="flex justify-between">
      <h2 class="text-3xl font-medium text-gray-800">Crie uma conta</h2>
      <button @click="close" class="close-button">
        <img src="@/assets/icons/cross.svg" alt="fechar" />
      </button>
    </div>

    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">Nome</span>
          <input
            type="text"
            :class="{
              'border-brand-danger': !!state.name.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-large bg-gray-100 border-2 border-transparent rounded"
            placeholder="John Doe"
            v-model="state.name.value"
          />
          <span v-if="!!state.name.errorMessage" class="block font-medium text-brand-danger">
            {{ state.name.errorMessage }}
          </span>
        </label>

        <label class="block mt-8">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input
            type="email"
            :class="{
              'border-brand-danger': !!state.email.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-large bg-gray-100 border-2 border-transparent rounded"
            placeholder="john.doe@mail.com"
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
          <icon v-if="state.isLoading" name="loading" class="animate-spin" />
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'

import useModal from '../../hooks/useModal'
import { validateEmptyAndLength3, validateEmailAndNotEmpty, validateEmpty } from '../../utils/validators'
import services from '../../services'
import Icon from '../../components/Icon'

export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const {
      value: nameValue,
      errorMessage: nameErrorMessage
    } = useField('name', validateEmpty)

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
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleLogin ({ email, password }) {
      const { data, errors } = await services.auth.login({
        email: state.email.value,
        password: state.password.value
      })

      if (!errors) {
        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        modal.close()
      }

      state.isLoading = false
    }

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          await handleLogin({
            email: state.email.value,
            password: state.email.value
          })

          return
        }

        if (errors.status === 400) {
          toast.error('Ocorreu um erro inesperado, tente novamente!')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu um erro inesperado, tente novamente!')
      }
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
