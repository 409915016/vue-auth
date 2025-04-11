<script setup>
</script>

<template>
  <header>
    <div class="navbar">
      <RouterLink to="/"><h1>待办事项应用</h1></RouterLink>
      <nav>
        <RouterLink to="/login">登录</RouterLink>
        <RouterLink to="/signup">注册</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  background: #fff;
}
header .navbar {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header a {
  color: #333;
  text-decoration: none;
}

nav {
  display: flex;
  align-items: center;
}
nav a {
  margin-left: 10px;
}
</style>