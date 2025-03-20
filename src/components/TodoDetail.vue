<script setup>
defineProps(['value'])
const emit = defineEmits(['delete']);

function onDeleteBtnClickHandle(value){
  console.log('in TodoDetail: delete:', value)
  emit('delete', value)
}

</script>

<template>
  <div class="todo-detail">
    <h4>{{ value.title }}</h4>
    <p><strong>时间: </strong>{{ value.date }}</p>
    <p><strong>详细内容: </strong>{{ value.description }}</p>
    <p>{{ value.createdAt }}</p>
    <span class="material-symbols-outlined" @click="onDeleteBtnClickHandle(value)">delete</span>
  </div>

</template>

<style scoped>

</style>