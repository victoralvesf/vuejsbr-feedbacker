<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import Chevron from './Chevron.vue'

export default {
  components: { Loading, Copy, Chevron },
  props: {
    name: { type: String, required: true }
  }
}
</script>
