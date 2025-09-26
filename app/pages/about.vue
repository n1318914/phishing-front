<template>
  <div>
    <section>
      <p>This page will be displayed at the /about route.</p>
    </section>
    <nuxt-link :to="{name:'post-id', params:{id:1}}">POST 1</nuxt-link>
    <nuxt-link to="/post/2">POST 222</nuxt-link>
    <nuxt-link to="/post/3">POST 33333333</nuxt-link>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>