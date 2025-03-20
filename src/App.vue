<script setup>
import { ref } from "vue";
import TodoDetail from "@/components/TodoDetail.vue";

const todo_item = {
  _id: 1,
  title: '备课',
  date: '2025-03-04 16:27',
  description: '准备HTML CSS 课件',
  createdAt: '2025-03-04 16:27:47'
}

const todo_list = ref([
  { _id: 1, title: '个人生活', date: '2025-03-04 16:27', description: '锻炼30分钟、阅读30页书籍、整理房间并清理书桌', createdAt: '2025-03-04 16:27:47'},
  { _id: 2, title: '工作', date: '2025-03-07 16:27', description: '完成并提交项目报告、参加下午3点的团队会议', createdAt: '2025-03-04 16:27:47'},
  { _id: 3, title: '社交娱乐', date: '2025-03-08 16:27', description: '观看经典电影、参加兴趣小组', createdAt: '2025-03-04 16:27:47'},
  { _id: 4, title: '财务管理', date: '2025-03-09 16:27', description: '记录本月支出并调整预算、取消不必要的订阅服务', createdAt: '2025-03-04 16:27:47'}
])

function onTodoDeleteHandle (value){
  console.log('in App.vue. Delete todo is: ', value)
  const { _id } = value //获得删除待办事项的 _id
  const new_todo_list = todo_list.value.filter(i => { //使用数组内置方法 filter
    return i._id !== _id //保留不等于要删除 _id的待办事项
  })
  console.log('new_todo_list: ',new_todo_list)
  todo_list.value = new_todo_list
  console.log('todo_list: ',todo_list)
}


</script>

<template>
  <TodoDetail v-for="todo in todo_list" :value="todo" :key="todo.id" @delete="onTodoDeleteHandle"/>
</template>

<style scoped>

</style>
