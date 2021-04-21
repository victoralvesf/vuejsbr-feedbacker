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

        <filters @select="changeFeedbackType" />
      </div>
      <div class="md:px-10 pt-10 md:pt-20 col-span-1 md:col-span-3">
        <p v-if="state.hasError" class="warn--announce">
          Não foi possível carregar os Feedbacks, tente novamente!
        </p>
        <p
          v-if="!state.feedbacks.length && !state.isLoading && !state.isLoadingFeedbacks && !state.hasError"
          class="warn--announce"
        >
          Ainda não há Feedbacks para exibir! ☺️
        </p>

        <template v-if="state.isLoading || state.isLoadingFeedbacks">
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

        <feedback-card-loading v-if="state.isLoadingMoreFeedbacks" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, reactive } from 'vue'
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
      isLoadingFeedbacks: false,
      isLoadingMoreFeedbacks: false,
      hasError: false,
      currentFeedbackType: '',
      pagination: {
        limit: 5,
        offset: 0,
        total: 0
      }
    })

    onMounted(() => {
      fetchFeedbacks()
      window.addEventListener('scroll', handleScroll, false)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    function handleError (error) {
      state.isLoading = false
      state.isLoadingFeedbacks = false
      state.isLoadingMoreFeedbacks = false
      state.hasError = !!error
    }

    async function handleScroll () {
      const isBottomOfWindow = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight

      if (state.isLoading || state.isLoadingMoreFeedbacks) return
      if (!isBottomOfWindow) return
      if (state.feedbacks.length >= state.pagination.total) return

      try {
        state.isLoadingMoreFeedbacks = true
        const { data } = await services.feedback.getAll({
          ...state.pagination,
          type: state.currentFeedbackType,
          offset: state.pagination.offset + 5
        })

        if (data.results.length) {
          state.feedbacks.push(...data.results)
        }

        state.isLoadingMoreFeedbacks = false
        state.pagination = data.pagination
      } catch (error) {
        handleError(error)
      }
    }

    async function changeFeedbackType (type) {
      if (state.currentFeedbackType === type) {
        return
      }

      try {
        state.isLoadingFeedbacks = true
        state.pagination.limit = 5
        state.pagination.offset = 0
        state.pagination.total = 0
        state.currentFeedbackType = type

        const { data } = await services.feedback.getAll({
          type,
          ...state.pagination
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoadingFeedbacks = false
      } catch (error) {
        handleError(error)
      }
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true

        const { data } = await services.feedback.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })

        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    return { state, changeFeedbackType }
  }
}
</script>

<style lang="postcss" scoped>
.warn--announce {
  @apply py-8 px-8 bg-red-200 rounded-md border-red-300 border-2 text-center text-lg font-regular;
}
</style>
