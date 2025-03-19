<script setup>

import TodoDetail from "@/components/TodoDetail.vue";

const todo_item = {
  _id: 1,
  title: '备课',
  date: '2025-03-04 16:27',
  description: '准备HTML CSS 课件',
  createdAt: '2025-03-04 16:27:47'
}


</script>

<template>
  <TodoDetail :value="todo_item"/>
</template>

<style scoped>

</style>
