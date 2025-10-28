<script setup lang="ts">

</script>


<template>

  <Button label="Verify" />
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>

<!--    <img src="/img/output.png" alt="Discover Nuxt" />-->
    <div>

      <img src="@/assets/img/1.jpg" alt="Discover Nuxt" />

    </div>
    <nuxt-link to="/about">About page</nuxt-link>




  </div>
</template>

<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>