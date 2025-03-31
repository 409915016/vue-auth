<script setup>
</script>

<template>
  <header>
    <div class="navbar">
      <a href="/"><h1>待办事项应用</h1></a>
      <nav>
        <a href="/login">登录 </a>
        <a href="/signup">注册 </a>
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