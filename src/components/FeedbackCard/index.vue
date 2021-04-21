<template>
  <div
    @click="handleToggle"
    class="card--item animate__animated animate__fadeIn animate__faster"
  >
    <div
      class="flex items-center justify-between w-full mb-8 text-brand-graydark text-sm"
    >
      <span
        :class="label[feedback.type].class"
        class="px-4 py-1 rounded-full font-regular text-xs text-white uppercase"
      >
        {{ label[feedback.type].text }}
      </span>

      {{ handleTimeDifference(feedback.createdAt) }}
    </div>

    <p class="text-lg font-regular text-gray-800">{{ feedback.text }}</p>

    <div class="feedback-bottom" :class="!state.isOpen && 'collapsed'">
      <div class="feedback-bottom--item">
        <span>Página</span>
        <p>{{ feedback.page }}</p>
      </div>
      <div class="feedback-bottom--item">
        <span>Usuário</span>
        <p>{{ feedback.apiKey }}</p>
      </div>
      <div class="feedback-bottom--item">
        <span>Dispositivo</span>
        <p>{{ feedback.device }}</p>
      </div>
    </div>

    <div class="flex justify-end">
      <icon
        name="chevron"
        :color="brandColors.graydark"
        class="chevron-icon"
        :class="state.isOpen && 'active'"
      />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { getDiffTimeBetweenCurrentDate } from '../../utils/date'
import Icon from '../Icon'
import palette from '../../../palette'

export default {
  props: {
    feedback: { type: Object, required: true },
    isOpen: { type: Boolean, required: true }
  },
  components: { Icon },
  setup (props) {
    const label = {
      ISSUE: {
        text: 'problema',
        class: 'bg-brand-danger'
      },
      IDEA: {
        text: 'ideia',
        class: 'bg-brand-warning'
      },
      OTHER: {
        text: 'outros',
        class: 'bg-brand-graydark'
      }
    }

    const state = reactive({
      isOpen: props.isOpen
    })

    function handleToggle () {
      state.isOpen = !state.isOpen
    }

    function handleTimeDifference (time) {
      return getDiffTimeBetweenCurrentDate(time)
    }

    return {
      state,
      label,
      handleToggle,
      handleTimeDifference,
      brandColors: palette.brand
    }
  }
}
</script>

<style lang="postcss" scoped>
.card--item {
  transition: all 1s ease;
  @apply flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray;
}

.feedback-bottom {
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(1, 0, 1, 0);
  height: auto;
  max-height: 999px;
  @apply flex flex-col md:flex-row md:flex-wrap items-center justify-between;
}
.feedback-bottom.collapsed {
  max-height: 0;
  transition: max-height 0.7s ease;
}

.feedback-bottom--item {
  @apply mt-4 w-full md:w-1/2;
}

.feedback-bottom--item p {
  @apply text-gray-600 text-sm;
}

.feedback-bottom--item span {
  @apply uppercase text-brand-graydark font-semibold text-sm;
}

.chevron-icon {
  transform: rotate(0deg);
  transition: transform 0.5s ease-in-out 0.2s;
}

.chevron-icon.active {
  transform: rotate(180deg);
}
</style>
