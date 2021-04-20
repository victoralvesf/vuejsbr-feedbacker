<template>
  <header-logged />
  <page-banner
    title="Feedbacks"
    description="Detalhes de todos os feedbacks recebidos."
  />

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-1 md:grid-cols-4 gap-2">
      <div>
        <h3 class="font-bold text-gray-600 text-3xl">Listagem</h3>

        <filters />
      </div>
      <div class="md:px-10 pt-10 md:pt-20 col-span-1 md:col-span-3">
        <p v-if="state.hasError" class="warn--announce">
          Não foi possível carregar os Feedbacks, tente novamente!
        </p>
        <p
          v-if="state.feedbacks.length === 0 && !state.isLoading"
          class="warn--announce"
        >
          Ainda não há Feedbacks para exibir! ☺️
        </p>

        <template v-if="state.isLoading">
          <feedback-card-loading first />
          <feedback-card-loading />
          <feedback-card-loading />
        </template>
        <feedback-card
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :is-open="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import HeaderLogged from '../../components/HeaderLogged'
import PageBanner from '../../components/PageBanner'
import Filters from './Filters.vue'
import FeedbackCardLoading from '../../components/FeedbackCard/Loading'
import FeedbackCard from '../../components/FeedbackCard'
import services from '../../services'

export default {
  components: {
    HeaderLogged,
    PageBanner,
    Filters,
    FeedbackCardLoading,
    FeedbackCard
  },
  setup () {
    const state = reactive({
      feedbacks: [],
      isLoading: false,
      hasError: false,
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0
      }
    })

    onMounted(() => {
      fetchFeedbacks()
    })

    function handleError (error) {
      state.isLoading = false
      state.hasError = !!error
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true

        const { data } = await services.feedback.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return { state }
  }
}
</script>

<style lang="postcss" scoped>
.warn--announce {
  @apply py-8 px-8 bg-red-200 rounded-md border-red-300 border-2 text-center text-lg font-regular;
}
</style>
