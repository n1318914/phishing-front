
<template>
  <div  id="abc">
    User {{ route.params.id }}

  </div>
</template>


<script setup lang="ts">
const route = useRoute()
console.log(route)

definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>


<style>
#abc {
  color:red;
}

</style>