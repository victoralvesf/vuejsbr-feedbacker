<template>
  <div class="flex flex-col animate__animated animate__fadeIn animate__faster">
    <h4 class="text-2xl font-regular text-gray-500 mt-6">Filtros</h4>

    <content-loader
      v-if="state.isLoading"
      class="mt-3 flex flex-col rounded px-2"
      width="100%"
      height="150px"
      animation-duration="unset"
    >
      <content-loader width="100%" height="28px" class="rounded-sm" animation-duration="2s" />
      <content-loader width="100%" height="28px" class="rounded-sm" animation-duration="2.4s" />
      <content-loader width="100%" height="28px" class="rounded-sm" animation-duration="2.8s" />
      <content-loader width="100%" height="28px" class="rounded-sm" animation-duration="3s" />
    </content-loader>

    <ul v-else class="flex flex-col mt-3 list-none">
      <li
        v-for="filter in state.filters"
        :key="filter.label"
        :class="{
          'bg-gray-200': typeIsActive(filter),
        }"
        @click="() => handleSelect(filter)"
        class="flex mb-1 items-center justify-between px-4 py-1 rounded cursor-pointer"
      >
        <div class="flex items-center text-gray-600">
          <span
            :class="filter.color.bg"
            class="filter-dot" /> {{ filter.label }}
        </div>
        <span
          :class="typeIsActive(filter) && filter.color.text"
          class="font-medium text-gray-500"
        >
          {{ filter.amount }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from 'vue'
import services from '../../services'
import useStore from '../../hooks/useStore'

import ContentLoader from '../../components/ContentLoader'

const labels = {
  all: 'Todos',
  issue: 'Problemas',
  idea: 'Ideias',
  other: 'Outros'
}

const colors = {
  all: { text: 'text-brand-info', bg: 'bg-brand-info' },
  issue: { text: 'text-brand-danger', bg: 'bg-brand-danger' },
  idea: { text: 'text-brand-warning', bg: 'bg-brand-warning' },
  other: { text: 'text-brand-graydark', bg: 'bg-brand-graydark' }
}

function applyFilters (summary) {
  return Object.keys(summary).reduce((prev, current) => {
    const currentFilter = {
      label: labels[current],
      color: colors[current],
      amount: summary[current],
      type: current
    }

    return [...prev, currentFilter]
  }, [])
}

export default {
  components: { ContentLoader },
  setup (_, { emit }) {
    const store = useStore('global')
    const state = reactive({
      hasError: false,
      currentType: 'all',
      isLoading: false,
      filters: [],
      default: {
        all: 0,
        issue: 0,
        idea: 0,
        other: 0
      }
    })

    function typeIsActive ({ type }) {
      return type === state.currentType
    }

    onBeforeMount(async () => {
      try {
        state.isLoading = true
        const { data } = await services.feedback.getSummary()
        state.filters = applyFilters(data)
        state.isLoading = false
      } catch (error) {
        state.hasError = !!error
        state.filters = applyFilters(state.default)
        state.isLoading = false
      }
    })

    function handleSelect ({ type }) {
      if (store.isLoading) {
        return
      }

      state.currentType = type

      const emitedType = type === 'all' ? '' : type
      emit('select', emitedType)
    }

    return {
      state,
      store,
      typeIsActive,
      handleSelect
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 12px;
}
</style>
