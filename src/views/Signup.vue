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
    <h3>注册</h3>
    <label>邮箱:</label>
    <input
        type="email"
        v-model="email"
    />

    <label>密码:</label>
    <input
        type="password"
        v-model="password"
    />

    <button :disabled="isLoading">注册</button>

    <div v-if="err" class="error">{{ error }}</div>
  </form>

</template>

<style scoped>

</style>