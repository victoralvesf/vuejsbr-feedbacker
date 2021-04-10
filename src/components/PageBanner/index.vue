<template>
  <section class="w-full flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h2 class="text-4xl font-black text-center text-gray-800">{{ title }}</h2>
    <p>{{ description }}</p>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    description: String
  }
}
</script>

<style>

</style>
