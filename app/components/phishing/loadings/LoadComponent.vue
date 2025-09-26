<script setup lang="ts">

import LoadStripe from "~/components/phishing/loadings/LoadStripe.vue";
import {useLoadingStore} from "~/stores/loading";

const loadingStore = useLoadingStore();

</script>

<template>
<div>
  <load-stripe v-if="loadingStore.stripe"></load-stripe>

</div>
</template>

<style scoped>

</style>