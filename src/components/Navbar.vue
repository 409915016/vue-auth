<script setup>
  function handleLogoutClick() {
    // logout()
  }
</script>

<template>
  <header>
    <div class="container">
      <RouterLink to="/"><h1>Workout Budy</h1></RouterLink>
      <nav>
          <template v-if="false">
            <div>
              <span>{ user.email }</span>
              <button @click="handleLogoutClick">Log out</button>
            </div>
          </template>
          <template v-else>
            <div>
              <RouterLink to="/login">Login </RouterLink>
              <RouterLink to="/signup">Signup </RouterLink>
            </div>
          </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>