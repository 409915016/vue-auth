<script setup>
import TodoForm from "@/components/TodoForm.vue";
import TodoDetail from "@/components/TodoDetail.vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
const todo_list = ref([
  // { _id: 1, title: '个人生活', date: '2025-04-01 16:27', description: '锻炼30分钟、阅读30页书籍、整理房间并清理书桌', createdAt: '2025-04-01 16:27'},
  // { _id: 2, title: '工作', date: '2025-03-07 16:27', description: '完成并提交项目报告、参加下午3点的团队会议', createdAt: '2025-03-04 16:27:47'},
  // { _id: 3, title: '社交娱乐', date: '2025-03-08 16:27', description: '观看经典电影、参加兴趣小组', createdAt: '2025-03-04 16:27:47'},
  // { _id: 4, title: '财务管理', date: '2025-03-09 16:27', description: '记录本月支出并调整预算、取消不必要的订阅服务', createdAt: '2025-03-04 16:27:47'}
])

const loading = ref(true)

function onTodoDeleteHandle (value){
  console.log('in App.vue. Delete todo is: ', value)
  const { id } = value
  axios.delete(`http://localhost:3000/todo/${id}`).then((res)=>{
    alert('删除成功')
    refreshTodoList()
  })
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
  axios.post('http://localhost:3000/todo', {
    ...todo,
    createdAt: getFormattedDate(),
    // id: Math.random().toString(36).substr(2, 10),
  }).then((res)=>{
    alert('提交成功')
    refreshTodoList()
  })
}

function refreshTodoList (){
  axios.get('http://localhost:3000/todo').then((res)=>{
    const {status, data} = res
    if(status === 200) {
      todo_list.value = data
      loading.value = false // 改变 loading 的状态
    }
  })
}
onBeforeMount(()=>{
  refreshTodoList()
})

</script>

<template>
  <div class="home" :class="{'home--loading': loading}">
    <template v-if="loading" class="todo-list ">加载中……</template>
    <template v-else>
      <div class="todo-list fadeIn">
        <TodoDetail
            @delete="onTodoDeleteHandle"
            v-for="todo in todo_list"
            :value="todo"
            :key="todo.id"/>
      </div>
      <div class="todo-form fadeIn">
        <TodoForm @onSubmit="onTodoFormSubmitHandle"/>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* homepage */
.home {
  display: flex;
  column-gap: 100px;
}
.home--loading {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666;
}
.fadeIn {
  opacity: 1;
  animation: fadeIn 1.5s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.todo-list {
  flex-grow: 3;
}
.todo-form {
  flex-grow: 1;
}
</style>