<script setup>
import TodoForm from "@/components/TodoForm.vue";
import TodoDetail from "@/components/TodoDetail.vue";
import {ref} from "vue";
const todo_list = ref([
  { _id: 1, title: '个人生活', date: '2025-04-01 16:27', description: '锻炼30分钟、阅读30页书籍、整理房间并清理书桌', createdAt: '2025-04-01 16:27'},
  { _id: 2, title: '工作', date: '2025-03-07 16:27', description: '完成并提交项目报告、参加下午3点的团队会议', createdAt: '2025-03-04 16:27:47'},
  { _id: 3, title: '社交娱乐', date: '2025-03-08 16:27', description: '观看经典电影、参加兴趣小组', createdAt: '2025-03-04 16:27:47'},
  { _id: 4, title: '财务管理', date: '2025-03-09 16:27', description: '记录本月支出并调整预算、取消不必要的订阅服务', createdAt: '2025-03-04 16:27:47'}
])

function onTodoDeleteHandle (value){
  console.log('in App.vue. Delete todo is: ', value)
  const { _id } = value
  const new_todo_list = todo_list.value.filter(i => {
    return i._id !== _id
  })
  console.log('new_todo_list: ',new_todo_list)
  todo_list.value = new_todo_list
  console.log('todo_list: ',todo_list)
}

function getFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function onTodoFormSubmitHandle(todo){
  todo_list.value.push({
    ...todo,
    _id: Math.random().toString(36).substr(2, 10),
    createdAt: getFormattedDate(),
  })
}
</script>

<template>
  <div class="home">
    <div class="todo-list">
      <TodoDetail
          @delete="onTodoDeleteHandle"
          v-for="todo in todo_list"
          :value="todo"
          :key="todo.id"/>

    </div>
    <div class="todo-form">
      <TodoForm @onSubmit="onTodoFormSubmitHandle"/>
    </div>
  </div>
</template>

<style scoped>
/* homepage */
.home {
  display: flex;
  column-gap: 100px;
}
.todo-list {
  flex-grow: 3;
}
.todo-form {
  flex-grow: 1;
}
</style>