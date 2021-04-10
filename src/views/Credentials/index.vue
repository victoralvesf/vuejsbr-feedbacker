<template>
  <header-logged />
  <page-banner
    title="Credenciais"
    description="Guia de instalação e geração de suas credenciais"
  />

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h3 class="text-3xl text-black text-brand-darkgray">
        Instalação e configuração
      </h3>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <content-loader
        v-if="store.global.isLoading || state.isLoading"
        class="rounded bg-brand-gray"
        width="600px"
        height="50px"
      />

      <div v-else class="copy-field">
        <span class="w-7/8 whitespace-nowrap overflow-y-auto">
          {{ store.user.currentUser.apiKey }}
        </span>
        <div class="flex ml-5 w-1/8">
          <icon
            @click="copyToClipboard(store.user.currentUser.apiKey, 'Chave da API')"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Adicione o script abaixo no seu site para começar a receber feedbacks
      </p>

      <content-loader
        v-if="store.global.isLoading || state.isLoading"
        class="rounded bg-brand-gray"
        width="600px"
        height="168px"
      />

      <div v-else class="script-field">
        <pre class="text-brand-main w-7/8 overflow-x-auto">
&lt;script
  defer
  async
  onload="init('{{ store.user.currentUser.apiKey }}')"
  src="{{ state.scriptUrl }}"
&gt;&lt;/script&gt;</pre>

        <div class="flex ml-5 w-1/8">
          <icon
            @click="copyScript()"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'

import HeaderLogged from '../../components/HeaderLogged'
import PageBanner from '../../components/PageBanner'
import ContentLoader from '../../components/ContentLoader'
import useStore from '../../hooks/useStore'
import Icon from '../../components/Icon'
import palette from '../../../palette'

export default {
  components: { HeaderLogged, PageBanner, Icon, ContentLoader },
  setup () {
    const toast = useToast()
    const store = useStore()
    const state = reactive({
      scriptUrl: 'https://victoralvesf-feedbacker-widget.netlify.app/init.js',
      isLoading: false
    })

    async function copyScript () {
      const text = document.querySelector('pre').innerText

      await copyToClipboard(text, 'Script')
    }

    async function copyToClipboard (text, name) {
      try {
        await navigator.clipboard.writeText(text)

        toast.success(`${name} copiado(a) para area de transferência!`)
      } catch (err) {
        console.log(err.message)
      }
    }

    return {
      store,
      state,
      brandColors: palette.brand,
      copyToClipboard,
      copyScript
    }
  }
}
</script>

<style lang="postcss" scoped>
.copy-field {
  @apply flex py-3 pl-5 pr-5 mt-2 rounded items-center justify-between bg-brand-gray w-full lg:w-3/4;
}

.script-field {
  @apply flex py-3 pl-5 pr-5 mt-2 rounded items-center justify-between bg-brand-gray w-full lg:w-3/4;
}
</style>
