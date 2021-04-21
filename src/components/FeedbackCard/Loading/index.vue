<template>
  <content-loader
    class="flex flex-col rounded px-8 py-6 mb-8 card-loader"
    width="100%"
    :height="first ? '280px' : '180px'"
    animation-duration="unset"
  >
    <div class="flex flex-row justify-between w-full mb-2">
      <content-loader class="rounded" width="70px" height="23px" />
      <content-loader class="rounded" width="106px" height="23px" />
    </div>
    <content-loader
      class="mt-3 rounded"
      width="96%"
      height="28px"
      animation-duration="1.7s"
    />
    <content-loader
      class="mt-3 rounded"
      width="100%"
      height="28px"
      animation-duration="1.9s"
    />
    <content-loader
      class="mt-3 mb-4 rounded"
      width="75%"
      height="28px"
      animation-duration="2.3s"
    />

    <template v-if="first">
      <div class="flex justify-between">
        <content-loader
          class="mt-3 rounded"
          width="40%"
          height="44px"
          animation-duration="2.3s"
        />
        <content-loader
          class="mt-3 rounded"
          width="45%"
          height="44px"
          animation-duration="2.3s"
        />
      </div>

      <content-loader
        class="mt-3 rounded"
        width="38%"
        height="44px"
        animation-duration="2.3s"
      />
    </template>
  </content-loader>
</template>

<script>
import ContentLoader from '../../ContentLoader'

export default {
  components: { ContentLoader },
  props: {
    first: { type: Boolean, required: false }
  }
}
</script>

<style lang="postcss" scoped>
.card-loader {
  margin-top: 0px !important;
}
</style>
