<script setup>
  import { ref } from 'vue'
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const err = ref(false)

  function handleSubmit (){
    //e.preventDefault()
    //login(email, password)
  }
</script>

<template>
  <form class="login" @submit.prevent="handleSubmit">
    <h3>Login</h3>

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

    <button :disabled="isLoading">Log in</button>

    <div v-if="err" class="error">{{ error }}</div>
  </form>
</template>

<style scoped>

</style>