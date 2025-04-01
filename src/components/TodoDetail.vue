<script setup>
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { zhCN } from "date-fns/locale";

const emit = defineEmits(['delete']);
defineProps(['value'])
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
    <p>{{ formatDistanceToNow(new Date(value.createdAt), { addSuffix: true, locale: zhCN }) }}</p>
    <span
        class="material-symbols-outlined"
        @click="onDeleteBtnClickHandle(value)">delete</span>
  </div>
</template>

<style>
.todo-detail {
  background: #fff;
  border-radius: 4px;
  margin: 20px auto;
  padding: 20px;
  position: relative;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
}
.todo-detail h4 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
  color: var(--primary);
}
.todo-detail p {
  margin: 0;
  font-size: 0.9em;
  color: #555;
}
.todo-detail span {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: #f1f1f1;
  padding: 6px;
  border-radius: 50%;
  color: #333;
}

</style>