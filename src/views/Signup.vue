<script setup>
  import { ref } from 'vue'
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const err = ref(false)

  function handleSubmit (){
    //e.preventDefault()
    //signup(email, password)
  }
</script>

<template>
  <form class="signup" @submit="handleSubmit">
    <h3>Sign up</h3>
    <label>Email:</label>
    <input
        type="email"
        v-model="email"
    />

    <label>Password:</label>
    <input
        type="password"
        v-model="password"
    />

    <button :disabled="isLoading">Sign up</button>

    <div v-if="err" class="error">{{ error }}</div>
  </form>

</template>

<style scoped>

</style>