<script setup>
  function handleLogoutClick() {
    // logout()
  }
</script>

<template>
  <header>
    <div class="container">
      <RouterLink to="/"><h1>待办事项应用</h1></RouterLink>
      <nav>
          <template v-if="false">
            <div>
              <span>{ user.email }</span>
              <button @click="handleLogoutClick">退出</button>
            </div>
          </template>
          <template v-else>
            <div>
              <RouterLink to="/login">登录 </RouterLink>
              <RouterLink to="/signup">注册 </RouterLink>
            </div>
          </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>