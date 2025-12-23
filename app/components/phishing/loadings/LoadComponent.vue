<script setup lang="ts">

import LoadStripe from "~/components/phishing/loadings/LoadStripe.vue";
import LoadLoading from "~/components/phishing/loadings/LoadLoading.vue";
import {useLoadingStore} from "~/stores/loading";

const loadingStore = useLoadingStore();
</script>

<template>
  <load-stripe v-if="loadingStore.stripe"></load-stripe>
  <load-loading v-if="loadingStore.loading"></load-loading>
</template>

<style scoped>

</style>