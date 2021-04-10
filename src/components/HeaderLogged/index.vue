<template>
  <header class="header">
    <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
      <div class="w-28 lg:w-36">
        <img
          class="w-full"
          src="../../assets/images/logo_white.png"
          alt="logo"
        />
      </div>

      <div class="flex">
        <ul class="flex list-none">
          <li
            @click="handleRoute('Feedbacks')"
            class="common-option"
            :class="{ 'active-bg': route.name === 'Feedbacks' }"
          >
            Feedbacks
          </li>
          <li
            @click="handleRoute('Credentials')"
            class="common-option"
            :class="{ 'active-bg': route.name === 'Credentials' }"
          >
            Credenciais
          </li>
          <li @click="handleLogout" class="loggout-button">
            {{ loggoutLabel }}
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useStore from '../../hooks/useStore'
import { clearCurrentUser } from '../../store/user'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore('user')

    const loggoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }

      return `${store.currentUser.name} (sair)`
    })

    function handleRoute (route) {
      router.push({ name: route })
    }

    function handleLogout () {
      window.localStorage.removeItem('token')
      clearCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      route,
      loggoutLabel,
      handleRoute,
      handleLogout
    }
  }
}
</script>

<style lang="postcss" scopped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 129px;
}

.header img {
  -webkit-user-drag: none;
  user-select: none;
}

.common-option {
  @apply px-6 py-2 mr-2 font-bold text-white cursor-pointer rounded-full focus:outline-none;
}

.loggout-button {
  @apply px-6 py-2 ml-4 font-bold bg-white text-brand-main cursor-pointer rounded-full shadow-lg focus:outline-none;
}

.active-bg {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
