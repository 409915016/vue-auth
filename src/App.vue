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
.pages{
  max-width: 1400px;
  padding: 20px;
  margin: 0 auto;
}
</style>