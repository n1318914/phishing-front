<script setup lang="ts">
import LoadComponent from "~/components/phishing/loadings/LoadComponent.vue";
import setupWebsocket from "~/utils/index";
onMounted(() => {
  setupWebsocket();
})

</script>

<template>
  <UApp>
    <NuxtPage />
    <!--模态框-->
    <load-component></load-component>
  </UApp>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>