<script setup>

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="App">
    <Navbar />
    <div class="pages">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
