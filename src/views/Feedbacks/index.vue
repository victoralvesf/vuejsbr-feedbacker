<template>
  <header-logged />
  <page-banner
    title="Feedbacks"
    description="Detalhes de todos os feedbacks recebidos."
  />

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h3 class="font-bold text-gray-600 text-3xl">Listagem</h3>

        <filters />
      </div>
      <div class="px-10 pt-20 col-span-3">
        Feedbacks
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import PageBanner from '../../components/PageBanner'
import Filters from './Filters.vue'

export default {
  components: { HeaderLogged, PageBanner, Filters }
}
</script>

<style>
</style>
